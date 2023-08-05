import { app as firebase } from './firebase-config.js';
import { getAuth, onAuthStateChanged, signOut, updateProfile, reauthenticateWithCredential, updateEmail } from 'firebase/auth';
import { getFirestore, setDoc, doc, collection, onSnapshot, getDocs, Timestamp, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore'

console.log(firebase);

const auth = getAuth(firebase)
const db = getFirestore(firebase)

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
        const displayNameText = document.querySelector('h1')
        if (localStorage.getItem('setUsername') === 'True') {
            console.log('setting username')
            updateProfile(user, {
                displayName: localStorage.getItem('username')
            }).then(() => {
                displayNameText.innerText = `${user.displayName}'s Profile`
            }).catch((err) => {
                console.log(err.message);
            })
        } else {
            console.log('username already set');
            displayNameText.innerText = `Welcome ${user.displayName}`;
            console.log(user.displayName)
            console.log(user.email)
        }
        const colRef = collection(db, 'favorites')
        getDocs(colRef)
        .then((snapshot) => {
            let favorites = []
            snapshot.docs.forEach((doc) => {
                const content = { ...doc.data() }
                if (content.user === currentUserUID) {
                    console.log('user favorited this joke!')
                    favorites.push(content.joke)
                    const jokeWrapper = document.createElement('li')
                    jokeWrapper.innerText = content.joke
                    const jokeList = document.querySelector('ul')
                    jokeList.appendChild(jokeWrapper)
                } else {
                    console.log('incorrect joke!')
                }
            })
            let count = 0
            for (let i = 0; i < favorites.length; i++ ) {
                count = count + 1
            }
            console.log(count)
        })
    } else {
        console.log('please login!')
        location.href = '/auth/login.html'
    }

})

const settingsBtn = document.getElementById('settings-btn');
const settingsTab = document.getElementById('settings-tab');
const favoritesBtn = document.getElementById('favorites-btn');
const favoritesTab = document.getElementById('favorites-tab');

settingsBtn.addEventListener('click', () => {

    settingsTab.style.display = 'flex';
    favoritesTab.style.display = 'none';

})

favoritesBtn.addEventListener('click', () => {

    settingsTab.style.display = 'none';
    favoritesTab.style.display = 'flex';

})

const updateDisplayNameForm = document.getElementById('update-displayname-form');
updateDisplayNameForm.addEventListener('submit', (e) => {

    e.preventDefault()

    const newUsername = updateDisplayNameForm.displayName.value;
    updateProfile(auth.currentUser, {
        displayName: newUsername,
    }).then(() => {
        localStorage.setItem('username', newUsername)
        console.log('username updated')
        alert('Username changed!')
        location.reload()
    }).catch((err) => {
        console.log(err)
    })

})