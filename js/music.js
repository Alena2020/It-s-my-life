"use strict";

const audioSources = ["Music/DelaceyDreamItPossible.mp3", "Music/TrentemollerMissYou.mp3", "Music/AngelsOfVeniceCarolOfTheBells.mp3", "KrypteriaCarolOfTheBells","Music/music1.mp3", "Music/music2.mp3", "Music/music3.mp3", "Music/music4.mp3", "Music/music5.mp3", "Music/music6.mp3"];
const player = document.getElementById('player');
const nextButton = document.getElementById('nextButton');

function playAudio() {
    let audioSource = audioSources[Math.floor(Math.random() * audioSources.length)];
    player.src = audioSource;
    player.play();
};

playAudio();

nextButton.addEventListener('click', () => {
    playAudio();
});