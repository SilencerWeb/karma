import * as React from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';

import { Label, TextField, Select, HelperText } from 'ui/atoms';

import { color } from 'ui/theme';


const Wrapper = styled.div`
  max-width: 20rem;
  
  ${p => css`

    ${p.focused && !p.error && css`
    
      ${Label} {
        color: ${color.primary};
      }
    `}
    
    ${p.fullWidth && css`
      max-width: initial;
    `}
  `}
`;


export class FormField extends React.Component {
  state = {
    value: '',
    focused: false,
  };

  handleTextFieldChange = (e) => {
    const value = e.currentTarget.value;

    this.setState({
      value: value,
    });
  };

  handleSelectChange = ({ value }) => {
    this.setState({
      value: value,
    });
  };

  handleTextFieldFocus = () => {
    this.setState({
      focused: true,
    });
  };

  handleTextFieldBlur = () => {
    this.setState({
      focused: false,
    });
  };

  render() {
    const isLimited = this.props.tag === 'textarea' && this.props.textField.limit && this.props.textField.limit > 0;
    const doesValuePassLimit = isLimited && this.state.value.length <= this.props.textField.limit;

    let id = this.props.id || Math.random().toString(36).substr(2, 9);

    return (
      <Wrapper
        className={ this.props.className }
        focused={ this.state.focused }
        error={ this.props.error || isLimited && !doesValuePassLimit }
        fullWidth={ this.props.fullWidth }
      >
        {
          this.props.label &&
          <Label
            htmlFor={ id }
            disabled={ this.props.disabled }
            error={ this.props.error || isLimited && !doesValuePassLimit }
          >
            { this.props.label }
          </Label>
        }

        {
          this.props.tag === 'select' ?
            <Select
              id={ id }
              placeholder={ this.props.placeholder }
              options={ this.props.select.options }
              type={ this.props.select.type }
              theme={ this.props.select.theme }
              disabled={ this.props.disabled }
              error={ this.props.error }
              fullWidth={ this.props.fullWidth }
              onChange={ this.handleSelectChange }
            />
            :
            <TextField
              id={ id }
              tag={ this.props.tag }
              placeholder={ this.props.placeholder }
              value={ this.state.value }
              icon={ this.props.textField && this.props.textField.icon }
              disabled={ this.props.disabled }
              error={ this.props.error || isLimited && !doesValuePassLimit }
              fullWidth={ this.props.fullWidth }
              onChange={ this.handleTextFieldChange }
              onFocus={ this.handleTextFieldFocus }
              onBlur={ this.handleTextFieldBlur }
            />
        }

        {
          isLimited ?
            <HelperText
              disabled={ this.props.disabled }
              error={ this.props.error || isLimited && !doesValuePassLimit }
            >
              { this.state.value.length }/{ this.props.textField.limit }
            </HelperText>
            :
            this.props.helperText && this.props.helperText.content &&
            <HelperText
              icon={ this.props.helperText.icon }
              disabled={ this.props.disabled }
              error={ this.props.error }
            >
              { this.props.helperText.content }
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
  placeholder: PropTypes.string,
  select: PropTypes.shape({
    options: PropTypes.arrayOf(
      PropTypes.shape({
        label: PropTypes.string.isRequired,
        value: PropTypes.string.isRequired,
        isDisabled: PropTypes.bool,
        avatar: {
          _1x: PropTypes.string.isRequired,
          _2x: PropTypes.string.isRequired,
        },
      })
    ).isRequired,
    type: PropTypes.string,
    theme: PropTypes.string,
  }),
  textField: PropTypes.shape({
    icon: PropTypes.shape({
      svg: PropTypes.any.isRequired,
      position: PropTypes.string.isRequired,
      rotation: PropTypes.number,
    }),
    limit: PropTypes.number,
  }),
  label: PropTypes.string,
  helperText: PropTypes.shape({
    content: PropTypes.string.isRequired,
    icon: PropTypes.shape({
      svg: PropTypes.any.isRequired,
      position: PropTypes.string.isRequired,
      rotation: PropTypes.number,
    }),
  }),
  disabled: PropTypes.bool,
  error: PropTypes.bool,
  fullWidth: PropTypes.bool,
};

FormField.defaultProps = {
  tag: 'input',
  disabled: false,
  error: false,
  fullWidth: false,
};
