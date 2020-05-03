class Interpreter {
    constructor(program, output, input, interval) {
        this.program = program;
        this.output = output;
        this.input = input;
        this.interval = interval;
        this.programStep = 0;
        this.mem = [0];
        this.memPos = 0;
        this.tokens = ['+', '-', '>', '<', '.', ','];
    }
    step() {
        _this = this;
        if (_this.programStep > _this.program.length) {
            clearInterval(_this.interval);
            return;
        }

        if (!_this.tokens.includes(_this.program[_this.programStep])) {
            _this.programStep += 1;
            _this.step();
            return;
        }

        switch (_this.program[_this.programStep]) {
            case '>':
                _this.memPos += 1;
                if (_this.mem.length < _this.memPos);
                _this.mem.push(0);
                break;
            case '<':
                _this.memPos -= 1;
                if (_this.memPos < 0) {
                    // TODO: error Handling: Out of memory
                }
                break;
            case '+':
                _this.mem[_this.memPos] += 1;
                if (_this.mem[_this.memPos] > 255) {
                    _this.mem[_this.memPos] = 0;
                }
                break;
            case '-':
                _this.mem[_this.memPos] -= 1;
                if (_this.mem[_this.memPos] <= -1) {
                    _this.mem[_this.memPos] = 255;
                }
                break;
            case '.':
                _this.output.innerHTML += String.fromCharCode(_this.mem[_this.memPos]);
                break;
            case ',':
                let chr = window.prompt("Only one Ascii Character", "Enter a Character");
                _this.mem[_this.memPos] = chr.charCodeAt(0);
                break;
        }
        console.log(_this.mem);
        _this.programStep += 1;
    }
}

let stepBtn = document.getElementById('step');
let playBtn = document.getElementById('play');
let pauseBtn = document.getElementById('pause');
let stopBtn = document.getElementById('stop');
let continueBtn = document.getElementById('continue');

let interval;
let interpreter = new Interpreter(document.getElementById('source').value, document.getElementById('output-pre'), document.getElementById("input"), interval);

function play() {
    interval = setInterval(interpreter.step.bind(interpreter), 300);
    playBtn.setAttribute('hidden', true);
    stepBtn.setAttribute('hidden', true);
    pauseBtn.removeAttribute('hidden');
    stopBtn.removeAttribute('hidden');
}

function step() {
    clearInterval(interval);
    interpreter.step();
}

function pause() {
    clearInterval(interval);
    pauseBtn.setAttribute('hidden', true);
    continueBtn.removeAttribute('hidden');
}

function continuef() {
    interval = setInterval(interpreter.step.bind(interpreter), 300);
    continueBtn.setAttribute('hidden', true);
    playBtn.setAttribute('hidden', true);
    stepBtn.setAttribute('hidden', true);
    pauseBtn.removeAttribute('hidden');
    stopBtn.removeAttribute('hidden');
}

function stopbs() {
    clearInterval(interval);
    interpreter.memPos = 0;
    interpreter.mem = [0];
    interpreter.programStep = 0;
    stopBtn.setAttribute('hidden', true);
    pauseBtn.setAttribute('hidden', true);
    continueBtn.setAttribute('hidden', true);
    playBtn.removeAttribute('hidden');
    stepBtn.removeAttribute('hidden');
}

playBtn.onclick = play;
pauseBtn.onclick = pause;
stopBtn.onclick = stopbs;
continueBtn.onclick = continuef;
stepBtn.onclick = step;