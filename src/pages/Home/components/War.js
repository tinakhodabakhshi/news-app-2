import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { apiKey } from '../../../app/variables';
import { 
  Box,
  Wrapper,
  NewsImage,
  Title
} from '../Home';

const Section = styled.section`
  width: 90%;
  margin: 30px 5% auto 5%;
`;

const SecTitle = styled.h2`
  margin: auto auto 30px auto;
  display: block;
`;

const War = () => {
  const [post, setPost] = useState({});

  const FullBox = styled(Box)`
    width: 100%;
    display: flex;
    justify-content: space-between;
    border: none;
    align-items: center;
  `;

const Desc = styled.div`
  line-height: 1.7em;
  color: rgb(102, 102, 102);
  text-align: justify;
  font-weight: 100;
  font-size: 6pt;
  width: 45%;
`;

const ImageWrapper = styled.div`
  width: 45%;
`;

const NewsImageUpdate = styled(NewsImage)`
  width: 100%;
  height: 240px;
  padding-right: 20px;
`;

  // https://newsapi.org/v2/everything?q=war&from=2023-10-10&to=2023-10-10&sortBy=popularity&apiKey=${apiKey}



  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    let yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    yesterday = yesterday.toISOString().split('T')[0];

    fetch(`https://newsapi.org/v2/everything?q=war&from=${yesterday}&to=${today}&sortBy=popularity&apiKey=${apiKey}`)
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Request failed');
      }
    })
    .then(data => {
      if (data.status === 'ok') {
        const articles = data.articles;
        setPost(articles[0]);
      } else {
        console.error(data.message);
      }
    })
    .catch(error => {
      console.error(error);
    });

  }, [])

  return (
    <Section>
      <SecTitle>War</SecTitle>
      <a href={post.url} target="_blank">
        <Wrapper>
            <FullBox>
              <ImageWrapper>
              <NewsImageUpdate src={post.urlToImage} />
              </ImageWrapper>
              <Desc>
                <Title>
                  {post.title}
                </Title>
                {post.description}
                <br />
                <publishedAt>
                  {post.publishedAt}
                </publishedAt>
              </Desc>
            </FullBox>
        </Wrapper>
      </a>
    </Section>
  )
}

export default War;
