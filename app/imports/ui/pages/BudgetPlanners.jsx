import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Header, Loader, CardGroup } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Planners } from '../../api/budget/Planner';
import PlannerCard from '../components/PlannerCard';

/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class BudgetPlanners extends React.Component {

  // If the subscription(s) have been received, render the page, otherwise show a loading icon.
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  // Render the page once subscriptions have been received.
  renderPage() {
    const planners = this.props.planners;
    return (
      <Container>
        <Header as="h2" textAlign="center">Budget Planners</Header>
        <CardGroup itemsPerRow={3}>
          {planners.map((planner) => <PlannerCard key={planner._id} planner={planner} />)}
        </CardGroup>
      </Container>
    );
  }
}

// Require an array of Stuff documents in the props.
BudgetPlanners.propTypes = {
  planners: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

// withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
export default withTracker(() => {
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe(Planners.userPublicationName);
  // Determine if the subscription is ready
  const ready = subscription.ready();
  // Get the Stuff documents
  const planners = Planners.collection.find({}).fetch();
  return {
    planners,
    ready,
  };
})(BudgetPlanners);
