import * as React from 'react';
import styled, { css } from 'styled-components';
import { lighten } from 'polished';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import deepEqual from 'deep-equal';

import { Button, Heading } from 'ui/atoms';

import { Avatar, Modal } from 'ui/molecules';

import {
  CancelActionConfirmation,
  UpdatePersonConfirmation,
  DeletePersonConfirmation,
} from 'ui/organisms';

import { shortLeftArrow, user, trashCan } from 'ui/outlines';

import { font, color, transition } from 'ui/theme';


const StyledAvatar = styled(Avatar)`
  margin-bottom: 0.8rem;
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
    
  ${p => css`

    ${!p.disabled && css`

      &:hover {
        background-color: ${lighten(0.15, color.error)};
      }
    `}
  `}
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
  transition: ${transition};
  
  &:hover {
    box-shadow: 0 0.8rem 1.6rem rgba(176, 190, 197, 0.44), 0 -0.8rem 1.6rem rgba(176, 190, 197, 0.44);
  }
`;


export class PersonCard extends React.PureComponent {
  state = {
    isCreating: false,
    isEditing: false,
    person: null,
    updatedPerson: null,
    fieldsEditedInfo: null,
    invalidFields: null,
  };

  handleInput = (e, element) => {
    const target = e.currentTarget;

    this.setState((prevState) => {
      const fields = ['name', 'position'];

      const invalidFields = [];

      fields.forEach((field) => {
        const content = field === element ? target.textContent : prevState.updatedPerson[field];

        if (content.length === 0) {
          invalidFields.push(field);
        }
      });

      return {
        ...prevState,
        updatedPerson: {
          ...prevState.updatedPerson,
          [element]: target.textContent,
        },
        fieldsEditedInfo: {
          ...prevState.fieldsEditedInfo,
          [element]: target.textContent.length > 0,
        },
        invalidFields: invalidFields,
      };
    });
  };

  handleKeyPress = (e, canBeLineBroken) => {
    if (e.which === 13) {
      e.preventDefault();

      // if (canBeLineBroken) {
      //   document.execCommand('insertHTML', false, '<br><br>');
      // }
    }
  };

  handlePaste = (e) => {
    e.preventDefault();

    const text = e.clipboardData.getData('text/plain');

    document.execCommand('insertHTML', false, text);
  };

  handleFileInputChange = (e, uploadFile) => {
    const file = e.currentTarget.files[0];

    if (file) {
      uploadFile({
        variables: {
          file: file,
        },
      }).then((response) => {
        this.setState((prevState) => {

          return {
            ...prevState,
            updatedPerson: {
              ...prevState.updatedPerson,
              avatar: {
                id: response.data.uploadFile.id,
                url: response.data.uploadFile.url,
              },
            },
            isAvatarLoading: false,
          };
        });
      });

      this.setState({
        isAvatarLoading: true,
      });
    }
  };

  handleRemoveAvatarClick = (deleteFile) => {
    this.setState((prevState) => {
      if (prevState.isCreating) {
        deleteFile({
          variables: {
            id: prevState.updatedPerson.avatar.id,
          },
        });
      }

      return {
        ...prevState,
        updatedPerson: {
          ...prevState.updatedPerson,
          avatar: null,
        },
      };
    });
  };

  handleDeleteButtonClick = () => {
    this.setState({ isDeletePersonConfirmationOpen: true });
  };

  handleEditButtonClick = () => {
    const editableName = document.querySelector(`#${this.props.id}-editable-name`);
    const editablePosition = document.querySelector(`#${this.props.id}-editable-position`);
    const editableDescription = document.querySelector(`#${this.props.id}-editable-description`);

    editableName.innerHTML = this.state.person.name;
    editablePosition.innerHTML = this.state.person.position;
    editableDescription.innerHTML = this.state.person.description;

    this.setState({ isEditing: true });
  };

  handleCancelButtonClick = () => {
    if (this.state.isCreating) {
      const fields = ['name', 'position', 'description'];

      const isAnyFieldFilled = fields.some((field) => {
        return this.state.updatedPerson[field].length > 0;
      });

      if (isAnyFieldFilled || this.state.updatedPerson.avatar) {
        this.setState({ isCancelCreatingPersonConfirmationOpen: true });
      } else {
        this.props.onCancelButtonClick && this.props.onCancelButtonClick();
      }
    } else {
      const arePersonAndUpdatedPersonEqual = deepEqual(this.state.person, this.state.updatedPerson);

      if (!arePersonAndUpdatedPersonEqual) {
        this.setState({ isCancelUpdatingPersonConfirmationOpen: true });
      } else {
        this.setState({ isEditing: false });

        this.props.onCancelButtonClick && this.props.onCancelButtonClick();
      }
    }
  };

  handleSaveButtonClick = () => {

    this.setState((prevState) => {
      const state = { ...prevState };

      const arePersonAndUpdatedPersonEqual = deepEqual(this.state.person, this.state.updatedPerson);

      if (!arePersonAndUpdatedPersonEqual && prevState.invalidFields.length === 0) {
        const person = {
          name: state.updatedPerson.name,
          position: state.updatedPerson.position,
          description: state.updatedPerson.description,
        };

        if (state.updatedPerson.avatar && state.updatedPerson.avatar.id) {
          person.avatar = state.updatedPerson.avatar.id;
        } else {
          person.deleteAvatar = true;
        }

        if (state.isEditing) {
          person.id = this.props.id;

          state.personForUpdate = person;
          state.isUpdatePersonConfirmationOpen = true;
        } else {
          this.props.onSaveButtonClick(person);

          state.isLoading = true;
        }
      } else {
        state.isEditing = false;
      }

      return state;
    });
  };


  static getDerivedStateFromProps = (props, state) => {
    if (!state.person || (!state.isCreating && !state.isEditing)) {
      const person = {
        id: props.id,
        avatar: props.avatar,
        name: props.name || '',
        position: props.position || '',
        description: props.description || '',
      };

      state.person = person;
      state.updatedPerson = person;
      state.fieldsEditedInfo = {};
      state.invalidFields = [];

      if (props.create) {
        state.isCreating = props.create;
        state.invalidFields = ['name', 'position'];
      }
    }

    return state;
  };


  render() {
    let isCreating = this.state.isCreating;
    let isEditing = this.state.isEditing;
    let isCreatingOrEditing = isCreating || isEditing;


    let person = this.state.person;
    let updatedPerson = this.state.updatedPerson;


    let avatar;
    let name;
    let position;
    let description;

    if (person) {
      name = isCreatingOrEditing ? updatedPerson.name : person.name;
      position = isCreatingOrEditing ? updatedPerson.position : person.position;
      description = isCreatingOrEditing ? updatedPerson.description : person.description;
      avatar = isCreatingOrEditing ? updatedPerson.avatar && updatedPerson.avatar.url : person.avatar && person.avatar.url;
    }


    if (isCreatingOrEditing) {
      // Placeholders
      name = name ? name : 'John Doe';
      position = position ? position : 'Buddy';
      description = description ? description : 'Music fan. Alcohol enthusiast. Creator. Devoted social media geek. Total analyst. Coffee lover. Beer junkie. Coffee maven. Avid alcohol lover. Twitter expert. Lifelong tv ninja. Creator. Passionate tv nerd. Problem solver. Proud alcohol evangelist. Lifelong web junkie. Coffee maven. Unapologetic social media advocate. Analyst. Tv trailblazer. Zombie geek. Twitter aficionado. Reader.';
    }


    if (!description && !isCreatingOrEditing) {
      description = 'No description';
    }


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
        <StyledAvatar
          url={ avatar ? avatar : null }
          alt={ name }
          icon={ user }
          edit={ isCreatingOrEditing }
          onRemoveAvatarClick={ this.handleRemoveAvatarClick }
          onFileInputChange={ this.handleFileInputChange }
        />

        <ContentEditableWrapper>
          <Name
            tag={ 'h2' }
            type={ 'title' }
            creating={ isCreatingOrEditing }
            edited={ this.state.fieldsEditedInfo.name }
          >
            { name }
          </Name>
          <EditableName
            id={ `${this.props.id}-editable-name` }
            tag={ 'h2' }
            type={ 'title' }
            creating={ isCreatingOrEditing }
            edited={ this.state.fieldsEditedInfo.name }
            contentEditable={ isCreatingOrEditing }
            onInput={ (e) => this.handleInput(e, 'name') }
            onKeyPress={ (e) => this.handleKeyPress(e, false) }
            onPaste={ (e) => this.handlePaste(e) }
          />
        </ContentEditableWrapper>

        <ContentEditableWrapper>
          <Position
            creating={ isCreatingOrEditing }
            edited={ this.state.fieldsEditedInfo.position }
          >
            { position }
          </Position>
          <EditablePosition
            id={ `${this.props.id}-editable-position` }
            creating={ isCreatingOrEditing }
            edited={ this.state.fieldsEditedInfo.position }
            contentEditable={ isCreatingOrEditing }
            onInput={ (e) => this.handleInput(e, 'position') }
            onKeyPress={ (e) => this.handleKeyPress(e, false) }
            onPaste={ (e) => this.handlePaste(e) }
          />
        </ContentEditableWrapper>

        <Karma status={ karmaStatus }>{ karma }</Karma>

        <ContentEditableWrapper fullHeight>
          <Description
            creating={ isCreatingOrEditing }
            edited={ this.state.fieldsEditedInfo.description }
          >
            { description }
          </Description>
          <EditableDescription
            id={ `${this.props.id}-editable-description` }
            creating={ isCreatingOrEditing }
            edited={ this.state.fieldsEditedInfo.description }
            contentEditable={ isCreatingOrEditing }
            onInput={ (e) => this.handleInput(e, 'description') }
            onKeyPress={ (e) => this.handleKeyPress(e, true) }
            onPaste={ (e) => this.handlePaste(e) }
          />
        </ContentEditableWrapper>

        <Footer>
          {
            !isCreatingOrEditing ?
              <React.Fragment>
                <FooterLeftSide/>

                <FooterRightSide>
                  <Button onClick={ this.handleEditButtonClick }>Edit</Button>
                  <Link to={ `${this.props.authorNickname}/persons/${this.props.id}` }>
                    <Button
                      icon={ shortLeftArrow }
                      iconPosition={ 'right' }
                      iconRotation={ 180 }
                    >
                      More
                    </Button>
                  </Link>
                </FooterRightSide>
              </React.Fragment>
              :
              <React.Fragment>
                <FooterLeftSide>
                  {
                    isEditing &&
                    <DeletePersonButton
                      icon={ trashCan }
                      iconPosition={ 'left' }
                      disabled={ this.state.isAvatarLoading }
                      onClick={ this.handleDeleteButtonClick }
                    >
                      Delete
                    </DeletePersonButton>
                  }
                </FooterLeftSide>

                <FooterRightSide>
                  <Button
                    type={ 'flat' }
                    disabled={ this.state.isAvatarLoading }
                    onClick={ this.handleCancelButtonClick }
                  >
                    Cancel
                  </Button>

                  <Button
                    iconPosition={ 'left' }
                    loading={ this.state.isLoading }
                    disabled={ this.state.isAvatarLoading || !!this.state.invalidFields.length }
                    onClick={ this.handleSaveButtonClick }
                  >
                    Save
                  </Button>
                </FooterRightSide>
              </React.Fragment>
          }
        </Footer>

        {
          this.state.isCancelCreatingPersonConfirmationOpen &&
          <Modal isOpen={ true }>
            <CancelActionConfirmation
              type={ 'person' }
              actionType={ 'creating' }
              title={ this.state.updatedPerson.name }
              onRejectButtonClick={ () => this.setState({ isCancelCreatingPersonConfirmationOpen: false }) }
              onConfirmButtonClick={ () => {
                this.setState({
                  isCancelCreatingPersonConfirmationOpen: false,
                });

                this.props.onCancelButtonClick && this.props.onCancelButtonClick();
              } }
            />
          </Modal>
        }

        {
          this.state.isCancelUpdatingPersonConfirmationOpen &&
          <Modal isOpen={ true }>
            <CancelActionConfirmation
              type={ 'person' }
              actionType={ 'updating' }
              title={ this.state.person.name }
              onRejectButtonClick={ () => this.setState({ isCancelUpdatingPersonConfirmationOpen: false }) }
              onConfirmButtonClick={ () => {
                this.setState({
                  isEditing: false,
                  isCancelUpdatingPersonConfirmationOpen: false,
                });

                this.props.onCancelButtonClick && this.props.onCancelButtonClick();
              } }
            />
          </Modal>
        }

        {
          this.state.isUpdatePersonConfirmationOpen &&
          <Modal isOpen={ true }>
            <UpdatePersonConfirmation
              person={ this.state.personForUpdate }
              onRejectButtonClick={ () => {
                this.setState({
                  isUpdatePersonConfirmationOpen: false,
                });
              } }
              onSuccess={ () => {
                this.setState({
                  isEditing: false,
                  isUpdatePersonConfirmationOpen: false,
                  personForUpdate: null,
                });
              } }
            />
          </Modal>
        }

        {
          this.state.isDeletePersonConfirmationOpen &&
          <Modal isOpen={ true }>
            <DeletePersonConfirmation
              id={ this.props.id }
              onRejectButtonClick={ () => this.setState({ isDeletePersonConfirmationOpen: false }) }
            />
          </Modal>
        }
      </Wrapper>
    );
  }
}


PersonCard.propTypes = {
  className: PropTypes.string,
  id: PropTypes.string,
  avatar: PropTypes.shape({
    id: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
  }),
  name: PropTypes.string,
  position: PropTypes.string,
  karma: PropTypes.number,
  description: PropTypes.string,
  create: PropTypes.bool,
  authorNickname: PropTypes.string,
  onCancelButtonClick: PropTypes.func,
  onSaveButtonClick: PropTypes.func,
};

PersonCard.defaultProps = {
  create: false,
};
