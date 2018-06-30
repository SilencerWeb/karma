import * as React from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';

import { AppConsumer } from 'index';

import { Heading, Button, Icon, RetinaImage } from 'ui/atoms';

// import { OutsideAlerter } from 'ui/molecules';

import { handsUpHuman, longLeftArrow, plus } from 'ui/outlines';

import { color, transition } from 'ui/theme';

import avatar_1x from 'assets/images/avatars/xs/avatar.png';

import avatar_2x from 'assets/images/avatars/xs/avatar@2x.png';


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

const Avatar = styled.div`
  width: 4rem;
  height: 4rem;
  border-radius: 50%;
  
  img {
    width: 100%;
    max-width: 100%;
  }
  
  ${p => css`
    
    ${p.new && css`
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: ${color.primary};
      cursor: pointer;
      
      svg {
        font-size: 1.6rem;
        color: #ffffff;
      }
      
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

const Members = styled.div`
  position: relative;
  display: flex;
  
  ${Avatar} {
    position: relative;
    margin-left: -2rem;
    transition: ${transition};
    overflow: hidden;
    
    &:hover {
      z-index: 9;
      transform: scale(1.2);
    }
    
    &:first-child {
      margin-left: 0;
    }
  }
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
`;

const ExecutorsArrow = styled(Icon)`
  font-size: 2.4rem;
  margin-right: 0.8rem;
  margin-left: 0.8rem;

  ${p => css`
  
    ${p.executors === 'left' && css`
      color: ${color.primary};
      transform: rotate(180deg);
    `}
    
    ${p.executors === 'right' && css`
      color: ${color.secondary};
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

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 2.4rem;
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
`;

export class ActionCard extends React.Component {
  state = {
    isCreating: this.props.create,
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

  generatePersonsForSelect = (persons) => {
    const generatedPersons = persons.map((person) => {
      return {
        id: person.id,
        name: person.name,
        isSelected: false,
        side: null,
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

      if (canBeLineBroken) {
        document.execCommand('insertHTML', false, '<br><br>');
      }
    }
  };

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

  handleSelectChange = (e, side) => {
    const value = e.currentTarget.value;

    this.setState((prevState) => {
      const state = { ...prevState };

      if (!state.members) state.members = [];

      const newMember = state.persons.find((person) => {
        return person.id === value;
      });

      state.members.push({
        personId: newMember.id,
        side: side,
      });

      state.persons = state.persons.map((person) => {
        if (value === person.id) {
          person.isSelected = true;
          person.side = side;
        }

        return person;
      });

      return state;
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

  handleExecutorsArrowClick = () => {

    this.setState((prevState) => {
      return {
        ...prevState,
        executors: prevState.executors === 'left' ? 'right' : 'left',
      };
    });
  };

  handleSaveButtonClick = (e) => {

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
        const person = {
          title: state.title.content,
          date: state.date.content,
          description: state.description.content,
          karma: state.karma,
          executors: state.executors,
          members: state.members,
        };

        this.props.onSaveButtonClick(person);

        state.isCreating = false;
      } else {
        invalidFields.forEach((invalidField) => {
          state[invalidField].isInvalid = true;
        });
      }

      return state;
    });
  };

  render() {
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

    return (
      <AppConsumer>
        { (context) => (
          <Wrapper className={ this.props.className }>
            {
              this.props.create && !this.state.persons.length && context.persons &&
              this.generatePersonsForSelect(context.persons)
            }

            <Header>
              <HeaderLeftSide>
                <ContentEditableWrapper>
                  <Title
                    tag={ 'h3' }
                    creating={ this.state.isCreating }
                    edited={ this.state.title.isEdited }
                    invalid={ this.state.title.isInvalid }
                  >
                    { this.state.title.content.length > 0 ? this.state.title.content : this.props.title }
                  </Title>

                  <EditableTitle
                    tag={ 'h3' }
                    creating={ this.state.isCreating }
                    edited={ this.state.title.isEdited }
                    contentEditable={ this.state.isCreating }
                    onInput={ (e) => this.handleInput(e, 'title') }
                    onKeyPress={ (e) => this.handleKeyPress(e, false) }
                  />
                </ContentEditableWrapper>

                <ContentEditableWrapper>
                  <Date
                    creating={ this.state.isCreating }
                    edited={ this.state.date.isEdited }
                    invalid={ this.state.date.isInvalid }
                  >
                    { this.state.date.content.length > 0 ? this.state.date.content : this.props.date }
                  </Date>

                  <EditableDate
                    creating={ this.state.isCreating }
                    edited={ this.state.date.isEdited }
                    contentEditable={ this.state.isCreating }
                    onInput={ (e) => this.handleInput(e, 'date') }
                    onKeyPress={ (e) => this.handleKeyPress(e, false) }
                  />
                </ContentEditableWrapper>
              </HeaderLeftSide>

              {
                !this.state.isCreating && this.state.karma === 'negative' && this.state.executors === 'right' &&
                <div>
                  <Button
                    icon={ {
                      svg: handsUpHuman,
                      position: 'right',
                    } }
                    onClick={ this.props.onForgiveButtonClick }
                  >
                    Forgive
                  </Button>
                </div>
              }
            </Header>

            <ContentEditableWrapper fullHeight>
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
                onKeyPress={ (e) => this.handleKeyPress(e, false) }
              />
            </ContentEditableWrapper>

            <Footer>
              <FooterLeftSide>
                {
                  (this.state.members || this.state.isCreating) &&
                  <React.Fragment>
                    <Members>
                      {
                        this.state.members && this.state.members.length && this.state.members.filter((member) => {
                          return member.side === 'left';
                        }).map((member, i) => {
                          return (
                            <Avatar key={ i }>
                              <RetinaImage src={ { _1x: avatar_1x, _2x: avatar_2x } } alt={ '' }/>
                            </Avatar>
                          );
                        })
                      }

                      {
                        this.state.isCreating && leftSelectOptions.length > 0 &&
                        <React.Fragment>
                          <Avatar
                            new
                            // white={ this.state.isLeftSelectOpened }
                            // onClick={ () => this.toggleSelect('left') }
                          >
                            <Icon icon={ plus }/>

                            <Select onChange={ (e) => this.handleSelectChange(e, 'left') }>{ leftSelectOptions }</Select>
                          </Avatar>

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

                    <ExecutorsArrow
                      icon={ longLeftArrow }
                      executors={ this.state.executors }
                      onClick={ this.state.isCreating ? this.handleExecutorsArrowClick : null }
                    />

                    <Members>
                      {
                        this.state.members && this.state.members.length && this.state.members.filter((member) => {
                          return member.side === 'right';
                        }).map((member, i) => {
                          return (
                            <Avatar key={ i }>
                              <RetinaImage src={ { _1x: avatar_1x, _2x: avatar_2x } } alt={ 'avatar' }/>
                            </Avatar>
                          );
                        })
                      }

                      {
                        this.state.isCreating && rightSelectOptions.length > 0 &&
                        <React.Fragment>
                          <Avatar
                            new
                            // white={ this.state.isRightSelectOpened }
                            // onClick={ () => this.toggleSelect('right') }
                          >
                            <Icon icon={ plus }/>

                            <Select onChange={ (e) => this.handleSelectChange(e, 'right') }>{ rightSelectOptions }</Select>
                          </Avatar>

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
                { !this.state.isCreating ?
                  <React.Fragment>
                    <Button
                      type={ 'flat' }
                      theme={ this.state.executors && this.state.executors === 'left' ? 'primary' : 'secondary' }
                      onClick={ this.props.onEditButtonClick }
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
                      onClick={ this.props.onCancelButtonClick }
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

            <Border type={ this.state.karma } onClick={ this.state.isCreating ? this.handleBorderClick : null }/>
          </Wrapper>
        ) }
      </AppConsumer>
    );
  }
}


ActionCard.propTypes = {
  className: PropTypes.string,
  title: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  karma: PropTypes.string.isRequired,
  executors: PropTypes.string,
  members: PropTypes.object,
  create: PropTypes.bool,
  onForgiveButtonClick: PropTypes.func,
  onEditButtonClick: PropTypes.func,
  onMoreButtonClick: PropTypes.func,
  onCancelButtonClick: PropTypes.func,
  onSaveButtonClick: PropTypes.func,
};
