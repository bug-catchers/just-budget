import React from 'react';
import { Grid, Segment, Header } from 'semantic-ui-react';
import { AutoForm, ErrorsField, NumField, SelectField, SubmitField } from 'uniforms-semantic';
import swal from 'sweetalert';
import { Meteor } from 'meteor/meteor';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';
import { Planners } from '../../api/budget/Planner';

// Create a schema to specify the structure of the data to appear in the form.
const formSchema = new SimpleSchema({
  year: Number,
  month: {
    type: String,
    allowedValues: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
  },
  initialBalance: Number,
});

const bridge = new SimpleSchema2Bridge(formSchema);

/** Renders the Page for adding a document. */
class CreatePlanner extends React.Component {

  constructor(props) {
    super(props);
    this.selectRef = React.createRef();
  }

  // On submit, insert the data.
  submit(data, formRef) {
    const { year, month, initialBalance } = data;
    const endingBalance = initialBalance;
    const owner = Meteor.user().username;
    Planners.collection.insert({ year, month, initialBalance, endingBalance, owner },
      (error) => {
        if (error) {
          swal('Error', error.message, 'error');
        } else {
          if (Number.MIN_SAFE_INTEGER < initialBalance && initialBalance < Number.MAX_SAFE_INTEGER) {
            swal('Success', 'Planner created successfully', 'success');
          } else {
            swal('Warning', `Planner created successfully, but the initial balance is outside the safe boundary (-+${Number.MAX_SAFE_INTEGER})`, 'warning');
          }
          formRef.reset();
        }
      });
  }

  // Render the form. Use Uniforms: https://github.com/vazco/uniforms
  render() {
    let fRef = null;
    return (
      <Grid container centered id='create-planner-page'>
        <Grid.Column>
          <Header as="h2" textAlign="center">Create a new Planner</Header>
          <AutoForm ref={ref => { fRef = ref; }} schema={bridge} onSubmit={data => this.submit(data, fRef)} >
            <Segment>
              <NumField name='year' decimal={false} id='create-planner-year'/>
              <SelectField name='month' id='create-planner-month'/>
              <NumField name='initialBalance' decimal id='create-planner-balance'/>
              <SubmitField value='Create' id='create-planner-create'/>
              <ErrorsField/>
            </Segment>
          </AutoForm>
        </Grid.Column>
      </Grid>
    );
  }
}

export default CreatePlanner;
