class Interpreter {
    constructor(program, output) {
        this.program = program;
        this.programStep = 0;
        this.mem = [0];
        this.memPos = 0;
        this.tokens = ['+', '-', '>', '<'];
        this.interval = setInterval(this.step.bind(this), 300);
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
                if (_this.mem[_this.memPos] >= 255) {
                    _this.mem[_this.memPos] = 0;
                }
                break;
            case '-':
                _this.mem[_this.memPos] -= 1;
                if (_this.mem[_this.memPos] <= -1) {
                    _this.mem[_this.memPos] = 255;
                }
                break;
        }
        _this.programStep += 1;
    }
}

function play() {
    let interpreter = new Interpreter(document.getElementById('source').value, document.getElementById('output-pre'));
}

let playBtn = document.getElementById('play');
playBtn.onclick = play();