

verticalCheck = (data, player, options) => {
        for(let a = 0; a<  data.length; a++){
            for (let b = 0; b < (data[a].length - 3);b++) {
               let arr = data[a].slice(b,b+4);
               
               if (arr.every((i) => { return i === 1})) {
                //    arr.map((el) => {return el = 1})
                options.winner = player;
                //    setTimeout(() => {alert(`Победил ${player}!`)}, 100);
               } if (arr.every((i) => { return i === 2})) {
                    return options.winner = player;
                    // setTimeout(() => {alert(`Победил ${player}!`)}, 100);
                }
            }
        }
    };
module.exports.verticalCheck = verticalCheck;

   