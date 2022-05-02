import React from 'react';
import { Grid, Segment, Header } from 'semantic-ui-react';
import { AutoForm, ErrorsField, LongTextField, SelectField, SubmitField, TextField } from 'uniforms-semantic';
import { Meteor } from 'meteor/meteor';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';

// Create a schema to specify the structure of the data to appear in the form.
const formSchema = new SimpleSchema({
  title: String,
  feedback: String,
  option: String,
});

const bridge = new SimpleSchema2Bridge(formSchema);

/** Renders the Page for adding a document. */
class Feedback extends React.Component {

  // On submit, insert the data.
  submit(data, formRef) {
    const { title, feedback, option } = data;
    const owner = Meteor.user().username;

    Meteor.call(
      'sendEmail',
      (`${option}: ${title} from ${owner}`),
      (`${feedback}`),
    );
    formRef.reset();
  }

  // Render the form. Use Uniforms: https://github.com/vazco/uniforms
  render() {
    let fRef = null;
    return (
      <Grid container centered>
        <Grid.Column>
          <Header as="h2" textAlign="center">Send us your feedback</Header>
          <AutoForm ref={ref => { fRef = ref; }} schema={bridge} onSubmit={data => this.submit(data, fRef)} >
            <Segment>
              <TextField name='title'/>
              <SelectField name='option' showInlineError={true} placeholder={'Select one'}
                options={[
                  { label: 'Requesting Support', value: 'Requesting Support' },
                  { label: 'Bug report', value: 'Bug report' },
                  { label: 'Requesting Account/Data Removal', value: 'Requesting Account/Data Removal' },
                  { label: 'Others', value: 'Others' },
                ]}/>
              <LongTextField name='feedback'/>
              <SubmitField value='Submit'/>
              <ErrorsField/>
            </Segment>
          </AutoForm>
        </Grid.Column>
      </Grid>
    );
  }
}

export default Feedback;
