const diagonalCheck = (data, player, options) => {

    const diagonalArrL = () => {
        const Ylength = data.length;
        const Xlength = data[0].length;
        const maxLength = Math.max(Xlength, Ylength);
        let temp;
        let res = [];
        for (let k = 0; k <= 2 * (maxLength - 1); ++k) {
            temp = [];
        for (let y = Ylength - 1; y >= 0; --y) {
            let x = k - y;
            if (x >= 0 && x < Xlength) {
                temp.push(data[y][x]);
            }
        }
        res.push(temp);
        }
        return res;
    }


    const diagonalArrR = () => {
        const Ylength = data.length;
        const Xlength = data[0].length;
        const maxLength = Math.max(Xlength, Ylength);
        let temp;
        let res = [];
        for (let k = 0; k <= 2 * (maxLength - 1); ++k) {
            temp = [];
        for (let y = Ylength - 1; y >= 0; --y) {
            let x = k - (Ylength- y);
            if (x >= 0 && x < Xlength) {
                temp.push(data[y][x]);
            }
        }
        res.push(temp);
        }
        return res;
    }
        const diagonalArr = [...diagonalArrL(), ...diagonalArrR()];
        for(let a = 0; a< diagonalArr.length; a++){
            for (let b = 0; b < (diagonalArr[a].length - 3);b++) {
            let arr = diagonalArr[a].slice(b,b+4);
            
            if (arr.every((i) => { return i === 1}) && (arr.length >= 4)) {
                return options.winner = player;
                // setTimeout(() => {swal(`Победил ${p1}!`)},100);
            } if (arr.every((i) => { return i === 2}) && (arr.length >= 4)) {
                    return options.winner = player;
                    // setTimeout(() => {swal(`Победил ${p2}`)},100);
                }
            }
        }

    };
module.exports.diagonalCheck = diagonalCheck;