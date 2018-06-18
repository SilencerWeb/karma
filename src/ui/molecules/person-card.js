// @flow
import * as React from 'react';
import styled, { css } from 'styled-components';

import { Button, RetinaImage, Heading, Icon } from 'ui/atoms';

import { shortLeftArrow, user } from 'ui/outlines';

import { font, color, transition } from 'ui/theme';


type props = {
  className?: string,
  type: string,
  avatar: {
    _1x: string,
    _2x: string,
  },
  name: string,
  position: string,
  karma: number,
  description: string
};

type state = {};


const Avatar = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 15rem;
  height: 15rem;
  border-radius: 50%;
  background-color: ${color.primary};
  margin-bottom: 0.8rem;

  img {
    max-width: 100%;
  }

  svg {
    font-size: 4.6rem;
    color: #ffffff;
  }
`;

const Name = Heading.extend`
  width: 100%;
  text-transform: capitalize;
  text-align: center;
  outline: none;
  transition: ${transition};
  
  ${p => p.creating && !p.edited && css`
    opacity: 0.5;
  `}
  
  ${p => p.creating && p.edited && css`
    display: none;
  `}
  
  ${p => p.invalid && css`
    color: #db4437;
    opacity: 1;
  `}
`.withComponent('h2');

const EditableName = Name.extend`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
  width: 100%;
  height: 100%;
  opacity: 0;
  visibility: hidden;
  
  ${p => p.creating && css`
    opacity: 1;
    visibility: visible;
  `}
  
  ${p => p.creating && p.edited && css`
    position: static;
    display: block;
  `}
`;

const Position = styled.span`
  display: block;
  width: 100%;
  font-family: ${font.family.secondary};
  font-weight: 700;
  text-align: center;
  color: #828282;
  outline: none;
  transition: ${transition};
  
  ${p => p.creating && !p.edited && css`
    opacity: 0.5;
  `}
  
  ${p => p.creating && p.edited && css`
    display: none;
  `}
  
  ${p => p.invalid && css`
    color: #db4437;
    opacity: 1;
  `}
`;

const EditablePosition = styled(Position)`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
  width: 100%;
  height: 100%;
  opacity: 0;
  visibility: hidden;
  
  ${p => p.creating && css`
    opacity: 1;
    visibility: visible;
  `}
  
  ${p => p.creating && p.edited && css`
    position: static;
    display: block;
  `}
`;

const Karma = styled.span`
  font-family: ${font.family.secondary};
  font-size: 2.5rem;
  margin-bottom: 1.2rem;
  
  ${p => p.status === 'positive' && css`
    color: #27ae60;
  `}
  
  ${p => p.status === 'neutral' && css`
    color: #bdbdbd;
  `}
  
  ${p => p.status === 'negative' && css`
    color: #db4437;
  `}
`;

const Description = styled.p`
  width: 100%;
  text-align: justify;
  margin-top: 0;
  margin-bottom: 4rem;
  outline: none;
  transition: ${transition};
  
  ${p => p.creating && !p.edited && css`
    opacity: 0.5;
  `}
  
  ${p => p.creating && p.edited && css`
    display: none;
  `}
  
  ${p => p.invalid && css`
    color: #db4437;
    opacity: 1;
  `}
`;

const EditableDescription = styled(Description)`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
  width: 100%;
  height: 100%;
  opacity: 0;
  visibility: hidden;
  
  ${p => p.creating && css`
    opacity: 1;
    visibility: visible;
  `}
  
  ${p => p.creating && p.edited && css`
    position: static;
    display: block;
  `}
`;

const ContentEditableWrapper = styled.div`
  position: relative;
  width: 100%;
`;

const Footer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-self: flex-end;
  
  button {
    margin-right: 0.8rem;
    
    &:last-child {
      margin-right: 0;
    }
  }
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #ffffff;
  border-radius: 0.4rem;
  box-shadow: 0 0.8rem 1.6rem rgba(176, 190, 197, 0.24), 0 -0.8rem 1.6rem rgba(176, 190, 197, 0.24);
  padding-top: 3.2rem;
  padding-right: 2.4rem;
  padding-bottom: 3.2rem;
  padding-left: 2.4rem;
`;


export class PersonCard extends React.Component<props, state> {
  state = {
    isCreating: this.props.create,
    name: {
      content: '',
      isEdited: false,
      isInvalid: false,
    },
    position: {
      content: '',
      isEdited: false,
      isInvalid: false,
    },
    description: {
      content: '',
      isEdited: false,
      isInvalid: false,
    },
  };

  handleSaveClick = (e, callback) => {
    const state = this.state;

    const fields = ['name', 'position', 'description'];

    const invalidFields = [];

    fields.forEach((field) => {
      if (state[field].content.length === 0) {
        invalidFields.push(field);
      }
    });

    if (invalidFields.length === 0) {
      this.setState({
        isCreating: false,
      });

      callback();
    } else {
      invalidFields.forEach((invalidField) => {
        state[invalidField].isInvalid = true;
      });

      this.setState(state);
    }
  };

  handleInput = (e, element) => {
    const target = e.currentTarget;

    this.setState({
      [element]: {
        content: target.textContent,
        isEdited: target.textContent.length > 0,
      },
    });
  };

  handleKeyPress = (e, canBeLineBroken) => {
    if (e.which === 13) {
      e.preventDefault();

      if (canBeLineBroken) {
        document.execCommand('insertHTML', false, '<br><br>');
      }
    }
  };

  render() {
    let karmaStatus;
    let karma = this.props.karma;

    if (this.props.karma === 0) {
      karmaStatus = 'neutral';
    } else {
      karmaStatus = this.props.karma > 0 ? 'positive' : 'negative';

      if (karmaStatus === 'positive') {
        karma = `+${this.props.karma}`;
      }
    }

    return (
      <Wrapper className={ this.props.className }>
        {
          !this.props.create ?
            <Avatar>
              <RetinaImage
                src={ {
                  _1x: this.props.avatar._1x,
                  _2x: this.props.avatar._2x,
                } }
                alt={ this.props.name }
              />
            </Avatar>
            :
            <Avatar new>
              <Icon icon={ user }/>
            </Avatar>
        }

        <ContentEditableWrapper>
          <Name
            tag={ 'h2' }
            type={ 'title' }
            creating={ this.state.isCreating }
            edited={ this.state.name.isEdited }
            invalid={ this.state.name.isInvalid }
          >
            { this.state.name.content.length > 0 ? this.state.name.content : this.props.name }
          </Name>
          <EditableName
            tag={ 'h2' }
            type={ 'title' }
            creating={ this.state.isCreating }
            edited={ this.state.name.isEdited }
            contentEditable={ this.state.isCreating }
            onInput={ (e) => this.handleInput(e, 'name') }
            onKeyPress={ (e) => this.handleKeyPress(e, false) }
          />
        </ContentEditableWrapper>

        <ContentEditableWrapper>
          <Position
            creating={ this.state.isCreating }
            edited={ this.state.position.isEdited }
            invalid={ this.state.position.isInvalid }
          >
            { this.state.position.content.length > 0 ? this.state.position.content : this.props.position }
          </Position>
          <EditablePosition
            creating={ this.state.isCreating }
            edited={ this.state.position.isEdited }
            contentEditable={ this.state.isCreating }
            onInput={ (e) => this.handleInput(e, 'position') }
            onKeyPress={ (e) => this.handleKeyPress(e, false) }
          />
        </ContentEditableWrapper>

        <Karma status={ karmaStatus }>{ karma }</Karma>

        <ContentEditableWrapper>
          <Description
            creating={ this.state.isCreating }
            edited={ this.state.description.isEdited }
            invalid={ this.state.description.isInvalid }
          >
            { this.state.description.content.length > 0 ? this.state.description.content : this.props.description }
          </Description>
          <EditableDescription
            creating={ this.state.isCreating }
            edited={ this.state.description.isEdited }
            contentEditable={ this.state.isCreating }
            onInput={ (e) => this.handleInput(e, 'description') }
            onKeyPress={ (e) => this.handleKeyPress(e, true) }
          />
        </ContentEditableWrapper>

        <Footer>
          {
            !this.state.isCreating ?
              <Button icon={ { svg: shortLeftArrow, rotation: 180, } }>More</Button>
              :
              <React.Fragment>
                <Button type={ 'flat' } onClick={ this.props.onCancel }>Cancel</Button>
                <Button onClick={ (e) => this.handleSaveClick(e, this.props.onSave) }>Save</Button>
              </React.Fragment>
          }
        </Footer>
      </Wrapper>
    );
  }
}
