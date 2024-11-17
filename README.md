# <img src="https://github.com/user-attachments/assets/3ced16b8-8f82-4efe-ac32-1b3fc0a243f8" alt="logo" width="30"> <span>J.A.R.V.I.S.JR </span>

![GitHub repo size](https://img.shields.io/github/repo-size/GodwinCameron/JARVIS-JR?color=orange)
![GitHub watchers](https://img.shields.io/github/watchers/GodwinCameron/JARVIS-JR?color=limegreen)
![GitHub language count](https://img.shields.io/github/languages/count/GodwinCameron/JARVIS-JR?color=lightblue)
![Github Language](https://img.shields.io/github/languages/top/GodwinCameron/JARVIS-JR?color=yellow)
![GitHub code size in bytes](https://img.shields.io/github/languages/code-size/GodwinCameron/JARVIS-JR?color=limegreen)
   
The personal AI assistant.
<br/>
J.A.R.V.I.S.JR is an OpenAI powered, personal AI assistant inspired by Marvel's _J.A.R.V.I.S._, Iron Man's personal AI assistant. While not as powerful as the inspiration, J.A.R.V.I.S.JR still lives up to the name! He can converse with you, he thematically responds as though he truly is _J.A.R.V.I.S_ with references to the MCU, record chats with timestamps, provide code in the form of snippets, play music through a YouTube iFrame, utilise higher ChatGPT models on request and has many hidden 'easter eggs' to discover, depending on your command / request.

# <img src="https://github.com/user-attachments/assets/ac9e71f7-d83d-4217-a4bc-b5f793849561" alt="logo-small" width="30">  Using J.A.R.V.I.S.JR

Right now &#40;Nov, 2024&#41; J.A.R.V.I.S.JR is live at: [https://jarvis-jr.vercel.app/](https://jarvis-jr.vercel.app/) for demonstration purposes and will likely be unavailable after Feb, 2025.
<br/> 
If you access J.A.R.V.I.S.JR through the link above, you will need to provide your own OpenAI developer API key with a non-zero balance in your wallet. If you were sent here by me, I'd have included my API Key somewhere in our conversation. The API Key is currently stored in your browser's local storage for the time being, either clear your local storage to change it or alternatively navigate to the documentation page and click the appropriate button to reset your API Key &#40;There is currently no other way to do this&#41;.
<br/>
<br/>
If you would like to use J.A.R.V.I.S.JR after this time, you'll need to clone this repository and launch it using the steps under the [Getting Started](#-getting-started) section.

## 🚀 Features
<p>As mentioned above, J.A.R.V.I.S.JR can:</p>
<ul>
  <li>Chat with you &#40;responds like _J.A.R.V.I.S._ really would&#41;</li>
  <li>Make refferences and comments based in the Marvel universe &#40;Try refering to yourself as another character from Marvel to test this, ie. say 'Hey Jarvis, its Bruce!'&#41;</li>
  <li>Display a live chat transcript that updates dynamically with timestamps.</li>
  <li>Saves chats / chat history &#40;limited to one chat currently - overwrites based on localstorage&#41;.</li>
  <li>Provide code snippets when asked.</li>
  <li>Plays music &$40;Limited to a few preset songs and playlists right now&$41;.</li>
  <li>Utlise higher ChatGPT models on request.</li>
  <li>Easter egg commands.</li>
</ul>

## 📸 Screenshots
<img width="406" alt="image 161" src="https://github.com/user-attachments/assets/cef9197e-a851-4824-a627-626b88826b6f">
<img width="406" alt="image 161" src="https://github.com/user-attachments/assets/b61547c9-ab42-448b-b78a-939dea30254d">
<img width="406" alt="image 161" src="https://github.com/user-attachments/assets/52b3a3f1-4d2f-486d-86ca-d8b06111a9cd">

<img width="406" alt="image 161" src="https://github.com/user-attachments/assets/797f1fdd-8fc9-4f9d-bb34-5df8ffbc277f">



<img width="406" alt="image 161" src="https://github.com/user-attachments/assets/bb4c4c4d-952d-4a9a-b016-44b31d7194aa">

<img width="406" alt="image 161" src="https://github.com/user-attachments/assets/81011e02-b647-42c5-ac13-83fbc34fffb8">



<img width="406" alt="image 161" src="https://github.com/user-attachments/assets/e0283659-696c-406b-a1a4-64a0163a07f2">




### 🗣️ Voice Commands
<p>Here are the currently coded voice commands, they will trigger some of the functionality that isn't simply 'talking with' J.A.R.V.I.S.JR:</p>
<p>p.s. The way J.A.R.V.I.S.JR works is by checking for these 'flagged' phrases before actually trying to understand what you're saying. If you notice J.A.R.V.I.S.JR keeps misinterpreting what you're saying, you may be using one of these phrases <strong>Inside your request</strong> causing it to flag before your request is interpreted. This is because the checker uses an <code>includes</code> method to test your request before ChatGPT even gets to see it to formulate J.A.R.V.I.S.JR's response.</p>
<ul>
  <li>Reset H.U.D to default</li>
  <ul>
    <li>"Reset state."</li>
    <li>"Reset your state."</li>
    <li>"Go back to default view."</li>
    <li>"Hide everything."</li>
  </ul>
  <li>Display navigation button to Docs page</li>
  <ul>
    <li>anything including the word - "documentation"</li>
  </ul>
  <li>Introduction customized for the creator of this app / repo / project &$40;me&$41;</li>
  <ul>
    <li>"Introduce yourself"</li>
  </ul>
  <li>Show chat transcription</li>
  <ul>
    <li>"Show chat."</li>
    <li>"Show live chat."</li>
    <li>"Display chat."</li>
    <li>"Display live chat."</li>
  </ul>
  <li>Toggle (either show or hide) chat</li>
  <ul>
    <li>"Toggle chat."</li>
    <li>"Toggle live chat."</li>
  </ul>
  <li>Delete / clears the live chat</li>
  <ul>
    <li>"Clear chat."</li>
    <li>"Clear session storage."</li>
    <li>"Clear our chat."</li>
    <li>"Clear live chat."</li>
  </ul>
  <li>Save chat (also clears it from session storage)</li>
  <ul>
    <li>"Save chat."</li>
    <li>"Save our chat."</li>
  </ul>
<li>Play default playlist through YouTube iFrame</li>
  <ul>
    <li>"Play some music."</li>
    <li>"Play something."</li>
    <li>"Play a song."</li>
    <li>"Play a track."</li>
    <li>Play music.</li>
    <li>"Play a tune."</li>
    <li>"Play some tunes."</li>
    <li>"Toggle music player."</li>
    <li>"Toggle music."</li>
  </ul>
  <li>Use ChatGPT 4o model for better responses.</li>
  <ul>
    <li>"Jarvis, focus up."</li>
    <li>"Time to engage Turbo mode."</li>
    <li>"Free up yourself for this next."</li>
    <li>"I need you to really focus here."</li>
  </ul>
  <li>Disable ChatGPT 4o model</li>
  <ul>
    <li>"Go back to normal."</li>
    <li>"Disable Turbo mode."</li>
    <li>"Disengage Turbo mode."</li>
  </ul>
  <li>Interupt Jarvis to make him stop speaking</li>
  <ul>
    <li>"That's all Jarvis."</li>
    <li>"Stop Talking."</li>
    <li>"Shut up."</li>
    <li>"Jarvis, be quiet."</li>
  </ul>
  <li>Get Jarvis to repeat his last response.</li>
  <ul>
    <li>"Repeat that."</li>
    <li>"Say again."</li>
  </ul>
  <li>Turn off / Stop music iFrame</li>
  <ul>
    <li>"Jarvis, mute."</li>
    <li>"Mute, Jarvis"</li>
  </ul>
  <li>Get Jarvis to say he is at your service.</li>
  <ul>
    <li>"Jarvis, are you there?"</li>
    <li>"Are you there, Jarvis?"</li>
  </ul>
</ul>

## 🥚 Hidden Easter Egg Commands

<details>
  <summary>Click to reveal spoiler voice commands</summary>
  <p>The following are the voice commands that fire Easter egg responses from J.A.R.V.I.S.JR as references to the movies. Speak these commands to jarvis to get something cool in return.</p>
  <ul>
    <li>"Jarvis, drop my needle."</li>
    <li>"Wake up, daddy's home."</li>
    <li>&#40;any reference to what you ate for breakfast&#41; / "Don't take it personal, I don't remember what I had for breakfast this morning."</li>
    <li>"Play something I'd listen to" / "Play something Tony Stark would listen to."</li>
  </ul>
  <p>Alternative "Cool Commands" for the functionality mentioned above:</p>
  <ul>
    <li>"Divert all power to neural sockets" - enables Turbo mode</li>
  </ul>
</details>

## 🔥 Getting Started
<p>To get a development build of this project up and running on your system make sure you have the following</p>

### Pre-requisites:
<ul>
<li>Node (installed on Hosting device)<span><a href="https://nodejs.org/en/download/"> Node Offical Download</a></span></li>
<li>GitHub Desktop - <a href="https://desktop.github.com/">GitHub Offical Download</a></li>
</ul>

### Cloning the repo onto your system:
<p>once you have Node and GitHub Desktop on your machine, head over to the top of this repo (the top of the page where you are reading this) and click on the green dropdown "Code" button:</p>
</br>

![code](https://github.com/GodwinCameron/CompNation/assets/71267628/6db53b1a-ac00-44c9-bcab-98655b43de9b)

<p>Then click the "Copy url to clipboard" button, or just manually select this link:</p>

<img width="406" alt="image 161" src="https://github.com/user-attachments/assets/d185281a-372e-4467-9009-a2292228c99a">

<p>After this, open up your GitHub Desktop, and select the Repository dropdown (if this is the first time you're using GitHub Desktop, the default repository should be "desktop-tutorial")</p>

![repo](https://github.com/GodwinCameron/CompNation/assets/71267628/260d94aa-a983-4487-ae91-536aa01a795d)

<p>Now select "Add" and then "Clone repository..."</p>

![add](https://github.com/GodwinCameron/CompNation/assets/71267628/e637eba0-c58c-407e-bbbf-ffe1c9aa6a34)

<p>Navigate to the URL tab and paste the link in that we copied from earlier</p>

![paste](https://github.com/GodwinCameron/CompNation/assets/71267628/5dfbf41b-6760-4a40-b5ec-aede4c915dc5)

<p>Now you can right-click on the Current repository dropdown once again and copy the repo path, this will make navigating in the command line easier.</p>

![path](https://github.com/GodwinCameron/CompNation/assets/71267628/021bd861-848b-4c07-a00d-dee1da3cd030)

<p>Great! Now the repository is on your machine and we're almost ready to run the development environment!</p>
<p>If you'd like to edit or change any of the code, you can either fork the branch or commit to your own GitHub account.</p>
</br>

### Running the Development Environment:
<p>For this section, you'll need to open up your command line, this is either Command Prompt (CMD) for Windows or Termianl for iOS.</p>
<p>Next, navigate to the repository by typing </p>

### ```cd [repo path]```

<p>and hitting enter. If you copied the path from the Cloning the repo onto your system section, then you can just it after the cd and a space. (note* if you're on Windows and the command line opens on a different drive by default, you will need to first access the drive where the repo is stalled before running the change directory command or it will not locate the path. You can do this by typing the the numeric of the drive followed by a colon, the drive numeric will also display at the start of the path if you coped from the GitHub Desktop tab. and example of that would look like this):</p>
<p>Command 1.):</p>

### ``` D: ```

<p>Command 2.):</p>

### ``` cd [repo path] ```

</br>
<p>Once you've navigated to the repository directory on your command line, type the following command:</p>

### ```npm i ```

<p>This will use Node's package manager to install all the relavent dependacies for running this development environment, and will take a couple minutes.</p>
<p>Once this command is completed, you can type the following command:</p>

### ``` npm start ```

<p>The development environment is now running on your local network!</p>
</br>


## Learn More About React

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).




