const startButton = document.getElementById('startButton');
const output = document.getElementById('output');
const copyButton = document.getElementById('copyButton');
const clearButton = document.getElementById('clearButton');

copyButton.onclick = function() {
    const textToCopy = output.innerText;
    navigator.clipboard.writeText(textToCopy).then(() => {
        alert('Text copied to clipboard!');
    }).catch(err => {
        console.error('Failed to copy: ', err);
    });
};

clearButton.onclick = function() {
    output.innerText = '';
};

startButton.addEventListener('click', function() {
    var speech = true;
    window.SpeechRecognition = window.webkitSpeechRecognition;

    const recognition = new SpeechRecognition();
    recognition.interimResults = true;

    recognition.addEventListener('result', e => {
        const transcript = Array.from(e.results)
            .map(result => result[0])
            .map(result => result.transcript)
            .join('')

            output.innerHTML = transcript;

        console.log(transcript);
    });

    if (speech == true) {
        recognition.start();
    }
});

// Text to Speech Converter


const text = document.getElementById("textToConvert");
const convertBtn = document.getElementById("convertBtn");

convertBtn.addEventListener('click', function () {
    const speechSynth = window.speechSynthesis;
    const enteredText = text.value;
    const error = document.querySelector('.error-para');

    if (!speechSynth.speaking &&
        !enteredText.trim().length) {
        error.textContent = `Nothing to Convert! 
        Enter text in the text area.`
    }
    
    if (!speechSynth.speaking && enteredText.trim().length) {
        error.textContent = "";
        const newUtter =
            new SpeechSynthesisUtterance(enteredText);
        speechSynth.speak(newUtter);
        convertBtn.textContent = "Sound is Paying..."
    }
    
    setTimeout(() => {
        convertBtn.textContent = "Play Converted Sound"
    }, 5000);
});
