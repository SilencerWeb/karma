import * as React from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Mutation, graphql } from 'react-apollo';

import { Button, RetinaImage, Heading, Icon } from 'ui/atoms';

import { shortLeftArrow, user, trashCan } from 'ui/outlines';

import { font, color, transition } from 'ui/theme';

import { UPDATE_PERSON, DELETE_PERSON } from 'graphql/mutations/person';


const Avatar = styled.div`
  width: 15rem;
  height: 15rem;
  border-radius: 50%;
  margin-bottom: 0.8rem;

  img {
    max-width: 100%;
  }
  
  ${p => css`
    
    ${p.new && css`
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: ${color.primary};

      svg {
        font-size: 4.6rem;
        color: #ffffff;
      }
    `}
  `}
`;

const Name = Heading.extend`
  width: 100%;
  text-align: center;
  outline: none;
  transition: ${transition};
  
  ${p => css`

    ${p.creating && !p.edited && css`
      opacity: 0.5;
    `}
    
    ${p.creating && p.edited && css`
      display: none;
    `}
    
    ${p.invalid && css`
      color: ${color.error};
      opacity: 1;
    `}
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
  
  ${p => css`

    ${p.creating && css`
      opacity: 1;
      visibility: visible;
    `}
    
    ${p.creating && p.edited && css`
      position: static;
      display: block;
    `}
  `}
`;

const Position = styled.span`
  display: block;
  width: 100%;
  font-family: ${font.family.secondary};
  font-size: 1.6rem;
  font-weight: 700;
  text-align: center;
  color: #828282;
  outline: none;
  transition: ${transition};
  
  ${p => css`

    ${p.creating && !p.edited && css`
      opacity: 0.5;
    `}
    
    ${p.creating && p.edited && css`
      display: none;
    `}
    
    ${p.invalid && css`
      color: ${color.error};
      opacity: 1;
    `}
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

    ${p.creating && css`
      opacity: 1;
      visibility: visible;
    `}
    
    ${p.creating && p.edited && css`
      position: static;
      display: block;
    `}
  `}
`;

const Karma = styled.span`
  font-family: ${font.family.secondary};
  font-size: 2.5rem;
  margin-bottom: 1.2rem;
  
  ${p => css`

    ${p.status === 'positive' && css`
      color: #27ae60;
    `}
    
    ${p.status === 'neutral' && css`
      color: #bdbdbd;
    `}
    
    ${p.status === 'negative' && css`
      color: ${color.error};
    `}
  `}
`;

const Description = styled.p`
  width: 100%;
  text-align: justify;
  margin-top: 0;
  margin-bottom: 4rem;
  outline: none;
  transition: ${transition};
  
  ${p => css`

    ${p.creating && !p.edited && css`
      opacity: 0.5;
    `}
    
    ${p.creating && p.edited && css`
      display: none;
    `}
    
    ${p.invalid && css`
      color: ${color.error};
      opacity: 1;
    `}
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
  
  ${p => css`

    ${p.creating && css`
      opacity: 1;
      visibility: visible;
    `}
    
    ${p.creating && p.edited && css`
      position: static;
      display: block;
    `}
  `}
`;

const ContentEditableWrapper = styled.div`
  position: relative;
  width: 100%;
  
  ${p => css`
    
    ${p.fullHeight && css`
      flex-grow: 1;
    `}
  `}
`;

const DeletePersonButton = styled(Button)`
  background-color: ${color.error};
`;

const FooterLeftSide = styled.div`
  align-self: flex-start;
`;

const FooterRightSide = styled.div`
  align-self: flex-end;
`;

const Footer = styled.div`
  display: flex;
  justify-content: space-between;
  align-self: flex-end;
  width: 100%;
  
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
  min-height: 58.5rem;
  height: 100%;
  background-color: #ffffff;
  border-radius: 0.4rem;
  box-shadow: 0 0.8rem 1.6rem rgba(176, 190, 197, 0.24), 0 -0.8rem 1.6rem rgba(176, 190, 197, 0.24);
  padding-top: 3.2rem;
  padding-right: 2.4rem;
  padding-bottom: 3.2rem;
  padding-left: 2.4rem;
`;


class PersonCardComponent extends React.PureComponent {
  state = {
    isCreating: this.props.create || false,
    isEditing: false,
    name: {
      content: this.props.name,
      isEdited: false,
      isInvalid: false,
    },
    position: {
      content: this.props.position,
      isEdited: false,
      isInvalid: false,
    },
    description: {
      content: this.props.description,
      isEdited: false,
      isInvalid: false,
    },
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

  handleDeleteButtonClick = (deletePerson) => {
    deletePerson({
      variables: {
        id: this.props.id,
      },
    });
  };

  handleEditButtonClick = () => {
    this.setState({ isEditing: true });

    const editableName = document.querySelector(`#${this.props.id}-editable-name`);
    const editablePosition = document.querySelector(`#${this.props.id}-editable-position`);
    const editableDescription = document.querySelector(`#${this.props.id}-editable-description`);

    editableName.innerHTML = this.state.name.content;
    editablePosition.innerHTML = this.state.position.content;
    editableDescription.innerHTML = this.state.description.content;
  };

  handleCancelButtonClick = () => {
    this.setState({ isEditing: false });

    this.props.onCancelButtonClick && this.props.onCancelButtonClick();
  };

  handleSaveButtonClick = () => {

    this.setState((prevState) => {
      const state = { ...prevState };

      const fields = ['name', 'position', 'description'];

      const invalidFields = [];

      fields.forEach((field) => {
        if (state[field].content.length === 0) {
          invalidFields.push(field);
        }
      });

      if (invalidFields.length === 0) {
        const person = {
          name: state.name.content,
          position: state.position.content,
          description: state.description.content,
        };

        if (state.isEditing) {
          person.id = this.props.id;

          this.props.updatePerson({
            variables: person,
          });

          state.isEditing = false;
        } else {
          this.props.onSaveButtonClick(person);

          state.isCreating = false;
        }
      } else {
        invalidFields.forEach((invalidField) => {
          state[invalidField].isInvalid = true;
        });
      }

      return state;
    });
  };

  static getDerivedStateFromProps = (props, state) => {
    if (!state.isCreating && !state.isEditing) {
      if (props.name) {
        state.name.content = props.name;
      }
      if (props.position) {
        state.position.content = props.position;
      }
      if (props.description) {
        state.description.content = props.description;
      }
    }

    return state;
  };

  render() {
    let karmaStatus;
    let karma = this.props.karma;

    if (karma === 0) {
      karmaStatus = 'neutral';
    } else {
      karmaStatus = karma > 0 ? 'positive' : 'negative';

      if (karmaStatus === 'positive') {
        karma = `+${karma}`;
      }
    }

    return (
      <Wrapper className={ this.props.className }>
        {
          !this.props.create && this.props.avatar ?
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
            creating={ this.state.isCreating || this.state.isEditing }
            edited={ this.state.name.isEdited || this.state.isEditing }
            invalid={ this.state.name.isInvalid }
          >
            { this.state.name.content.length > 0 ? this.state.name.content : this.props.name }
          </Name>
          <EditableName
            id={ this.props.id && `${this.props.id}-editable-name` }
            tag={ 'h2' }
            type={ 'title' }
            creating={ this.state.isCreating || this.state.isEditing }
            edited={ this.state.name.isEdited || this.state.isEditing }
            contentEditable={ this.state.isCreating || this.state.isEditing }
            onInput={ (e) => this.handleInput(e, 'name') }
            onKeyPress={ (e) => this.handleKeyPress(e, false) }
          />
        </ContentEditableWrapper>

        <ContentEditableWrapper>
          <Position
            creating={ this.state.isCreating || this.state.isEditing }
            edited={ this.state.position.isEdited || this.state.isEditing }
            invalid={ this.state.position.isInvalid }
          >
            { this.state.position.content.length > 0 ? this.state.position.content : this.props.position }
          </Position>
          <EditablePosition
            id={ this.props.id && `${this.props.id}-editable-position` }
            creating={ this.state.isCreating || this.state.isEditing }
            edited={ this.state.position.isEdited || this.state.isEditing }
            contentEditable={ this.state.isCreating || this.state.isEditing }
            onInput={ (e) => this.handleInput(e, 'position') }
            onKeyPress={ (e) => this.handleKeyPress(e, false) }
          />
        </ContentEditableWrapper>

        <Karma status={ karmaStatus }>{ karma }</Karma>

        <ContentEditableWrapper fullHeight>
          <Description
            creating={ this.state.isCreating || this.state.isEditing }
            edited={ this.state.description.isEdited || this.state.isEditing }
            invalid={ this.state.description.isInvalid }
          >
            { this.state.description.content.length > 0 ? this.state.description.content : this.props.description }
          </Description>
          <EditableDescription
            id={ this.props.id && `${this.props.id}-editable-description` }
            creating={ this.state.isCreating || this.state.isEditing }
            edited={ this.state.description.isEdited || this.state.isEditing }
            contentEditable={ this.state.isCreating || this.state.isEditing }
            onInput={ (e) => this.handleInput(e, 'description') }
            onKeyPress={ (e) => this.handleKeyPress(e, true) }
          />
        </ContentEditableWrapper>

        <Footer>
          {
            !this.state.isCreating && !this.state.isEditing ?
              <React.Fragment>
                <FooterLeftSide/>

                <FooterRightSide>
                  <Button onClick={ this.handleEditButtonClick }>Edit</Button>
                  <Link to={ `${this.props.authorNickname}/persons/${this.props.id}` }>
                    <Button icon={ {
                      svg: shortLeftArrow,
                      position: 'right',
                      rotation: 180,
                    } }
                    >
                      More
                    </Button>
                  </Link>
                </FooterRightSide>
              </React.Fragment>
              :
              <React.Fragment>
                <FooterLeftSide>
                  { this.state.isEditing &&
                  <Mutation mutation={ DELETE_PERSON }>
                    { (deletePerson, { loading, error }) => {
                      if (error) {
                        return <div>mutation DELETE_PERSON got error: ${ error.message }</div>;
                      } else if (loading) {
                        return <div>mutation DELETE_PERSON is loading...</div>;
                      }

                      return (
                        <DeletePersonButton
                          icon={ {
                            svg: trashCan,
                            position: 'left',
                          } }
                          onClick={ () => this.handleDeleteButtonClick(deletePerson) }
                        >
                          Delete
                        </DeletePersonButton>
                      );
                    }
                    }
                  </Mutation>
                  }
                </FooterLeftSide>

                <FooterRightSide>
                  <Button type={ 'flat' } onClick={ this.handleCancelButtonClick }>Cancel</Button>
                  <Button onClick={ this.handleSaveButtonClick }>Save</Button>
                </FooterRightSide>
              </React.Fragment>
          }
        </Footer>
      </Wrapper>
    );
  }
}


PersonCardComponent.propTypes = {
  className: PropTypes.string,
  avatar: PropTypes.shape({
    _1x: PropTypes.string.isRequired,
    _2x: PropTypes.string.isRequired,
  }),
  id: PropTypes.string,
  name: PropTypes.string.isRequired,
  position: PropTypes.string.isRequired,
  karma: PropTypes.number.isRequired,
  description: PropTypes.string.isRequired,
  create: PropTypes.bool,
  authorNickname: PropTypes.string,
  onCancelButtonClick: PropTypes.func,
  onSaveButtonClick: PropTypes.func,
  updatePerson: PropTypes.func,
};

PersonCardComponent.defaultProps = {
  create: false,
};


export const PersonCard = graphql(UPDATE_PERSON, { name: 'updatePerson' })(PersonCardComponent);
