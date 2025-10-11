
const console = new sconsole('console-container');

console.addCommand('time', () => {
    console.appendToConsole(new Date().toLocaleString());
});

console.addCommand('hello', () => {
    console.appendToConsole('Hello from S-Console!');
});

console.addCommand('test', () => {
    console.appendToConsole('Test command executed successfully!');
});

// Handle form submission for adding new commands
const form = document.getElementById('commandForm');
form?.addEventListener('submit', (e) => {
    e.preventDefault();
    const keyInput = document.getElementById('commandKey');
    const outputInput = document.getElementById('commandOutput');
    const key = keyInput.value;
    const output = outputInput.value;

    console.addCommand(key, () => {
        console.appendToConsole(output);
    });

    alert('Command added successfully!');
    keyInput.value = '';
    outputInput.value = '';
});