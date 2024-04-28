const subtraction = (int1, int2) => {
    int1 = int1.replace(/^0+/, "");
    int2 = int2.replace(/^0+/, "");

    if (typeof int1 !== "string" || typeof int2 !== "string")
        return false;

    if (int1.length === 0 || int2.length === 0)
        return false;

    let isPositive = true;
    let i1, i2;

    if (int1.length > int2.length)
        isPositive = true;
    else if (int1.length < int2.length) {
        isPositive = false;
        i1 = int2;
        i2 = int1;
    }
    else if (int1.length === int2.length && Number(int1[0]) > Number(int2[0]))
        isPositive = true;
    else if (int1.length === int2.length && Number(int1[0]) < Number(int2[0])) {
        isPositive = false;
        i1 = int2;
        i2 = int1;
    }
    else {
        const digit_i1 = int1.split("").map(d => Number(d));
        const digit_i2 = int2.split("").map(d => Number(d));

        for (let i = 0; i < digit_i1.length; i++) {
            if (digit_i1[i] < digit_i2[i]) {
                isPositive = false;
                i1 = int2;
                i2 = int1;
            }

            else if (digit_i1[i] === digit_i2[i])
                isPositive = null;

            else
                isPositive = true;
        }
    }

    if (isPositive === null)
        return 0;

    const maxDigitSize = Math.max(i1.length, i2.length),
        k = maxDigitSize + 3 - (maxDigitSize % 3);

    i1 = i1.padStart(k, "0");
    i2 = i2.padStart(k, "0");

    let chunkI1 = i1.match(/.{1,3}/g),
        chunkI2 = i2.match(/.{1,3}/g);

    for (let i = 0; i < chunkI1.length; i++) {
        if (Number(chunkI1[i]) < Number(chunkI2[i])) {
            chunkI1[i - 1] = (Number(chunkI1[i - 1]) - 1).toString();
            chunkI1[i] = (1000 + Number(chunkI1[i])).toString();
        }
    }

    let result = [];
    for (let i = 0; i < chunkI1.length; i++)
        result.push(chunkI1[i] - chunkI2[i]);

    result = result.map(n => n.toString());

    for (let i = 0; i < result.length; i++) {
        if (result[i] == 0)
            result[i] = "000";
        
        else if (result[i].length < 3)
            result[i] = result[i].padStart(3, "0");
    }
    const final = result.join("").replace(/^0+/,"")
    return isPositive ? final : "-" + final;
}
/*
console.log(
    subtraction("13353022353166651914032935133530223531666519140329351209381092830192830912309", "2039489023840923840198109238018301281029381029381023801298330128301823012830123")
);

Result = -2026136001487757188284076302884771057497714510240694450088949035471630181917814
*/
