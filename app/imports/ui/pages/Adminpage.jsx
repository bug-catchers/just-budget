import React from 'react';
import { Grid, Segment, Header } from 'semantic-ui-react';
import { AutoForm, ErrorsField, SubmitField, TextField } from 'uniforms-semantic';
import swal from 'sweetalert';
import { Meteor } from 'meteor/meteor';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';

const formSchema = new SimpleSchema({
  userEmail: String,
});

const bridge = new SimpleSchema2Bridge(formSchema);

/** Renders the Page for adding a document. */
class Adminpage extends React.Component {

  constructor(props) {
    super(props);
    this.selectRef = React.createRef();
  }

  submit(data, formRef) {
    const { userEmail } = data;
    Meteor.users.remove({ username: userEmail },
      (error) => {
        if (error) {
          swal('Error', error.message, 'error');
        } else {
          swal('Success', 'User have been deleted', 'success');
          formRef.reset();
        }
      });
  }

  render() {
    // Render the form. Use Uniforms: https://github.com/vazco/uniforms
    let fRef = null;
    const changeRolePage = { paddingTop: '15px', paddingBottom: '20px' };
    return (
      <Grid container centered style={changeRolePage} >
        <Grid.Column>
          <Header as="h2" textAlign="center">Delete Account</Header>
          <AutoForm ref={ref => { fRef = ref; }} schema={bridge} onSubmit={data => this.submit(data, fRef)} >
            <Segment>
              <TextField name='userEmail'/>
              <SubmitField value='Submit'/>
              <ErrorsField/>
            </Segment>
          </AutoForm>
        </Grid.Column>
      </Grid>
    );
  }
}
export default Adminpage;
