[![ci-just-budget](https://github.com/bug-catchers/just-budget/actions/workflows/ci.yml/badge.svg)](https://github.com/bug-catchers/just-budget/actions/workflows/ci.yml)

Just Budget is a simple and straightforward to use budget management tool. Plan your monthly spending by entering your income and expenses, Just Budget will then calculate how much money you will have by the end of the month. Just Budget also allows you to track and view your spending from previous months, so you would never have to wonder where you’ve spent your money again!

# Installing & Deploying Just Budget Locally
1. To run this application on your own computer, you will first need to install [Meteor](https://www.meteor.com/developers/install).
2. Once Meteor is installed, download the Just Budget project from GitHub as a ZIP file.
3. Extract the content of the ZIP file, from there open command prompt and run these commands:
```
cd app
```
```
meteor npm install
```
4. Once the program has finished installing the necessary packages, you can run this command to deploy the application:
```
meteor npm run start
```
Which should produce the following output:
```
PS C:\Users\chakh\Documents\GitHub\just-budget\app> meteor npm run start

> meteor-application-template-react@ start C:\Users\chakh\Documents\GitHub\just-budget\app
> meteor --no-release-check --exclude-archs web.browser.legacy,web.cordova --settings ../config/settings.development.json

[[[[[ C:\Users\chakh\Documents\GitHub\just-budget\app ]]]]]

=> Started proxy.
=> Started MongoDB.
I20220430-17:01:02.571(-10)? Monti APM: completed instrumenting the app
=> Started your app.

=> App running at: http://localhost:3000/
   Type Control-C twice to stop.
```
*Note that if you are running the application for the first time, it might take a few minutes for the application to load.

5. You can now connect to http://localhost:3000/ to access the application.

# Uninstall Just Budget
1. Delete the file where Just Budget located.

# Developer notes
- We use [meteor-application-template-react](http://ics-software-engineering.github.io/meteor-application-template-react/) as a template for out project
- For the release of Just Budget we removed the send email from the Feedback page due to security reasons, if you were to deploy Just Budget the email feature will _**NOT**_ work.
- The feedback email is a proof of concept on how we could maintain the project and response to future threats.
- The admin page did not implement as planned due to security reasons. Since we are using meteor for our application, meteor's default is that users would not able to modify or delete an account on the client-side, the function calls ```Meteor.users.remove()``` where prohibited because meteor does not want to take any security risks since this function call might mess up the database if there is vulnerability. So we decide to add an option on the feedback page, where users can make a request to delete their account. If we deployed the application, once we receive the request, we will manually log on to the Mongo database and remove the account information from the database.
- To reset the application, open command prompt where the application located and run these commands:
```
cd app
meteor reset
```
# Links
- [Repository](https://github.com/bug-catchers/just-budget)
- [Wiki](https://github.com/bug-catchers/just-budget/wiki)
- [Readme](https://github.com/bug-catchers/just-budget/blob/master/README.md)
- [Documentation](https://github.com/bug-catchers/just-budget/blob/master/ICS%20427%20Report.pdf)
- [Release](https://github.com/bug-catchers/just-budget/commits/v1.0.0)

# Work
Chak Hon Lam:
 - Completed:
   - Button and Modal to add spending/income
   - Functions to update and calculate spending
 - To Do:
   - Feedback page
   - Ability to edit budget plan
   - Ability to to delete your own account

Su Lao:
 - Completed:
   - Page to display budget plans
   - Page to create budget plans
 - To Do:
   - Home page to explain the application
   - Footer with information about the application

Shengtong Jin
 - Completed:
   - Budget plans schema
   - Setup MangoDB to store budget plans
 - To Do:
   - Ability to edit budget plan
   - Admin page

Ian Manzano:
- Completed:
    - Basic Login page
    - Basic Sign Up page
- To Do:
    - Update UI to make application less boring
    - Update UI to make everything fit and center

### Update 3/28/2022
[Link to project](https://github.com/bug-catchers/just-budget)

 - New progress
   - Added Feedback page
   - Ability to edit budget plan
   - Home page to explain the application
   - Footer with information about the application
   - Testcafe test for budget page
   - Update UI to make application less boring
   - Update UI to make everything fit and center
 - Pending
   - Testcafe test plan for rest of the pages
   - Admin page
   - UI for the new pages
   - Clean up 

Chak Hon Lam:
 - Completed:
   - Button and Modal to add spending/income
   - Functions to update and calculate spending
   - Feedback page
   - Ability to edit budget plan
 - Current:
   - Ability to to delete your own account
 - Next:
   - Testcafe for rest of the site

Su Lao:
 - Completed:
   - Page to display budget plans
   - Page to create budget plans
   - Home page to explain the application
   - Footer with information about the application
   - Testcafe test for budget page
 - Current:
   - Testcafe for login/signup page
 - Next:
   - Testcafe for rest of the site 

Shengtong Jin
 - Completed:
   - Budget plans schema
   - Setup MangoDB to store budget plans
   - Clean up
 - Current:
   - Admin page
 - Next:

Ian Manzano:
 - Completed:
   - Basic Login page
   - Basic Sign Up page
   - Update UI to make application less boring
   - Update UI to make everything fit and center
 - Current:
   - UI for the new pages
 - Next:
   - UI related issues

### Update 4/11/2022
[Link to project](https://github.com/bug-catchers/just-budget)

- New progress
   - ~~Admin page~~
   - Clean up
   - UI for the new pages
   - More Testcafe test plans
- Pending
   - Testcafe test plan for rest of the pages
   - Bug fixes

Chak Hon Lam:
- Completed:
   - Button and Modal to add spending/income
   - Functions to update and calculate spending
   - Feedback page
   - Ability to edit budget plan
- Current:
   - Testcafe for rest of the site
- Next:
   - Testcafe for rest of the site

Su Lao:
- Completed:
   - Page to display budget plans
   - Page to create budget plans
   - Home page to explain the application
   - Footer with information about the application
   - Testcafe test for budget page
- Current:
   - Testcafe for login/signup page
- Next:
   - Testcafe for rest of the site

Shengtong Jin:
- Completed:
   - Budget plans schema
   - Setup MangoDB to store budget plans
   - Clean up
   - Improve feedback page
   - Bug fix
- Current:
   - Bug fix
- Next:
   - Minor bug fix

Ian Manzano:
- Completed:
   - Basic Login page
   - Basic Sign Up page
   - Update UI to make application less boring
   - Update UI to make everything fit and center
   - UI for the new pages
- Current:
   - UI related issues
- Next:
   - UI related issues

### Update 5/2/2022
[Link to project](https://github.com/bug-catchers/just-budget)

- New progress
    - Added Feedback page
    - Ability to edit budget plan
    - Home page to explain the application
    - Footer with information about the application
    - Testcafe test for budget page
    - Update UI to make application less boring
    - Update UI to make everything fit and center
    - Admin page
    - Clean up
    - UI for the new pages
    - Testcafe test plan for rest of the pages

Chak Hon Lam:
- Completed:
    - Button and Modal to add spending/income
    - Functions to update and calculate spending
    - Feedback page
    - Ability to edit budget plan
    - Bug fixes
    - Wiki page

Su Lao:
- Completed:
    - Page to display budget plans
    - Page to create budget plans
    - Home page to explain the application
    - Footer with information about the application
    - Testcafe test for budget page
    - Testcafe for login/signup page

Shengtong Jin:
- Completed:
    - Budget plans schema
    - Setup MangoDB to store budget plans
    - Clean up
    - Improve feedback page
    - Bug fix

Ian Manzano:
- Completed:
    - Basic Login page
    - Basic Sign Up page
    - Update UI to make application less boring
    - Update UI to make everything fit and center
    - UI for the new pages 
    - UI related issues
