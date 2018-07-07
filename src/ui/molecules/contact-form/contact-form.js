import * as React from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { Formik } from 'formik';

import { AppConsumer } from 'index';

import { Heading, Button, UploadFile } from 'ui/atoms';

import { FormField } from 'ui/molecules';

import { send } from 'ui/outlines';

import * as validation from 'validation';


const Title = Heading.extend`
  text-align: center;
  margin-bottom: 2.4rem;
`.withComponent('h2');

const Description = styled.p`
  margin-top: 0;
  margin-bottom: 2rem;
`;

const FormFieldWrapper = styled.div`
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

const FormFieldsWrapper = styled.div`
  margin-bottom: 4rem;
`;

const FormFooter = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const Wrapper = styled.div`
  max-width: 44rem; 
  margin-right: auto;
  margin-left: auto;
`;


export class ContactForm extends React.Component {
  state = {
    validateOnBlur: false,
    validateOnChange: false,
  };

  handleCancelButtonClick = (e, context) => {
    e.preventDefault();

    context.hideModal();
  };

  handleSubmitButtonClick = () => {
    this.setState({
      validateOnBlur: true,
      validateOnChange: true,
    });
  };

  render() {
    return (
      <Wrapper>
        <AppConsumer>
          { (context) => (
            <React.Fragment>
              <Title type={ 'title' } tag={ 'h2' }>Contact form</Title>
              <Description>
                Found a bug? Wanna make feature request or ask a question? Or maybe something else? Feel free to fill the form below, I will reply you as soon as possible
              </Description>

              <Formik
                validationSchema={
                  Yup.object().shape({
                    name: Yup.string(),
                    email: validation.email.required('Email is required'),
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
                     <form onSubmit={ handleSubmit } noValidate>
                       <FormFieldsWrapper>
                         <FormFieldWrapper>
                           <FormField
                            placeholder={ 'John Doe' }
                            textFieldName={ 'name' }
                            textFieldValue={ values.name }
                            label={ 'Name' }
                            helperText={ !!errors.name ? errors.name : null }
                            error={ !!errors.name }
                            onChange={ handleChange }
                           />
                         </FormFieldWrapper>

                         <FormFieldWrapper>
                           <FormField
                            placeholder={ 'john.doe@gmail.com' }
                            required
                            textFieldName={ 'email' }
                            textFieldValue={ values.email }
                            label={ 'Email' }
                            helperText={ !!errors.email ? errors.email : null }
                            error={ !!errors.email }
                            onChange={ handleChange }
                           />
                         </FormFieldWrapper>

                         <FormFieldWrapper>
                           <FormField
                            placeholder={ 'Bug report' }
                            textFieldName={ 'subject' }
                            textFieldValue={ values.subject }
                            label={ 'Subject' }
                            helperText={ !!errors.subject ? errors.subject : null }
                            error={ !!errors.subject }
                            onChange={ handleChange }
                           />
                         </FormFieldWrapper>

                         <FormFieldWrapper>
                           <FormField
                            tag={ 'textarea' }
                            placeholder={ 'I can\'t logout, I tried to click and reload the page 100500 times, but it doesn\'t work' }
                            required
                            textFieldName={ 'message' }
                            textFieldValue={ values.message }
                            label={ 'Message' }
                            helperText={ !!errors.message ? errors.message : null }
                            error={ !!errors.message }
                            onChange={ handleChange }
                           />
                         </FormFieldWrapper>

                         <FormFieldWrapper>
                           <UploadFile>
                            Add file
                           </UploadFile>
                         </FormFieldWrapper>
                       </FormFieldsWrapper>

                       <FormFooter>
                         <StyledButton
                          type={ 'flat' }
                          onClick={ (e) => this.handleCancelButtonClick(e, context) }
                         >
                          Cancel
                         </StyledButton>
                         <StyledButton
                          icon={ send }
                          iconPosition={ 'right' }
                          onClick={ this.handleSubmitButtonClick }
                         >
                          Submit
                         </StyledButton>
                       </FormFooter>
                     </form>
                  )
                }
              />
            </React.Fragment>
          ) }
        </AppConsumer>
      </Wrapper>
    );
  }
}


ContactForm.propTypes = {};
