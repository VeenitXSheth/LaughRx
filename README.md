<h1 align="center">LaughRX</h1>

Meet LaughRX, the software that prescribes laughter for better mental health. 
At the tap of a button, you get a random joke from a selection of thousands of dad jokes or 
a tailored laughing experience with the power of AI.

## Features

With the click of a button, you can get a random dad joke via the icanhazdadjoke API or a custom joke via the OpenAI API using GPT 3.5-Turbo. 
Plus, save your favorite jokes to view at any time on your profile and share the ones that made you crack up the most with friends and family
through a generatable link!

## How To Use

Start by heading over to [LaughRX](https://laughrx-10591.web.app) on your device and creating a free account either with an email and password or by linking
your Google account. From there, it's as simple as clicking the 'New Joke' button and start laughing away! To favorite a joke, click the heart icon and you'll
see a notification that says 'Joke Favorited!'. To share a joke with friends and family, click the share icon next to the heart and you'll be prompted with a
number of ways to share including copy-pasting a link, email, text, etc! To view your favorite jokes, click the profile icon next to the sign-out button and
scroll down until you find the joke you're looking for! To change your username, click the settings button found on your profile and enter in your new username
and if successful, an alert will be displayed saying that your username has been changed!

## Teck Stack

LaughRX is fully built and deployed on Firebase with the frontend being built with HTML, CSS, and vanilla JavaScript. All authentication is handled via the 
Firebase Auth API. It features 2 sign-in methods (Email/Password and Google). All data is stored with FireStore and the LocalStorage browser API. Any UI animations
are built with pure CSS and LaughRX uses 2 additional API's for jokes. To get dad jokes, it uses the icanhazdadjoke API and to generate fully custom jokes on the spot,
it uses the OpenAI API calling GPT 3.5-Turbo as the LLM model. 

## Future Plans

In the future, I plan to expand LaughRX into video and audio comedy with the YouTube API and a Node.js or Python web-scraping API. Additional community features will
hopefully be added, and more ease-of-use features as well. Thanks for reading and using LaughRX!
