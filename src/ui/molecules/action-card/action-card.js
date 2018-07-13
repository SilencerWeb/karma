import * as React from 'react';
import styled, { css } from 'styled-components';
import { lighten } from 'polished';
import PropTypes from 'prop-types';
import { Mutation, graphql } from 'react-apollo';

import { AppConsumer } from 'index';

import { Heading, Button, Icon } from 'ui/atoms';

import { Avatar } from 'ui/molecules';

import { handsUpHuman, longLeftArrow, plus, trashCan } from 'ui/outlines';

import { font, color, transition } from 'ui/theme';

import { GET_ACTIONS } from 'graphql/queries/action';
import { UPDATE_ACTION, DELETE_ACTION } from 'graphql/mutations/action';


const DeleteActionButton = styled(Button)`
  background-color: ${color.error};
  
  &:hover {
    background-color: ${lighten(0.15, color.error)};
  }
`;

const Title = Heading.extend`
  margin-bottom: 0.6rem;
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
`.withComponent('h3');

const EditableTitle = styled(Title)`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
  width: 100%;
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

const Date = styled.span`
  display: inline-block;
  vertical-align: top;
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

const EditableDate = styled(Date)`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
  width: 100%;
  opacity: 0;
  visibility: hidden;
  
  ${p => p.creating && css`

    ${p.creating && css`
      opacity: 1;
      visibility: visible;
    `}
    
    ${p.creating && p.edited && css`
      position: static;
      display: inline-block;
    `}
  `}
`;

const Description = styled.p`
  margin-top: 0;
  margin-bottom: 2.4rem;
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

const ContentEditableWrapper = styled.div`
  position: relative;
  width: 100%;
  
  ${p => css`
    
    ${p.fullHeight && css`
      flex-grow: 1;
    `}
  `}
`;

const HeaderLeftSide = styled.div`
  display: flex;
  flex-direction: column;
  
  ${ContentEditableWrapper} {
    width: max-content;
  }
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 2.4rem;
`;

const StyledAvatar = styled(Avatar)`
  font-family: ${font.family.secondary};
  font-weight: 700;
  color: ${color.primary};
  background-color: #ffffff;
  box-shadow: 0 0.8rem 1.6rem rgba(176, 190, 197, 0.24);
  margin-left: -2rem;
  overflow: hidden;
  transition: ${transition};

  &:hover {
    box-shadow: 0 0.8rem 1.6rem rgba(176, 190, 197, 0.44);
  }
  
  &:first-child {
    margin-left: 0;
  }

  ${p => css`

    ${p.new && css`
      background-color: ${color.primary};
      cursor: pointer;

      ${p.white && css`
        background-color: #ffffff;
        border-bottom-right-radius: 0;
        border-bottom-left-radius: 0;

        svg {
          color: ${color.primary};
        }

        &&&:hover {
          transform: none;
        }
      `}
    `}
  `}
`;

// const StyledSelect = styled(Select)`
//   position: absolute;
//   bottom: 0;
//   left: 100%;
//   width: 20rem;
//   transform: translateX(-4rem);
//  
//   .react-select {
//  
//     &__control {
//       display: none;
//     }
//   }
// `;

const Select = styled.select`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  cursor: pointer;
`;

const Members = styled.div`
  position: relative;
  display: flex;
  
  &:hover {
  
    > div {
      margin-left: 0.4rem;
      
      &:first-child {
        margin-left: 0;
      }
    }
  }
`;

const ExecutorsButton = styled(Button)`
  margin-right: 0.4rem;
  margin-left: 0.4rem;
  transition: ${transition};

  ${p => css`
  
    ${p.executors === 'left' && css`
      color: ${color.primary};
      transform: rotate(180deg);
    `}
    
    ${p.executors === 'right' && css`
      color: ${color.secondary};
    `}
    
    ${!p.hoverable && css`
      background-color: transparent;
      cursor: default;
      
      &:hover {
        background-color: transparent;
      }
    `}
  `}
  
  svg {
    font-size: 2.4rem;
  }
`;

const FooterLeftSide = styled.div`
  display: flex;
  align-items: center;
`;

const FooterRightSide = styled.div`
  
  button {
    margin-right: 0.8rem;
    
    &:last-child {
      margin-right: 0;
    }
  }
`;

const Footer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Border = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 0.8rem;
  height: 100%;
  border-top-left-radius: 0.4rem;
  border-bottom-left-radius: 0.4rem;
  cursor: pointer;
  transition: ${transition};

  ${p => css`
    
    ${p.type === 'positive' && css`
      background-color: #27ae60;
    `}
    
    ${p.type === 'neutral' && css`
      background-color: #bdbdbd;
    `}
    
    ${p.type === 'negative' && css`
      background-color: ${color.error};
    `}
    
    ${!p.hoverable && css`
      cursor: default;
    `}
  `}
`;

const Wrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  min-height: 26.2rem;
  height: 100%;
  background-color: #ffffff;
  border-radius: 0.4rem;
  box-shadow: 0 0.8rem 1.6rem rgba(176, 190, 197, 0.24), 0 -0.8rem 1.6rem rgba(176, 190, 197, 0.24);
  padding-top: 2.4rem;
  padding-right: 1.6rem;
  padding-bottom: 2.4rem;
  padding-left: calc(1.6rem + 0.8rem);
  transition: ${transition};
  
  &:hover {
    box-shadow: 0 0.8rem 1.6rem rgba(176, 190, 197, 0.44), 0 -0.8rem 1.6rem rgba(176, 190, 197, 0.44);
  }
`;


// toggleSelect = (side) => {
//   const state = { ...this.state };
//
//   if (side === 'left') {
//     state.isLeftSelectOpened = !state.isLeftSelectOpened;
//     state.isRightSelectOpened = false;
//   } else if (side === 'right') {
//     state.isRightSelectOpened = !state.isRightSelectOpened;
//     state.isLeftSelectOpened = false;
//   }
//
//   const didStateChanged = this.state.isLeftSelectOpened !== state.isLeftSelectOpened ||
//     this.state.isRightSelectOpened !== state.isRightSelectOpened;
//
//   if (didStateChanged) {
//     this.setState(state);
//   }
// };

// handleSelectChange = (members, side) => {
//   const state = { ...this.state };
//
//   if (!state.members) state.members = {};
//
//   state.members[side] = members.map((member) => {
//     return {
//       avatar: member.avatar,
//     };
//   });
//
//   state.persons = state.persons.map((person) => {
//     const member = members.find((member) => {
//       return member.value === person.name;
//     });
//
//     if (member) {
//       person.isSelected = true;
//       person.side = side;
//     }
//
//     return person;
//   });
//
//   this.setState(state);
// };


export class ActionCardComponent extends React.Component {
  state = {
    isCreating: this.props.create || false,
    isEditing: false,
    title: {
      content: '',
      isEdited: false,
      isInvalid: false,
    },
    date: {
      content: '',
      isEdited: false,
      isInvalid: false,
    },
    description: {
      content: '',
      isEdited: false,
      isInvalid: false,
    },
    karma: this.props.karma,
    executors: this.props.executors,
    members: this.props.members,
    persons: [],
    // isLeftSelectOpened: false,
    // isRightSelectOpened: false,
  };

  generatePersonsForSelect = (persons, userId) => {
    const generatedPersons = persons.map((person) => {
      const isSelected = this.state.members && this.state.members.some((member) => {
        return person.id === member.personId;
      });

      let side;

      if (isSelected) {
        const selectedMember = this.state.members.find((member) => {
          return person.id === member.personId;
        });

        side = selectedMember.side;
      }

      return {
        id: person.id,
        name: person.name,
        isUser: person.id === userId,
        isSelected: isSelected,
        side: isSelected ? side : null,
      };
    });

    this.setState({ persons: generatedPersons });
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

  handleSelectChange = (e, side) => {
    const value = e.currentTarget.value;

    this.setState((prevState) => {
      const members = prevState.members && prevState.members.length ? [...prevState.members] : [];
      const persons = [...prevState.persons];

      const newMember = persons.find((person) => {
        return person.id === value;
      });

      members.push({
        personId: newMember.id,
        name: newMember.name,
        isUser: newMember.isUser,
        side: side,
      });

      const newPersons = persons.map((person) => {
        if (value === person.id) {
          person.isSelected = true;
          person.side = side;
        }

        return person;
      });

      return {
        ...prevState,
        members: members,
        persons: newPersons,
      };
    });
  };

  handleBorderClick = () => {

    this.setState((prevState) => {
      return {
        ...prevState,
        karma: prevState.karma === 'positive' ? 'negative' : 'positive',
      };
    });
  };

  handleExecutorsButtonClick = () => {

    this.setState((prevState) => {
      return {
        ...prevState,
        executors: prevState.executors === 'left' ? 'right' : 'left',
      };
    });
  };

  handleEditButtonClick = (actionId) => {
    this.setState({ isEditing: true });

    const editableTitle = document.querySelector(`#${actionId}-editable-title`);
    const editableDate = document.querySelector(`#${actionId}-editable-date`);
    const editableDescription = document.querySelector(`#${actionId}-editable-description`);

    editableTitle.innerHTML = this.state.title.content;
    editableDate.innerHTML = this.state.date.content;
    editableDescription.innerHTML = this.state.description.content;
  };

  handleDeleteButtonClick = (deleteAction) => {
    deleteAction({
      variables: {
        id: this.props.id,
      },
    });
  };

  handleCancelButtonClick = () => {
    this.setState({ isEditing: false });

    this.props.onCancelButtonClick && this.props.onCancelButtonClick();
  };

  handleSaveButtonClick = () => {

    this.setState((prevState) => {
      const state = { ...prevState };

      const fields = ['title', 'date', 'description'];

      const invalidFields = [];

      fields.forEach((field) => {
        if (state[field].content.length === 0) {
          invalidFields.push(field);
        }
      });

      const isValid = invalidFields.length === 0 &&
        state.karma !== 'neutral' &&
        state.executors &&
        state.members.length > 0;

      if (isValid) {
        const members = state.members.map((member) => {
          const newMember = {
            personId: member.personId,
            isUser: member.isUser,
            side: member.side,
          };

          if (state.isEditing) {
            newMember.id = member.id;
          }

          return newMember;
        });

        const action = {
          title: state.title.content,
          date: state.date.content,
          description: state.description.content,
          karma: state.karma,
          executors: state.executors,
          members: members,
        };

        if (state.isEditing) {
          action.id = this.props.id;

          this.props.updateAction({
            variables: action,
          });

          state.isEditing = false;
        } else {
          this.props.onSaveButtonClick(action);

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
      if (props.title) {
        state.title.content = props.title;
      }
      if (props.date) {
        state.date.content = props.date;
      }
      if (props.description) {
        state.description.content = props.description;
      }
      if (props.karma) {
        state.karma = props.karma;
      }
      if (props.executors) {
        state.executors = props.executors;
      }
      if (props.members) {
        state.members = props.members;
      }
    }

    return state;
  };

  render() {
    const title = this.state.title.content.length > 0 ? this.state.title.content : this.props.title;
    const date = this.state.date.content.length > 0 ? this.state.date.content : this.props.date;
    const description = this.state.description.content.length > 0 ? this.state.description.content : this.props.description;

    const leftSelectOptions = this.state.persons.filter((person) => {
      return !person.isSelected && person.side !== 'right';
    }).map((person) => {
      return (
        <option value={ person.id } key={ person.id }>
          { person.name }
        </option>
      );
    });

    const rightSelectOptions = this.state.persons.filter((person) => {
      return !person.isSelected && person.side !== 'left';
    }).map((person) => {
      return (
        <option value={ person.id } key={ person.id }>
          { person.name }
        </option>
      );
    });

    const leftSideMembers = this.state.members && this.state.members.length && this.state.members.filter((member) => {
      return member.side === 'left';
    });

    const rightSideMembers = this.state.members && this.state.members.length && this.state.members.filter((member) => {
      return member.side === 'right';
    });

    return (
      <AppConsumer>
        { (context) => (
          <Wrapper className={ this.props.className }>
            {
              (this.props.create || this.state.isEditing) && !this.state.persons.length && context.persons && context.user &&
              this.generatePersonsForSelect([...context.persons, context.user], context.user.id)
            }

            <Header>
              <HeaderLeftSide>
                <ContentEditableWrapper>
                  <Title
                    tag={ 'h3' }
                    creating={ this.state.isCreating || this.state.isEditing }
                    edited={ this.state.title.isEdited || this.state.isEditing }
                    invalid={ this.state.title.isInvalid }
                  >
                    { title }
                  </Title>

                  <EditableTitle
                    id={ `${this.props.id}-editable-title` }
                    tag={ 'h3' }
                    creating={ this.state.isCreating || this.state.isEditing }
                    edited={ this.state.title.isEdited || this.state.isEditing }
                    contentEditable={ this.state.isCreating || this.state.isEditing }
                    onInput={ (e) => this.handleInput(e, 'title') }
                    onKeyPress={ (e) => this.handleKeyPress(e, false) }
                    onPaste={ (e) => this.handlePaste(e) }
                  />
                </ContentEditableWrapper>

                <ContentEditableWrapper>
                  <Date
                    creating={ this.state.isCreating || this.state.isEditing }
                    edited={ this.state.date.isEdited || this.state.isEditing }
                    invalid={ this.state.date.isInvalid }
                  >
                    { date }
                  </Date>

                  <EditableDate
                    id={ `${this.props.id}-editable-date` }
                    creating={ this.state.isCreating || this.state.isEditing }
                    edited={ this.state.date.isEdited || this.state.isEditing }
                    contentEditable={ this.state.isCreating || this.state.isEditing }
                    onInput={ (e) => this.handleInput(e, 'date') }
                    onKeyPress={ (e) => this.handleKeyPress(e, false) }
                    onPaste={ (e) => this.handlePaste(e) }
                  />
                </ContentEditableWrapper>
              </HeaderLeftSide>

              {
                !this.state.isCreating && !this.state.isEditing && this.state.karma === 'negative' && this.state.executors === 'right' &&
                <div>
                  <Button
                    icon={ handsUpHuman }
                    iconPosition={ 'right' }
                    onClick={ this.props.onForgiveButtonClick }
                  >
                    Forgive
                  </Button>
                </div>
              }

              {
                this.state.isEditing &&
                <div>
                  <Mutation
                    mutation={ DELETE_ACTION }
                    refetchQueries={ [{ query: GET_ACTIONS }] }
                  >
                    { (deleteAction, { loading, error }) => {
                      if (error) {
                        return <div>mutation DELETE_ACTION got error: ${ error.message }</div>;
                      } else if (loading) {
                        return <div>mutation DELETE_ACTION is loading...</div>;
                      }

                      return (
                        <DeleteActionButton
                          icon={ trashCan }
                          iconPosition={ 'left' }
                          onClick={ () => this.handleDeleteButtonClick(deleteAction) }
                        >
                          Delete
                        </DeleteActionButton>
                      );
                    }
                    }
                  </Mutation>
                </div>
              }
            </Header>

            <ContentEditableWrapper fullHeight>
              <Description
                creating={ this.state.isCreating || this.state.isEditing }
                edited={ this.state.description.isEdited || this.state.isEditing }
                invalid={ this.state.description.isInvalid }
              >
                { description }
              </Description>

              <EditableDescription
                id={ `${this.props.id}-editable-description` }
                creating={ this.state.isCreating || this.state.isEditing }
                edited={ this.state.description.isEdited || this.state.isEditing }
                contentEditable={ this.state.isCreating || this.state.isEditing }
                onInput={ (e) => this.handleInput(e, 'description') }
                onKeyPress={ (e) => this.handleKeyPress(e, false) }
                onPaste={ (e) => this.handlePaste(e) }
              />
            </ContentEditableWrapper>

            <Footer>
              <FooterLeftSide>
                {
                  (this.state.members || this.state.isCreating || this.state.isEditing) &&
                  <React.Fragment>
                    <Members>
                      {
                        leftSideMembers && leftSideMembers.length > 0 && leftSideMembers.map((member, i) => {
                          const person = context.persons.find((person) => {
                            return person.id === member.personId;
                          });

                          const nameFirstLetters = member.name.split(' ').map((word) => {
                            return word[0];
                          }).join('');

                          return (
                            <StyledAvatar
                              size={ 'xs' }
                              url={ person.avatar ? person.avatar.url : null }
                              key={ i }
                            >
                              { !person.avatar ? nameFirstLetters : null }
                            </StyledAvatar>
                          );
                        })
                      }

                      {
                        (this.state.isCreating || this.state.isEditing) && leftSelectOptions.length > 0 &&
                        <React.Fragment>
                          <StyledAvatar
                            size={ 'xs' }
                            new
                            // white={ this.state.isLeftSelectOpened }
                            // onClick={ () => this.toggleSelect('left') }
                          >
                            <Icon icon={ plus }/>

                            <Select onChange={ (e) => this.handleSelectChange(e, 'left') }>
                              { leftSelectOptions }
                            </Select>
                          </StyledAvatar>

                          {
                            // this.state.isLeftSelectOpened &&
                            // <OutsideAlerter onClick={ () => this.toggleSelect('left') }>
                            //   <StyledSelect
                            //     options={ leftSelectOptions }
                            //     type={ 'multi' }
                            //     theme={ 'avatar' }
                            //     menuIsOpen
                            //     onChange={ (data) => this.handleSelectChange(data, 'left') }
                            //   />
                            // </OutsideAlerter>
                          }
                        </React.Fragment>
                      }
                    </Members>

                    {
                      (this.state.isCreating || this.state.isEditing || (rightSideMembers && rightSideMembers.length > 0)) &&
                      <ExecutorsButton
                        type={ 'icon' }
                        theme={ this.state.executors === 'left' ? 'primary' : 'secondary' }
                        executors={ this.state.executors }
                        hoverable={ this.state.isCreating || this.state.isEditing }
                        withoutRipple={ !(this.state.isCreating || this.state.isEditing) }
                        onClick={ this.state.isCreating || this.state.isEditing ? this.handleExecutorsButtonClick : null }
                      >
                        <Icon icon={ longLeftArrow }/>
                      </ExecutorsButton>
                    }

                    <Members>
                      {
                        rightSideMembers && rightSideMembers.length > 0 && rightSideMembers.map((member, i) => {
                          const person = context.persons.find((person) => {
                            return person.id === member.personId;
                          });

                          const nameFirstLetters = member.name.split(' ').map((word) => {
                            return word[0];
                          }).join('');

                          return (
                            <StyledAvatar
                              url={ person.avatar ? person.avatar.url : null }
                              size={ 'xs' }
                              key={ i }
                            >
                              { !person.avatar ? nameFirstLetters : null }
                            </StyledAvatar>
                          );
                        })
                      }

                      {
                        (this.state.isCreating || this.state.isEditing) && rightSelectOptions.length > 0 &&
                        <React.Fragment>
                          <StyledAvatar
                            size={ 'xs' }
                            new
                            // white={ this.state.isRightSelectOpened }
                            // onClick={ () => this.toggleSelect('right') }
                          >
                            <Icon icon={ plus }/>
                          </StyledAvatar>

                          {
                            // this.state.isRightSelectOpened &&
                            // <OutsideAlerter onClick={ () => this.toggleSelect('right') }>
                            //   <StyledSelect
                            //     options={ rightSelectOptions }
                            //     type={ 'multi' }
                            //     theme={ 'avatar' }
                            //     menuIsOpen
                            //     onChange={ (data) => this.handleSelectChange(data, 'right') }
                            //   />
                            // </OutsideAlerter>
                          }
                        </React.Fragment>
                      }
                    </Members>
                  </React.Fragment>
                }
              </FooterLeftSide>

              <FooterRightSide>
                {
                  !this.state.isCreating && !this.state.isEditing ?
                    <React.Fragment>
                      <Button
                        type={ 'flat' }
                        theme={ this.state.executors && this.state.executors === 'left' ? 'primary' : 'secondary' }
                        onClick={ () => this.handleEditButtonClick(this.props.id) }
                      >
                        Edit
                      </Button>
                      <Button
                        theme={ this.state.executors && this.state.executors === 'left' ? 'primary' : 'secondary' }
                        onClick={ this.props.onMoreButtonClick }
                      >
                        More
                      </Button>
                    </React.Fragment>
                    :
                    <React.Fragment>
                      <Button
                        type={ 'flat' }
                        theme={ this.state.executors && this.state.executors === 'left' ? 'primary' : 'secondary' }
                        onClick={ this.handleCancelButtonClick }
                      >
                        Cancel
                      </Button>
                      <Button
                        theme={ this.state.executors && this.state.executors === 'left' ? 'primary' : 'secondary' }
                        onClick={ this.handleSaveButtonClick }
                      >
                        Save
                      </Button>
                    </React.Fragment>
                }
              </FooterRightSide>
            </Footer>

            <Border
              type={ this.state.karma }
              hoverable={ this.state.isCreating || this.state.isEditing }
              onClick={ this.state.isCreating || this.state.isEditing ? this.handleBorderClick : null }
            />
          </Wrapper>
        ) }
      </AppConsumer>
    );
  }
}


ActionCardComponent.propTypes = {
  id: PropTypes.string,
  className: PropTypes.string,
  title: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  karma: PropTypes.string.isRequired,
  executors: PropTypes.string.isRequired,
  members: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      personId: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      isUser: PropTypes.bool.isRequired,
      side: PropTypes.string.isRequired,
    }),
  ),
  create: PropTypes.bool,
  onForgiveButtonClick: PropTypes.func,
  onMoreButtonClick: PropTypes.func,
  onCancelButtonClick: PropTypes.func,
  onSaveButtonClick: PropTypes.func,
  updateAction: PropTypes.func,
};


export const ActionCard = graphql(UPDATE_ACTION, { name: 'updateAction' })(ActionCardComponent);
