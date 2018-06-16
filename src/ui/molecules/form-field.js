// @flow
import * as React from 'react';
import styled, { css } from 'styled-components';

import { Label, TextField, HelperText } from 'ui/atoms';


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
  
  ${p => p.fullWidth && css`
    max-width: initial;
  `}
`;


export class FormField extends React.Component<props, state> {
  state = {
    value: '',
  };

  handleTextFieldChange = (e: SyntheticEvent<HTMLInputElement>) => {
    (e.currentTarget: HTMLInputElement);

    const value = e.currentTarget.value;

    this.setState({
      value: value,
    });
  };

  render() {
    let helperText;

    // so many conditions with this.props.limit because of flow
    const isLimited = this.props.tag === 'textarea' && this.props.limit && this.props.limit > 0;
    const doesValuePassLimit = isLimited && this.props.limit && this.state.value.length <= this.props.limit;

    if (isLimited) {
      helperText = <HelperText
        disabled={ this.props.disabled }
        error={ this.props.error }
      >
        { this.state.value.length }/{ this.props.limit }
      </HelperText>;
    } else if (this.props.helperText) {
      helperText = <HelperText
        icon={ this.props.helperText.icon }
        disabled={ this.props.disabled }
        error={ this.props.error }
      >
        { this.props.helperText.content }
      </HelperText>;
    }

    let id = this.props.id || Math.random().toString(36).substr(2, 9);

    return (
      <Wrapper className={ this.props.className } fullWidth={ this.props.fullWidth }>
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
        />
        { helperText }
      </Wrapper>
    );
  }
}
