const { DEBUG, log, getRaw, toTrimmedLines } = require('../util');

let raw = getRaw();
if (DEBUG) {
    raw = `..@@.@@@@.
@@@.@.@.@@
@@@@@.@.@@
@.@@@@..@.
@@.@@@@.@@
.@@@@@@@.@
.@.@.@.@@@
@.@@@.@@@@
.@@@@@@@@.
@.@.@@@.@.`;
}

function part1(lines) {
    const m = lines.map(l => l.split(''));
    let total = 0;
    for(let y=0; y<m.length; y++) {
        for(let x=0; x<m[y].length; x++) {
            if (m[y][x] === '@') {
                let count = 0;
                for(let dy=-1; dy<=1; dy++) {
                    for(let dx=-1; dx<=1; dx++) {
                        if (dy === 0 && dx === 0) continue;
                        const ny = y + dy;
                        const nx = x + dx;
                        if (ny >= 0 && ny < m.length && nx >= 0 && nx < m[y].length) {
                            if (m[ny][nx] === '@') {
                                count++;
                            }
                        }
                    }
                }
                if (count < 4) total++;
            }
        }
    }
    return total;
}



function part2(lines) {
    const m = lines.map(l => l.split(''));
    const toRemove = new Set();

    // Replace all rolls with counts of adjacent rolls
    // and add to removal set if count < 4
    for(let y=0; y<m.length; y++) {
        for(let x=0; x<m[y].length; x++) {
            if (m[y][x] === '@') {
                let count = 0;
                for(let dy=-1; dy<=1; dy++) {
                    for(let dx=-1; dx<=1; dx++) {
                        if (dy === 0 && dx === 0) continue;
                        const ny = y + dy;
                        const nx = x + dx;
                        if (ny >= 0 && ny < m.length && nx >= 0 && nx < m[y].length) {
                            if (m[ny][nx] !== '.') {
                                count++;
                            }
                        }
                    }
                }
                m[y][x] = count;
                if (count < 4) {
                    toRemove.add(`${x},${y}`);
                }
            }
        }
    }

    let total = 0;

    // Remove rolls iteratively
    // updating adjacent counts and adding to removal set as needed
    while(toRemove.size > 0) {
        for(const coord of toRemove) {
            const [x, y] = coord.split(',').map(Number);
            m[y][x] = '.';
            for(let dy=-1; dy<=1; dy++) {
                for(let dx=-1; dx<=1; dx++) {
                    if (dy === 0 && dx === 0) continue;
                    const ny = y + dy;
                    const nx = x + dx;
                    if (ny >= 0 && ny < m.length && nx >= 0 && nx < m[y].length) {
                        if (typeof m[ny][nx] === 'number') {
                            m[ny][nx]--;
                            if (m[ny][nx] < 4) {
                                toRemove.add(`${nx},${ny}`);
                            }
                        }
                    }
                }
            }
            total++;
            toRemove.delete(coord);
        }
    }

    return total;
}


const lines = toTrimmedLines(raw);

console.log(part1(lines));
console.log(part2(lines));