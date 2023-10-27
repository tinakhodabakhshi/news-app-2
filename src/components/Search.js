import React, { useState } from 'react';
import styled from 'styled-components';

const BoxContainer = styled.div`
  display: flex;
  background: #F6F6F6;
`;

const InputContainer = styled.div`
  position: relative;
  background: #F6F6F6;
  color: #141414;
  flex-grow: 1;
  display: flex;
  align-items: flex-start;
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;

`;

const IconWrapper = styled.span`
  left: 0;
  padding: 0.75rem 1rem;
  position: absolute;
  top: 0;
  width: 1.2rem;
`;

const Icon = styled.svg`
  display: block;
  height: 100%;
  width: 100%;
  fill: currentcolor;
`;

const Input = styled.input`
  font-weight: 400;
  font-feature-settings: '';
  font-size: 1rem;
  line-height: 1.375;
  background: #F6F6F6;
  border: none;
  box-sizing: border-box;
  padding: 0.6875rem 3rem;
  padding-left: 3rem;
  padding-left: 3rem;
  width: 100%;
`;

const Button = styled.button`
  font-size: 1.125rem;
  font-weight: 700;
  font-size: 1rem;
  line-height: 1.25;
  display: flex;
  -webkit-align-items: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  -webkit-justify-content: center;
  justify-content: center;
  padding: calc(0.5rem - 2px) calc(0.75rem - 2px);
  border: 2px solid transparent;
  min-height: 2.75rem !important;
  text-align: center;
  line-height: 1.375 !important;
  -webkit-transition: 0.2s;
  transition: 0.2s;
  background: transparent;
  color: #141414;
  cursor: pointer;

  &:hover {
    background: rgb(84, 104, 26);
    color: white;
  }
`;


const SearchBox = ({ search }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = () => {
    search(searchTerm);
  };

  return (

    <BoxContainer>
      <InputContainer>
        <IconWrapper>
          <Icon viewBox="0 0 32 32" width="1em" height="1em" class="ssrcss-xi5oyi-StyledIcon e161cein1" focusable="false" aria-hidden="true"><path d="m30.6 28.1-8.3-8.3c1.5-2 2.4-4.4 2.4-7.2C24.7 6 19.6 1 13 1S1.4 6.1 1.4 12.7 6.5 24.3 13 24.3c2.3 0 4.4-.6 6.2-1.8l8.5 8.5 2.9-2.9zM4 12.6c0-5.2 3.9-9.1 9-9.1s9 3.9 9 9.1c0 5.2-3.9 9.1-9 9.1s-9-3.9-9-9.1z"></path></Icon>
        </IconWrapper>
        <Input 
          type="text"
          placeholder="Search for News"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </InputContainer>
      <Button onClick={handleSearch}>Search</Button>
    </BoxContainer>


  );
};

export default SearchBox;