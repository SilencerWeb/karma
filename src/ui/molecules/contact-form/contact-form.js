import * as React from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { Formik } from 'formik';

import { Button } from 'ui/atoms';

import { FormField } from 'ui/molecules';

import { send } from 'ui/outlines';

import * as validation from 'validation';


const StyledFormField = styled(FormField)`
  margin-bottom: 2rem;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const StyledButton = styled(Button)`
  margin-right: 0.8rem;
  
  &:last-child {
    margin-right: 0;
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


export class ContactForm extends React.Component {
  state = {
    validateOnBlur: false,
    validateOnChange: false,
  };

  handleSubmitButtonClick = () => {
    this.setState({
      validateOnBlur: true,
      validateOnChange: true,
    });
  };

  render() {
    return (
      <Formik
        validationSchema={
          Yup.object().shape({
            name: Yup.string(),
            email: validation.email,
            subject: Yup.string(),
            message: Yup.string().required('Message is required'),
          })
        }
        validateOnBlur={ this.state.validateOnBlur }
        validateOnChange={ this.state.validateOnChange }
        onSubmit={ (values) => {
          // eslint-disable-next-line no-console
          console.log(values);
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
                placeholder={ 'John Doe' }
                textFieldName={ 'name' }
                textFieldValue={ values.name }
                label={ 'Name' }
                helperText={ !!errors.name ? errors.name : null }
                error={ !!errors.name }
                onChange={ handleChange }
               />
               <StyledFormField
                placeholder={ 'john.doe@gmail.com' }
                textFieldName={ 'email' }
                textFieldValue={ values.email }
                label={ 'Email *' }
                helperText={ !!errors.email ? errors.email : null }
                error={ !!errors.email }
                onChange={ handleChange }
               />
               <StyledFormField
                placeholder={ 'Bug report' }
                textFieldName={ 'subject' }
                textFieldValue={ values.subject }
                label={ 'Subject' }
                helperText={ !!errors.subject ? errors.subject : null }
                error={ !!errors.subject }
                onChange={ handleChange }
               />
               <StyledFormField
                tag={ 'textarea' }
                placeholder={ 'I can\'t logout, I tried to click and reload the page 100500 times, but it doesn\'t work' }
                textFieldName={ 'message' }
                textFieldValue={ values.message }
                label={ 'Message *' }
                helperText={ !!errors.message ? errors.message : null }
                error={ !!errors.message }
                onChange={ handleChange }
               />

               <FormFooter>
                 <StyledButton type={ 'flat' }>Cancel</StyledButton>
                 <StyledButton
                  icon={ send }
                  iconPosition={ 'right' }  
                  onClick={ this.handleSubmitButtonClick }
                 >
                  Submit
                 </StyledButton>
               </FormFooter>
             </Form>
          )
        }
      />
    );
  }
}


ContactForm.propTypes = {};
