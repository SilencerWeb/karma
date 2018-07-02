import * as React from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { Redirect } from 'react-router-dom';
import { Mutation } from 'react-apollo';
import { Formik } from 'formik';

import { AppConsumer } from 'index';

import { Button } from 'ui/atoms';

import { FormField } from 'ui/molecules';

import { CommonTemplate } from 'ui/templates';

import { AUTH_TOKEN } from 'constants.js';

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
    shouldRedirectToMainPage: false,
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
        { this.state.shouldRedirectToMainPage && <Redirect to={ '/' }/> }

        <AppConsumer>
          { (context) => (
            <React.Fragment>
              {
                this.state.type === 'signup' ?
                  <Mutation mutation={ SIGNUP }>
                    { (signup, { loading, error, data }) => (
                      <React.Fragment>
                        { error && <div>mutation SIGNUP got error: { error.message }</div> }
                        { loading && <div>mutation SIGNUP is loading...</div> }

                        <Formik
                          validationSchema={
                            Yup.object().shape({
                              email: validation.email,
                              nickname: Yup.string().required('Nickname is required'),
                              name: Yup.string(),
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
                            }).then((response) => {
                              const token = response.data.signup.token;
                              const user = response.data.signup.user;

                              localStorage.setItem(AUTH_TOKEN, token);

                              context.login(user);

                              this.setState({
                                shouldRedirectToMainPage: true,
                              });
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
                                  placeholder={ 'Email *' }
                                  textFieldName={ 'email' }
                                  textFieldType={ 'email' }
                                  textFieldValue={ values.email }
                                  helperText={ !!errors.email ? errors.email : null }
                                  error={ !!errors.email }
                                  onChange={ handleChange }
                                 />
                                 <StyledFormField
                                  placeholder={ 'Nickname *' }
                                  textFieldName={ 'nickname' }
                                  textFieldValue={ values.nickname }
                                  helperText={ !!errors.nickname ? errors.nickname : null }
                                  error={ !!errors.nickname }
                                  onChange={ handleChange }
                                 />
                                 <StyledFormField
                                  placeholder={ 'Name' }
                                  textFieldName={ 'name' }
                                  textFieldValue={ values.name }
                                  helperText={ !!errors.name ? errors.name : null }
                                  error={ !!errors.name }
                                  onChange={ handleChange }
                                 />
                                 <StyledFormField
                                  placeholder={ 'Password *' }
                                  textFieldName={ 'password' }
                                  textFieldType={ 'password' }
                                  textFieldValue={ values.password }
                                  helperText={ !!errors.password ? errors.password : null }
                                  error={ !!errors.password }
                                  onChange={ handleChange }
                                 />
                                 <StyledFormField
                                  placeholder={ 'Confirm password *' }
                                  textFieldName={ 'confirmPassword' }
                                  textFieldType={ 'password' }
                                  textFieldValue={ values.confirmPassword }
                                  helperText={ !!errors.confirmPassword ? errors.confirmPassword : null }
                                  error={ !!errors.confirmPassword }
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
                        { error && <div>mutation LOGIN got error: { error.message }</div> }
                        { loading && <div>mutation LOGIN is loading...</div> }

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
                            }).then((response) => {
                              const token = response.data.login.token;
                              const user = response.data.login.user;

                              localStorage.setItem(AUTH_TOKEN, token);

                              context.login(user);

                              this.setState({
                                shouldRedirectToMainPage: true,
                              });
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
                                  placeholder={ 'Email or nickname' }
                                  textFieldName={ 'login' }
                                  textFieldValue={ values.login }
                                  helperText={ !!errors.login ? errors.login : null }
                                  error={ !!errors.login }
                                  onChange={ handleChange }
                                 />
                                 <StyledFormField
                                  placeholder={ 'Password' }
                                  textFieldName={ 'password' }
                                  textFieldType={ 'password' }
                                  textFieldValue={ values.password }
                                  helperText={ !!errors.password ? errors.password : null }
                                  error={ !!errors.password }
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
        </AppConsumer>
      </CommonTemplate>
    );
  }
}


AuthenticationPage.propTypes = {};
