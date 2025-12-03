const { DEBUG, log, getRaw, toTrimmedLines } = require('../util');

let raw = getRaw();
if (DEBUG) {
    raw = `987654321111111
811111111111119
234234234234278
818181911112111`;
}

function part1(lines) {
    const banks = lines.map(l => l.split('').map(Number));

    const getMax = (b, s, e) => {
        let max = -Infinity;
        let maxIdx = -1;
        for(let i=s; i<=e; i++) {
            if (b[i] > max) {
                max = b[i];
                maxIdx = i;
                if (max === 9) break;
            }
        }
        return [max, maxIdx];
    };

    return banks.reduce((sum, bank) => {
        log(`Processing bank: ${bank.join('')}`);
        const [first, start] = getMax(bank, 0, bank.length - 2);
        const [second] = getMax(bank, start + 1, bank.length - 1);
        const joltage = first * 10 + second;
        log(`Max joltage: ${joltage} (first: ${first}, second: ${second})`);
        return sum + joltage;
    }, 0);
}

function part2(lines) {
    const banks = lines.map(l => l.split('').map(Number));

    const getMax = (b, s, e) => {
        let max = -Infinity;
        let maxIdx = -1;
        for(let i=s; i<=e; i++) {
            if (b[i] > max) {
                max = b[i];
                maxIdx = i;
                if (max === 9) break;
            }
        }
        return [max, maxIdx];
    };

    return banks.reduce((sum, bank) => {
        log(`Processing bank: ${bank.join('')}`);
        let joltage = 0;
        let start = 0;
        for(let i=11; i>=0; i--) {
            const [d, idx] = getMax(bank, start, bank.length - i - 1);
            joltage += d * Math.pow(10, i);
            start = idx + 1;
        }
        log(`Max joltage: ${joltage}`);
        return sum + joltage;
    }, 0);
}

const lines = toTrimmedLines(raw);

console.log(part1(lines));
console.log(part2(lines));