import { app as firebase } from './firebase-config.js';

console.log(firebase)

window.addEventListener('load', () => {

    const searchParams = new URLSearchParams(window.location.search)
    const joke = searchParams.get('joke')
    console.log(joke)

    const text = document.getElementById('text')
    text.innerText = joke;

})