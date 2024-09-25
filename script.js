// Global variables
let voices = [];

// Fetch all available voices
function loadVoices() {
    voices = window.speechSynthesis.getVoices();
    let voiceSelect = document.getElementById('voice-select');

    // Clear out previous options
    voiceSelect.innerHTML = '';

    // Add available voices to the select menu
    voices.forEach((voice, index) => {
        let option = document.createElement('option');
        option.textContent = `${voice.name} (${voice.lang})`;

        if (voice.default) {
            option.textContent += ' [Default]';
        }

        option.setAttribute('data-index', index);
        voiceSelect.appendChild(option);
    });
}

// Initialize voices when they are loaded (browser compatibility)
window.speechSynthesis.onvoiceschanged = loadVoices;

// Event listeners for updating rate and pitch values
document.getElementById('rate').addEventListener('input', function() {
    document.getElementById('rate-value').textContent = this.value;
});

document.getElementById('pitch').addEventListener('input', function() {
    document.getElementById('pitch-value').textContent = this.value;
});

// Speak function
document.getElementById('speak-btn').addEventListener('click', function() {
    let textInput = document.getElementById('text-input').value;
    let rate = document.getElementById('rate').value;
    let pitch = document.getElementById('pitch').value;
    let selectedVoiceIndex = document.getElementById('voice-select').selectedOptions[0].getAttribute('data-index');

    if (textInput.trim() !== "") {
        let speech = new SpeechSynthesisUtterance(textInput);
        
        // Set voice, rate, and pitch
        speech.voice = voices[selectedVoiceIndex];
        speech.rate = rate;
        speech.pitch = pitch;

        // Speak the text
        window.speechSynthesis.speak(speech);
    } else {
        alert("Please enter some text.");
    }
});
