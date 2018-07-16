import * as React from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';
import { Mutation } from 'react-apollo';
import { Redirect } from 'react-router-dom';
import deepEqual from 'deep-equal';

import { AppConsumer } from 'index';

import { Heading, Button, Icon } from 'ui/atoms';

import { ActionCardList, Avatar, Modal } from 'ui/molecules';

import { UpdatePersonConfirmation, DeletePersonConfirmation } from 'ui/organisms';

import { CommonTemplate } from 'ui/templates';

import { pencil, user, trashCan } from 'ui/outlines';

import { font, color, transition } from 'ui/theme';

import { UPDATE_PERSON } from 'graphql/mutations/person';


const HeaderBackground = styled.div`
  position: absolute;
  top: -2rem;
  left: 50%;
  width: 100vw;
  height: 24rem;
  background: linear-gradient(90deg, #00b5ff 0%, #a24bff 100%);
  transform: translateX(-50%);
`;

const BackgroundButton = styled(Button)`
  position: absolute;
  top: 0.8rem;

  svg {
    font-size: 3.2rem;
  }
  
  ${p => css`
    
    ${p.right && css`
      right: 1.6rem;
    `}
    
    ${p.left && css`
      left: 1.6rem;
    `}
  `}
`;

const EditPersonInfoButton = styled(Button)`
  position: absolute;
  top: 0;
  right: 0;
  z-index: 1;

  svg {
    font-size: 3.2rem;
  }
`;

const CancelPersonInfoButton = styled(Button)`
  position: absolute;
  bottom: 0;
  left: 0;
  z-index: 1;
`;

const SavePersonInfoButton = styled(Button)`
  position: absolute;
  right: 0;
  bottom: 0;
  z-index: 1;
`;

const PersonAvatar = styled(Avatar)`
  margin-right: auto;
  margin-left: auto;
  margin-bottom: 2.4rem;
`;

const Name = Heading.extend`
  width: 100%;
  text-align: center;
  outline: none;
  transition: ${transition};
  margin-bottom: 0.8rem;
  
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
  font-size: 2.4rem;
  font-weight: 700;
  text-align: center;
  color: #828282;
  margin-bottom: 0.8rem;
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

const Description = styled.p`
  width: 100%;
  min-height: 6.3rem;
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

const Karma = Heading.extend`
  display: block;
  
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
`.withComponent('span');

const PersonInfo = styled.div`
  position: relative;
  width: 40rem;
`;

const Header = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  text-align: center;
  padding-top: 7rem;
  margin-bottom: 6rem;
`;

const Subtitle = Heading.withComponent('h2');

const EditDescriptionButton = styled(Button)`

  svg {
    font-size: 1.8rem;
  }
`;

const AboutHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.8rem;
`;

const About = styled.div`
  margin-bottom: 4rem;
  
  button {
    margin-right: 0.8rem;
    
    &:last-child {
      margin-right: 0;
    }
  }
  
  p {
    margin-top: 0;
    margin-bottom: 0; 
  }
`;

const ActionsHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2.4rem;
`;

class Page extends React.Component {
  state = {
    isPersonInfoEditing: false,
    isDescriptionEditing: false,
    isActionCreating: false,
    shouldRedirectToMainPage: false,
  };

  handleInput = (e, element) => {
    const target = e.currentTarget;

    this.setState((prevState) => {
      const invalidFields = [];

      if (prevState.isPersonInfoEditing) {
        const fields = ['name', 'position'];

        fields.forEach((field) => {
          const content = field === element ? target.textContent : prevState.updatedPerson[field];

          if (content.length === 0) {
            invalidFields.push(field);
          }
        });
      }

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

  handleEditPersonInfoButtonClick = () => {
    const editableName = document.querySelector('#editable-name');
    const editablePosition = document.querySelector('#editable-position');

    this.setState((prevState) => {
      editableName.innerHTML = prevState.person.name;
      editablePosition.innerHTML = prevState.person.position;

      const person = {
        ...prevState.person,
      };

      return {
        ...prevState,
        updatedPerson: person,
        fieldsEditedInfo: {},
        invalidFields: [],
        isPersonInfoEditing: true,
      };
    });
  };

  handleCancelPersonInfoButtonClick = () => {
    const arePersonAndUpdatedPersonEqual = deepEqual(this.state.person, this.state.updatedPerson);

    if (!arePersonAndUpdatedPersonEqual) {
    } else {
      this.setState((prevState) => {
        const person = {
          ...prevState.person,
        };

        return {
          ...prevState,
          updatedPerson: person,
          fieldsEditedInfo: {},
          invalidFields: [],
          isPersonInfoEditing: false,
        };
      });
    }
  };

  handleSavePersonInfoButtonClick = () => {

    this.setState((prevState) => {
      const personInfo = {
        name: prevState.person.name,
        position: prevState.person.position,
      };

      const updatedPersonInfo = {
        name: prevState.updatedPerson.name,
        position: prevState.updatedPerson.position,
      };

      const arePersonInfoAndUpdatedPersonInfoEqual = deepEqual(personInfo, updatedPersonInfo);

      if (!arePersonInfoAndUpdatedPersonInfoEqual) {
        const person = {
          id: prevState.updatedPerson.id,
          name: prevState.updatedPerson.name,
          position: prevState.updatedPerson.position,
        };

        if (prevState.updatedPerson.avatar && prevState.updatedPerson.avatar.id) {
          person.avatar = prevState.updatedPerson.avatar.id;
        } else {
          person.deleteAvatar = true;
        }

        return {
          ...prevState,
          personForUpdate: person,
          isUpdatePersonConfirmationOpen: true,
        };
      } else {
        return {
          ...prevState,
          isPersonInfoEditing: false,
        };
      }
    });
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

  handleRemoveAvatarClick = () => {
    this.setState((prevState) => {
      return {
        ...prevState,
        updatedPerson: {
          ...prevState.updatedPerson,
          avatar: null,
        },
      };
    });
  };

  handleEditDescriptionButtonClick = () => {
    const editableDescription = document.querySelector('#editable-description');

    this.setState((prevState) => {
      editableDescription.innerHTML = prevState.person.description;

      const person = {
        ...prevState.person,
      };

      return {
        ...prevState,
        updatedPerson: person,
        isDescriptionEditing: true,
      };
    });
  };

  handleCancelDescriptionButtonClick = () => {
    const areDescriptionAndUpdatedDescriptionEqual = this.state.person.description === this.state.updatedPerson.description;

    if (!areDescriptionAndUpdatedDescriptionEqual) {

    } else {
      this.setState((prevState) => {
        const person = {
          ...prevState.person,
        };

        return {
          ...prevState,
          updatedPerson: person,
          isDescriptionEditing: false,
        };
      });
    }
  };

  handleSaveDescriptionButtonClick = () => {

    this.setState((prevState) => {
      const areDescriptionAndUpdatedDescriptionEqual = deepEqual(prevState.person.description, prevState.updatedPerson.description);

      if (!areDescriptionAndUpdatedDescriptionEqual) {
        const person = {
          id: prevState.updatedPerson.id,
          description: prevState.updatedPerson.description,
        };

        return {
          ...prevState,
          personForUpdate: person,
          isUpdatePersonConfirmationOpen: true,
        };
      } else {
        return {
          ...prevState,
          isDescriptionEditing: false,
        };
      }
    });
  };

  handleAddActionButtonClick = () => {
    window.scrollTo(0, document.body.scrollHeight);

    this.setState({ isActionCreating: true });
  };

  handleDeleteButtonClick = () => {
    this.setState({ isDeletePersonConfirmationOpen: true });
  };

  handleCancelButtonClick = () => {
    this.setState({ isActionCreating: false });
  };

  handleSaveButtonClick = () => {
    this.setState({ isActionCreating: false });
  };


  static getDerivedStateFromProps = (props, state) => {
    const person = props.context.persons && props.context.persons.find((person) => {
      return person.id === props.match.params.id;
    });

    if (person === undefined) {
      state.shouldRedirectToMainPage = true;

      return;
    }

    const shouldPersonBeUpdated = !deepEqual(state.person, person);

    if (shouldPersonBeUpdated) {
      state.person = person;
      state.updatedPerson = person;
    }

    if (!state) return null;

    return state;
  };


  render() {
    let name = this.state.person && this.state.person.name ? this.state.person.name : null;
    let position = this.state.person && this.state.person.position ? this.state.person.position : null;
    let description = this.state.person && this.state.person.description ? this.state.person.description : null;
    let avatar = this.state.person && this.state.person.avatar && this.state.person.avatar.url ? this.state.person.avatar.url : null;

    if (this.state.isPersonInfoEditing) {
      name = this.state.updatedPerson.name.length > 0 ? this.state.updatedPerson.name : 'John Doe';
      position = this.state.updatedPerson.position.length > 0 ? this.state.updatedPerson.position : 'Buddy';
      avatar = this.state.updatedPerson.avatar && this.state.updatedPerson.avatar.url ? this.state.updatedPerson.avatar.url : null;
    }

    if (this.state.isDescriptionEditing) {
      description = this.state.updatedPerson.description.length > 0 ? this.state.updatedPerson.description : 'Music fan. Alcohol enthusiast. Creator. Devoted social media geek. Total analyst. Coffee lover. Beer junkie. Coffee maven. Avid alcohol lover. Twitter expert. Lifelong tv ninja. Creator. Passionate tv nerd. Problem solver. Proud alcohol evangelist. Lifelong web junkie. Coffee maven. Unapologetic social media advocate. Analyst. Tv trailblazer. Zombie geek. Twitter aficionado. Reader.';
    }

    if (!description) {
      description = 'No description';
    }

    let karmaStatus;
    let karma;

    if (this.state.person) {
      karma = this.state.person.karma;

      if (karma === 0) {
        karmaStatus = 'neutral';
      } else {
        karmaStatus = karma > 0 ? 'positive' : 'negative';

        if (karmaStatus === 'positive') {
          karma = `+${karma}`;
        }
      }
    }

    const shouldRedirectToMainPage = this.props.context.persons && this.props.context.persons.every((person) => {
      return person.id !== this.props.match.params.id;
    }) || this.state.shouldRedirectToMainPage;

    return (
      <CommonTemplate>
        { shouldRedirectToMainPage && <Redirect to={ '/' }/> }

        <Header>
          <HeaderBackground>
            <BackgroundButton
              type={ 'icon' }
              theme={ 'white' }
              left
              onClick={ this.handleDeleteButtonClick }
            >
              <Icon icon={ trashCan }/>
            </BackgroundButton>

            <BackgroundButton type={ 'icon' } theme={ 'white' } right>
              <Icon icon={ pencil }/>
            </BackgroundButton>
          </HeaderBackground>

          <PersonInfo>
            <PersonAvatar
              url={ avatar }
              alt={ name }
              size={ 'lg' }
              icon={ user }
              edit={ this.state.isPersonInfoEditing }
              onRemoveAvatarClick={ this.handleRemoveAvatarClick }
              onFileInputChange={ this.handleFileInputChange }
            />

            <ContentEditableWrapper>
              <Name
                type={ 'title' }
                creating={ this.state.isPersonInfoEditing }
                edited={ this.state.isPersonInfoEditing && this.state.updatedPerson.name.isEdited }
              >
                { name }
              </Name>
              <EditableName
                id={ 'editable-name' }
                type={ 'title' }
                creating={ this.state.isPersonInfoEditing }
                edited={ this.state.isPersonInfoEditing && this.state.updatedPerson.name.isEdited }
                contentEditable={ this.state.isPersonInfoEditing }
                onInput={ (e) => this.handleInput(e, 'name') }
                onKeyPress={ (e) => this.handleKeyPress(e, false) }
                onPaste={ (e) => this.handlePaste(e) }
              />
            </ContentEditableWrapper>

            <ContentEditableWrapper>
              <Position
                creating={ this.state.isPersonInfoEditing }
                edited={ this.state.isPersonInfoEditing && this.state.updatedPerson.position.isEdited }
              >
                { position }
              </Position>
              <EditablePosition
                id={ 'editable-position' }
                creating={ this.state.isPersonInfoEditing }
                edited={ this.state.isPersonInfoEditing && this.state.updatedPerson.position.isEdited }
                contentEditable={ this.state.isPersonInfoEditing }
                onInput={ (e) => this.handleInput(e, 'position') }
                onKeyPress={ (e) => this.handleKeyPress(e, false) }
                onPaste={ (e) => this.handlePaste(e) }
              />
            </ContentEditableWrapper>

            <Karma type={ 'title' } tag={ 'h2' } status={ karmaStatus }>
              { `${ karma }` }
            </Karma>

            {
              !this.state.isPersonInfoEditing ?
                <EditPersonInfoButton
                  type={ 'icon' }
                  theme={ 'white' }
                  onClick={ this.handleEditPersonInfoButtonClick }
                >
                  <Icon icon={ pencil }/>
                </EditPersonInfoButton>
                :
                <React.Fragment>
                  <CancelPersonInfoButton
                    type={ 'flat' }
                    disabled={ this.state.isAvatarLoading }
                    onClick={ this.handleCancelPersonInfoButtonClick }
                  >
                    Cancel
                  </CancelPersonInfoButton>

                  <SavePersonInfoButton
                    disabled={ this.state.isAvatarLoading || !!this.state.invalidFields.length }
                    onClick={ this.handleSavePersonInfoButtonClick }
                  >
                    Save
                  </SavePersonInfoButton>
                </React.Fragment>
            }
          </PersonInfo>
        </Header>

        <About>
          <AboutHeader>
            <Subtitle tag={ 'h2' }>
              About
            </Subtitle>

            {
              !this.state.isDescriptionEditing ?
                <EditDescriptionButton
                  type={ 'icon' }
                  theme={ 'gray' }
                  onClick={ this.handleEditDescriptionButtonClick }
                >
                  <Icon icon={ pencil }/>
                </EditDescriptionButton>
                :
                <div>
                  <Button
                    type={ 'flat' }
                    onClick={ this.handleCancelDescriptionButtonClick }
                  >
                    Cancel
                  </Button>

                  <Button
                    onClick={ this.handleSaveDescriptionButtonClick }
                  >
                    Save
                  </Button>
                </div>
            }
          </AboutHeader>

          <ContentEditableWrapper>
            <Description
              creating={ this.state.isDescriptionEditing }
              edited={ this.state.isDescriptionEditing && this.state.updatedPerson.description.isEdited }
            >
              { description }
            </Description>
            <EditableDescription
              id={ 'editable-description' }
              creating={ this.state.isDescriptionEditing }
              edited={ this.state.isDescriptionEditing && this.state.updatedPerson.description.isEdited }
              contentEditable={ this.state.isDescriptionEditing }
              onInput={ (e) => this.handleInput(e, 'description') }
              onKeyPress={ (e) => this.handleKeyPress(e, true) }
              onPaste={ (e) => this.handlePaste(e) }
            />
          </ContentEditableWrapper>
        </About>

        <div>
          <ActionsHeader>
            <Subtitle tag={ 'h2' }>
              Action list
            </Subtitle>

            <Button onClick={ this.handleAddActionButtonClick }>Add an action</Button>
          </ActionsHeader>

          <ActionCardList
            activeMemberId={ this.state.person && this.state.person.id }
            isActionCreating={ this.state.isActionCreating }
            onCancelButtonClick={ this.handleCancelButtonClick }
            onSaveButtonClick={ this.handleSaveButtonClick }
          />
        </div>

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
                  isPersonInfoEditing: false,
                  isDescriptionEditing: false,
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
              id={ this.state.person.id }
              onRejectButtonClick={ () => this.setState({ isDeletePersonConfirmationOpen: false }) }
            />
          </Modal>
        }
      </CommonTemplate>
    );
  }
};


Page.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  context: PropTypes.object,
};


const PageWithContext = React.forwardRef((props, ref) => (
  <AppConsumer>
    { (context) => <Page { ...props } context={ context } ref={ ref }/> }
  </AppConsumer>
));


export const PersonPage = PageWithContext;
