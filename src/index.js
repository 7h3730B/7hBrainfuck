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
                console.log(String.fromCharCode(_this.mem[_this.memPos]));
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

let interval;
let interpreter = new Interpreter(document.getElementById('source').value, document.getElementById('output-pre'), document.getElementById("input"), interval);

function play() {
    interval = setInterval(interpreter.step.bind(interpreter), 300);
}

function step() {
    clearInterval(interval);
    interpreter.step();
}

let playBtn = document.getElementById('play');
playBtn.onclick = play;

let stepBtn = document.getElementById('step');
stepBtn.onclick = step;