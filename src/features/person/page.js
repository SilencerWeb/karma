import * as React from 'react';
import styled, { css } from 'styled-components';
import { rgba } from 'polished';
import PropTypes from 'prop-types';
import { Mutation } from 'react-apollo';
import { Redirect } from 'react-router-dom';
import deepEqual from 'deep-equal';

import { AppConsumer } from 'index';

import { Heading, Button, Icon, RetinaImage } from 'ui/atoms';

import { ActionCardList } from 'ui/molecules';

import { CommonTemplate } from 'ui/templates';

import { pencil, user, trashCan, upload } from 'ui/outlines';

import { font, color, transition } from 'ui/theme';

import { UPDATE_PERSON, DELETE_PERSON } from 'graphql/mutations/person';
import { UPLOAD_FILE } from 'graphql/mutations/file';


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

const UploadAvatar = styled.label`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background: ${color.primary};
  border-radius: 50%;
  opacity: 0;
  visibility: hidden;
  transition: ${transition};
  cursor: pointer;
  
  input {
    position: absolute;
    top: 0;
    left: 0;
    font-size: 0;
    opacity: 0;
  }
`;

const LoadingAvatar = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  font-family: ${font.family.secondary};
  font-size: 2.8rem;
  text-transform: uppercase;
  color: ${color.text.secondary};
  background-color: ${color.primary};
  border-radius: 50%;
  transition: ${transition};
`;

const RemoveAvatar = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  font-family: ${font.family.secondary};
  font-size: 2.8rem;
  text-transform: uppercase;
  color: ${color.text.secondary};
  background-color: ${rgba(color.primary, 0.8)};
  border-radius: 50%;
  cursor: pointer;
  opacity: 0;
  visibility: hidden;
  transition: ${transition};
`;

const PersonAvatar = styled.div`
  position: relative;
  z-index: 1;
  width: 30rem;
  height: 30rem;
  border-radius: 50%;
  margin-right: auto;
  margin-left: auto;
  margin-bottom: 2.4rem;


  &:hover {
  
    ${UploadAvatar} {
      opacity: 1;
      visibility: visible;
    }
  
    ${RemoveAvatar} {
      opacity: 1;
      visibility: visible;
    }
  }
      
  img {
    width: 100%;
  }
  
  ${p => css`
    
    ${p.new && css`
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: ${color.primary};

      svg {
        font-size: 10rem;
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

const EditAboutButton = styled(Button)`

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

export class PersonPage extends React.Component {
  state = {
    isPersonInfoEditing: false,
    isDescriptionEditing: false,
    isActionCreating: false,
    shouldRedirectToMainPage: false,
  };

  getPerson = (context) => {
    const person = context.persons.filter((person) => {
      return person.id === this.props.match.params.id;
    })[0];

    if (person === undefined) {
      this.setState({ shouldRedirectToMainPage: true });

      return;
    }

    const shouldPersonBeUpdated = !deepEqual(this.state.person, person);

    if (shouldPersonBeUpdated) {
      this.setState({
        person: person,
      });
    }
  };

  handleInput = (e, element) => {
    const target = e.currentTarget;

    this.setState((prevState) => {
      const fields = ['name', 'position'];

      const invalidFields = [];

      fields.forEach((field) => {
        const content = field === element ? target.textContent : prevState.updatedPerson[field].content;

        if (content.length === 0) {
          invalidFields.push(field);
        }
      });

      return {
        ...prevState,
        updatedPerson: {
          ...prevState.updatedPerson,
          [element]: {
            content: target.textContent,
            isEdited: target.textContent.length > 0,
          },
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
        updatedPerson: {
          id: person.id,
          avatar: person.avatar,
          name: {
            content: person.name,
            isEdited: false,
          },
          position: {
            content: person.position,
            isEdited: false,
          },
        },
        invalidFields: [],
        isPersonInfoEditing: true,
      };
    });
  };

  handleCancelPersonInfoButtonClick = () => {
    this.setState((prevState) => {
      const person = {
        ...prevState.person,
      };

      return {
        ...prevState,
        updatedPerson: {
          id: person.id,
          avatar: person.avatar,
          name: {
            content: person.name,
            isEdited: false,
          },
          position: {
            content: person.position,
            isEdited: false,
          },
        },
        invalidFields: [],
        isPersonInfoEditing: false,
      };
    });
  };

  handleSavePersonInfoButtonClick = (updatePerson) => {

    this.setState((prevState) => {
      const person = {
        id: prevState.updatedPerson.id,
        name: prevState.updatedPerson.name.content,
        position: prevState.updatedPerson.position.content,
      };

      if (prevState.updatedPerson.avatar && prevState.updatedPerson.avatar.id) {
        person.avatar = prevState.updatedPerson.avatar.id;
      } else {
        person.deleteAvatar = true;
      }

      updatePerson({
        variables: person,
      });

      return {
        ...prevState,
        isPersonInfoEditing: false,
      };
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

  handleAddActionButtonClick = () => {
    window.scrollTo(0, document.body.scrollHeight);

    this.setState({ isActionCreating: true });
  };

  handleDeleteButtonClick = (deletePerson) => {
    deletePerson({
      variables: {
        id: this.state.person.id,
      },
    }).then(() => {
      this.setState({ shouldRedirectToMainPage: true });
    });
  };

  handleCancelButtonClick = () => {
    this.setState({ isActionCreating: false });
  };

  handleSaveButtonClick = () => {
    this.setState({ isActionCreating: false });
  };

  render() {
    let name = this.state.person && this.state.person.name ? this.state.person.name : null;
    let position = this.state.person && this.state.person.position ? this.state.person.position : null;
    let description = this.state.person && this.state.person.description ? this.state.person.description : null;
    let avatar = this.state.person && this.state.person.avatar && this.state.person.avatar.url ? this.state.person.avatar.url : null;

    if (this.state.isPersonInfoEditing) {
      name = this.state.updatedPerson.name.content.length > 0 ? this.state.updatedPerson.name.content : 'John Doe';
      position = this.state.updatedPerson.position.content.length > 0 ? this.state.updatedPerson.position.content : 'Buddy';
      avatar = this.state.updatedPerson.avatar && this.state.updatedPerson.avatar.url ? this.state.updatedPerson.avatar.url : null;
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

    return (
      <CommonTemplate>
        { this.state.shouldRedirectToMainPage && <Redirect to={ '/' }/> }

        <AppConsumer>
          { (context) => (
            <React.Fragment>
              { context.persons && this.getPerson(context) }

              <Header>
                <HeaderBackground>
                  <Mutation mutation={ DELETE_PERSON }>
                    { (deletePerson, { loading, error }) => {
                      if (error) {
                        return <div>mutation DELETE_PERSON got error: ${ error.message }</div>;
                      } else if (loading) {
                        return <div>mutation DELETE_PERSON is loading...</div>;
                      }

                      return (
                        <BackgroundButton
                          type={ 'icon' }
                          theme={ 'white' }
                          left
                          onClick={ () => this.handleDeleteButtonClick(deletePerson) }
                        >
                          <Icon icon={ trashCan }/>
                        </BackgroundButton>
                      );
                    }
                    }
                  </Mutation>

                  <BackgroundButton type={ 'icon' } theme={ 'white' } right>
                    <Icon icon={ pencil }/>
                  </BackgroundButton>
                </HeaderBackground>

                <PersonInfo>
                  {
                    !this.state.isPersonInfoEditing ?
                      <PersonAvatar new={ !avatar }>
                        {
                          !avatar ?
                            <Icon icon={ user }/>
                            :
                            <img src={ avatar } alt={ name }/>
                        }
                      </PersonAvatar>
                      :
                      <PersonAvatar new>
                        { !avatar && <Icon icon={ user }/> }

                        <Mutation mutation={ UPLOAD_FILE }>
                          { (uploadFile, { loading }) => {
                            if (loading) {
                              return <LoadingAvatar>Loading...</LoadingAvatar>;
                            }

                            return (
                              avatar ?
                                <React.Fragment>
                                  <img src={ avatar } alt={ name }/>
                                  <RemoveAvatar onClick={ this.handleRemoveAvatarClick }>
                                    Delete
                                  </RemoveAvatar>
                                </React.Fragment>
                                :
                                <UploadAvatar>
                                  <Icon icon={ upload }/>

                                  <input type={ 'file' } onChange={ (e) => this.handleFileInputChange(e, uploadFile) }/>
                                </UploadAvatar>
                            );
                          } }
                        </Mutation>
                      </PersonAvatar>
                  }

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

                        <Mutation mutation={ UPDATE_PERSON }>
                          { (updatePerson) => (
                            <SavePersonInfoButton
                              disabled={ this.state.isAvatarLoading || !!this.state.invalidFields.length }
                              onClick={ () => this.handleSavePersonInfoButtonClick(updatePerson) }
                            >
                              Save
                            </SavePersonInfoButton>
                          ) }
                        </Mutation>
                      </React.Fragment>
                  }
                </PersonInfo>
              </Header>

              <About>
                <AboutHeader>
                  <Subtitle tag={ 'h2' }>
                    About
                  </Subtitle>

                  <EditAboutButton type={ 'icon' } theme={ 'gray' }>
                    <Icon icon={ pencil }/>
                  </EditAboutButton>
                </AboutHeader>

                <p> { description }</p>
              </About>

              <div>
                <ActionsHeader>
                  <Subtitle tag={ 'h2' }>
                    Action list
                  </Subtitle>

                  <Button onClick={ this.handleAddActionButtonClick }>Add an action</Button>
                </ActionsHeader>

                <ActionCardList
                  memberId={ this.state.person && this.state.person.id }
                  isActionCreating={ this.state.isActionCreating }
                  onCancelButtonClick={ this.handleCancelButtonClick }
                  onSaveButtonClick={ this.handleSaveButtonClick }
                />
              </div>
            </React.Fragment>
          ) }
        </AppConsumer>
      </CommonTemplate>
    );
  }
};


PersonPage.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};
