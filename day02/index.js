const { DEBUG, log, getRaw, toTrimmedLines } = require('../util');

let raw = getRaw();
if (DEBUG) {
    raw = `11-22,95-115,998-1012,1188511880-1188511890,222220-222224,1698522-1698528,446443-446449,38593856-38593862,565653-565659,824824821-824824827,2121212118-2121212124`;
}

function part1(lines) {
    const ranges = lines[0].split(',').map(r => {
        const [start, end] = r.split('-').map(Number);
        return [start, end];
    });

    let sum = 0;

    for (const [start, end] of ranges) {
        log(`Processing range ${start}-${end}`);

        for (let i = start; i <= end; i++) {
            const s = i.toString();
            log(`Checking number: ${i}`);
            if (s.length % 2 !== 0) {
                log(`Skipping number with odd length: ${i}`);
                continue;
            }

            const mid = Math.floor(s.length / 2);
            const left = s.slice(0, mid);
            const right = s.slice(mid);
            log(`Left: ${left}, Right: ${right}`);
            if(left === right) {
                log(`Found matching number: ${i}`);
                sum += i;
            }
        }
    }

    return sum;
}

function isInvalid(s) {
    for(let i=1; i<=s.length/2; i++) {
        const sequence = s.slice(0, i);
        const r = `^(${sequence})+$`;
        log(`Checking sequence: ${sequence} with regex ${r} against ${s}`);
        if (new RegExp(r).test(s)) {
            return true;
        }
    }
    return false;
}

function part2(lines) {
    const ranges = lines[0].split(',').map(r => {
        const [start, end] = r.split('-').map(Number);
        return [start, end];
    });

    let sum = 0;

    for (const [start, end] of ranges) {
        log(`Processing range ${start}-${end}`);

        for (let i = start; i <= end; i++) {
            const s = i.toString();
            if (isInvalid(s)) {
                log(`Found invalid number: ${i}`);
                sum += i;
            }
        }
    }

    return sum;
}

const lines = toTrimmedLines(raw);

console.log(part1(lines));
console.log(part2(lines));