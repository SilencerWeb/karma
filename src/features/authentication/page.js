import * as React from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { ApolloConsumer, Mutation } from 'react-apollo';
import { Formik } from 'formik';

import { Button } from 'ui/atoms';

import { FormField } from 'ui/molecules';

import { CommonTemplate } from 'ui/templates';

import * as validation from 'validation';

import { SIGNUP, LOGIN } from 'graphql/mutations/authentication';


const StyledFormField = styled(FormField)`
  margin-bottom: 2rem;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const FormFooter = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const Form = styled.form`
  max-width: 30rem; 
  margin-right: auto;
  margin-left: auto;
`;


export class AuthenticationPage extends React.Component {
  state = {
    type: 'signup',
    validateOnBlur: false,
    validateOnChange: false,
  };

  handleSubmitButtonClick = () => {
    this.setState({
      validateOnBlur: true,
      validateOnChange: true,
    });
  };

  static getDerivedStateFromProps(props, state) {

    if (props.type !== state.type) {
      state.type = props.type;
    }

    return state;
  }

  render() {
    return (
      <CommonTemplate>
        <ApolloConsumer>
          { () => (
            <React.Fragment>
              {
                this.state.type === 'signup' ?
                  <Mutation mutation={ SIGNUP }>
                    { (signup, { loading, error, data }) => (
                      <React.Fragment>
                        { loading && <p>Loading...</p> }
                        { error && <p>Error :( { error.message }</p> }

                        <Formik
                          validationSchema={
                            Yup.object().shape({
                              email: validation.email,
                              name: Yup.string(),
                              nickname: Yup.string().required('Nickname is required'),
                              password: validation.password,
                              confirmPassword: validation.confirmPassword,
                            })
                          }
                          validateOnBlur={ this.state.validateOnBlur }
                          validateOnChange={ this.state.validateOnChange }
                          onSubmit={ (values) => {
                            signup({
                              variables: {
                                email: values.email,
                                password: values.password,
                                nickname: values.nickname,
                                name: values.name,
                              },
                            });
                          } }
                          render={
                            ({
                               values,
                               errors,
                               handleChange,
                               handleSubmit,
                             }) => (
                               <Form onSubmit={ handleSubmit } noValidate>
                                 <StyledFormField
                                  textField={ {
                                    name: 'email',
                                  } }
                                  placeholder={ 'Email' }
                                  value={ values.email }
                                  error={ !!errors.email }
                                  helperText={ !!errors.email && {
                                    content: errors.email,
                                  } }
                                  onChange={ handleChange }
                                 />
                                 <StyledFormField
                                  textField={ {
                                    name: 'nickname',
                                  } }
                                  placeholder={ 'Nickname' }
                                  value={ values.nickname }
                                  error={ !!errors.nickname }
                                  helperText={ !!errors.nickname && {
                                    content: errors.nickname,
                                  } }
                                  onChange={ handleChange }
                                 />
                                 <StyledFormField
                                  textField={ {
                                    name: 'name',
                                  } }
                                  placeholder={ 'Name' }
                                  value={ values.name }
                                  error={ !!errors.name }
                                  helperText={ !!errors.name && {
                                    content: errors.name,
                                  } }
                                  onChange={ handleChange }
                                 />
                                 <StyledFormField
                                  textField={ {
                                    name: 'password',
                                    type: 'password',
                                  } }
                                  placeholder={ 'Password' }
                                  value={ values.password }
                                  error={ !!errors.password }
                                  helperText={ !!errors.password && {
                                    content: errors.password,
                                  } }
                                  onChange={ handleChange }
                                 />
                                 <StyledFormField
                                  name={ 'confirmPassword' }
                                  textField={ {
                                    name: 'confirmPassword',
                                    type: 'password',
                                  } }
                                  placeholder={ 'Confirm password' }
                                  value={ values.confirmPassword }
                                  error={ !!errors.confirmPassword }
                                  helperText={ !!errors.confirmPassword && {
                                    content: errors.confirmPassword,
                                  } }
                                  onChange={ handleChange }
                                 />

                                 <FormFooter>
                                   <Button onClick={ this.handleSubmitButtonClick }>Submit</Button>
                                 </FormFooter>
                               </Form>
                            )
                          }
                        />
                      </React.Fragment>
                    ) }
                  </Mutation>
                  :
                  <Mutation mutation={ LOGIN }>
                    { (login, { loading, error, data }) => (
                      <React.Fragment>
                        { loading && <p>Loading...</p> }
                        { error && <p>Error :( { error.message }</p> }

                        <Formik
                          validationSchema={
                            Yup.object().shape({
                              login: Yup.string().required('Login is required'),
                              password: validation.password,
                            })
                          }
                          validateOnBlur={ this.state.validateOnBlur }
                          validateOnChange={ this.state.validateOnChange }
                          onSubmit={ (values) => {
                            login({
                              variables: {
                                login: values.login,
                                password: values.password,
                              },
                            });
                          } }
                          render={
                            ({
                               values,
                               errors,
                               handleChange,
                               handleSubmit,
                             }) => (
                               <Form onSubmit={ handleSubmit } noValidate>
                                 <StyledFormField
                                  textField={ {
                                    name: 'login',
                                  } }
                                  placeholder={ 'Email or nickname' }
                                  value={ values.login }
                                  error={ !!errors.login }
                                  helperText={ !!errors.login && {
                                    content: errors.login,
                                  } }
                                  onChange={ handleChange }
                                 />
                                 <StyledFormField
                                  textField={ {
                                    name: 'password',
                                    type: 'password',
                                  } }
                                  placeholder={ 'Password' }
                                  value={ values.password }
                                  error={ !!errors.password }
                                  helperText={ !!errors.password && {
                                    content: errors.password,
                                  } }
                                  onChange={ handleChange }
                                 />

                                 <FormFooter>
                                   <Button onClick={ this.handleSubmitButtonClick }>Submit</Button>
                                 </FormFooter>
                               </Form>
                            )
                          }
                        />
                      </React.Fragment>
                    ) }
                  </Mutation>
              }
            </React.Fragment>
          ) }
        </ApolloConsumer>
      </CommonTemplate>
    );
  }
}


AuthenticationPage.propTypes = {};
