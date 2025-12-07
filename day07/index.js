const { DEBUG, log, getRaw, toTrimmedLines } = require('../util');

let raw = getRaw();
if (DEBUG) {
    raw = `.......S.......
...............
.......^.......
...............
......^.^......
...............
.....^.^.^.....
...............
....^.^...^....
...............
...^.^...^.^...
...............
..^...^.....^..
...............
.^.^.^.^.^...^.
...............`;
}

function print(grid, trace) {
    if (!DEBUG) return;
    const gridCopy = grid.map(row => row.slice());
    for (const [x, y] of trace) {
        gridCopy[y][x] = '|';
    }
    for (const row of gridCopy) {
        console.log(row.join(''));
    }
    console.log('');
}

function part1(lines) {
    const grid = lines.map(line => line.split(''));
    let beams = new Set([Math.floor(lines[0].length / 2)]);
    const trace = [[beams[0], 0]]; // [x, y]

    let splits = 0;

    for(let y=1; y<grid.length; y++) {
        const newBeams = new Set();
        for (const x of beams) {
            log(`Beam at (${x}, ${y}) on '${grid[y][x]}'`);
            if (grid[y][x] === '^') {
                log(` Beam splits at (${x}, ${y})`);
                newBeams.add(x - 1);
                newBeams.add(x + 1);
                trace.push([x - 1, y]);
                trace.push([x + 1, y]);
                splits++;
                log(` Total splits: ${splits}`);
            } else {
                log(` Beam continues at (${x}, ${y})`);
                newBeams.add(x);
                trace.push([x, y]);
            }
        }
        beams = newBeams;
        print(grid, trace);
    }

    return splits;
}

function part2(lines) {
    const grid = lines.map(line => line.split(''));
    let beams = [];
    beams[Math.floor(lines[0].length / 2)] = 1;

    for(let y=1; y<grid.length; y++) {
        const newBeams = [];
        for(let x = 0; x<grid[0].length; x++) {
            if(!beams[x]) continue;

            if (grid[y][x] === '^') {
                newBeams[x-1] = (newBeams[x-1] || 0) + beams[x];
                newBeams[x+1] = (newBeams[x+1] || 0) + beams[x];
            } else {
                newBeams[x] = (newBeams[x] || 0) + beams[x];
            }
        }

        beams = newBeams;
    }

    return beams.reduce((a, b) => a + (b || 0), 0);
}

const lines = toTrimmedLines(raw);

console.log(part1(lines));
console.log(part2(lines));