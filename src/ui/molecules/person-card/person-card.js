import * as React from 'react';
import styled, { css } from 'styled-components';
import { lighten, rgba } from 'polished';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Mutation, graphql } from 'react-apollo';

import { Button, RetinaImage, Heading, Icon } from 'ui/atoms';

import { shortLeftArrow, user, trashCan, upload } from 'ui/outlines';

import { font, color, transition } from 'ui/theme';

import { UPDATE_PERSON, DELETE_PERSON } from 'graphql/mutations/person';
import { UPLOAD_FILE, DELETE_FILE } from 'graphql/mutations/file';


const UploadAvatar = styled.label`
  position: absolute;
  top: 0;
  left: 0;
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
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  font-family: ${font.family.secondary};
  font-size: 1.8rem;
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
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  font-family: ${font.family.secondary};
  font-size: 1.8rem;
  text-transform: uppercase;
  color: ${color.text.secondary};
  background-color: ${rgba(color.primary, 0.8)};
  border-radius: 50%;
  cursor: pointer;
  opacity: 0;
  visibility: hidden;
  transition: ${transition};
`;

const Avatar = styled.div`
  position: relative;
  width: 15rem;
  height: 15rem;
  border-radius: 50%;
  margin-bottom: 0.8rem;

  img {
    max-width: 100%;
    width: 100%;
  }
  
  ${p => css`
    
    ${p.new && css`
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: ${color.primary};

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
  
  &:hover {
    background-color: ${lighten(0.15, color.error)};
  }
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


class PersonCardComponent extends React.PureComponent {
  state = {
    isCreating: this.props.create || false,
    isEditing: false,
    person: {
      name: {
        content: '',
        isEdited: false,
      },
      position: {
        content: '',
        isEdited: false,
      },
      description: {
        content: '',
        isEdited: false,
      },
    },
    updatedPerson: {
      name: {
        content: '',
        isEdited: false,
      },
      position: {
        content: '',
        isEdited: false,
      },
      description: {
        content: '',
        isEdited: false,
      },
    },
    invalidFields: this.props.create ? ['name', 'position'] : [],
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

  handleDeleteButtonClick = (deletePerson) => {
    deletePerson({
      variables: {
        id: this.props.id,
      },
    });
  };

  handleEditButtonClick = () => {
    const editableName = document.querySelector(`#${this.props.id}-editable-name`);
    const editablePosition = document.querySelector(`#${this.props.id}-editable-position`);
    const editableDescription = document.querySelector(`#${this.props.id}-editable-description`);

    this.setState((prevState) => {
      editableName.innerHTML = prevState.person.name.content;
      editablePosition.innerHTML = prevState.person.position.content;
      editableDescription.innerHTML = prevState.person.description.content;

      return {
        ...prevState,
        updatedPerson: {
          id: this.props.id,
          avatar: this.props.avatar,
          name: {
            content: this.props.name,
            isEdited: false,
          },
          position: {
            content: this.props.position,
            isEdited: false,
          },
          description: {
            content: this.props.description,
            isEdited: false,
          },
        },
        invalidFields: [],
        isEditing: true,
      };
    });
  };

  handleCancelButtonClick = () => {
    this.setState({ isEditing: false });

    this.props.onCancelButtonClick && this.props.onCancelButtonClick();
  };

  handleSaveButtonClick = () => {

    this.setState((prevState) => {
      const state = { ...prevState };

      if (prevState.invalidFields.length === 0) {
        const person = {
          name: state.updatedPerson.name.content,
          position: state.updatedPerson.position.content,
          description: state.updatedPerson.description.content,
        };

        if (state.updatedPerson.avatar && state.updatedPerson.avatar.id) {
          person.avatar = state.updatedPerson.avatar.id;
        } else {
          person.deleteAvatar = true;
        }

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
      }

      return state;
    });
  };

  static getDerivedStateFromProps = (props, state) => {
    if (!state.isCreating && !state.isEditing) {
      state.person.name.content = props.name;
      state.person.position.content = props.position;
      state.person.description.content = props.description;
    }

    return state;
  };

  render() {
    let name = this.state.person && this.state.person.name ? this.state.person.name.content : this.props.name;
    let position = this.state.person && this.state.person.position ? this.state.person.position.content : this.props.position;
    let description = this.state.person && this.state.person.description ? this.state.person.description.content : this.props.description;
    let avatar = this.state.person && this.state.person.avatar && this.state.person.avatar.url ? this.state.person.avatar.url : null;

    if (!avatar && this.props.avatar && this.props.avatar.url) {
      avatar = this.props.avatar.url;
    }

    if (this.state.isCreating || this.state.isEditing) {
      name = this.state.updatedPerson.name.content.length > 0 ? this.state.updatedPerson.name.content : 'John Doe';
      position = this.state.updatedPerson.position.content.length > 0 ? this.state.updatedPerson.position.content : 'Buddy';
      description = this.state.updatedPerson.description.content.length > 0 ? this.state.updatedPerson.description.content : 'Music fan. Alcohol enthusiast. Creator. Devoted social media geek. Total analyst. Coffee lover. Beer junkie. Coffee maven. Avid alcohol lover. Twitter expert. Lifelong tv ninja. Creator. Passionate tv nerd. Problem solver. Proud alcohol evangelist. Lifelong web junkie. Coffee maven. Unapologetic social media advocate. Analyst. Tv trailblazer. Zombie geek. Twitter aficionado. Reader.';
      avatar = this.state.updatedPerson.avatar && this.state.updatedPerson.avatar.url ? this.state.updatedPerson.avatar.url : null;
    }

    if (!description) {
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
        {
          !this.state.isCreating && !this.state.isEditing && avatar ?
            <Avatar>
              <img src={ avatar } alt={ name }/>
            </Avatar>
            :
            <Avatar new>
              { !avatar && <Icon icon={ user }/> }

              {
                (this.state.isCreating || this.state.isEditing) &&
                <Mutation mutation={ UPLOAD_FILE }>
                  { (uploadFile, { loading }) => {
                    if (loading) {
                      return <LoadingAvatar>Loading...</LoadingAvatar>;
                    }

                    return (
                      avatar ?
                        <React.Fragment>
                          <img src={ avatar } alt={ name }/>

                          <Mutation mutation={ DELETE_FILE }>
                            { (deleteFile) => (
                              <RemoveAvatar onClick={ () => this.handleRemoveAvatarClick(deleteFile) }>
                                Delete
                              </RemoveAvatar>
                            ) }
                          </Mutation>
                        </React.Fragment>
                        :
                        <UploadAvatar>
                          <Icon icon={ upload }/>

                          <input type={ 'file' } onChange={ (e) => this.handleFileInputChange(e, uploadFile) }/>
                        </UploadAvatar>

                    );
                  } }
                </Mutation>
              }
            </Avatar>
        }

        <ContentEditableWrapper>
          <Name
            tag={ 'h2' }
            type={ 'title' }
            creating={ this.state.isCreating || this.state.isEditing }
            edited={ (this.state.isCreating || this.state.isEditing) && this.state.updatedPerson.name.isEdited }
          >
            { name }
          </Name>
          <EditableName
            id={ this.props.id && `${this.props.id}-editable-name` }
            tag={ 'h2' }
            type={ 'title' }
            creating={ this.state.isCreating || this.state.isEditing }
            edited={ (this.state.isCreating || this.state.isEditing) && this.state.updatedPerson.name.isEdited }
            contentEditable={ this.state.isCreating || this.state.isEditing }
            onInput={ (e) => this.handleInput(e, 'name') }
            onKeyPress={ (e) => this.handleKeyPress(e, false) }
            onPaste={ (e) => this.handlePaste(e) }
          />
        </ContentEditableWrapper>

        <ContentEditableWrapper>
          <Position
            creating={ this.state.isCreating || this.state.isEditing }
            edited={ (this.state.isCreating || this.state.isEditing) && this.state.updatedPerson.position.isEdited }
          >
            { position }
          </Position>
          <EditablePosition
            id={ this.props.id && `${this.props.id}-editable-position` }
            creating={ this.state.isCreating || this.state.isEditing }
            edited={ (this.state.isCreating || this.state.isEditing) && this.state.updatedPerson.position.isEdited }
            contentEditable={ this.state.isCreating || this.state.isEditing }
            onInput={ (e) => this.handleInput(e, 'position') }
            onKeyPress={ (e) => this.handleKeyPress(e, false) }
            onPaste={ (e) => this.handlePaste(e) }
          />
        </ContentEditableWrapper>

        <Karma status={ karmaStatus }>{ karma }</Karma>

        <ContentEditableWrapper fullHeight>
          <Description
            creating={ this.state.isCreating || this.state.isEditing }
            edited={ (this.state.isCreating || this.state.isEditing) && this.state.updatedPerson.description.isEdited }
          >
            { description }
          </Description>
          <EditableDescription
            id={ this.props.id && `${this.props.id}-editable-description` }
            creating={ this.state.isCreating || this.state.isEditing }
            edited={ (this.state.isCreating || this.state.isEditing) && this.state.updatedPerson.description.isEdited }
            contentEditable={ this.state.isCreating || this.state.isEditing }
            onInput={ (e) => this.handleInput(e, 'description') }
            onKeyPress={ (e) => this.handleKeyPress(e, true) }
            onPaste={ (e) => this.handlePaste(e) }
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
                          icon={ trashCan }
                          iconPosition={ 'left' }
                          disabled={ this.state.isAvatarLoading }
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
                  <Button
                    type={ 'flat' }
                    disabled={ this.state.isAvatarLoading }
                    onClick={ this.handleCancelButtonClick }
                  >
                    Cancel
                  </Button>

                  <Button
                    disabled={ this.state.isAvatarLoading || !!this.state.invalidFields.length }
                    onClick={ this.handleSaveButtonClick }
                  >
                    Save
                  </Button>
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
  updatePerson: PropTypes.func,
};

PersonCardComponent.defaultProps = {
  create: false,
};


export const PersonCard = graphql(UPDATE_PERSON, { name: 'updatePerson' })(PersonCardComponent);
