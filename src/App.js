import React, { useEffect, useState } from "react";
import Coin from "./Coin";

function App() {
  const [coins, setCoins] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("https://api.coingecko.com/api/v3/coins/markets?vs_currency=USD&order=market_cap_desc&per_page=100&page=1&sparkline=false");
        const data = await res.json();
        console.log(data);
        setCoins(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    })();
  }, []);

  const handlechange = e => {
    setSearch(e.target.value);
  }

  const filteredCoins = coins.filter(coin =>
    coin.name.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="coin-app">
      <div className="coin-search">
        <h1 className="coin-text">Search Crypto</h1>
        <form>
          <input type="text" placeholder="Search Here" className="coin-input" onChange={handlechange} />
        </form>
      </div>
      {filteredCoins.map(coin => (
        <Coin
          key={coin.id}
          name={coin.name}
          image={coin.image}
          symbol={coin.symbol}
          marketcap={coin.market_cap} // Updated property name
          price={coin.current_price}
          priceChange={coin.price_change_percentage_24h}
          volume={coin.total_volume} // Updated property name
        />
      ))}
    </div>
  );
}

export default App;
