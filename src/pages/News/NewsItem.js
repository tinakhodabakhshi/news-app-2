import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import Comment from '../../components/Comment';
import { getComments } from '../../helpers/comment';

const Container = styled.div`
  width: 80%;
  margin: 5% 10% 5% 10%;
`;

const Title = styled.h1`
  margin-bottom: 2.5%;
`;

const Image = styled.img`
  width: 100%;
  border-radius: 9px;
  box-shadow: rgb(78, 146, 227) 0px 1rem 4rem;

`;

const Desc = styled.p`
  line-height: 1.7em;
  color: rgb(102, 102, 102);
  text-align: justify;
  font-weight: 100;
  font-size: 10pt;
  margin-top: 5%;
`;

const Content = styled.p`
  line-height: 1.7em;
  color: rgb(102, 102, 102);
  text-align: justify;
  font-weight: 100;
  font-size: 10pt;
  margin-top: 5%;
`;

const PublishedAt = styled.span`
  font-size: 14px !important;
  color: rgb(101, 101, 101);
  font-weight: 500 !important;
`;

const CommentsWrapper = styled.div`
  margin-top: 30px;
  margin-bottom: 200px;
`;

const CommentBoxContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
  background-color: #eee;
  border-radius: 5px;
`;

const Label = styled.label`
  margin-bottom: 5px;
`;

const CommentText = styled.p`
  margin-bottom: 10px;
  
`;

const PersonalInfo = styled.div`
  display: flex;
  width: 100%;
  background: rgb(84, 104, 26);
  color: white;
  justify-content: space-around ;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
`;

const FeedBackBox =  styled.div`
  padding: 2%;
  color: rgb(102, 102, 102);
`;

const NewsItem = () => {
  const { state } = useLocation();
  const { item } = state;
  const [comments, setComments] = useState([]);

  useEffect(() => {
    getAndSetComments();
  }, []);

  useEffect(() => {
    console.log(comments);
  }, [comments]);

  const getAndSetComments = async () => {
    console.log('RIRAAAAAAAA');
    const res = await getComments(item.url);
    setComments(res);
  }

  const [fullContent, setFullContent] = useState('');

  useEffect(() => {
    if (item.content !== null || item.content !== undefined) {
    }
  }, [state]);


  return (
    <Container>
      <Title>
        {item.title} <PublishedAt>{item.publishedAt}</PublishedAt>
      </Title>
      <Image src={item.urlToImage} />

      <Desc>
        {item.description}
      </Desc>
      <Content>
        {item.content}
      </Content>


      <Comment 
        url={item.url}
        commentAdded={getAndSetComments}
      />

    <p>sdasda</p>

  {
      !!Object.keys(comments).length
      && comments
      .map((comment) => (
      <CommentsWrapper>
      <CommentBoxContainer>

        <PersonalInfo>
        <Label></Label>
        <CommentText>{comment.name}</CommentText>

        <Label></Label>
        <CommentText>{comment.date}</CommentText>

        </PersonalInfo>

        <FeedBackBox>
        <Label><b>Feedback:</b></Label>

          <CommentText>{comment.feedback}</CommentText>
        </FeedBackBox>
    </CommentBoxContainer>
      </CommentsWrapper>
        
      ))
  }

    </Container>
  );
}

export default NewsItem;
