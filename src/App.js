import React, { useState, useEffect } from "react";
import axios from "axios";
import NFTModal from "./components/NFTModal";
import NFTCard from "./components/NFTCard";
import styled from "styled-components";
import loadingGif from "./assets/loader.gif";

const App = () => {
  // Use a constant variable for the default address
  const defaultAddress = "0x8767B976Ba24284374933334fc117248554F5745";

  // Use a state variable to store the search query
  const [query, setQuery] = useState(defaultAddress);

  // Use a state variable to store the NFTs fetched from the API
  const [nfts, setNFTs] = useState([]);

  // Use a state variable to store the selected NFT object
  const [selectedNFT, setSelectedNFT] = useState(null);

  const [isLoading, setIsLoading] = useState(false);

  // Define event handlers for the search input field and NFT card clicks
  const handleSearch = () => {
    async function fetchNFTs() {
      setIsLoading(true);
      try {
        const response = await axios.get(
          `https://api.opensea.io/api/v1/assets?owner=${query}`
        );
        setNFTs(response.data.assets);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false); // Stop the loading animation when the API request finishes
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

  useEffect(() => {
    async function fetchNFTs() {
      setIsLoading(true);
      try {
        const response = await axios.get(
          `https://api.opensea.io/api/v1/assets?owner=${defaultAddress}`
        );
        setNFTs(response.data.assets);
      } catch (error) {
        console.error(error);
      } finally {
        // Stop the loading animation when the API request finishes
        setIsLoading(false);
      }
    }
    fetchNFTs();
  }, []);

  return (
    <div>
      <h3 style={{ textAlign: "center" }}>Enter your address below</h3>
      <SearchContainer>
        <input
          type="text"
          onChange={handleInputChange}
          value={query}
          placeholder="Search..."
        />
        <SearchButton type="button" onClick={handleSearch}>
          search
        </SearchButton>
      </SearchContainer>
      {isLoading ? ( // Step 3: Use conditional rendering to display the loading GIF if the API request is in progress
        <Loader>
        <img src={loadingGif} alt="Loading..." />
        </Loader>
      ) : (
        <NFTGrid>
          {nfts?.map((nft) => (
            <NFTCard key={nft.token_id} nft={nft} onClick={handleCardClick} />
          ))}
          {selectedNFT && (
            <NFTModal nft={selectedNFT} onClose={handleModalClose} />
          )}
        </NFTGrid>
      )}
    </div>
  );
};
const Loader = styled.div`{
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}`
const NFTGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin: 2rem auto;
  max-width: 1200px;
`;
const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  max-width: 400px;
  background-color: #f2f2f2;
  border-radius: 5px;
  overflow: hidden;
  margin: auto;
  input {
    flex: 1;
    height: 40px;
    padding: 10px;
    border: none;
    font-size: 16px;
    background-color: transparent;
    outline: none;
  }
`;
const SearchButton = styled.button`
  height: 40px;
  width: 60px;
  background-color: #4caf50;
  color: #fff;
  border: none;
  font-size: 16px;
  cursor: pointer;
  &:hover {
    background-color: #45a049;
  }
`;
export default App;
