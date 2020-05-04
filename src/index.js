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
        _this = this;
        if (_this.programStep > _this.program.length) {
            stopbs();
            return;
        }

        if (!_this.tokens.includes(_this.program[_this.programStep])) {
            _this.programStep++;
            _this.step();
            return;
        }

        switch (_this.program[_this.programStep]) {
            case '>':
                _this.memPos++;
                if (_this.mem.length <= _this.memPos) _this.mem.push(0);
                break;
            case '<':
                _this.memPos--;
                if (_this.memPos < 0) {
                    // TODO: error Handling: Out of memory
                    console.log("AHHHHHHHHHHHHHHHH");
                }
                break;
            case '+':
                _this.mem[_this.memPos]++;
                if (_this.mem[_this.memPos] > 255) _this.mem[_this.memPos] = 0;
                break;
            case '-':
                _this.mem[_this.memPos]--;
                if (_this.mem[_this.memPos] <= -1) _this.mem[_this.memPos] = 255;
                break;
            case '.':
                _this.output.innerHTML += String.fromCharCode(_this.mem[_this.memPos]);
                break;
            case ',':
                let chr = window.prompt("Only one Ascii Character", "Enter a Character");
                _this.mem[_this.memPos] = chr.charCodeAt(0);
                break;
            case '[':
                if (_this.mem[_this.memPos] == 0) {
                    countOpened = 0;
                    _this.programStep += 1;
                    while (_this.programStep < _this.program.length) {
                        if (_this.program[_this.programStep] == ']' && countOpened == 0) break;
                        else if (_this.program[_this.programStep] == '[') countOpened += 1;
                        else if (_this.program[_this.programStep] == ']') countOpened -= 1;
                        _this.programStep += 1;
                    }
                }
                break;
            case ']':
                if (_this.mem[_this.memPos] != 0) {
                    countOpened = 0;
                    _this.programStep -= 1;
                    while (_this.programStep >= 0) {
                        if (_this.program[_this.programStep] == '[' && countOpened == 0) break;
                        else if (_this.program[_this.programStep] == ']') countOpened += 1;
                        else if (_this.program[_this.programStep] == '[') countOpened -= 1;
                        _this.programStep -= 1;
                    }
                }
                break;
        }
        _this.programStep += 1;
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
    setTimeout(() => {}, 10);
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