import styled from 'styled-components';
import War from './components/War';
import Nature from './components/Nature';
import Tech from './components/Tech'

const Container = styled.div`
`;

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const Box = styled.div`
  border-radius: 9px;
  cursor: pointer;
`;

const Title = styled.h1`
  font-size: 14pt !important;
  font-weight: 500 !important;
  line-height: 1.2em;

`;

const NewsImage = styled.img`
  height: 240px;
  width: 100%;

  &:hover {
    opacity: .8;
  }
`;

const NewsPublishedDate = styled.h2`
  color: rgb(3, 28, 43);
  font-size: 6pt !important;
  padding: 12px 0px;
  font-weight: 500 !important;
`;


const Home = () => {
  return (
    <Container>
      <War />
      <Nature />
      <Tech />
    </Container>
  );
}

export {Wrapper, Box, NewsImage, Title, NewsPublishedDate};
export default Home;
