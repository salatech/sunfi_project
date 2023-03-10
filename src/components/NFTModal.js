import React from "react";
import styled from "styled-components";

// Default image URL to use if no image URL is provided for the NFT
const defaultImage =
  "https://www.investopedia.com/thmb/WNUFveh2kWsVvFZgFeUqrB9uLGA=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/NFT_final-aa004ce971d24aecaa3f93688a35dec3.png";

// NFTModal component that displays an NFT and its details in a modal
const NFTModal = ({ nft, onClose }) => {
  return (
    <Wrapper>
      <div className="nft-modal">
        <img src={nft.image_url || defaultImage} alt={nft.name} />

        <span className="details">
          <h3>{nft.name}</h3>
          <p>
            <b>Description</b>
            <br />
            {nft.asset_contract.description}
          </p>
          <p>
            <b>Contract type</b>
            <br />
            {nft.asset_contract.asset_contract_type}
          </p>
          <p>
            <b>Owner's name</b>
            <br />
            {nft.asset_contract.name}
          </p>
          <p>
            <b>Owner's address</b>
            <br />
            <samp>{nft.asset_contract.address}</samp>
          </p>
          <p>
            <b>Date created</b>
            <br />
            {nft.asset_contract.created_date}
          </p>
          {/* Link to purchase the NFT */}
          <a href={nft.permalink} target="_blank" rel="noopener noreferrer">
            Buy Now
          </a>
          <br />
          <br />

          {/* Button to close the modal */}
          <button onClick={onClose}>Close</button>
        </span>
      </div>
    </Wrapper>
  );
};

// Wrapper component to style the NFTModal
const Wrapper = styled.section`
  .nft-modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow-y: scroll;
    background-color: white;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    animation-name: fadeIn;
    animation-duration: 0.5s;
    animation-timing-function: ease-in;
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  .nft-modal img,
  .nft-modal .details {
    animation-name: slideIn;
    animation-duration: 0.5s;
  }

  @keyframes slideIn {
    from {
      transform: translateY(100%);
    }
    to {
      transform: translateY(0);
    }
  }

  .nft-modal img {
    top: 0;
    width: 100%;
    max-width: 600px;
    margin-bottom: 1rem;
    border-radius: 8px;
  }

  .details {
    width:100%;
    text-align: center;
   
  }

  .nft-modal h3 {
    margin: 1rem 0;
    font-size: 2rem;
    text-align: center;
    text-transform:lowercase;
  }

  .nft-modal .details p {
    margin: 0 0 1rem;
    font-size: 1.25rem;
    text-align: center;
  }
  .nft-modal .details a {
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
  }

  .nft-modal .details button {
    background-color: red;
    color: white;
    padding: 0.5rem 2rem;
    border: none;
    border-radius: 4px;
    text-transform: uppercase;
    margin-bottom: 2rem;
  }
samp{
  width:100%;
}
  .nft-modal .details a:hover {
    background-color: #444;
  }

  @media screen and (max-width: 768px) {
    
    .nft-modal{
      padding:5px;
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
