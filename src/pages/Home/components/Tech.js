import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { apiKey } from '../../../app/variables';
import { 
  Box,
  Wrapper,
  NewsImage,
} from '../Home';
import nature from '../../../assets/nature.jpg';

const Section = styled.section`
  padding-bottom: 100px;
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
  display: inline;
`;

const Title = styled.h2`
  font-size: 6pt !important;
  font-weight: 500 !important;
  line-height: 1.2em;
  margin: 3px;
  color: white;
`;


const Tech = () => {
  const [posts, setPosts] = useState([]);

  const UpdatedWrapper = styled(Wrapper)`
  margin-top: 30px;
`;


  const ForthBox = styled(Box) `
    width: 24%;
    background: rgb(84, 104, 26);
  `;


  // https://newsapi.org/v2/everything?q=tech&from=2023-10-10&to=2023-10-10&sortBy=popularity&apiKey=${apiKey}

  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    let yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    yesterday = yesterday.toISOString().split('T')[0];

    fetch(`https://newsapi.org/v2/everything?q=tech&from=${yesterday}&to=${today}&sortBy=popularity&apiKey=${apiKey}`)
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
      articles = articles.slice(0, 4);
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
        <SecTitle>Tech</SecTitle>
        <UpdatedWrapper>
          {
            posts.map((post) => (
              <ForthBox>
                <a href={post.url} target="_blank">
                  <NewsImage src={post.urlToImage} />
                  <Title>{post.title}</Title>
                </a>
              </ForthBox>
            ))
          }

        </UpdatedWrapper>
      </Content>
    </Section>
  );
}
export default Tech;