import React from 'react';
import { Button, Card, Header, Icon, Modal, Segment } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { _ } from 'meteor/underscore';
import { AutoForm, ErrorsField, NumField, SubmitField, TextField } from 'uniforms-semantic';
import swal from 'sweetalert';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import { Budgets } from '../../api/budget/Budget';
import { Planners } from '../../api/budget/Planner';

const bridge = new SimpleSchema2Bridge(Budgets.schema);

class PlannerCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      prompt: false,
    };
  }

  reflectUpdate() {
    const endingBalance = this.props.planner.initialBalance + _.reduce(this.props.planner.changes, function (memo, change) { return memo + change.amount; }, 0);
    Planners.collection.update(this.props.planner._id, { $set: { endingBalance } },
      (error) => (error ?
        swal('Error', error.message, 'error') :
        swal('Success', 'Planner updated successfully', 'success')));
  }

  submit(changes) {
    Planners.collection.update(this.props.planner._id, { $addToSet: { changes } },
      (error) => (error ?
        swal('Error', error.message, 'error') :
        this.reflectUpdate()));
  }

  render() {
    return (
      <Card color='green'>
        <Card.Content>
          <Card.Header>{this.props.planner.month}, {this.props.planner.year}</Card.Header>
          <Card.Meta>
            <Header as='h4'>
              Beginning Balance: {this.props.planner.initialBalance}
            </Header>
          </Card.Meta>
          <Card.Description>
            <Header as='h5'> Income/Spending: </Header>
            {_.map(this.props.planner.changes,
              (change, index) => <p key={index}> {change.name}: {change.amount}</p>)}
          </Card.Description>
        </Card.Content>
        <Card.Content extra>
          <Header as='h4'>
            Ending Balance: {this.props.planner.endingBalance}
          </Header>
          <Modal
            basic
            onClose={() => this.setState({ prompt: false })}
            onOpen={() => this.setState({ prompt: true })}
            open={this.state.prompt}
            size='small'
            trigger={<Button size='small' inverted color='green'>Add Spending/Income</Button>}
          >
            <Header size='huge'>
              Add Spending/Income
            </Header>
            <AutoForm schema={bridge} onSubmit={changes => this.submit(changes)} >
              <Segment>
                <Modal.Content>
                  <TextField name='name'/>
                  <NumField name='amount'/>
                  <ErrorsField/>
                </Modal.Content>
                <Modal.Actions>
                  <Button color='red' inverted>
                    <Icon name='remove'/> Cancel
                  </Button>
                  <SubmitField value='Create'/>
                </Modal.Actions>
              </Segment>
            </AutoForm>
          </Modal>
        </Card.Content>
      </Card>
    );
  }
}

PlannerCard.propTypes = {
  planner: PropTypes.shape({
    year: PropTypes.number,
    month: PropTypes.string,
    initialBalance: PropTypes.number,
    changes: PropTypes.array,
    endingBalance: PropTypes.number,
    _id: PropTypes.string,
  }).isRequired,
};

// Wrap this component in withRouter since we use the <Link> React Router element.
export default withRouter(PlannerCard);
