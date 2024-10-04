
const balance = 10000;

const fetchStockData = async () => {

    try {

        const response = await fetch("http://localhost:3000/getStock");

        const stock = await response.json();
        console.log(stock);

    }catch(err){
        console.log(err);
    }

} 


fetchStockData();