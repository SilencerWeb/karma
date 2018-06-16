// @flow
import * as React from 'react';
import styled, { css } from 'styled-components';

import { Label, TextField, Select, HelperText } from 'ui/atoms';

import { color } from 'ui/theme';


type props = {
  id?: string,
  className?: string,
  tag?: string,
  placeholder?: string,
  icon?: {
    svg: any,
    height?: number,
    position?: string,
    rotation?: number,
  },
  label?: string,
  helperText?: {
    content: string,
    icon?: {
      svg: any,
      height?: number,
      position?: string,
      rotation?: number,
    },
  },
  limit?: number,
  disabled?: boolean,
  error?: boolean,
  fullWidth?: boolean,
};

type state = {
  value: string,
};


const Wrapper = styled.div`
  max-width: 20rem;
  
  ${p => p.focused && css`
  
    ${Label} {
      color: ${color.primary};
    }
  `}
  
  ${p => p.fullWidth && css`
    max-width: initial;
  `}
`;


export class FormField extends React.Component<props, state> {
  state = {
    value: '',
    focused: false,
  };

  handleTextFieldChange = (e: SyntheticEvent<HTMLInputElement>) => {
    (e.currentTarget: HTMLInputElement);

    const value = e.currentTarget.value;

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
    // so many conditions with this.props.limit because of flow
    const isLimited = this.props.tag === 'textarea' && this.props.limit && this.props.limit > 0;
    const doesValuePassLimit = isLimited && this.props.limit && this.state.value.length <= this.props.limit;

    let id = this.props.id || Math.random().toString(36).substr(2, 9);

    return (
      <Wrapper
        className={ this.props.className }
        focused={ this.state.focused }
        fullWidth={ this.props.fullWidth }
      >
        {
          this.props.label &&
          <Label
            htmlFor={ id }
            disabled={ this.props.disabled }
            error={ this.props.error }
          >
            { this.props.label }
          </Label>
        }

        {
          this.props.tag === 'select' ?
            <Select
              id={ id }
              placeholder={ this.props.placeholder }
              options={ this.props.options }
              type={ this.props.type }
              theme={ this.props.theme }
              disabled={ this.props.disabled }
              error={ this.props.error }
              fullWidth={ this.props.fullWidth }
              onChange={ this.handleTextFieldChange }
            />
            :
            <TextField
              id={ id }
              tag={ this.props.tag }
              placeholder={ this.props.placeholder }
              value={ this.state.value }
              icon={ this.props.icon }
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
              error={ this.props.error }
            >
              { this.state.value.length }/{ this.props.limit }
            </HelperText>
            :
            this.props.helperText &&
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
