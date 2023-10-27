import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import user from './assets/user.png';
import { useSelector } from 'react-redux';
import { selectUser } from './redux/userSlice';

const Container = styled.main`
  background: #eff4f4;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  position: relative;
  background: linear-gradient(90deg, rgb(55, 96, 145) 0%, rgb(84, 104, 26) 35%);
  box-sizing: border-box;
  border-right: 1px solid rgb(55, 96, 145);
  border-left: 1px solid rgb(55, 96, 145);
  padding: 1px;s
  /* overflow: auto; */
`;

const Header = styled.header`
  margin: 1%;
  display: flex;
  justify-content: space-between;
`;

const Title = styled.h1`
  color: white;
`;

const Content = styled.div`
  background: #eff4f4;
  border-radius: 5px 5px 0 0;
  height: 100vh;
  padding: 1%;
  overflow: auto;
  padding: 0;
`;

const SearchBox = styled.div`
  background: #E6E8EA;
  border-radius: 5px;
  display: flex;
`;

const BoxContainer = styled.div`
  display: flex;
`;


const SearchForNews = styled.span`
  font-size: 6pt;
`;

const SearchIcon = styled.svg`
  fill: white;
  font-size: 2em;
`;

const AccountBox = styled.div`
  color: white;
  padding: 10px;
  text-align: center;
  border-radius: 9px;
  cursor: pointer;
  font-size: 20px;
  text-decoration: none;
  margin-top: 5px;

  &.loggedIn:hover {
    border: 1px solid white;
    border-radius: 5px;
    transition: 1s;
  }

  .signOutText {
    display: none;
    transition: 1s;
  }

  &.loggedIn:hover .defaultText {
    display: none;
    transition: 1s;
  }

  &.loggedIn:hover .signOutText {
    display: inline-block;
    transition: 1s;
  }
`;

const Template = ({ children }) => {
  const state = useSelector(selectUser);
  
  return (
    <Container>
      <Header>
      <Link to="/login">
      <AccountBox
              className={state.user.isLoggedIn ? 'loggedIn' : ''}
            >
              <span className="defaultText">
                {
                  state.user.name || 'Login / Register'
                }
              </span>

              <span className="signOutText">
                {
                  'Logout'
                }
              </span>
            </AccountBox>
          </Link>

        <Link to="/">
          <Title>
            News
          </Title>
        </Link>


          <Link to="/news">
              <SearchIcon viewBox="0 0 32 32" width="1em" height="1em" class="ssrcss-xi5oyi-StyledIcon e161cein1" focusable="false" aria-hidden="true"><path d="m30.6 28.1-8.3-8.3c1.5-2 2.4-4.4 2.4-7.2C24.7 6 19.6 1 13 1S1.4 6.1 1.4 12.7 6.5 24.3 13 24.3c2.3 0 4.4-.6 6.2-1.8l8.5 8.5 2.9-2.9zM4 12.6c0-5.2 3.9-9.1 9-9.1s9 3.9 9 9.1c0 5.2-3.9 9.1-9 9.1s-9-3.9-9-9.1z"></path></SearchIcon>
          </Link>
      </Header>

      <Content>
        {children}
      </Content>
    </Container>
  );
}
export default Template;
