import React from 'react';
import styled from 'styled-components';


const Delete = ({ onClear }) => {
  return (
    <StyledWrapper>
      <button type="button" className="btn" onClick={onClear}>
        <p className="paragraph"> Limpa todos os campos </p>
        <span className="icon-wrapper">
          <svg className="icon" width="30px" height="30px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6 7V18C6 19.1046 6.89543 20 8 20H16C17.1046 20 18 19.1046 18 18V7M6 7H5M6 7H8M18 7H19M18 7H16M10 11V16M14 11V16M8 7V5C8 3.89543 8.89543 3 10 3H14C15.1046 3 16 3.89543 16 5V7M8 7H16" stroke="#000000" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </button>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .btn {
    cursor: pointer;
    width: 50px;
    height: 50px;
    border: none;
    position: relative;
    border-radius: 10px;
    -webkit-box-shadow: 1px 1px 5px .2px #00000035;
    box-shadow: 1px 1px 5px .2px #00000010;
    -webkit-transition: .2s linear;
    transition: .2s linear;
    transition-delay: .2s;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    background: #e5e5e5;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: space-between;
  }

  .btn:hover {
    width: 250px;
    transition-delay: .2s;
  }

  .btn:hover > .paragraph {
    visibility: visible;
    opacity: 1;
    -webkit-transition-delay: .4s;
    transition-delay: .4s;
  }

  .btn:hover > .icon-wrapper .icon {
    transform: scale(1.1);
    
  }

  .btn:hover > .icon-wrapper .icon path {
    stroke: rgb(255, 81, 81);
  }

  .paragraph {
    color: black;
    visibility: hidden;
    opacity: 0;
    font-size: 14px;
    margin-right: 0px;
    font-family: 'Poppins', sans-serif;
    padding-left: 20px;
    -webkit-transition: .2s linear;
    transition: .2s linear;
    font-weight: bold;
    text-transform: capitalize;
  }

  .icon-wrapper {
    width: 50px;
    height: 50px;
    position: absolute;
    top: 0;
    right: 0;
    
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .icon {
    transform: scale(.9);
    transition: .2s linear;
  }

  .icon path {
    
    stroke-width: 2px;
    -webkit-transition: .2s linear;
    transition: .2s linear;
  }`;

export default Delete;
