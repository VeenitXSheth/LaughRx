import { app as firebase } from './firebase-config.js';
import { getAuth, onAuthStateChanged, signOut, updateProfile } from 'firebase/auth';
import { getFirestore, setDoc, doc, collection, onSnapshot, getDocs, Timestamp, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore'

console.log(firebase);

const auth = getAuth(firebase)
const db = getFirestore(firebase)

const delay = ms => new Promise(res => setTimeout(res, ms))

const signOutBtn = document.getElementById('sign-out')
signOutBtn.addEventListener('click', () => {
    signOut(auth)
    .then(() => {
        console.log('user signed out')
        location.href = '/index.html'
    })
    .catch((err) => {
        console.log(err.message)
    })
})

let currentUserUID;

onAuthStateChanged(auth, user => {

    if (user) {
        console.log('welcome!')
        currentUserUID = user.uid;
        console.log(currentUserUID)
        const displayNameText = document.querySelector('#username')
        if (localStorage.getItem('setUsername') === 'True') {
            console.log('setting username')
            updateProfile(user, {
                displayName: localStorage.getItem('username')
            }).then(() => {
                const prefixes = ['Hi', 'Welcome back', 'Hello', 'Hey', 'Good to see you', "What's up", 'Ahoy', "What's crackin'", 'Howdy']
                const greeting = prefixes[Math.floor(Math.random() * prefixes.length)]
                displayNameText.innerText = `${greeting} ${user.displayName},`
            }).catch((err) => {
                console.log(err.message);
            })
        } else {
            console.log('username already set');
            displayNameText.innerText = `Welcome ${user.displayName}`;
            console.log(user.displayName)
            console.log(user.email)
        }
    } else {
        console.log('please login!')
        location.href = '/auth/login.html'
    }

})

const GPT35TurboMessage = [
    { role: "system", content: `You are a comedian` },
    {
        role: "user",
        content: "Tell me a joke to cheer me up",
    },
    {
        role: "assistant",
        content: "Don't make it dark humor",
    },
    { role: "user", content: 'Tell me a joke to cheer me up' },
];

function OpenaiFetchAPI() {
    console.log("Calling GPT3")
    var url = "https://api.openai.com/v1/chat/completions";
    var bearer = 'Bearer ' + 'ENTER OWN API KEY'
    fetch(url, {
        method: 'POST',
        headers: {
            'Authorization': bearer,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "model": "gpt-3.5-turbo",
            "messages": GPT35TurboMessage,
            // "max_tokens": 64,
            // "temperature": 1,
            // "top_p": 1,
            // "n": 1,
            // "stream": false,
        
            // "stop": "\n"
        })


    }).then(response => {
        
        return response.json()
    
    }).then(data=>{
        console.log(data)
        console.log(typeof data)
        console.log(Object.keys(data))
        console.log(data['choices'][0].message.content)
        const jokeText = document.getElementById('text')
        jokeText.innerText = data['choices'][0].message.content
    })
    .catch(error => {
        console.log('Something bad happened ' + error)
    });

}

async function getDadJoke() {
    const jokeData = await fetch('https://icanhazdadjoke.com/', {
        headers: {
            Accept: 'application/json'
        }
    });
    const jokeObj = await jokeData.json()
    const jokeText = document.getElementById('text')
    jokeText.innerText = jokeObj.joke
    console.log(jokeObj.joke)
}

const generateJokeBtn = document.getElementById('generate-btn');
generateJokeBtn.addEventListener('click', async e => {

    let chosen = Math.floor(Math.random() * 2)

    if (chosen === 0) {
        OpenaiFetchAPI()
    } else {
        getDadJoke()
    }

})

const likeJokeBtn = document.getElementById('favorite')
likeJokeBtn.addEventListener('click', async e => {

    const colRef = collection(db, 'favorites')
    const docRef = doc(colRef)

    const joke = document.getElementById('text').innerText;
    const time = Timestamp.fromDate(new Date());
    const user = currentUserUID;

    const alert = document.getElementById('alert');

    await setDoc(docRef, {
        joke: joke,
        time: time,
        user: user,
    })

    console.log('joke favorited!')

    alert.innerHTML = '<span class="material-symbols-outlined">done</span>Joke Favorited!'
    alert.style.display = 'flex';

    delay(5000).then(() => {
        alert.style.display = 'none';
    })

})

const shareJokeBtn = document.getElementById('share')
shareJokeBtn.addEventListener('click', async () => {
    try {
        const joke = document.getElementById('text').innerText
        await navigator.share({ title: "Share Joke", url: `http://laughrx-10591.web.app/share.html?joke=${joke}` });
        console.log("Data was shared successfully");
        const alert = document.getElementById('alert');
        alert.innerHTML = '<span class="material-symbols-outlined">done</span>Joke Shared!'
        alert.style.background = '#84a9c4'
        alert.style.color = 'blue'
        alert.style.border = '1px solid blue'
        alert.style.display = 'flex';
        delay(5000).then(() => {
            alert.style.display = 'none';
        })
    } catch (err) {
        console.error("Share failed:", err.message);
        const alert = document.getElementById('alert');
        alert.style.background = '#c9726f'
        alert.style.color = 'red'
        alert.style.border = '1px solid red'
        alert.style.display = 'flex';
        alert.innerHTML = `<span class="material-symbols-outlined">error</span>${err.message}`
        delay(5000).then(() => {
            alert.style.display = 'none';
        })
    }
})