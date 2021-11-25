let userInput, terminalOutput;
let lastCommands = [];



const COMMANDS = {
  rd: "Whoa!!! You found the secret command!!! To get access to the beta for my apps, go <a href = 'https://blackholegames.gq/beta' target = '_blank' style = 'color:#000;'> here </a> <br>The beta code is A3T4M",
  n: "OK",
  no: "OK",
  about:
    "This is my choose your own adventure game that I made to learn coding. It's very spooky so........ watch out!!!!",
  ls:
    "usr&nbsp;&nbsp;&nbsp;&nbsp;home&nbsp;&nbsp;&nbsp;&nbsp;var&nbsp;&nbsp;&nbsp;&nbsp;root",
  cd: "changed directory to root..",
  "cd ..": "cd: no such file or directory",
  "cd var": "var aliased to ../",
  "cd root": "access denied",
  "cd usr": "no users found",

  "cd home": "home was aliased to .",
  sudo: "user not in the sudoers file.  This incident will be reported.",
  help:
    'Supported commands: <span class="code">about</span>, <span class="code">contact</span>, <span class="code">projects</span>, <span class="code">github</span><br>System commands: <span class="code">clear</span>, <span class="code">history</span>, <span class="code">cd</span>, <span class="code">ls</span><br>Tip: Use Up / Down arrow to go through recent commands',
  info:
    "<span class='aboutHead'>Name:</span> Aayush<br><span class='aboutHead'>Location:</span> Canada<br><span class='aboutHead'>Favourites:</span><br>&nbsp;&nbsp;&nbsp;&nbsp;<span class='aboutTail'>Os</span>: Arch, MacOs&nbsp;&nbsp;&nbsp;&nbsp;<br>&nbsp;&nbsp;&nbsp;&nbsp;<span class='aboutTail'>Editor</span>: Vim, Nova<br/>&nbsp;&nbsp;&nbsp;&nbsp;<span class='aboutTail'>Version Control</span>: Git<br>&nbsp;&nbsp;&nbsp;&nbsp;<span class='aboutTail'>Tabs or Spaces</span>: Depends usually <i>Tabs</i><br>&nbsp;&nbsp;&nbsp;&nbsp;",
  contact:
    "Email (coming soon): <a class='link' href=''>Gmail</a><br>Form: <a href='/contact' class='link'> Anon Message</a><br>",
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

//TODO: remove this
let iter = 0;
const up = (e) => {
  if (e.key === "ArrowUp") {
    if (lastCommands.length > 0 && iter < lastCommands.length) {
      iter += 1;
      userInput.innerHTML = lastCommands[lastCommands.length - iter];
    }
  }

  if (e.key === "ArrowDown") {
    if (lastCommands.length > 0 && iter > 1) {
      iter -= 1;
      userInput.innerHTML = lastCommands[lastCommands.length - iter];
    }
  }
};

function clearScreen() {
  location.reload();
}
// looking for specifc events, in this case specific keyboard inputs
document.addEventListener("keydown", up);

document.addEventListener("keydown", backspace);
document.addEventListener("keypress", key);
document.addEventListener("DOMContentLoaded", app);
