import React, { useState, useEffect } from "react";
import axios from "axios";
import NFTModal from "./components/NFTModal";
import NFTCard from "./components/NFTCard";

const App = () => {
  // Use a constant variable for the default address
  const defaultAddress = "0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d";
  
  // Use a state variable to store the search query
  const [query, setQuery] = useState(defaultAddress);

  // Use a state variable to store the NFTs fetched from the API
  const [nfts, setNFTs] = useState([]);

  // Use a state variable to store the selected NFT object
  const [selectedNFT, setSelectedNFT] = useState(null);

  // Use the useEffect hook to fetch NFTs from the API when the query state changes
  useEffect(() => {
    async function fetchNFTs() {
      try {
        const response = await axios.get(
          `https://api.opensea.io/api/v1/assets?owner=${query}`
        );
        setNFTs(response.data.assets);
      } catch (error) {
        console.error(error);
      }
    }
    fetchNFTs();
  }, [query]);

  // Define event handlers for the search input field and NFT card clicks
  const handleSearch = (event) => {
    setQuery(event.target.value);
  };

  const handleCardClick = (nft) => {
    setSelectedNFT(nft);
  };

  const handleModalClose = () => {
    setSelectedNFT(null);
  };

  return (
    <div>
      <div className="search-container">
        <input type="text" onChange={handleSearch} value={query} placeholder="Search..." />
        <button type="submit">search</button>
      </div>
      <div className="nft-grid">
        {/* Use optional chaining to check if nfts is not null or undefined before mapping over it */}
        {nfts?.map((nft) => (
          <NFTCard key={nft.token_id} nft={nft} onClick={handleCardClick} />
        ))}
        {/* Use a conditional rendering to display the NFTModal only if a NFT object is selected */}
        {selectedNFT && (
          <NFTModal nft={selectedNFT} onClose={handleModalClose} />
        )}
      </div>
    </div>
  );
};

export default App;
