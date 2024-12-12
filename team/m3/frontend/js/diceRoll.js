// // Event listener for the registration form submission
// document.getElementById('register-form').addEventListener('submit', async (e) => {
//     e.preventDefault(); // Prevent the default form submission behavior


// Event listener for the dice roll
document.getElementById('diceRoller').addEventListener('click', async (e) => { //getting the dice roll through the id (via entire table?)
    e.preventDefault(); // Prevent the default form submission behavior

    // Get the values from the input fields (aka the numbers the user inserts)
    const diceCount = document.getElementById("dice-count").value
    const diceSides = document.getElementById("dice-sides").value 
    const diceMod = document.getElementById("dice-mod").value 

    try {
        // Send a POST request to the server to grab the dice rolls from the user. 
        const response = await fetch('/users/login', {
            method: 'POST',                                          //to send it/store the dice roll 
            // headers: { 'Content-Type': 'application/json' },         
            body: JSON.stringify({ diceCount, diceSides, diceMod }), // Send the dice data in the request body
        });

        // Parse the response from the server
        const data = await response.json();

        // If a dice roll is returned, store it in localStorage and display a success message
        if (data.token) {
            localStorage.setItem('diceRoll', data.token);
            document.getElementById('message').innerText = 'Dice roll save successfully';
        } else {
            // Display an error message if the dice roll save fails
            document.getElementById('message').innerText = data.message || 'Dice roll save failed';
        }
    } catch (error) {
        // Display an error message if the dice roll save fails
        document.getElementById('message').innerText = 'Dice roll save failed';
    }
});