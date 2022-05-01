import React from 'react';
import { Button, Card, Header, Icon, Modal, Segment } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { _ } from 'meteor/underscore';
import { AutoForm, ErrorsField, NumField, TextField } from 'uniforms-semantic';
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
    if (Number.MIN_SAFE_INTEGER < endingBalance && endingBalance < Number.MAX_SAFE_INTEGER) {
      Planners.collection.update(this.props.planner._id, { $set: { endingBalance } },
        (error) => (error ?
          swal('Error', error.message, 'error') :
          swal('Success', 'Planner updated successfully', 'success')));
    } else {
      swal('Error', `This budget planner ends balance exceeding the safe limit (-+${Number.MAX_SAFE_INTEGER}). \nPlease create a new planner`, 'error');
    }
  }

  submit(changes) {
    Planners.collection.update(this.props.planner._id, { $addToSet: { changes } },
      (error) => (error ?
        swal('Error', error.message, 'error') : this.reflectUpdate()));
    this.setState({ prompt: false });
  }

  removeItem(changes) {
    Planners.collection.update(this.props.planner._id, { $pull: { changes } },
      (error) => (error ?
        swal('Error', error.message, 'error') :
        this.reflectUpdate()));
  }

  deletePlanner(id) {
    Planners.collection.remove(id);
  }

  toUSD(value) {
    return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
  }

  plannerCardColor(value) {
    return (value < 0 ? 'red' : 'green');
  }

  render() {
    return (
      <Card color={this.plannerCardColor(this.props.planner.endingBalance)}>
        <Card.Content>
          <Card.Header>{this.props.planner.month}, {this.props.planner.year}</Card.Header>
          <Card.Meta>
            <Header as='h4'>
              Beginning Balance: {this.toUSD(this.props.planner.initialBalance)}
            </Header>
          </Card.Meta>
          <Card.Description>
            <Header as='h5'> Income/Spending: </Header>
            {_.map(this.props.planner.changes,
              (change, index) => <p key={index}>
                {change.amount < 0 ? <Icon color='red' name='minus'/> : <Icon color='green' name='add'/>}
                {change.name}: {this.toUSD(change.amount)}
                <Icon color='grey' name='trash alternate outline' onClick={() => this.removeItem(change)}/>
              </p>)}
          </Card.Description>
        </Card.Content>
        <Card.Content extra>
          <Header as='h4' color={this.plannerCardColor(this.props.planner.endingBalance)}>
            Ending Balance: {this.toUSD(this.props.planner.endingBalance)}
          </Header>
          <Button size='small' inverted color="red" onClick={() => this.deletePlanner(this.props.planner._id)}>Delete</Button>
          <Modal
            basic
            onClose={() => this.setState({ prompt: false })}
            onOpen={() => this.setState({ prompt: true })}
            open={this.state.prompt}
            size='small'
            trigger={<Button size='small' inverted color={this.plannerCardColor(this.props.planner.endingBalance)}>Add Spending/Income</Button>}
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
                  <br/>
                  <Button color='red' inverted onClick={() => this.setState({ prompt: false })}>
                    <Icon name='remove'/> Cancel
                  </Button>
                  <Button color='green' inverted onClick={() => this.submit()}>
                    <Icon name='check'/> Create
                  </Button>
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
