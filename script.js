// const { response } = require("express");

const url = "https://api.dictionaryapi.dev/api/v2/entries/en/";
const result = document.getElementById("result");
const sound = document.getElementById("sound");

const btn = document.getElementById("search-btn");

btn.addEventListener("click", () => {
  let inpWord = document.getElementById("inp-word").value;

  fetch(`${url}${inpWord}`)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);

      // Checking if data is received properly
      if (data && data.length > 0) {
        const meaning = data[0].meanings[0];
        const phonetic = data[0].phonetics[0]?.text || '/sample/';
        const example = meaning.definitions[0]?.example || 'No example available.';

        result.innerHTML = `
          <div class="word">
            <h4>${inpWord}</h4>
            <button onclick="playSound('${data[0].phonetics[0]?.audio || ''}')">
              <i class="fa-solid fa-volume-high"></i>
            </button>
          </div>
          <div class="details">
            <p>${meaning.partOfSpeech}</p>
            <p>${phonetic}</p>
          </div>
          <p class="word-meaning">
            ${meaning.definitions[0]?.definition || 'No definition available.'}
          </p>
          <p class="word-example">
            ${example}
          </p>
        `;
      } else {
        result.innerHTML = `<p>No results found. Please try another word.</p>`;
      }
    })
    .catch((error) => {
      console.error('Error fetching data:', error);
      result.innerHTML = `<p>There was an error fetching the data. Please try again later.</p>`;
    });
});

// Function to play sound if audio is available
function playSound(audioUrl) {
  if (audioUrl) {
    sound.src = audioUrl;
    sound.play();
  } else {
    alert('Audio not available for this word.');
  }
}
