import * as React from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import ReactSelect from 'react-select';

import { Icon, Checkbox, RetinaImage } from 'ui/atoms';

import { check, close } from 'ui/outlines';

import { color, transition } from 'ui/theme';


const Wrapper = styled.div`
  max-width: 20rem;
  margin-bottom: 0.4rem;
  transition: ${transition};
  
  &:last-child {
    margin-bottom: 0;
  }

  .react-select {

    &__control {
      min-height: 3.4rem;
      background-color: transparent;
      border: none;
      border-bottom: 0.1rem solid #bdbdbd;
      border-radius: 0;
      box-shadow: none;
      padding-top: 0;
      padding-right: 1.2rem;
      padding-bottom: 0.8rem;
      padding-left: 0;
      transition: ${transition};
      
      
      &:hover {
        border-bottom-color: #828282;
      }
    
      &-is-focused {
        border-bottom-color: ${color.primary};
        
        &:hover {
          border-bottom-color: ${color.primary};
        }
      }
    }
    
    &__value-container {
      flex-wrap: nowrap;
      white-space: nowrap;
      padding-top: 0;
      padding-right: 0;
      padding-bottom: 0;
      padding-left: 0;
      overflow: hidden;
    }
    
    &__single-value {
      color: inherit;
      margin-right: 0;
      margin-left: 0;
    }
    
    &__multi-value {
   
      &:last-of-type {
      
        .react-select__multi-value__label:after {
          display: none;
        }
      }
    
      &__label {
        white-space: nowrap; 
        text-overflow: ellipsis;
        padding-right: 0.2rem;
        overflow: hidden;
        
        &:after {
          content: ',';
        }
      }
      
      &__remove {
        display: none;
      }
    }
    
    &__placeholder {
      width: 100%;
      white-space: nowrap; 
      text-overflow: ellipsis; 
      color: #828282;
      padding-right: 0.8rem;
      margin-right: 0;
      margin-left: 0;
      overflow: hidden;
    }
  
    &__indicator-separator {
      display: none;
    }
    
    &__clear-indicator {
      display: flex;
      align-items: center;
      padding-top: 0.8rem;
      padding-right: 0.8rem;
      padding-bottom: 0.8rem;
      padding-left: 0.8rem;
      margin-right: 0.8rem;
      cursor: pointer;
      transition: ${transition};
      
      &:hover {
        color: ${color.primary};
      }
      
      svg {
        font-size: 0.8rem;
      }
    }
    
    &__dropdown-indicator {
      position: relative;
      padding-top: 0;
      padding-right: 0;
      padding-bottom: 0;
      padding-left: 0;
      
      &:before {
        content: '';
        width: 0; 
        height: 0;
        border-top: 0.5rem solid #828282;
        border-right: 0.5rem solid transparent;
        border-left: 0.5rem solid transparent;
      }
      
      svg {
        display: none;
      }
    }
    
    &__menu {
      border-radius: 0.8rem;
      border-top-right-radius: 0;
      border-top-left-radius: 0;
      box-shadow: 0 0.8rem 2.4rem 0 rgba(176, 190, 197, 0.64);
      overflow: hidden;
      margin-top: 0;
      margin-bottom: 0;
    }
    
    &__option {
      display: flex;
      align-items: center;
      background-color: #ffffff;
      padding-top: 0.8rem;
      padding-right: 2rem;
      padding-bottom: 0.8rem;
      padding-left: 2rem;
      cursor: pointer;
      outline: none;
      
      &:hover,
      &:focus {
        background-color: #e0e0e0;
      }
      
      span {
        white-space: nowrap; 
        text-overflow: ellipsis; 
        overflow: hidden;
      }
        
      &--is-disabled {
        color: ${color.text.primary};
        opacity: 0.5;
        cursor: not-allowed;
      
        &:hover {
          background-color: #ffffff;
        }
      }
    }
  }
  
  ${p => css`
  
    ${p.type === 'single' && css`
  
      .react-select {
    
        &__option {
    
          &--is-selected {
            color: ${color.text.secondary};
            background-color: ${color.primary};
            transition: ${transition};
          
            &:hover {
              background-color: ${color.primary};
            }
          }
        }
      }
    `}
    
    ${(p.type !== 'single' || p.theme !== 'simple') && css` // passing elements: SingleSimple, MultiAvatar, MultiAvatar
  
      .react-select {
    
        &__option {
          padding-right: 1.2rem;
          padding-left: 1.2rem;
        }
      }
    `}
    
    ${p.disabled && css`
      opacity: 0.5;
      cursor: not-allowed;
      
      .react-select {
  
        &__value-container {
          margin-right: 0.8rem;
        }
      }
    `}
    
    ${p.error && !p.disabled && css`
      
      .react-select {
      
        &__control {
          border-bottom-color: #db4437;
          
          &:hover {
            border-bottom-color: #db4437;
          }
          
          &-is-focused {
            border-bottom-color: #db4437;
            
            &:hover {
              border-bottom-color: #db4437;
            }
          }
        }
      }
    `}
    
    ${p.fullWidth && css`
      max-width: initial;
    `}
  `}
`;

const Avatar = styled.div`
  position: relative;
  width: 2.4rem;
  height: 2.4rem;
  border-radius: 50%;
  margin-right: 1.2rem;
  
  &:after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;  
    width: 100%;
    height: 100%;
    background-color: ${color.primary};
    border-radius: 50%;
    opacity: 0;
    visibility: hidden;
    transition: ${transition};
  }
  
  svg {
    position: absolute;
    top: 50%;
    left: 50%;
    z-index: 1;
    font-size: 1.4rem;
    color: #ffffff;
    transform: translate(-50%, -50%);
    opacity: 0;
    visibility: hidden;
    transition: ${transition};
  }
  
  ${p => css`
  
    ${p.selected && p.type === 'multi' && css`
  
      &:after {
        opacity: 0.8;
        visibility: visible;
      }
  
      svg {
        opacity: 1;
        visibility: visible;
      }
    `}
  `}
`;


const ClearIndicator = (props) => {
  const {
    innerProps: { ref, ...restInnerProps },
  } = props;

  const className = `${props.selectProps.classNamePrefix}__clear-indicator`;

  return (
    <div className={ className } ref={ ref } { ...restInnerProps }>
      <Icon icon={ close }/>
    </div>
  );
};

const SingleSimpleOption = (props) => {
  const { innerProps } = props;

  const className = `${props.selectProps.classNamePrefix}__option`;
  const selectedClassName = `${props.selectProps.classNamePrefix}__option--is-selected`;
  const disabledClassName = `${props.selectProps.classNamePrefix}__option--is-disabled`;

  const optionClassNames = classNames(
    className,
    { [selectedClassName]: props.isSelected, },
    { [disabledClassName]: props.isDisabled, },
  );

  return (
    <div className={ optionClassNames } { ...innerProps }>
      <span>{ props.children }</span>
    </div>
  );
};

const MultiSimpleOption = (props) => {
  const { innerProps } = props;

  const className = `${props.selectProps.classNamePrefix}__option`;
  const selectedClassName = `${props.selectProps.classNamePrefix}__option--is-selected`;
  const disabledClassName = `${props.selectProps.classNamePrefix}__option--is-disabled`;

  const optionClassNames = classNames(
    className,
    { [selectedClassName]: props.isSelected, },
    { [disabledClassName]: props.isDisabled, },
  );

  return (
    <div className={ optionClassNames } { ...innerProps }>
      <Checkbox checked={ props.isSelected } readOnly/>
      <span>{ props.children }</span>
    </div>
  );
};

const SingleAvatarOption = (props) => {
  const { innerProps } = props;

  const className = `${props.selectProps.classNamePrefix}__option`;
  const selectedClassName = `${props.selectProps.classNamePrefix}__option--is-selected`;
  const disabledClassName = `${props.selectProps.classNamePrefix}__option--is-disabled`;

  const optionClassNames = classNames(
    className,
    { [selectedClassName]: props.isSelected, },
    { [disabledClassName]: props.isDisabled, },
  );

  const imageSources = {
    _1x: props.data.avatar._1x,
    _2x: props.data.avatar._2x,
  };

  return (
    <div className={ optionClassNames } { ...innerProps }>
      <Avatar>
        <RetinaImage src={ imageSources } alt={ props.children }/>
      </Avatar>
      <span>{ props.children }</span>
    </div>
  );
};

const MultiAvatarOption = (props) => {
  const { innerProps } = props;

  const className = `${props.selectProps.classNamePrefix}__option`;
  const selectedClassName = `${props.selectProps.classNamePrefix}__option--is-selected`;
  const disabledClassName = `${props.selectProps.classNamePrefix}__option--is-disabled`;

  const optionClassNames = classNames(
    className,
    { [selectedClassName]: props.isSelected, },
    { [disabledClassName]: props.isDisabled, },
  );

  const imageSources = {
    _1x: props.data.avatar._1x,
    _2x: props.data.avatar._2x,
  };

  return (
    <div className={ optionClassNames } { ...innerProps }>
      <Avatar type={ 'multi' } selected={ props.isSelected }>
        <RetinaImage src={ imageSources } alt={ props.children }/>
        <Icon icon={ check }/>
      </Avatar>
      <span>{ props.children }</span>
    </div>
  );
};


export const Select = (props) => {
  const styles = {
    multiValue: () => ({}),
    multiValueLabel: () => ({}),
    multiValueRemove: () => ({}),
  };

  const components = {
    single: {
      simple: {
        Option: SingleSimpleOption,
      },
      avatar: {
        ClearIndicator,
        Option: SingleAvatarOption,
      },
    },
    multi: {
      simple: {
        ClearIndicator,
        Option: MultiSimpleOption,
      },
      avatar: {
        ClearIndicator,
        Option: MultiAvatarOption,
      },
    },
  };

  return (
    <Wrapper
      id={ props.id }
      className={ props.className }
      type={ props.type }
      theme={ props.theme }
      disabled={ props.disabled }
      error={ props.error }
      fullWidth={ props.fullWidth }
    >
      <ReactSelect
        classNamePrefix={ 'react-select' }
        placeholder={ props.placeholder }
        options={ props.options }
        styles={ styles }
        components={ components[props.type][props.theme] }
        hideSelectedOptions={ false }
        closeMenuOnSelect={ props.type !== 'multi' }
        isMulti={ props.type === 'multi' }
        isSearchable={ false }
        isDisabled={ props.disabled }
      />
    </Wrapper>
  );
};


Select.propTypes = {
  id: PropTypes.string,
  className: PropTypes.string,
  placeholder: PropTypes.string,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
      isDisabled: PropTypes.bool,
      avatar: {
        _1x: PropTypes.string.isRequired,
        _2x: PropTypes.string.isRequired,
      },
    }),
  ).isRequired,
  type: PropTypes.string,
  theme: PropTypes.string,
  disabled: PropTypes.bool,
  error: PropTypes.bool,
  fullWidth: PropTypes.bool,
};

Select.defaultProps = {
  options: {
    isDisabled: false,
  },
  type: 'single',
  theme: 'simple',
  disabled: false,
  error: false,
  fullWidth: false,
};
