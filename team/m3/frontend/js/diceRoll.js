// // Event listener for the registration form submission
// document.getElementById('register-form').addEventListener('submit', async (e) => {
//     e.preventDefault(); // Prevent the default form submission behavior


// Event listener for the dice roll, that saves the dice roll
document.getElementById('roll-dice').addEventListener('click', async (e) => { //getting the dice roll through the id (via entire table?)
    e.preventDefault(); // Prevent the default form submission behavior

    // Get the values from the input fields (aka the numbers the user inserts)
    const numberOfDice = parseInt(document.getElementById("dice-count").value);
    const numberOfSides = parseInt(document.getElementById("dice-sides").value);
    const modAddedToDice = parseInt(document.getElementById("dice-mod").value);

    console.log("sending to dice server:", numberOfDice, numberOfSides, modAddedToDice);

    try {
        // Send a POST request to the server to grab the dice rolls from the user. 
        const response = await fetch('/diceRoll/post', { //fixed api call
            method: 'POST',                                          //to send it/store the dice roll 
            headers: { 'Content-Type': 'application/json' },         
            body: JSON.stringify({numberOfDice, numberOfSides, modAddedToDice }), // Send the dice data in the request body
        });

        // Parse the response from the server
        const data = await response.json();

        // If a dice roll is returned, store it in localStorage and display a success message
        if (data) {
            localStorage.setItem('diceRoll', data.token);
            console.log("dice roll saved");
            //document.getElementById('message').innerText = 'Dice roll save successfully'; commented out, unnecessary
        } else {
            // Display an error message if the dice roll save fails
            //document.getElementById('message').innerText = data.message || 'Dice roll save failed'; commented out, unnecessary
            console.log("Dice roll not saved");
        }
    } catch (error) {
        // Display an error message if the dice roll save fails
        console.log("Dice roll not saved, because:", error);
        // document.getElementById('message').innerText = 'Dice roll save failed';
    }
});

//updates the dice roll parameters based on server data
async function updateDiceRollOnLoad(){
    const numberOfDice = document.getElementById("dice-count");
    const numberOfSides = document.getElementById("dice-sides");
    const modAddedToDice = document.getElementById("dice-mod");

    try {
        // Send a GET request to the server to grab the dice rolls from the user. 
        const response = await fetch('/diceRoll/get', { //fixed api call
            method: 'GET',                                          //to send it/store the dice roll 
            headers: { 'Content-Type': 'application/json' },         
        });

        // Parse the response from the server, should return array of dice rolls
        const data = await response.json();
        console.log("dice roll: ", data);

        // If a dice roll is returned, store it in localStorage and display a success message
        if (data && data.length > 0) {
            numberOfDice.value = data[0].numberOfDice;
            numberOfSides.value = data[0].numberOfSides;
            modAddedToDice.value = data[0].modAddedToDice;
            //document.getElementById('message').innerText = 'Dice roll save successfully'; GERI: commented out, unnecessary
        } else {
            // Display an error message if the dice roll save fails
            //document.getElementById('message').innerText = data.message || 'Dice roll save failed'; GERI: commented out, unnecessary
            console.log("Dice roll not updated, empty");
        }
    } catch (error) {
        // Display an error message if the dice roll save fails
        console.log("Dice roll not updated, because:", error);
        // document.getElementById('message').innerText = 'Dice roll save failed';
    }

}

updateDiceRollOnLoad();