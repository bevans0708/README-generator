// Include packages needed for this application
const generateSite = require('./utils/generateMarkdown.js');
const inquirer = require('inquirer');
const fs = require('fs');

// Create an array of questions for user input
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
      // Detailed description about app
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
      // Choose to add install instructions or not
      {
         type: 'confirm',
         name: 'confirmInstall',
         message: 'Would you like to enter installation instructions?',
         default: true
      },
      //Install Instructions if user chose to add install instructions from confirm prompt above
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
      // Usage Explanation
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
      // License selection
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
      // Github submission
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
      // Email submission
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
      // Contribution question
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
      .then(({
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
   
   ## Installation
   ${installInstruct}

   ## Usage
   ${usage}

   ## License
   ${license}

   ## Contribution
   ${contribution}

   ## Questions
   * GitHub : [${github}](#https://github.com/${github})
   * Email : [${email}](#${email})`;
         createNewFile(title, template);
      });
};
//Create a function to write README file
function createNewFile(fileName, data) {
   fs.writeFile(`./output/README.md`, data, (error) => {
      if (error) {
         console.log(error)
      }
      console.log('Your README has been created!')
   })
}

// Function call to initialize app
questions()
