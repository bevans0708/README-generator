// TODO: Include packages needed for this application
const generateSite = require('./utils/generateMarkdown.js');
const inquirer = require('inquirer');
const fs = require('fs');

// TODO: Create an array of questions for user input
const questions = () => {
   return inquirer.prompt([
      {
         type: 'input',
         name: 'title',
         message: 'What is the title of your project? (Required)',
         validate: input => {
            if (input) {
               return true;
            } else {
               console.log("Please enter the title name!");
               return false;
            }
         }
      },
      {
         type: 'input',
         name: 'description',
         message: 'Write a detailed description or your project. (Required)',
         validate: input => {
            if (input) {
               return true;
            } else {
               console.log("Please enter a description!");
               return false;
            }
         }
      },
      {
         type: 'confirm',
         name: 'confirmInstall',
         message: 'Would you like to enter installation instructions?',
         default: true
      },
      {
         type: 'input',
         name: 'installInstruct',
         message: 'Provide installation instructions:',
         when: ({ confirmInstall }) => {
            if (confirmInstall) {
               return true;
            } else {
               return false;
            }
         }
      },
      {
         type: 'input',
         name: 'usage',
         message: 'How do you use this app? (Required)',
         validate: input => {
            if (input) {
               return true;
            } else {
               console.log("Please enter how to use app!");
               return false;
            }
         }
      },
      {
         type: 'list',
         name: 'license',
         message: 'What license did you use? (Required)',
         choices: ['The MIT License', 'The GPL License', 'The Apache License', 'The GNU License', 'N/A'],
         validate: input => {
            if (input) {
               return true;
            } else {
               console.log("Please choose an option!");
               return false;
            }
         }
      },
      {
         type: 'input',
         name: 'github',
         message: 'What is your github user name? (Required)',
         validate: input => {
            if (input) {
               return true;
            } else {
               console.log("Please enter how to use app!");
               return false;
            }
         }
      },
      {
         type: 'input',
         name: 'email',
         message: 'What is you email address? (Required)',
         validate: input => {
            if (input) {
               return true;
            } else {
               console.log("Please enter enter an email address!");
               return false;
            }
         }
      },
      {
         type: 'input',
         name: 'contribution',
         message: 'How can someone contribute to this project? (Required)',
         validate: input => {
            if (input) {
               return true;
            } else {
               console.log("Please enter information!");
               return false;
            }
         }
      },
   ])
   .then(( {
      title,
      description,
      installInstruct,
      usage,
      license,
      github,
      email,
      contribution
   }) => {
      // template to be used for file generation
      const template = 
      `# ${title}

      ## Description
      ${description}

      ## Table of Contents
      
      * [Installation](#installation)
      * [Usage](#usage)
      * [Contribution](#contribution)
      * [License](#license)
      * [Contact Info](#questions)
      * 
      ## Installation
      ${installInstruct}

      ## Usage
      ${usage}

      ## License
      ${license}

      ## Contribution
      ${contribution}

      ## Questions
      * GitHub :${github}
      * Email :${email}`;
      
      createNewFile(title, template);
   });
};
// TODO: Create a function to write README file
function createNewFile(fileName, data) {
   fs.writeFile(`./output/README.md`, data, (error) => {
      if (error) {
         console.log(error)
      }
      console.log('Your README has been created!')
   })
}

// // TODO: Create a function to initialize app
// function init() {}

// Function call to initialize app
questions()
