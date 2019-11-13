
export const clickCellFunc = (idCol, idCell, axios, data, setData, idRoom, playerName) => {
    axios.post('http://localhost:5000/clickCell', {
            "idCol": idCol,
            "idCell": idCell,
            "idRoom": idRoom,
            playerName: playerName
        },{withCredentials: true})
        .then((resp) => {
            
            return resp.data;
        });
};
export const animation = (idCol, data, setData, setAnimationData, axios, playerName) => {
    
    (async function iterate (i) {
        let newData = {
            ...data
        };
        
        newData.gameTable[idCol][i] = data.player;
        newData.gameTable[idCol][i - 1] = 0;
        newData.canClick = false;
        setData(newData);
        if (
            newData.gameTable[idCol][i + 1] === 0) {
            setTimeout(function () {
                iterate(i + 1)
            }, 500);
        }
        if (newData.gameTable[idCol][i + 1] !== 0) {
            newData.canClick = true
            await axios.get('http://localhost:5000/gameData', {
        withCredentials: true
      }).then((resp) => {
        setData(resp.data);
        
      });
           
        }
    })(0);
    setAnimationData([false,0,0]);
    return data;
};