//UI variables

// input field for search
const filterInput = document.querySelector("#pokemon-lookup");
ulPokemonName = document.querySelector("#name");
ulPokemonType = document.querySelector("#type");
ulPokemonSpecies = document.querySelector("#species");
ulPokemonHp = document.querySelector("#hp");
ulPokemonNumber = document.querySelector("#pokeNum");
ulPokemonList = document.getElementsByClassName("pokemon-list");
ulPokemonPicture = document.querySelector(".pokemon-img");

// Event listeners
filterInput.addEventListener("keyup", filterPokemon);

// Function to load pokemon from json file
window.onload = function getJson() {
  fetch("pokemon.json")
    .then(res => res.json())
    .then(pokemon => {
      pokemon.forEach(function(poke) {
        const pokemonName = document.createElement("li");
        pokemonName.innerHTML = poke.name;
        pokemonName.id = "pokemon";
        document.querySelector(".pokemon-list").appendChild(pokemonName);
      });
      choosePokemon();
    })
    .catch(err => console.log(err));
  setTime();
};

// Displayed the pokemon and its statistics when clicked

function choosePokemon() {
  pickedPokemon = document.querySelectorAll("#pokemon");
  pickedPokemon.forEach(function(pokemon) {
    pokemon.addEventListener("click", function(e) {
      const pokemonTargetName = e.target.innerHTML;
      fetch("pokemon.json")
        .then(res => res.json())
        .then(chosenPokemon => {
          for (let i = 0; i < chosenPokemon.length; i++) {
            const displayedPokemon = chosenPokemon[i];

            if (displayedPokemon.name === pokemonTargetName) {
              ulPokemonName.innerHTML = `NAME:${displayedPokemon.name}`;
              ulPokemonType.innerHTML = `TYPE:${displayedPokemon.type}`;
              ulPokemonSpecies.innerHTML = `SPECIES:${displayedPokemon.species}`;
              ulPokemonHp.innerHTML = `HITPOINTS:${displayedPokemon.hp}`;
              ulPokemonNumber.innerHTML = displayedPokemon.number;
              ulPokemonPicture.setAttribute(
                "src",
                `images/${pokemonTargetName}.png`
              );
            }
          }
        })
        .catch(err => console.log(err));
    });
  });
}

// // sets time clock
// function setTime() {
//   const timeDiv = document.querySelector(".time");
//   let currentTime = new Date();
//   let hour = currentTime.getHours();
//   let min = currentTime.getMinutes();
//   let amPm;

//   // am/pm for us weird americans
//   if (hour == 12) {
//     amPm = "pm";
//   } else if (hour > 12) {
//     hour -= 12;
//     amPm = "pm";
//   } else {
//     amPm = "am";
//   }
//   //adds 0 if minutes is less then 10
//   if (min < 10) {
//     min = "0" + min;
//   }
//   // adds 12 for 12am
//   if (hour == 0) {
//     hour = 12;
//   }
//   // adds 1 for 1am
//   if (hour == 0) {
//     hour = 1;
//   }

//   timeDiv.innerHTML = `${hour}:${min}${amPm}`;
//   let t = setTimeout(setTime, 1000);
// }
// filter pokemon function

function filterPokemon(e) {
  const pokemonName = e.target.value.toLowerCase();
  document.querySelectorAll(".pokemon-list li").forEach(function(name) {
    const pokemonList = name.firstChild.textContent;

    if (pokemonList.toLowerCase().indexOf(pokemonName) == 0) {
      name.style.display = "block";
    } else {
      name.style.display = "none";
    }
  });
}