import React, { useEffect, useState } from 'react';
import Joi from 'joi';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import styled from 'styled-components';


import {apis} from '../../app/variables';
import {
  Box,
  Header,
  InputsContainer,
  RegisterButton,
  Input,
  Button
} from '../Login/Login';

import { Link } from 'react-router-dom';
import axios from 'axios';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { useDispatch } from 'react-redux';
import doRegister from './doRegister';
import { setAccountLoggedIn, setName, setUsername } from '../../redux/userSlice';


const Error = styled.p`
  color: red;
`;

const schema = Joi.object({
  fullname: Joi.string().required().min(3),
  username: Joi.string().required().regex(/^[a-zA-Z0-9_-]{3,16}$/),
  password: Joi.string().required().min(6),
  confirmPassword: Joi.string().required().valid(Joi.ref('password'))
});

const Register = () => {
  const dispatch = useDispatch();
  const [failure, setFailure] = useState(false);
  const [duplicate, setDuplicate] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: joiResolver(schema)
  });

  const history = useHistory();

  const submitHandler = (data) => {

    const {username, password, fullname} = data;
    const result = doRegister(
      'users', {
      id: username,
      password,
      fullname
    });

    if (result) {
      dispatch(setUsername(username));
      dispatch(setName(fullname));
      dispatch(setAccountLoggedIn(true));

      history.replace('/');
    }
  }

  return (
    <Box>
      <Header>
        Register in News App
      </Header>
      <InputsContainer>
        <form onSubmit={handleSubmit((data) => submitHandler(data))}>
          <Input
            autoComplete="off"
            {...register('fullname')}
            placeholder="full name"
          />
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
          <Input
            type="password"
            {...register('confirmPassword')}
            placeholder="repeat password"
          />
          <Button>Register</Button>
          {
            !!errors.username
            && (<Error>enter a correct username.</Error>)
          }
          {
            !!errors.fullname
            && (<Error>your name must be at least 3 characters.</Error>)
          }

          {
            !!errors.password
            && (<Error>password must be at least 6 characters.</Error>)
          }

          {
            !!errors.confirmPassword
            && (<Error>passwords are not equal.</Error>)
          }

          {
            !!failure
            && (
              <Error>not successful.</Error>
            )
          }

          {
            !!duplicate
            && (
              <Error>
                your username exists
              </Error>
            )
          }

          <Link to="/Login">
            <RegisterButton >
              login
            </RegisterButton>
          </Link>
        </form>
      </InputsContainer>
    </Box>
  );
}
export default Register;
