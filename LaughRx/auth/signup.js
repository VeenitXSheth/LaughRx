import { app as firebase } from '../firebase-config.js';
import { getAuth, createUserWithEmailAndPassword, sendEmailVerification, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from 'firebase/auth'

console.log(firebase)

const auth = getAuth(firebase);
const provider = new GoogleAuthProvider(auth)

const form = document.querySelector('form');
form.addEventListener('submit', (e) => {

    e.preventDefault()

    const username = form.username.value;
    const email = form.email.value;
    const password = form.password.value;

    createUserWithEmailAndPassword(auth, email, password)
    .then((cred) => {
        console.log('user created:', cred.user)
        sendEmailVerification(auth.currentUser)
        .then(() => {
            console.log('verification email sent!')
            localStorage.setItem('setUsername', 'True')
            localStorage.setItem('username', username)
            location.href = '/app.html';
        })
        .catch((err) => {
            console.log(err.message)
        })
    })
    .catch((err) => {
        console.log(err.message)
    })
})

const googleBtn = document.getElementById('create-with-google')
googleBtn.addEventListener('click', (e) => {

    e.preventDefault()

    signInWithPopup(auth, provider)
    .then((result) => {
        console.log('user joined with google:', result)
        sendEmailVerification(auth.currentUser)
        .then(() => {
            console.log('verification email sent!')
            localStorage.setItem('setUsername', 'True')
            location.href = '/app.html';
        })
        .catch((err) => {
            console.log(err.message)
        })
    })
    .catch((err) => {
        console.log(err.message)
    })

})