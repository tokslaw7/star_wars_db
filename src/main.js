const dialog = document.getElementById("popup-dialog");
const characterTitle = document.getElementById("character-title");
const dialogContent = document.getElementById("dialog-content");
const closeDialogButton = document.getElementById("close-dialog");

/** Getting the search input */
const searchInput = document.getElementById("search-input");

/** Adding an event listener that listens to whenever the user types something into the search bar */
searchInput.addEventListener("input", function (e) {
  /** Get the value of the input*/ 
  const input = e.target.value;
  console.log(input);
  /** pass the input that is being typed to the search input
  searchForCharacter(input);
   */
  debouncedCharacterSearch(input);

})
/** Grabbing the data using fetch - displaying on usersView */
document.addEventListener("DOMContentLoaded", function(){
  fetch(`https://swapi.py4e.com/api/people`).then(resp => resp.json()).then(data => {
    console.log(data)
    /** mapping through the data */
    const listOfCharacterNames = data.results.map(character => {
      return `<li>${character.name}</li>`
    }).join('');
    results.innerHTML = `<ul class="characters" >${listOfCharacterNames}</ul>`;
  }).catch(e => {
    console.log(e);
    results.innerText = "The characters you seek are not here";
  })
})

/** Displaying the characters */
const results = document.getElementById("results");

function debounce(func, wait) {
  let timeout;

  return function (...args) {
    const context = this;

    clearTimeout(timeout);

    timeout = setTimeout(() => {
      func.apply(context, args);
    }, wait);
  };
}



/** Search functionality */
async function searchForCharacter(query) {
  const characterData = await fetch(`https://swapi.py4e.com/api/people?search=${query}`).then(resp => resp.json());
	console.log(characterData);
/** Showing search results */
  displayCharacters(characterData.results)
}


const debouncedCharacterSearch = debounce(searchForCharacter, 500)




function displayCharacters(characters){
  const listOfCharacterNames = characters.map(character => {
   return `<li><a data-url="${character.url}">${character.name}</a></li>`
  }).join(" ");

  results.innerHTML = `<ul class="characters">${listOfCharacterNames}</ul>`;
  /** Get all the characters in the Characters list (as created above) */
  const links = document.querySelectorAll('.characters a');
  /** For each link, lets add an event listener that listens for the click event.*/
    links.forEach(link => {
      link.addEventListener('click', () => {
        const characterUrl = link.getAttribute('data-url');
        console.log(characterUrl);
      });
    });
}

document.addEventListener("DOMContentLoaded", function () {
  fetch(`https://swapi.py4e.com/api/people`).then(resp => resp.json()).then(data => {
    console.log(data)
    displayCharacters(data.results);
  }).catch(e => {
    console.log(e);
    results.innerText = "The characters you seek are not here";
  })
})




