const { on } = require('events');
const { DEBUG, log, getRaw, toTrimmedLines } = require('../util');

let raw = getRaw();
if (DEBUG) {
    raw = `L68
L30
R48
L5
R60
L55
L1
L99
R14
L82`;
}

function part1(lines) {
    let count = 0;
    let pos = 50;

    for(let i=0; i<lines.length; i++) {
        const line = lines[i];
        const dir = line[0];
        const dist = parseInt(line.slice(1), 10);

        if (dir === 'L') {
            pos -= dist;
            if (pos < 0) {
                pos += 100;
            }
        } else {
            pos += dist;
        }

        pos = pos % 100;

        if (pos === 0) count++;
    }

    return count;
}

function part2(lines) {
    let count = 0;
    let pos = 50;

    for(let i=0; i<lines.length; i++) {
        const line = lines[i];
        const dir = line[0];
        let dist = parseInt(line.slice(1), 10);
        const onZero = (pos === 0);

        if (dist >= 100) {
            count += Math.floor(dist / 100);
            dist %= 100;
        }

        if (dir === 'L') {
            pos -= dist;
        } else {
            pos += dist;
        }

        if (pos === 0) {
            log('Landed on 0!');
            count++;
        } else if (pos < 0) {
            log(`Went below 0 from ${pos + dist} by ${-dist}`);
            pos += 100;
            if (!onZero) count++;
        } else if (pos >= 100) {
            log(`Went above 99 from ${pos - dist} by ${dist}`);
            pos -= 100;
            count++;
        }
    }

    return count;
}

const lines = toTrimmedLines(raw);

console.log(part1(lines));
console.log(part2(lines));