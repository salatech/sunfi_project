import React from "react";
import styled from "styled-components";

// Default image URL to use if no image URL is provided for the NFT
import DefaultImage from '../assets/defImage.png'

// NFTCard component that displays an NFT and its details in a card

const NFTCard = ({ nft, onClick }) => {
  return (
    <NFTCardContent className="nft-card" onClick={() => onClick(nft)}>
      <NFTCardImage
        src={nft.image_url || DefaultImage}
        alt={nft.name}
      />
      <NFTCardTitle>{nft.asset_contract.name}</NFTCardTitle>
      <NFTCardButton>Buy Now</NFTCardButton>
    </NFTCardContent>
  );
};

const NFTCardContent = styled.div`
  background-color: #d9d9d9;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  overflow: hidden;
  cursor: pointer;
  transition: transform 0.2s ease-in-out;

  &:hover {
    transform: translateY(-5px);
  }
`;
const NFTCardImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
  object-position: center;
`;
const NFTCardTitle = styled.h3`
  margin: 1rem;
  font-size: 1.25rem;
`;
const NFTCardButton = styled.button`
  display: block;
  width: 100%;
  padding: 0.7rem 1rem;
  font-size: 0.875rem;
  font-weight: bold;
  text-transform: uppercase;
  color: #fff;
  background-color: #45a049;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;
  &:hover {
    background-color: #444;
  }
`;
export default NFTCard;
