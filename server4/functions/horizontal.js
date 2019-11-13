

const horizontalCheck = (data, player, options) => {
    

            let horizontalArr = () => {
            let fieldRev = [];
            for(let i = 0; i<= data[0].length - 1; i++){
                let arr = [];
                for (let y = 0; y <= data.length - 1; y++){
                    arr.push(data[y][i]);
                }
                fieldRev.push(arr);
            }
            return fieldRev;
                
            }
            const hArr = horizontalArr();
    
            for(let a = 0; a< hArr.length; a++){
                for (let b = 0; b < (hArr[a].length - 3);b++) {
                let arr = hArr[a].slice(b,b+4);
                
                if (arr.every((i) => { return i === 1})) {
                    return options.winner = player;
                    // setTimeout(() => {swal(`Победил ${p1}!`)}, 100);
                } if (arr.every((i) => { return i === 2})) {
                        return options.winner = player;
                        // setTimeout(() => {swal(`Победил ${p2}!`)},100);
                    }
                }
            }
    };
module.exports.horizontalCheck = horizontalCheck;
