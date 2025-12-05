const { DEBUG, log, getRaw, toTrimmedLines } = require('../util');

let raw = getRaw();
if (DEBUG) {
    raw = `3-5
10-14
16-20
12-18

1
5
8
11
17
32`;
}

function parse(raw) {
    const sections = raw.trim().split('\n\n');
    const ranges = sections[0].split('\n').map(line => {
        const [min, max] = line.split('-').map(Number);
        return { min, max };
    });
    const ingredients = sections[1].split('\n').map(Number);
    return { ranges, ingredients }; 
}

function part1(ranges, ingredients) {
    let count = 0;
    for(const ingredient of ingredients) {
        let valid = false;
        for(const range of ranges) {
            if (ingredient >= range.min && ingredient <= range.max) {
                valid = true;
                break;
            }
        }
        if (valid) {
            count++;
        }
    }
    return count;
}

function part2(ranges) {    
    const merged = [ranges[0]];
    ranges.sort((a, b) => a.min - b.min);
    
    for(let i=1; i<ranges.length; i++) {
        const current = ranges[i];
        let overlap = false;

        for(let j=0; j<merged.length; j++) {
            log(`Comparing current ${current.min}-${current.max} with merged ${merged[j].min}-${merged[j].max}`);

            if((current.min <= merged[j].max && current.min >= merged[j].min) ||
               (current.max <= merged[j].max && current.max >= merged[j].min)) {
                // Overlap detected, merge ranges
                merged[j].min = Math.min(merged[j].min, current.min);
                merged[j].max = Math.max(merged[j].max, current.max);
                
                log(`Merged to ${merged[j].min}-${merged[j].max}`);
                overlap = true;
                break;
            }
        }

        if (!overlap) {
            merged.push(current);
        }
    }

    log(merged);

    let totalCovered = 0;
    for(const range of merged) {
        totalCovered += (range.max - range.min + 1);
    }
    return totalCovered;
}

const { ranges, ingredients } = parse(raw);

console.log(part1(ranges, ingredients));
console.log(part2(ranges));