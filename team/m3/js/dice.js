document.getElementById('roll-dice').addEventListener('click', function() {
    const sides = parseInt(document.getElementById('dice-sides').value);
    const count = parseInt(document.getElementById('dice-count').value);
    rollDice(sides, count);
});

function rollDice(sides, count) {
    // Error check, ensure you only ask for up to a d20
    if (isNaN(sides) || isNaN(count) || sides < 1 || sides > 20 || count < 1 || count > 20) {
        alert('Please enter valid numbers for sides and count (1-20).');
        return;
    }

    let total = 0;
    let results = [];

    // take a chance...roll the dice
    for (let i = 0; i < count; i++) {
        // roll will be a random number between 1 and the number of sides
        const roll = Math.floor(Math.random() * sides) + 1;
        results.push(roll);
        total += roll;
    }

    displayResults(results, total);
}
// Display the results of the dice roll
function displayResults(results, total) {
    const resultDiv = document.getElementById('dice-result');
    resultDiv.innerHTML = `Rolls: ${results.join(', ')}<br>Total: ${total}`;
}