import * as React from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { Redirect } from 'react-router-dom';
import { Mutation } from 'react-apollo';
import { Formik } from 'formik';
import { toast } from 'react-toastify';

import { AppConsumer } from 'index';

import { Button } from 'ui/atoms';

import { FormField, Notification } from 'ui/molecules';

import { CommonTemplate } from 'ui/templates';

import { AUTH_TOKEN } from 'constants.js';

import * as validation from 'validation';

import { SIGNUP, LOGIN } from 'graphql/mutations/authentication';


const FormFieldWrapper = styled.div`
  margin-bottom: 2rem;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const FormFieldsWrapper = styled.div`
  margin-bottom: 4rem;
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


class Page extends React.Component {
  state = {
    type: 'signup',
    takenEmails: [],
    takenNicknames: [],
    invalidLogins: [],
    invalidPasswords: [],
    validateOnBlur: false,
    validateOnChange: false,
    shouldRedirectToMainPage: false,
  };

  handleSignUpFormSubmit = (signup, values, actions) => {
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

      this.props.context.login(user);

      this.setState({
        shouldRedirectToMainPage: true,
      });
    }).catch((error) => {
      if (error) {
        const errorMessage = error.graphQLErrors[0].message;

        if (~errorMessage.indexOf('TakenEmail') || ~errorMessage.indexOf('TakenNickname')) {

          if (~errorMessage.indexOf('TakenEmail')) {
            actions.setFieldError('email', 'Email is already taken');

            this.setState((prevState) => {
              return {
                ...prevState,
                takenEmails: [...prevState.takenEmails, values.email],
              };
            });
          }

          if (~errorMessage.indexOf('TakenNickname')) {
            actions.setFieldError('nickname', 'Nickname is already taken');

            this.setState((prevState) => {
              return {
                ...prevState,
                takenNicknames: [...prevState.takenNicknames, values.nickname],
              };
            });
          }
        } else {
          toast(
            <Notification
              theme={ 'error' }
              message={ 'Something went wrong. Please, try again later.' }
              errorMessage={ errorMessage }
            />,
          );
        }
      }
    });
  };

  handleLoginFormSubmit = (login, values, actions) => {
    login({
      variables: {
        login: values.login,
        password: values.password,
      },
    }).then((response) => {
      const token = response.data.login.token;
      const user = response.data.login.user;

      localStorage.setItem(AUTH_TOKEN, token);

      this.props.context.login(user);

      this.setState({
        shouldRedirectToMainPage: true,
      });
    }).catch((error) => {
      if (error) {
        const errorMessage = error.graphQLErrors[0].message;

        if (~errorMessage.indexOf('InvalidLogin') || ~errorMessage.indexOf('InvalidPassword')) {

          if (~errorMessage.indexOf('InvalidLogin')) {
            actions.setFieldError('login', 'Invalid login');

            this.setState((prevState) => {
              return {
                ...prevState,
                invalidLogins: [...prevState.invalidLogins, values.login],
              };
            });
          }

          if (~errorMessage.indexOf('InvalidPassword')) {
            actions.setFieldError('password', 'Invalid password');

            this.setState((prevState) => {
              const invalidPassword = {
                login: values.login,
                password: values.password,
              };

              return {
                ...prevState,
                invalidPasswords: [...prevState.invalidPasswords, invalidPassword],
              };
            });
          }
        } else {
          toast(
            <Notification
              theme={ 'error' }
              message={ 'Something went wrong. Please, try again later.' }
              errorMessage={ errorMessage }
            />,
          );
        }
      }
    });
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
    const signUpFormValidationSchema = Yup.object().shape({
      email: validation.email
        .test(
          'match',
          'Email is already taken',
          (email) => {
            return this.state.takenEmails.length ? this.state.takenEmails.every((takenEmail) => {
              return email !== takenEmail;
            }) : true;
          },
        )
        .required('Email is required'),
      nickname: Yup.string()
        .test(
          'match',
          'Nickname is already taken',
          (nickname) => {
            return this.state.takenNicknames.length ? this.state.takenNicknames.every((takenNickname) => {
              return nickname !== takenNickname;
            }) : true;
          },
        )
        .required('Nickname is required'),
      name: Yup.string(),
      password: validation.password.required('Password is required'),
      confirmPassword: validation.confirmPassword.required('Password confirmation is required'),
    });

    const loginFormValidationSchema = Yup.object().shape({
      login: Yup.string()
        .test(
          'match',
          'Invalid login',
          (login) => {
            return this.state.invalidLogins.length ? this.state.invalidLogins.every((invalidLogin) => {
              return login !== invalidLogin;
            }) : true;
          },
        )
        .required('Login is required'),
      password: validation.password
        .test(
          'match',
          'Invalid password',
          (password) => {
            return this.state.invalidPasswords.length ? this.state.invalidPasswords.every((invalidPassword) => {
              return this.state.currentLogin === invalidPassword.login ? password !== invalidPassword.password : true;
            }) : true;
          },
        )
        .required('Password is required'),
    });

    return (
      <CommonTemplate centeredContent={ true }>
        { this.state.shouldRedirectToMainPage && <Redirect to={ '/' }/> }

        {
          this.state.type === 'signup' ?
            <Mutation mutation={ SIGNUP }>
              { (signup, { loading, data }) => (
                <React.Fragment>
                  <Formik
                    validationSchema={ signUpFormValidationSchema }
                    validateOnBlur={ this.state.validateOnBlur }
                    validateOnChange={ this.state.validateOnChange }
                    onSubmit={ (values, actions) => this.handleSignUpFormSubmit(signup, values, actions) }
                    render={
                      ({
                         values,
                         errors,
                         handleChange,
                         handleSubmit,
                       }) => (
                         <Form onSubmit={ handleSubmit } noValidate>
                           <FormFieldsWrapper>
                             <FormFieldWrapper>
                               <FormField
                                placeholder={ 'john.doe@gmail.com' }
                                required
                                textFieldName={ 'email' }
                                textFieldType={ 'email' }
                                textFieldAttributes={ { autoComplete: 'email' } }
                                textFieldValue={ values.email }
                                label={ 'Email' }
                                helperText={ !!errors.email ? errors.email : null }
                                error={ !!errors.email }
                                onChange={ handleChange }
                               />
                             </FormFieldWrapper>

                             <FormFieldWrapper>
                               <FormField
                                placeholder={ 'john.doe' }
                                required
                                textFieldName={ 'nickname' }
                                textFieldValue={ values.nickname }
                                label={ 'Nickname' }
                                helperText={ !!errors.nickname ? errors.nickname : null }
                                error={ !!errors.nickname }
                                onChange={ handleChange }
                               />
                             </FormFieldWrapper>

                             <FormFieldWrapper>
                               <FormField
                                placeholder={ 'John Doe' }
                                textFieldName={ 'name' }
                                textFieldValue={ values.name }
                                textFieldAttributes={ { autoComplete: 'name' } }
                                label={ 'Name' }
                                helperText={ !!errors.name ? errors.name : null }
                                error={ !!errors.name }
                                onChange={ handleChange }
                               />
                             </FormFieldWrapper>

                             <FormFieldWrapper>
                               <FormField
                                placeholder={ 'password123' }
                                required
                                textFieldName={ 'password' }
                                textFieldType={ 'password' }
                                textFieldValue={ values.password }
                                textFieldAttributes={ { autoComplete: 'new-password' } }
                                label={ 'Password' }
                                helperText={ !!errors.password ? errors.password : null }
                                error={ !!errors.password }
                                onChange={ handleChange }
                               />
                             </FormFieldWrapper>

                             <FormFieldWrapper>
                               <FormField
                                placeholder={ 'password123' }
                                required
                                textFieldName={ 'confirmPassword' }
                                textFieldType={ 'password' }
                                textFieldValue={ values.confirmPassword }
                                textFieldAttributes={ { autoComplete: 'new-password' } }
                                label={ 'Confirm password' }
                                helperText={ !!errors.confirmPassword ? errors.confirmPassword : null }
                                error={ !!errors.confirmPassword }
                                onChange={ handleChange }
                               />
                             </FormFieldWrapper>
                           </FormFieldsWrapper>

                           <FormFooter>
                             <Button
                              loading={ loading }
                              onClick={ this.handleSubmitButtonClick }
                             >
                              Submit
                             </Button>
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
              { (login, { loading, data }) => (
                <React.Fragment>
                  <Formik
                    validationSchema={ loginFormValidationSchema }
                    validateOnBlur={ this.state.validateOnBlur }
                    validateOnChange={ this.state.validateOnChange }
                    onSubmit={ (values, actions) => this.handleLoginFormSubmit(login, values, actions) }
                    render={
                      ({
                         values,
                         errors,
                         handleChange,
                         handleSubmit,
                         validateForm,
                       }) => (
                         <Form onSubmit={ handleSubmit } noValidate>
                           <FormFieldsWrapper>
                             <FormFieldWrapper>
                               <FormField
                                placeholder={ 'john.doe' }
                                required
                                textFieldName={ 'login' }
                                textFieldValue={ values.login }
                                textFieldAttributes={ { autoComplete: 'email' } }
                                label={ 'Login' }
                                helperText={ !!errors.login ? errors.login : null }
                                error={ !!errors.login }
                                onChange={ (e) => {
                                  this.setState({ currentLogin: e.currentTarget.value });
                                  handleChange(e);

                                  if (this.state.invalidPasswords.length) {
                                    validateForm();
                                  }
                                } }
                               />
                             </FormFieldWrapper>

                             <FormFieldWrapper>
                               <FormField
                                placeholder={ 'password123' }
                                required
                                textFieldName={ 'password' }
                                textFieldType={ 'password' }
                                textFieldValue={ values.password }
                                textFieldAttributes={ { autoComplete: 'current-password' } }
                                label={ 'Password' }
                                helperText={ !!errors.password ? errors.password : null }
                                error={ !!errors.password }
                                onChange={ handleChange }
                               />
                             </FormFieldWrapper>
                           </FormFieldsWrapper>

                           <FormFooter>
                             <Button
                              loading={ loading }
                              onClick={ this.handleSubmitButtonClick }
                             >
                              Submit
                             </Button>
                           </FormFooter>
                         </Form>
                      )
                    }
                  />
                </React.Fragment>
              ) }
            </Mutation>
        }
      </CommonTemplate>
    );
  }
}


Page.propTypes = {
  context: PropTypes.object,
};


const AuthenticationPageWithContext = React.forwardRef((props, ref) => (
  <AppConsumer>
    { (context) => <Page { ...props } context={ context } ref={ ref }/> }
  </AppConsumer>
));


export const AuthenticationPage = AuthenticationPageWithContext;
