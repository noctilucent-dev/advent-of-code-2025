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
    return lines
        .map(l => [l[0], Number(l.slice(1))])
        .reduce(([pos, count], [dir, dist]) => {
            if (dist >= 100) {
                count += Math.floor(dist / 100);
                dist %= 100;
            }

            if (dir === 'L' && pos > 0 && pos - dist <= 0) count++;
            else if (dir === 'R' && pos + dist >= 100) count++;

            pos += 100 + (dir === 'L' ? -dist : dist);
            pos %= 100;
            
            return [pos, count];
        }, [50, 0])[1];
}

const lines = toTrimmedLines(raw);

console.log(part1(lines));
console.log(part2(lines));