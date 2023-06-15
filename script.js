const playerContainer = document.getElementById('all-players-container');
const newPlayerFormContainer = document.getElementById('new-player-form');

// Add your cohort name to the cohortName variable below, replacing the 'COHORT-NAME' placeholder
const cohortName = 'YOUR COHORT NAME HERE';
// Use the APIURL variable for fetch requests
const APIURL = `https://fsa-puppy-bowl.herokuapp.com/api/${cohortName}/`;

/**
 * It fetches all players from the API and returns them
 * @returns An array of objects.
 */
const fetchAllPlayers = async () => {
    try {

    } catch (err) {
        console.error('Uh oh, trouble fetching players!', err);
    }
};

const fetchSinglePlayer = async (playerId) => {
    try {

    } catch (err) {
        console.error(`Oh no, trouble fetching player #${playerId}!`, err);
    }
};

const addNewPlayer = async (playerObj) => {
    try {
        await fetch(APIURL, {
            method: "POST",
            body: JSON.stringify(playerObj),
            headers: { "Content-Type": "application/json", },
        });

    } catch (err) {
        console.error('Oops, something went wrong with adding that player!', err);
    }
};

const removePlayer = async (playerId) => {
    try {
        const response = await fetch(`${APIURL}/${playerId}`, {
            method: "DELETE",
          });
      
          const data = await response.json();
          console.log(data);
          // Process the response or handle success/error cases here
        } catch (error) {
          console.log("An error occurred:", error);
          // Handle the error or show an error message
        }
      }
      
      // Call the function with the desired player ID
      deletePlayer(6203);


/**
 * It takes an array of player objects, loops through them, and creates a string of HTML for each
 * player, then adds that string to a larger string of HTML that represents all the players. 
 * 
 * Then it takes that larger string of HTML and adds it to the DOM. 
 * 
 * It also adds event listeners to the buttons in each player card. 
 * 
 * The event listeners are for the "See details" and "Remove from roster" buttons. 
 * 
 * The "See details" button calls the `fetchSinglePlayer` function, which makes a fetch request to the
 * API to get the details for a single player. 
 * 
 * The "Remove from roster" button calls the `removePlayer` function, which makes a fetch request to
 * the API to remove a player from the roster. 
 * 
 * The `fetchSinglePlayer` and `removePlayer` functions are defined in the
 * @param playerList - an array of player objects
 * @returns the playerContainerHTML variable.
 */
const renderAllPlayers = (playerList) => {
    try {

        playerContainer.innerHTML = "";
        playerList.data.players.forEach(player => {
            const singlePlayerContainer = document.createElement("div");
            singlePlayerContainer.classList.add("player");
            singlePlayerContainer.innerHTML = `
                <div class="card-header">
                <div class="player-name">${player.name.toUpperCase()}</div>
                <div class="player-id">#${player.id}</div>
                </div>
                <img class="player-img" src="${player.imageUrl}" alt="Puppy Image">
                <div class="button-footer">
                <button class="details-button" type="button" data-id="player.id">See Details</button>
                <button class="remove-button" type="button" data-id="player.id">Remove</button>
                </div>
               
            `;
            playerContainer.appendChild(singlePlayerContainer);

            const removeButton = singlePlayerContainer.querySelector(`.remove-button`);
            removeButton.addEventListener(`click`, () => {
                removePlayer(player.id);
                location.reload();
            });

            const detailsButton = singlePlayerContainer.querySelector(`.details-button`);
            detailsButton.addEventListener(`click`, () => {
                renderSinglePlayer(player.id);

            });

        });

    } catch (err) {
        console.error('Uh oh, trouble rendering players!', err);
    }
};


/* 
Use a try/catch block
This function should only render an object of player based on an ID
Function takes a param "playerId" and it uses "fetchSinglePlayer" function to render the info.
This function should have a back button which takes the user back to render all players
*/
const renderSinglePlayer = async (playerId) => {
    try {
        const response = await fetchSinglePlayer(playerId);
        const player = response.data.player;
        playerContainer.innerHTML = "";
        const singlePlayerContainer = document.createElement("div");
        singlePlayerContainer.classList.add("player");
        singlePlayerContainer.innerHTML = `
                <img class="player-img" src="${player.imageUrl}" alt="Puppy Image">
                <div class="button-footer">
                <button class="back-button" type="button" data-id="player.id">Back</button>
                <button class="remove-button" type="button" data-id="player.id">Remove</button>
                </div>

                <div class="details">
                <div>
                <p>ID: ${player.id}</p>
                <p>Name: ${player.name.toUpperCase()}</p>
                <p>Breed: ${player.breed}</p>
                <p>Status: ${player.status}</p>
                <p>Cohort ID: ${player.cohortId}</p>
                <p>Team ID: ${player.teamId}</p>
                </div>
                </div>
               
            `;
        playerContainer.appendChild(singlePlayerContainer);
        const backButton = singlePlayerContainer.querySelector(`.back-button`);
        backButton.addEventListener(`click`, () => {
            window.location.reload();
        });

    } catch (error) {

    }
};


/**
 * It renders a form to the DOM, and when the form is submitted, it adds a new player to the database,
 * fetches all players from the database, and renders them to the DOM.
 */
const renderNewPlayerForm = () => {
    try {

    } catch (err) {
        console.error('Uh oh, trouble rendering the new player form!', err);
    }
};

const init = async () => {
    const players = await fetchAllPlayers();
    renderAllPlayers(players);

    renderNewPlayerForm();
};

init();
