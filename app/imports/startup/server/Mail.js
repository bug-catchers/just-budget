import { Meteor } from 'meteor/meteor';
import { Email } from 'meteor/email';
import { check } from 'meteor/check';

if (Meteor.isServer) {
  Meteor.startup(() => {
    process.env.MAIL_URL = 'smtps://lamtechmailguy@gmail.com:justbudgetproject369@smtp.gmail.com:465/';
  });
}

Meteor.methods({
  sendEmail(subject, text) {
    const to = 'LamTech <lamtechmailguy@gmail.com>';
    const from = 'lamtechmailguy@gmail.com';

    // Make sure that all arguments are strings.
    check([subject, text], [String]);

    // Let other method calls from the same client start running, without
    // waiting for the email sending to complete.
    this.unblock();

    Email.send({ to, from, subject, text });
  },
});
