const addition = numbers => {
    if(!Array.isArray(numbers))
        return false;

    if(numbers.length != 2)
        return false;

    for(let i=0; i<numbers.length; i++){
        if(typeof numbers[i] !== "string")
            return false;

        else if(numbers[i].match(/\D/g) !== null)
            return false;
    };

    const maxDigit = Math.max(...numbers.map(n => n.length));
    const k = maxDigit + 5 - (maxDigit % 5);

    numbers = numbers.map(n => n.padStart(k, "0"));

    const chunk = [];
    for(const n of numbers)
        chunk.push([n.match(/.{1,5}/g)]);
                
    const chunkSorted = [];
    for(let i=0; i<chunk[0][0].length; i++){
        for(let j=0; j<chunk.length; j++){
            chunkSorted.push(chunk[j][0][i]);
        }
    }

    const pattern = new RegExp(".{1," + numbers.length * 5 + "}", "g");

    let final = chunkSorted.join("").match(pattern);
    for(let i=0; i<final.length; i++)
        final[i] = final[i].match(/.{1,5}/g).map(n => Number(n)).reduce((a, b) => a + b, 0);
    
    final = final.map(e => e.toString());
    for(let i=1; i<final.length; i++){
        if(final[i].length > 5){
            final[i - 1] = Number(final[i - 1]) + Number(final[i].slice(0, 1));
            final[i] = final[i].substring(1);
        }
    }

    for (let i = 0; i < final.length; i++) {
        if (final[i].length < 5) {
            final[i] = "0" + final[i];
        }
    }

    const result = final.join("").replace(/^0+/, '');
    return result;
};

/*
console.log(
    addition(["13353022353166651914032935133530223531666519140329351209381092830192830912309", "2039489023840923840198109238018301281029381029381023801298330128301823012830123"])
);

Result = 2052842046194090492112142173151831504561047548521353152507711221132015843742432
*/
