import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import Joi from 'joi';
import { Redirect } from 'react-router-dom';
import { joiResolver } from '@hookform/resolvers/joi';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import {apis} from '../../app/variables';
import Input from '../../components/Input';
import Button from '../../components/Button';

import {
  setUsername,
  selectUsername,
  setName,
  setToken,
  setAccountLoggedIn
} from '../../redux/userSlice';
import doLogin from './doLogin';

const Container = styled.div`
  background: #eff4f4;
`;

const Box = styled.div`
  text-align: center;
  background: white;
  border-radius: 30px;
  width: 30%;
  margin: 100px 35% 100px 35%;
  padding: 20px;

  @media only screen and (max-width: 800px) {
    width: 90%;
    margin: 100px 5% 100px 5%;
    box-sizing: border-box;
    background-color: transparent;
  }
`;

const Logo = styled.img`
  width: 100px;
`;

const Header = styled.h1`
  text-align: center;
  color: gray;
`;

const InputsContainer = styled.div`
  width: 70%;
  margin: auto 15% 10% 15%;
`;

const RegisterButton = styled.p`
  color: gray;

  ::before {
    content: '- '
  }
`;

const Error = styled.p`
  color: red;
`;

const schema = Joi.object({
  username: Joi.string().required().regex(/^[a-zA-Z0-9_-]{3,16}$/),
  password: Joi.string().required().min(6),
});

const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: joiResolver(schema)
  });
  const [failure, setFailure] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setUsername(''));
    dispatch(setName(''));
    dispatch(setAccountLoggedIn(false));
  }, []);


  const submitHandler = async (reqData) => {
      const result = await doLogin(reqData.username, reqData.password)
      if (result !== undefined && result !== false) {
        dispatch(setUsername(reqData.username));
        dispatch(setName(reqData.username));
        dispatch(setAccountLoggedIn(true));

        setLoggedIn(true);

        return;
      }
      else {
        setFailure(true)
      }
      
  }

  return (
    <Container>
      <Box>
        <Header>Login to News App</Header>
        <form onSubmit={handleSubmit((data => submitHandler(data)))}>
          <InputsContainer>
            <Input
              autoComplete="off"
              {...register('username')}
              placeholder="username"
            />
            <Input
              type="password"
              {...register('password')}
              placeholder="password"
            />
            <Button>login</Button>

            {
              !!Object.keys(errors).length
              && (
                <Error>Wrong username.</Error>
              )
            }

            {
              !!failure
              && (
                <Error>Wrong username or password.</Error>
              )
            }

            <Link to="/Register">
              <RegisterButton href="/Register">
                Register
              </RegisterButton>
            </Link>
          </InputsContainer>
        </form>

        {
          loggedIn ? (<Redirect to="/" />) : null
        }

      </Box>
    </Container>
  );
}

export default Login;

export {
  Box,
  Logo,
  Header,
  InputsContainer,
  RegisterButton,
  Input,
  Button
}
