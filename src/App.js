import React, { useEffect, useState } from "react";
import Coin from "./Coin";

function App() {
  const [coins, setCoins] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("https://api.coingecko.com/api/v3/coins/markets?vs_currency=USD&order=market_cap_desc&per_page=100&page=1&sparkline=false");
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        const data = await res.json();
        console.log(data);
        setCoins(data);
        setLoading(false); // Set loading to false when data is fetched
      } catch (error) {
        setError("Error fetching data. Please try again later."); // Handle errors
        console.error("Error fetching data:", error);
      }
    })();
  }, []);

  const handlechange = e => {
    setSearch(e.target.value);
  }

  const filteredCoins = coins.filter(coin =>
    coin.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="coin-app">
      <div className="coin-search">
        <h1 className="coin-text">Search Crypto</h1>
        <form>
          <input type="text" placeholder="Search Here" className="coin-input" onChange={handlechange} />
        </form>
      </div>
      {loading ? (
        <p>Loading...</p> // Show loading indicator
      ) : error ? (
        <p>{error}</p> // Show error message
      ) : (
        filteredCoins.map(coin => (
          <Coin
            key={coin.id}
            name={coin.name}
            image={coin.image}
            symbol={coin.symbol}
            marketcap={coin.market_cap}
            price={coin.current_price}
            priceChange={coin.price_change_percentage_24h}
            volume={coin.total_volume}
          />
        ))
      )}
    </div>
  );
}

export default App;
