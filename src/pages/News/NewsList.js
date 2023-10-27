import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Search from '../../components/Search';
import { apiKey } from '../../app/variables';

const NewsContainer = styled.div`
  width: 70%;
  margin: 30px 15% auto 15%;
`;

const NewsItemLi = styled.li`
  margin: 10px auto 10px auto;
  list-style: none;
`;

const NewsItemButton = styled.button`
  font-family: Roboto, sans-serif !important;
  display: inline-block;
  appearance: none;
  border: medium;
  outline: none;
  width: 100%;
  list-style: none;
  box-shadow: none;
  cursor: pointer;
  position: relative;
  font-weight: normal !important;
`;

const NewsButtonInner = styled.div`
  padding: 0px 1em;
  width: 100%;
  display: inline-block;
  position: relative;
  box-sizing: border-box;
  cursor: pointer;
`;

const NewsItemTitle = styled.h1`
  font-size: 8pt !important;
  text-shadow: rgb(0, 0, 0) 0px 0px 1px;
  font-weight: 500 !important;
`;

const NewsPublishedDate = styled.h2`
  color: rgb(3, 28, 43);
  font-size: 6pt !important;
  padding: 12px 0px;
  font-weight: 500 !important;
`;

const NewsItemSpan = styled.span`
  position: absolute;
  top: 50%;
  right: 10px;
  margin-top: -7px;
  width: 10px;
  height: 13px;
  background: transparent url("https://cdn.recyclecoach.com/webapp-resources/img/icon-column-arrow@2x.png") left top / 10px 27px;
`;

const NewsList = () => {
  const [news, setNews] = useState([]);

  useEffect(() => {
    console.log(news);
  }, [news]);



  const search = (term) => {
    const today = new Date().toISOString().split('T')[0];
    let yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    yesterday = yesterday.toISOString().split('T')[0];


    fetch(`https://newsapi.org/v2/everything?q=${term}&from=${yesterday}&to=${today}&sortBy=popularity&apiKey=${apiKey}`)
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
        setNews(articles);
            } else {
        console.error(data.message);
      }
    })
    .catch(error => {
      console.error(error);
    });
  }

  return (
    <NewsContainer>
      <Search search={search}/>

      <ul>
        {
          news.map((item) => (
            <NewsItemLi>
              <NewsItemButton>
                <Link
                  to={{
                    pathname: `/news/${item.title}`,
                    state: { item }
                  }}
                >
                  <NewsButtonInner>
                    <NewsItemTitle>
                      {item.title}
                    </NewsItemTitle>
                    <NewsPublishedDate>
                      {item.publishedAt}
                    </NewsPublishedDate>
                    <NewsItemSpan></NewsItemSpan>
                  </NewsButtonInner>
                </Link>
              </NewsItemButton>
            </NewsItemLi>
            ) 
          )
        }
      </ul>
    </NewsContainer>
  );
}

export default NewsList;