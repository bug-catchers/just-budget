import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Tracker } from 'meteor/tracker';

/**
 * The StuffsCollection. It encapsulates state and variable values for stuff.
 */
class PlannersCollection {
  constructor() {
    // The name of this collection.
    this.name = 'PlannersCollection';
    // Define the Mongo collection.
    this.collection = new Mongo.Collection(this.name);
    // Define the structure of each document in the collection.
    this.schema = new SimpleSchema({
      year: Number,
      month: {
        type: String,
        allowedValues: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
      },
      initialBalance: Number,
      changes: { type: Array, optional: true },
      'changes.$': {
        type: Object,
      },
      'changes.$.name': {
        type: String,
      },
      'changes.$.amount': {
        type: Number,
      },
      endingBalance: { type: Number, optional: true },
      owner: String,
    }, { tracker: Tracker });
    // Attach the schema to the collection, so all attempts to insert a document are checked against schema.
    this.collection.attachSchema(this.schema);
    // Define names for publications and subscriptions
    this.userPublicationName = `${this.name}.publication.user`;
    this.adminPublicationName = `${this.name}.publication.admin`;
  }
}

/**
 * The singleton instance of the PlannersCollection.
 * @type {PlannersCollection}
 */
export const Planners = new PlannersCollection();
