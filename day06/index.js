const { DEBUG, log, getRaw, toTrimmedLines } = require('../util');

let raw = getRaw();
if (DEBUG) {
    raw = `123 328  51 64 
 45 64  387 23 
  6 98  215 314
*   +   *   +  `;
}

function part1(raw) {
    const lines = toTrimmedLines(raw).map(line => line.split(/\s+/));
    const problems = [];
    for(let i=0; i<lines[0].length; i++) {
        let nums = [];
        for(let j=0; j<lines.length - 1; j++) {
            nums.push(Number(lines[j][i]));
        }
        const operator = lines[lines.length - 1][i];
        problems.push({ nums, operator });
    }

    return problems.map(({ nums, operator }) => {
        if (operator === '+') return nums.reduce((a, b) => a + b, 0);
        return nums.reduce((a, b) => a * b, 1);
    }).reduce((a, b) => a + b, 0);
}

function part2(raw) {
    let lines = raw.split('\n');
    let rotated = '';
    for(let i=0; i<lines[0].length; i++) {
        let newLine = '';
        for(let j=0; j<lines.length; j++) {
            newLine += lines[j][i];
        }
        rotated += newLine + '\n';
    }

    const problems = rotated.split(/\n\s*\n/).map(p => p.split('\n'));
    let total = 0;

    for(const problem of problems) {
        let operator = problem[0][problem[0].length - 1];
        problem[0] = problem[0].slice(0, -1);
        log(`Problem: ${problem.join(', ')} with operator ${operator}`);

        if (operator === '+') {
            total += problem.reduce((sum, n) => sum + Number(n.trim()), 0);
        } else {
            total += problem.reduce((prod, n) => prod * Number(n.trim()), 1);
        }
    }

    return total;
}

console.log(part1(raw));
console.log(part2(raw));