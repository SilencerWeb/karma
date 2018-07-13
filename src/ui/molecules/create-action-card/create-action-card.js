import * as React from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';
import { ApolloConsumer, Mutation } from 'react-apollo';

import { Icon } from 'ui/atoms';

import { ActionCard } from 'ui/molecules';

import { plus } from 'ui/outlines';

import { color, transition } from 'ui/theme';

import { CREATE_ACTION } from 'graphql/mutations/action';


const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 26.2rem;
  background-color: #ffffff;
  border-radius: 0.4rem;
  box-shadow: 0 0.8rem 1.6rem rgba(176, 190, 197, 0.24), 0 -0.8rem 1.6rem rgba(176, 190, 197, 0.24);
  padding-top: 3.2rem;
  padding-right: 2.4rem;
  padding-bottom: 3.2rem;
  padding-left: 2.4rem;
  cursor: pointer;
  transition: ${transition};
  
  &:hover {
    box-shadow: 0 0.8rem 1.6rem rgba(176, 190, 197, 0.44), 0 -0.8rem 1.6rem rgba(176, 190, 197, 0.44);
  }
  
  svg {
    font-size: 10rem;
    color: ${color.primary};
  }
`;


export class CreateActionCard extends React.Component {
  state = {
    isCreating: false,
  };

  handleWrapperClick = () => {
    this.setState({
      isCreating: true,
    });
  };

  handleCancelButtonClick = () => {
    this.props.onCancelButtonClick && this.props.onCancelButtonClick();

    this.setState({ isCreating: false });
  };

  static getDerivedStateFromProps = (props, state) => {
    if (props.isCreating) {
      state.isCreating = props.isCreating;
    }

    return state;
  };

  render() {

    return (
      <React.Fragment>
        {
          !this.state.isCreating ?
            <Wrapper className={ this.props.className } onClick={ this.handleWrapperClick }>
              <Icon icon={ plus }/>
            </Wrapper>
            :
            <ApolloConsumer>
              { () => (
                <Mutation mutation={ CREATE_ACTION }>
                  { (createAction) => (
                    <ActionCard
                      activeMemberId={ this.props.activeMemberId }
                      create
                      onCancelButtonClick={ this.handleCancelButtonClick }
                      onSaveButtonClick={ (action) => {
                        createAction({
                          variables: action,
                        });

                        this.props.onSaveButtonClick && this.props.onSaveButtonClick();

                        this.setState({
                          isCreating: false,
                        });
                      } }
                    />
                  ) }
                </Mutation>
              ) }
            </ApolloConsumer>
        }
      </React.Fragment>
    );
  }
}


CreateActionCard.propTypes = {
  className: PropTypes.string,
  isCreating: PropTypes.bool,
  activeMemberId: PropTypes.string,
  onCancelButtonClick: PropTypes.func,
  onSaveButtonClick: PropTypes.func,
};
