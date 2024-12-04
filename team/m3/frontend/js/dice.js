document.getElementById('roll-dice').addEventListener('click', function() {
    const sides = parseInt(document.getElementById('dice-sides').value);
    const count = parseInt(document.getElementById('dice-count').value);
    const mod = parseInt(document.getElementById('dice-mod').value);
    rollDice(sides, count, mod);
});

function rollDice(sides, count, mod) {
    // Error check, ensure you only ask for up to a d20
    if (isNaN(sides) || isNaN(count) || sides < 1 || sides > 20 || count < 1 || count > 20) {
        alert('Please enter valid numbers for sides and count (1-20).');
        return;
    }

    let total = 0;
    let results = [];
    let totalModified = 0;
    let resultsModified = [];

    // take a chance...roll the dice
    for (let i = 0; i < count; i++) {
        // roll will be a random number between 1 and the number of sides
        // +mod to add any modifiers
        const roll = Math.floor(Math.random() * sides) + 1;
        results.push(roll);
        total += roll;

        const modifiedRoll = roll+mod;
        resultsModified.push(modifiedRoll);
        totalModified += modifiedRoll;
    }
    displayResults(results, total, resultsModified, totalModified);

    
}
// Display the results of the dice roll
function displayResults(results, total, resultsModified, totalModified) {
    const resultDiv = document.getElementById('dice-result');
    resultDiv.innerHTML = `Rolls: ${results.join(', ')}<br>
    Rolls (with mods): ${resultsModified.join(', ')}<br>Total: ${total}<br>Total (with mods): ${totalModified}`;
}