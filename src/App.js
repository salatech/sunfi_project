import React, { useState, useEffect } from "react";
import axios from "axios";
import NFTModal from "./components/NFTModal";
import NFTCard from "./components/NFTCard";
import styled from "styled-components";

const App = () => {
  // Use a constant variable for the default address
  const defaultAddress = "0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d";
  
  // Use a state variable to store the search query
  const [query, setQuery] = useState(defaultAddress);

  // Use a state variable to store the NFTs fetched from the API
  const [nfts, setNFTs] = useState([]);

  // Use a state variable to store the selected NFT object
  const [selectedNFT, setSelectedNFT] = useState(null);

  // Define event handlers for the search input field and NFT card clicks
  const handleSearch = () => {
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
  };

  const handleInputChange = (event) => {
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
      <SearchContainer >
        <input type="text" onChange={handleInputChange} value={query} placeholder="Search..." />
        <SearchButton type="button" onClick={handleSearch}>search</SearchButton>
      </SearchContainer >
      <NFTGrid >
        {/* Use optional chaining to check if nfts is not null or undefined before mapping over it */}
        {nfts?.map((nft) => (
          <NFTCard key={nft.token_id} nft={nft} onClick={handleCardClick} />
        ))}
        {/* Use a conditional rendering to display the

        {/* Use a conditional rendering to display the NFTModal only if a NFT object is selected */}
        {selectedNFT && (
          <NFTModal nft={selectedNFT} onClose={handleModalClose} />
        )}
      </NFTGrid>
    </div>
  );
};
 const NFTGrid =styled.div`
 display: grid;
 grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
 gap: 1rem;
 margin: 2rem auto;
 max-width: 1200px;
 `
 const SearchContainer =styled.div`
 display: flex;
 align-items: center;
 width: 100%;
 max-width: 400px;
 background-color: #f2f2f2;
 border-radius: 5px;
 overflow: hidden;
 margin:auto;
 input{
  flex: 1;
  height: 40px;
  padding: 10px;
  border: none;
  font-size: 16px;
  background-color: transparent;
  outline:none;
 }
 `
 const SearchButton=styled.button`
 height: 40px;
 width: 60px;
 background-color: #4CAF50;
 color: #fff;
 border: none;
 font-size: 16px;
 cursor: pointer;
 &:hover{
  background-color: #45a049;
 }
 `
export default App;
