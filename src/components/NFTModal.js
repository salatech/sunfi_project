import React from "react";
import styled from "styled-components";

// Default image URL to use if no image URL is provided for the NFT
import DefaultImage from "../assets/defImage.png";

// NFTModal component that displays an NFT and its details in a modal

const NFTModal = ({ nft, onClose }) => {
  const nftDetails = {
    Description: nft.asset_contract.description,
    "Contract type": nft.asset_contract.asset_contract_type,
    "Owner's name": nft.asset_contract.name,
    "Owner's address": <samp>{nft.asset_contract.address}</samp>,
    "Date created": nft.asset_contract.created_date,
  };
  return (
    <Wrapper>
      <Modal className="nft-modal">
        <img src={nft.image_url || DefaultImage} alt={nft.name} />
        <ModalDetails className="details">
          <h3>{nft.name}</h3>
          {Object.entries(nftDetails).map(([key, value]) => (
            <p key={key}>
              <b>{key}</b>
              <br />
              {value}
            </p>
          ))}
          {/* Link to purchase the NFT */}
          <a href={nft.permalink} target="_blank" rel="noopener noreferrer">
            Buy Now
          </a>
          <br />
          {/* Button to close the modal */}
          <CloseButton onClick={onClose}>Close</CloseButton>
        </ModalDetails>
      </Modal>
    </Wrapper>
  );
};

// Wrapper component to style the NFTModal

const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0;
  font-size: 2rem;
  text-align: center;
  text-transform: capitalize;
  overflow-y: scroll;
  animation: fadeIn 0.5s ease-in;
  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  img {
    top: 0;
    width: 100%;
    max-width: 600px;
    margin-bottom: 1rem;
    border-radius: 8px;
    animation: slideIn 0.5s forwards;
  }

  @keyframes slideIn {
    from {
      transform: translateY(100%);
    }
    to {
      transform: translateY(0);
    }
  }
`;
const ModalDetails = styled.span`
  width: 100%;
  text-align: left;
  padding-left: 20px;

  p {
    margin: 0 0 1rem;
    font-size: 1.15rem;
    text-align: inherit;
    text-transform: capitalize;
  }
  a {
    width: 100px;
    margin-top: 1rem;
    padding: 0.5rem 1rem;
    margin-bottom: 1rem;
    font-size: 1rem;
    font-weight: bold;
    text-transform: uppercase;
    color: #fff;
    text-decoration: none;
    background-color: #222;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.2s ease-in-out;
    &:hover {
      background-color: #444;
    }
  }
`;
const CloseButton = styled.button`
  background-color: red;
  color: white;
  padding: 0.5rem 2rem;
  border: none;
  border-radius: 4px;
  text-transform: uppercase;
  margin-bottom: 2rem;
`;
const Wrapper = styled.section`
  @media screen and (max-width: 768px) {
    .nft-modal{
      padding:5px;
      flex-direction: column;
    }
    samp{
      overflow-wrap:anywhere;
    }
    .nft-modal h3 {
      font-size:1rem;
  }
  .nft-modal .details p {
    font-size:1rem;
    text-align:justify;
  }
`;
export default NFTModal;
