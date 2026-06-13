let word;
let wordDefination = "";
let example;
let fullScreen = false;
const giveMeInformation = (word) => {
  fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
    .then(response => response.json())
    .then(data => {
      try {
        data.forEach(element => {
          element.meanings.forEach(element1 => {
            wordDefination += `<i>${element1.partOfSpeech}</i>
          <br>
          <ol class="px-4">`;
            element1.definitions.forEach(element2 => {
              example = element2.example;
              wordDefination += `<li>${element2.definition}`;
              if (example !== undefined) {
                wordDefination += `<br><p>"${example}"</p>`;
              }
              wordDefination += `</li>`;
            })
            wordDefination += `</ol>`;
          })
        });
        information.innerHTML = wordDefination;
      } catch {
        information.innerHTML = "Word Not Found";
        document.querySelector("#readMoreArea").style.display = "none";
      }
    })
  document.getElementsByClassName("word")[0].innerText = word.charAt(0).toUpperCase() + word.slice(1);
}
document.querySelector(".search-button").addEventListener('click', () => {
  document.querySelector("#readMoreArea").style.display = "flex";
  wordDefination = "";
  word = document.querySelector(".form-control").value;
  giveMeInformation(word);
  fullScreen = true;
  displayFullScreen();
})

document.querySelector("body").addEventListener("load", giveMeInformation("hello"));

let displayFullScreen = () => {
  if (fullScreen == true) {
    let informationContainer = document.getElementsByClassName("wordInformation")[0];
    informationContainer.style.height = "400px";
    informationContainer.style.overflow = "hidden";
    fullScreen = false;
    readMore.innerText = "Read More"
  } else {
    let informationContainer = document.getElementsByClassName("wordInformation")[0];
    informationContainer.style.height = "100%";
    informationContainer.style.overflow = "visible";
    fullScreen = true;
    readMore.innerText = "Read Less"
  }
}
readMore.addEventListener('click', () => {
  displayFullScreen();
})