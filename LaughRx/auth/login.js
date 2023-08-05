import { app as firebase } from '../firebase-config.js';
import { GoogleAuthProvider, signInWithPopup, getAuth, signInWithEmailAndPassword } from 'firebase/auth';

console.log(firebase)

const auth = getAuth(firebase)
const provider = new GoogleAuthProvider(auth)

const form = document.querySelector('form')
form.addEventListener('submit', (e) => {
    
    e.preventDefault()

    const email = form.email.value;
    const password = form.password.value;

    signInWithEmailAndPassword(auth, email, password)
    .then((cred) => {
        console.log('user signed in:', cred.user)
        location.href = '/app.html'
    })
    .catch((err) => {
        console.log(err.message)
    })
})

const googleBtn = document.getElementById('login-with-google')
googleBtn.addEventListener('click', (e) => {

    e.preventDefault()

    signInWithPopup(auth, provider)
    .then((result) => {
        console.log('user signed in with google:', result)
        location.href = '/app.html'
    })
    .catch((err) => {
        console.log(err.message)
    })

})