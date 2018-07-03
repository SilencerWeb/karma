import * as React from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';

import { Label, TextField, Select, HelperText } from 'ui/atoms';

import { color } from 'ui/theme';


const Wrapper = styled.div`
  
  ${p => css`

    ${p.focused && !p.error && css`
    
      ${Label} {
        color: ${color.primary};
      }
    `}
  `}
`;


export class FormField extends React.Component {
  state = {
    value: '',
    focused: false,
  };

  handleTextFieldChange = (e) => {
    this.setState({ value: e.currentTarget.value });
  };

  handleTextFieldFocus = () => {
    this.setState({ focused: true });
  };

  handleTextFieldBlur = () => {
    this.setState({ focused: false });
  };

  handleSelectChange = ({ value }) => {
    this.setState({ value: value });
  };

  render() {
    const isLimited = this.props.tag === 'textarea' && this.props.textFieldLimit && this.props.textFieldLimit > 0;
    const doesValuePassLimit = isLimited && this.state.value.length <= this.props.textFieldLimit;

    let id = this.props.id;

    if (this.props.label && !id) {
      id = Math.random().toString(36).substr(2, 9);
    }

    return (
      <Wrapper
        className={ this.props.className }
        focused={ this.state.focused }
        error={ this.props.error || (isLimited && !doesValuePassLimit) }
      >
        {
          this.props.label &&
          <Label
            htmlFor={ id ? id : null }
            disabled={ this.props.disabled }
            error={ this.props.error || (isLimited && !doesValuePassLimit) }
          >
            { this.props.label }
          </Label>
        }

        {
          this.props.tag !== 'select' ?
            <TextField
              id={ id ? id : null }
              tag={ this.props.tag }
              name={ this.props.textFieldName }
              type={ this.props.textFieldType }
              value={ this.props.textFieldValue || '' }
              placeholder={ this.props.placeholder }
              icon={ this.props.textFieldIcon }
              iconPosition={ this.props.textFieldIconPosition }
              iconRotation={ this.props.textFieldIconRotation }
              disabled={ this.props.disabled }
              error={ this.props.error || (isLimited && !doesValuePassLimit) }
              onChange={ isLimited ? this.handleTextFieldChange : this.props.onChange }
              onFocus={ this.handleTextFieldFocus }
              onBlur={ this.handleTextFieldBlur }
            />
            :
            <Select
              id={ id ? id : null }
              placeholder={ this.props.placeholder }
              options={ this.props.selectOptions }
              type={ this.props.selectType }
              theme={ this.props.selectTheme }
              disabled={ this.props.disabled }
              error={ this.props.error }
              onChange={ this.handleSelectChange }
            />
        }

        {
          isLimited ?
            <HelperText
              disabled={ this.props.disabled }
              error={ this.props.error || (isLimited && !doesValuePassLimit) }
            >
              { this.state.value.length }/{ this.props.textFieldLimit }
            </HelperText>
            :
            this.props.helperText &&
            <HelperText
              icon={ this.props.helperTextIcon }
              iconPosition={ this.props.helperTextIconPosition }
              iconRotation={ this.props.helperTextIconRotation }
              disabled={ this.props.disabled }
              error={ this.props.error }
            >
              { this.props.helperText }
            </HelperText>
        }
      </Wrapper>
    );
  }
}


FormField.propTypes = {
  id: PropTypes.string,
  className: PropTypes.string,
  tag: PropTypes.string,
  placeholder: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),

  textFieldName: PropTypes.string,
  textFieldType: PropTypes.string,
  textFieldValue: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  textFieldIcon: PropTypes.any,
  textFieldIconPosition: PropTypes.string,
  textFieldIconRotation: PropTypes.number,
  textFieldLimit: PropTypes.number,

  selectOptions: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
      isDisabled: PropTypes.bool,
      isSelected: PropTypes.bool,
      avatar: PropTypes.shape({
        _1x: PropTypes.string.isRequired,
        _2x: PropTypes.string.isRequired,
      }),
    }).isRequired,
  ),
  selectType: PropTypes.string,
  selectTheme: PropTypes.string,

  label: PropTypes.string,

  helperText: PropTypes.string,
  helperTextIcon: PropTypes.any,
  helperTextIconPosition: PropTypes.string,
  helperTextIconRotation: PropTypes.number,

  disabled: PropTypes.bool,
  error: PropTypes.bool,

  onChange: PropTypes.func,
};

FormField.defaultProps = {
  tag: 'input',
  disabled: false,
  error: false,
};
