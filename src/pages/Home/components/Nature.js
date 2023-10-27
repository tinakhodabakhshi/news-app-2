import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { apiKey } from '../../../app/variables';
import { 
  Box,
  Wrapper,
  NewsImage,
} from '../Home';
import nature from '../../../assets/nature.jpg';

const Section = styled.section`
  width: 100%;
  position: relative;
  margin: 30px auto 30px auto;
`;

const Content = styled.div`
  position: relative;
  z-index: 1;
  margin-top: 8px;
  padding: 2%;
  
`;

const SecTitle = styled.h2`
  margin: auto auto 30px auto;
  border: 3px solid rgb(84, 104, 26);
  display: inline;
  color: white;
`;

const Background = styled.div`
  position: absolute;
  width: 100%;
  top: 0;
  bottom: 0;

  &::after {
    content: "";
  background-image: linear-gradient(to bottom, rgba(0,0,0,0.9), rgba(0,0,0,0.3) 60%);
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  }
`;

const Photo = styled.img`
  object-fit: cover;
  width: 100%;
  height: 100%;
`;

const Title = styled.h2`
  font-size: 6pt !important;
  font-weight: 500 !important;
  line-height: 1.2em;
  margin: 3px;
  /* color: white; */
`;


const Nature = () => {
  const [posts, setPosts] = useState([]);

  const ThirdBox = styled(Box) `
    width: 30%;
    background: white;
  `;

  const UpdatedWrapper = styled(Wrapper)`
  margin-top: 30px;
  `;


  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    let yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    yesterday = yesterday.toISOString().split('T')[0];

    fetch(`https://newsapi.org/v2/everything?q=jungle&from=${yesterday}&to=${today}&sortBy=popularity&apiKey=${apiKey}`)
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Request failed');
      }
    })
    .then(data => {
      if (data.status === 'ok') {
        let articles = data.articles;
        articles = articles.slice(0, 3);
        setPosts(articles);
      } else {
        console.error(data.message);
      }
    })
    .catch(error => {
      console.error(error);
    });
  }, []);

  return (
    <Section>
      <Content>
        <SecTitle>Nature</SecTitle>
        <UpdatedWrapper>
          {
            posts.map((post) => (
              <ThirdBox>
                <Link
                  to={{
                    pathname: `/news/${post.title}`,
                    state: { item: post }
                  }}
                >
                  <NewsImage src={post.urlToImage} />
                  <Title>{post.title}</Title>
                  </Link>
              </ThirdBox>
            ))
          }

        </UpdatedWrapper>
      </Content>
      <Background>
        <Photo src={nature} />
      </Background>
    </Section>
  );
}
export default Nature;