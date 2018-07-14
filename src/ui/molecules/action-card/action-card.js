import * as React from 'react';
import styled, { css } from 'styled-components';
import { lighten, rgba } from 'polished';
import PropTypes from 'prop-types';
import { Mutation, graphql } from 'react-apollo';

import { AppConsumer } from 'index';

import { Heading, Button, Icon } from 'ui/atoms';

import { Avatar } from 'ui/molecules';

import { handsUpHuman, longLeftArrow, plus, trashCan, close } from 'ui/outlines';

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

const MemberAvatar = styled(Avatar)`
  font-family: ${font.family.secondary};
  font-weight: 700;
  color: ${color.primary};
  background-color: #ffffff;

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

const RemoveMember = styled.button`
  position: absolute;
  top: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  font-family: ${font.family.secondary};
  color: #ffffff;
  background: ${rgba(color.primary, 0.8)};
  border: none;
  border-radius: 50%;
  padding-top: 0.4rem;
  padding-right: 0.4rem;
  padding-bottom: 0.4rem;
  padding-left: 0.4rem;
  opacity: 0;
  visibility: hidden;
  transition: ${transition};
  cursor: pointer;
  
  svg {
    font-size: 1.4rem;
  }
`;

const MemberAvatarWrapper = styled.div`
  position: relative;
  border-radius: 50%;
  margin-left: -2rem;
  box-shadow: 0 0.8rem 1.6rem rgba(176, 190, 197, 0.24);
  transition: ${transition};
  
  &:first-child {
    margin-left: 0;
  }
  
  &:hover {
    box-shadow: 0 0.8rem 1.6rem rgba(176, 190, 197, 0.44);
  
    ${RemoveMember} {
      opacity: 1;
      visibility: visible;
    }
  }
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
  
    ${MemberAvatarWrapper} {
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
    isCreating: false,
    isEditing: false,
    action: null,
    updatedAction: null,
    fieldsEditedInfo: {},
    // isLeftSelectOpened: false,
    // isRightSelectOpened: false,
  };

  handleInput = (e, element) => {
    const target = e.currentTarget;

    this.setState((prevState) => {
      return {
        ...prevState,
        updatedAction: {
          ...prevState.updatedAction,
          [element]: target.textContent,
        },
        fieldsEditedInfo: {
          ...prevState.fieldsEditedInfo,
          [element]: target.textContent.length > 0,
        },
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

  handleSelectChange = (e, side) => {
    const value = e.currentTarget.value;

    this.setState((prevState) => {
      const members = prevState.updatedAction.members ? [...prevState.updatedAction.members] : [];
      const persons = [...prevState.updatedAction.persons];

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
        updatedAction: {
          ...prevState.updatedAction,
          members: members,
          persons: newPersons,
        },
      };
    });
  };

  handleBorderClick = () => {

    this.setState((prevState) => {
      return {
        ...prevState,
        updatedAction: {
          ...prevState.updatedAction,
          karma: prevState.updatedAction.karma === 'positive' ? 'negative' : 'positive',
        },
      };
    });
  };

  handleExecutorsButtonClick = () => {

    this.setState((prevState) => {
      return {
        ...prevState,
        updatedAction: {
          ...prevState.updatedAction,
          executors: prevState.updatedAction.executors === 'left' ? 'right' : 'left',
        },
      };
    });
  };

  handleEditButtonClick = (actionId) => {
    this.setState({ isEditing: true });

    const editableTitle = document.querySelector(`#${actionId}-editable-title`);
    const editableDate = document.querySelector(`#${actionId}-editable-date`);
    const editableDescription = document.querySelector(`#${actionId}-editable-description`);

    editableTitle.innerHTML = this.state.action.title;
    editableDate.innerHTML = this.state.action.date;
    editableDescription.innerHTML = this.state.action.description;
  };

  handleDeleteButtonClick = () => {
    this.props.context.changeActionForDeleteId(this.props.id);

    this.props.context.showModal('DeleteActionConfirmation');
  };

  handleRemoveMemberButtonClick = (personId) => {

    this.setState((prevState) => {
      const members = [...prevState.updatedAction.members];
      const persons = [...prevState.updatedAction.persons];

      const memberForDeleteIndex = members.findIndex((member) => {
        return member.personId === personId;
      });

      members.splice(memberForDeleteIndex, 1);

      const personIndex = persons.findIndex((person) => {
        return person.id === personId;
      });

      persons[personIndex] = {
        ...persons[personIndex],
        isSelected: false,
        side: null,
      };

      return {
        ...prevState,
        updatedAction: {
          ...prevState.updatedAction,
          members: members,
          persons: persons,
        },
      };
    });
  };

  handleCancelButtonClick = () => {
    this.setState({ isEditing: false });

    this.props.onCancelButtonClick && this.props.onCancelButtonClick();
  };

  handleSaveButtonClick = () => {

    this.setState((prevState) => {
      const fields = ['title', 'date'];

      const invalidFields = [];

      fields.forEach((field) => {
        if (prevState.updatedAction[field].length === 0) {
          invalidFields.push(field);
        }
      });

      const isValid = invalidFields.length === 0 &&
        prevState.updatedAction.karma !== 'neutral' &&
        prevState.updatedAction.executors &&
        prevState.updatedAction.members.length > 0;

      if (isValid) {
        const members = prevState.updatedAction.members.map((member) => {
          const newMember = {
            personId: member.personId,
            isUser: member.isUser,
            side: member.side,
          };

          if (prevState.isEditing) {
            newMember.id = member.id;
          }

          return newMember;
        });

        const action = {
          title: prevState.updatedAction.title,
          date: prevState.updatedAction.date,
          description: prevState.updatedAction.description,
          karma: prevState.updatedAction.karma,
          executors: prevState.updatedAction.executors,
          members: members,
        };

        if (prevState.isEditing) {
          action.id = this.props.id;

          this.props.updateAction({
            variables: action,
          });
        } else {
          this.props.onSaveButtonClick(action);
        }

        return {
          ...prevState,
          isCreating: false,
          isEditing: false,
        };
      }
    });
  };


  static getDerivedStateFromProps = (props, state) => {
    if (!state.action || (!state.isCreating && !state.isEditing)) {
      const persons = props.context.persons.map((person) => {
        let isSelected = props.members && props.members.some((member) => {
          return member.personId === person.id;
        });

        let side;

        if (isSelected) {
          const selectedMember = props.members.find((member) => {
            return person.id === member.personId;
          });

          side = selectedMember.side;
        }

        if (person.id === props.activeMemberId) {
          isSelected = true;
          side = 'left';
        }

        return {
          id: person.id,
          name: person.name,
          isUser: person.id === props.context.user.id,
          isSelected: isSelected,
          side: isSelected ? side : null,
        };
      });

      const defaultSelectedPerson = persons.find((person) => {
        return person.id === props.activeMemberId;
      });

      const defaultActiveMember = defaultSelectedPerson && {
        personId: defaultSelectedPerson.id,
        name: defaultSelectedPerson.name,
        isUser: defaultSelectedPerson.isUser,
        side: defaultSelectedPerson.side,
      };

      const defaultMembers = defaultActiveMember ? [defaultActiveMember] : [];

      const action = {
        title: props.title || 'Action title',
        date: props.date || '12.05.2018',
        description: props.description || 'Music fan. Alcohol enthusiast. Creator. Devoted social media geek. Total analyst. Coffee lover. Beer junkie. Coffee maven. Avid alcohol lover. Twitter expert. Lifelong tv ninja. Creator. Passionate tv nerd. Problem solver. Proud alcohol evangelist. Lifelong web junkie. Coffee maven. Unapologetic social media advocate. Analyst. Tv trailblazer. Zombie geek. Twitter aficionado. Reader.',
        karma: props.karma || 'neutral',
        executors: props.executors || 'left',
        members: props.members || defaultMembers,
        persons: persons,
      };

      state.action = action;
      state.updatedAction = action;
    }

    state.isCreating = props.create;

    return state;
  };

  render() {
    let isCreating = this.state.isCreating;
    let isEditing = this.state.isEditing;
    let isCreatingOrEditing = isCreating || isEditing;


    let action = this.state.action;
    let updatedAction = this.state.updatedAction;


    let title;
    let date;
    let description;
    let karma;
    let executors;
    let members;

    if (action || isCreatingOrEditing) {
      title = isCreatingOrEditing ? updatedAction.title : action.title;
      date = isCreatingOrEditing ? updatedAction.date : action.date;
      description = isCreatingOrEditing ? updatedAction.description : action.description;
      karma = isCreatingOrEditing ? updatedAction.karma : action.karma;
      executors = isCreatingOrEditing ? updatedAction.executors : action.executors;
      members = isCreatingOrEditing ? updatedAction.members : action.members;
    }


    let leftSelectOptions;
    let rightSelectOptions;

    if (action || isCreatingOrEditing) {
      const persons = isCreatingOrEditing ? updatedAction.persons : action.persons;

      leftSelectOptions = persons.filter((person) => {
        return !person.isSelected && person.side !== 'right' && person.id !== this.props.activeMemberId;
      }).map((person) => {
        return (
          <option value={ person.id } key={ person.id }>
            { person.name }
          </option>
        );
      });

      rightSelectOptions = persons.filter((person) => {
        return !person.isSelected && person.side !== 'left';
      }).map((person) => {
        return (
          <option value={ person.id } key={ person.id }>
            { person.name }
          </option>
        );
      });
    }


    let leftSideMembers;
    let rightSideMembers;

    if (action || isCreatingOrEditing) {
      const members = isCreatingOrEditing ? updatedAction.members : action.members;

      leftSideMembers = members.filter((member) => {
        return member.side === 'left';
      });

      rightSideMembers = members.filter((member) => {
        return member.side === 'right';
      });
    }

    return (
      <Wrapper className={ this.props.className }>
        <Header>
          <HeaderLeftSide>
            <ContentEditableWrapper>
              <Title
                tag={ 'h3' }
                creating={ isCreatingOrEditing }
                edited={ this.state.fieldsEditedInfo.title || isEditing }
              >
                { title }
              </Title>

              <EditableTitle
                id={ `${this.props.id}-editable-title` }
                tag={ 'h3' }
                creating={ isCreatingOrEditing }
                edited={ this.state.fieldsEditedInfo.title || isEditing }
                contentEditable={ isCreatingOrEditing }
                onInput={ (e) => this.handleInput(e, 'title') }
                onKeyPress={ (e) => this.handleKeyPress(e, false) }
                onPaste={ (e) => this.handlePaste(e) }
              />
            </ContentEditableWrapper>

            <ContentEditableWrapper>
              <Date
                creating={ isCreatingOrEditing }
                edited={ this.state.fieldsEditedInfo.date || isEditing }
              >
                { date }
              </Date>

              <EditableDate
                id={ `${this.props.id}-editable-date` }
                creating={ isCreatingOrEditing }
                edited={ this.state.fieldsEditedInfo.date || isEditing }
                contentEditable={ isCreatingOrEditing }
                onInput={ (e) => this.handleInput(e, 'date') }
                onKeyPress={ (e) => this.handleKeyPress(e, false) }
                onPaste={ (e) => this.handlePaste(e) }
              />
            </ContentEditableWrapper>
          </HeaderLeftSide>

          {
            !isCreating && !isEditing && karma === 'negative' && executors === 'right' &&
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
            isEditing &&
            <div>
              <DeleteActionButton
                icon={ trashCan }
                iconPosition={ 'left' }
                onClick={ this.handleDeleteButtonClick }
              >
                Delete
              </DeleteActionButton>
            </div>
          }
        </Header>

        <ContentEditableWrapper fullHeight>
          <Description
            creating={ isCreatingOrEditing }
            edited={ this.state.fieldsEditedInfo.descrption || isEditing }
          >
            { description }
          </Description>

          <EditableDescription
            id={ `${this.props.id}-editable-description` }
            creating={ isCreatingOrEditing }
            edited={ this.state.fieldsEditedInfo.descrption || isEditing }
            contentEditable={ isCreatingOrEditing }
            onInput={ (e) => this.handleInput(e, 'description') }
            onKeyPress={ (e) => this.handleKeyPress(e, false) }
            onPaste={ (e) => this.handlePaste(e) }
          />
        </ContentEditableWrapper>

        <Footer>
          <FooterLeftSide>
            {
              (members || isCreatingOrEditing) &&
              <React.Fragment>
                <Members>
                  {
                    leftSideMembers && leftSideMembers.length > 0 && leftSideMembers.map((member) => {
                      const person = this.props.context.persons.find((person) => {
                        return person.id === member.personId;
                      });

                      const nameFirstLetters = member.name.split(' ').map((word) => {
                        return word[0];
                      }).join('');

                      return (
                        <MemberAvatarWrapper key={ member.personId }>
                          <MemberAvatar
                            size={ 'xs' }
                            url={ person.avatar ? person.avatar.url : null }
                          >
                            { !person.avatar ? nameFirstLetters : null }
                          </MemberAvatar>

                          {
                            person.id !== this.props.activeMemberId && isCreatingOrEditing &&
                            <RemoveMember onClick={ () => this.handleRemoveMemberButtonClick(member.personId) }>
                              <Icon icon={ close }/>
                            </RemoveMember>
                          }
                        </MemberAvatarWrapper>
                      );
                    })
                  }

                  {
                    isCreatingOrEditing && leftSelectOptions.length > 0 &&
                    <MemberAvatarWrapper>
                      <MemberAvatar
                        size={ 'xs' }
                        new
                        // white={ this.state.isLeftSelectOpened }
                        // onClick={ () => this.toggleSelect('left') }
                      >
                        <Icon icon={ plus }/>

                        <Select onChange={ (e) => this.handleSelectChange(e, 'left') }>
                          { leftSelectOptions }
                        </Select>
                      </MemberAvatar>

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
                    </MemberAvatarWrapper>
                  }
                </Members>

                {
                  (isCreatingOrEditing || (rightSideMembers && rightSideMembers.length > 0)) &&
                  <ExecutorsButton
                    type={ 'icon' }
                    theme={ executors === 'left' ? 'primary' : 'secondary' }
                    executors={ executors }
                    hoverable={ isCreatingOrEditing }
                    withoutRipple={ !isCreatingOrEditing }
                    onClick={ isCreatingOrEditing ? this.handleExecutorsButtonClick : null }
                  >
                    <Icon icon={ longLeftArrow }/>
                  </ExecutorsButton>
                }

                <Members>
                  {
                    rightSideMembers && rightSideMembers.length > 0 && rightSideMembers.map((member) => {
                      const person = this.props.context.persons.find((person) => {
                        return person.id === member.personId;
                      });

                      const nameFirstLetters = member.name.split(' ').map((word) => {
                        return word[0];
                      }).join('');

                      return (
                        <MemberAvatarWrapper key={ member.personId }>
                          <MemberAvatar
                            size={ 'xs' }
                            url={ person.avatar ? person.avatar.url : null }
                          >
                            { !person.avatar ? nameFirstLetters : null }
                          </MemberAvatar>

                          {
                            person.id !== this.props.activeMemberId && isCreatingOrEditing &&
                            <RemoveMember onClick={ () => this.handleRemoveMemberButtonClick(member.personId) }>
                              <Icon icon={ close }/>
                            </RemoveMember>
                          }
                        </MemberAvatarWrapper>
                      );
                    })
                  }

                  {
                    isCreatingOrEditing && rightSelectOptions.length > 0 &&
                    <MemberAvatarWrapper>
                      <MemberAvatar
                        size={ 'xs' }
                        new
                        // white={ this.state.isRightSelectOpened }
                        // onClick={ () => this.toggleSelect('right') }
                      >
                        <Icon icon={ plus }/>
                      </MemberAvatar>

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

                      <Select onChange={ (e) => this.handleSelectChange(e, 'right') }>
                        { rightSelectOptions }
                      </Select>
                    </MemberAvatarWrapper>
                  }
                </Members>
              </React.Fragment>
            }
          </FooterLeftSide>

          <FooterRightSide>
            {
              !isCreating && !isEditing ?
                <React.Fragment>
                  <Button
                    type={ 'flat' }
                    theme={ executors && executors === 'left' ? 'primary' : 'secondary' }
                    onClick={ () => this.handleEditButtonClick(this.props.id) }
                  >
                    Edit
                  </Button>
                  <Button
                    theme={ executors && executors === 'left' ? 'primary' : 'secondary' }
                    onClick={ this.props.onMoreButtonClick }
                  >
                    More
                  </Button>
                </React.Fragment>
                :
                <React.Fragment>
                  <Button
                    type={ 'flat' }
                    theme={ executors && executors === 'left' ? 'primary' : 'secondary' }
                    onClick={ this.handleCancelButtonClick }
                  >
                    Cancel
                  </Button>
                  <Button
                    theme={ executors && executors === 'left' ? 'primary' : 'secondary' }
                    onClick={ this.handleSaveButtonClick }
                  >
                    Save
                  </Button>
                </React.Fragment>
            }
          </FooterRightSide>
        </Footer>

        <Border
          type={ karma }
          hoverable={ isCreatingOrEditing }
          onClick={ isCreatingOrEditing ? this.handleBorderClick : null }
        />
      </Wrapper>
    );
  }
}


ActionCardComponent.propTypes = {
  id: PropTypes.string,
  className: PropTypes.string,
  title: PropTypes.string,
  date: PropTypes.string,
  description: PropTypes.string,
  karma: PropTypes.string,
  executors: PropTypes.string,
  members: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      personId: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      isUser: PropTypes.bool.isRequired,
      side: PropTypes.string.isRequired,
    }),
  ),
  activeMemberId: PropTypes.string,
  create: PropTypes.bool,
  onForgiveButtonClick: PropTypes.func,
  onMoreButtonClick: PropTypes.func,
  onCancelButtonClick: PropTypes.func,
  onSaveButtonClick: PropTypes.func,
  updateAction: PropTypes.func,
  context: PropTypes.object,
};


const ActionCardWithContext = React.forwardRef((props, ref) => (
  <AppConsumer>
    { (context) => <ActionCardComponent { ...props } context={ context } ref={ ref }/> }
  </AppConsumer>
));


export const ActionCard = graphql(UPDATE_ACTION, { name: 'updateAction' })(ActionCardWithContext);
