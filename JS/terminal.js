let userInput, terminalOutput;
let lastCommands = [];



const COMMANDS = {
  about:
    "This is my choose your own adventure game that I made to learn coding. It's very spooky so........ watch out!!!!",
  
  help:
    'Supported commands: <span class="code">about</span>, <span class="code">clear</span>, <span class="code">start</span>',


};

// anon function, 
const app = () => {
  userInput = document.getElementById("userInput");
  terminalOutput = document.getElementById("terminalOutput");
  document.getElementById("dummyKeyboard").focus();

};

// function
const execute = function executeCommand(input) {
  input = input.toLowerCase();
  lastCommands.push(input);
  let output;
  if (input.length === 0) {
    return;
  }

  if (input === "clear" || input === "cls") {
    clearScreen();
  } else if (input === "start"){
    startGame();
  } else {
    output = `<div class="terminal-line"><span class="success">➜</span> <span class="directory">~</span> ${input}</div>`;
    if (!COMMANDS.hasOwnProperty(input)) {
      output += `<div class="terminal-line">command not found: ${input}</div>`;
    } else {
      output += COMMANDS[input];
    }

    terminalOutput.innerHTML = `${terminalOutput.innerHTML}<br><div class="terminal-line">${output}<br></div>`;
    terminalOutput.scrollTop = terminalOutput.scrollHeight;
  }
};

//  checks what key you're pressing
const key = (e) => {
  const input = userInput.innerHTML;

  //if you press the enter key it will run the command
  if (e.key === "Enter") {
    execute(input);
    userInput.innerHTML = "";
    return;
  }

  userInput.innerHTML = input + e.key;
};

const backspace = (e) => {
  if (e.keyCode !== 8 && e.keyCode !== 46) {
    return;
  }
  userInput.innerHTML = userInput.innerHTML.slice(
    0,
    userInput.innerHTML.length - 1
  );
};

// will print out all things in your last comands array 
function showHist() {
  terminalOutput.innerHTML = `${
    terminalOutput.innerHTML
  }<div class="terminal-line">${lastCommands.join(", ")}</div>`;
}

function clearScreen() {
  location.reload();
}

function startGame(){
  console.log("startGameWorks!");


}

// looking for specifc events, in this case specific keyboard inputs
document.addEventListener("keydown", backspace);
document.addEventListener("keypress", key);
document.addEventListener("DOMContentLoaded", app);
