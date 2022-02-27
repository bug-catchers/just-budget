import React from 'react';
import { Grid, Header, Icon } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { withRouter } from 'react-router-dom';

/** A simple static component to render some text for the landing page. */
class Landing extends React.Component {
  render() {
    return (
      <div className="landing-background">
        <Grid columns={2} id='landing-page' verticalAlign='middle' textAlign='center' container>
          <Grid.Row>
            <Header as='h1'>Welcome! User</Header>
          </Grid.Row>
          { this.props.currentUser ? (
            <Grid.Row>
              <Grid.Column>
                <Header as='h2'>Budget Planners</Header>
                <Icon name='edit' size='huge'/>
                <Header as='h3'>View and track your budget.</Header>
              </Grid.Column>
              <Grid.Column>
                <Header as='h2'>Create Planner</Header>
                <Icon name='list alternate outline' size='huge'/>
                <Header as='h3'>Create a new budget planner.</Header>
              </Grid.Column>
            </Grid.Row>) :
            (
              <div>
                <br/>
                <Header as='h2'> Sign up now to get started with Budget Planner! </Header>
                <Header as='h2'> Sign in to view your Budget. </Header>
                <br/>
              </div>
            )
          }
        </Grid>
      </div>
    );
  }
}

// Declare the types of all properties.
Landing.propTypes = {
  currentUser: PropTypes.string,
};

// withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
const LandingContainer = withTracker(() => ({
  currentUser: Meteor.user() ? Meteor.user().username : '',
}))(Landing);

// Enable ReactRouter for this component. https://reacttraining.com/react-router/web/api/withRouter
export default withRouter(LandingContainer);
