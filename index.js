class Interpreter {
    constructor(program, output, input, table, interval) {
        this.program = program;
        this.output = output;
        this.input = input;
        this.table = table,
            this.interval = interval;
        this.programStep = 0;
        this.mem = [0];
        this.memPos = 0;
        this.tokens = ['+', '-', '>', '<', '.', ',', '[', ']'];
    }
    step() {
        if (this.programStep > this.program.length) {
            stopbs();
            return;
        }

        if (!this.tokens.includes(this.program[this.programStep])) {
            this.programStep++;
            this.step();
            return;
        }

        switch (this.program[this.programStep]) {
            case '>':
                this.memPos++;
                if (this.mem.length <= this.memPos) this.mem.push(0);
                break;
            case '<':
                this.memPos--;
                if (this.memPos < 0) {
                    // TODO: error Handling: Out of memory
                    console.log("AHHHHHHHHHHHHHHHH");
                }
                break;
            case '+':
                this.mem[this.memPos]++;
                if (this.mem[this.memPos] > 255) this.mem[this.memPos] = 0;
                break;
            case '-':
                this.mem[this.memPos]--;
                if (this.mem[this.memPos] <= -1) this.mem[this.memPos] = 255;
                break;
            case '.':
                this.output.innerHTML += String.fromCharCode(this.mem[this.memPos]);
                break;
            case ',':
                let chr = window.prompt("Only one Ascii Character", "Enter a Character");
                this.mem[this.memPos] = chr.charCodeAt(0);
                break;
            case '[':
                if (this.mem[this.memPos] == 0) {
                    let countOpened = 0;
                    this.programStep += 1;
                    while (this.programStep < this.program.length) {
                        if (this.program[this.programStep] == ']' && countOpened == 0) break;
                        else if (this.program[this.programStep] == '[') countOpened += 1;
                        else if (this.program[this.programStep] == ']') countOpened -= 1;
                        this.programStep += 1;
                    }
                }
                break;
            case ']':
                if (this.mem[this.memPos] != 0) {
                    let countOpened = 0;
                    this.programStep -= 1;
                    while (this.programStep >= 0) {
                        if (this.program[this.programStep] == '[' && countOpened == 0) break;
                        else if (this.program[this.programStep] == ']') countOpened += 1;
                        else if (this.program[this.programStep] == '[') countOpened -= 1;
                        this.programStep -= 1;
                    }
                }
                break;
        }
        this.programStep += 1;
    }
}

let stepBtn = document.getElementById('step');
let playBtn = document.getElementById('play');
let pauseBtn = document.getElementById('pause');
let stopBtn = document.getElementById('stop');
let continueBtn = document.getElementById('continue');
let executeBtn = document.getElementById('execute');

let delay = 1;
let interval;
let interpreter = new Interpreter(document.getElementById('source').value, document.getElementById('output-pre'), document.getElementById("input"), document.getElementById("ptr-table"), interval);

function play() {
    interpreter.output.innerHTML = '';
    interpreter = new Interpreter(document.getElementById('source').value, document.getElementById('output-pre'), document.getElementById("input"), document.getElementById("ptr-table"), interval);
    interval = setInterval(interpreter.step.bind(interpreter), delay);
    playBtn.setAttribute('hidden', true);
    stepBtn.setAttribute('hidden', true);
    executeBtn.setAttribute('hidden', true);
    pauseBtn.removeAttribute('hidden');
    stopBtn.removeAttribute('hidden');
}

function step() {
    clearInterval(interval);
    interpreter.step();
}

async function pause() {
    clearInterval(interval);
    pauseBtn.setAttribute('hidden', true);
    continueBtn.removeAttribute('hidden');
}

function continuef() {
    interval = setInterval(interpreter.step.bind(interpreter), delay);
    continueBtn.setAttribute('hidden', true);
    playBtn.setAttribute('hidden', true);
    stepBtn.setAttribute('hidden', true);
    executeBtn.setAttribute('hidden', true);
    pauseBtn.removeAttribute('hidden');
    stopBtn.removeAttribute('hidden');
}

function stopbs() {
    clearInterval(interval);
    stopBtn.setAttribute('hidden', true);
    pauseBtn.setAttribute('hidden', true);
    continueBtn.setAttribute('hidden', true);
    playBtn.removeAttribute('hidden');
    stepBtn.removeAttribute('hidden');
    executeBtn.removeAttribute('hidden');
}

function execute() {
    playBtn.setAttribute('hidden', true);
    stepBtn.setAttribute('hidden', true);
    executeBtn.setAttribute('hidden', true);
    pauseBtn.removeAttribute('hidden');
    stopBtn.removeAttribute('hidden');
    interpreter.output.innerHTML = '';
    interpreter = new Interpreter(document.getElementById('source').value, document.getElementById('output-pre'), document.getElementById("input"), document.getElementById("ptr-table"), interval);
    while (interpreter.programStep <= interpreter.program.length) {
        interpreter.step(interpreter);
        setTimeout(() => {}, 2);
    }
    stopbs();
}

playBtn.onclick = play;
pauseBtn.onclick = pause;
stopBtn.onclick = stopbs;
continueBtn.onclick = continuef;
stepBtn.onclick = step;
executeBtn.onclick = execute;