const inquirer = require('inquirer');
const fs = require('fs');
const util = require('util');


const writeFileAsync = util.promisify(fs.writeFile);

const promptUser = () => {
  return inquirer.prompt([
    {
        type: 'input',
        name: 'title',
        message: 'What is the title of your project?',
      },
    {
      type: 'input',
      name: 'description',
      message: 'Provide a description of your project:',
    },
    {
        type: 'input',
        name: 'installation',
        message: 'Provide installation instructions for your project:',
      },
      {
        type: 'input',
        name: 'usage',
        message: 'Provide a usage information for your project:',
      },
      {
        type: 'input',
        name: 'contribution',
        message: 'Provide a contribution guidelines for your project:',
      },
      {
        type: 'input',
        name: 'test_instructions',
        message: 'Provide a test instructions for your project:',
      },
    {
      type: 'input',
      name: 'gituser',
      message: 'Please provide your GitHub username:',
    },
    {
      type: 'input',
      name: 'email',
      message: 'Please provide your email address:',
    },
    {
        type: 'list',
        message: 'What usage license does this software fall under?',
        name: 'license',
        choices: [
            "MIT",
            "GNU",
            "ISC",
            "Mozilla",
            "Unlicense",
        ],
      },
        
  ]);
};

const gernateReadMe = (answers) =>

`

+-+-+-+-+-+-+ Software License -+-+-+-+-+-+-+-+-+-+

${answers.license}: 

=^..^=   =^..^=   =^..^=    =^..^=    =^..^=    =^..^=    =^..^=
# Table of Contents for ${answers.title} # 
* [Description](##Description "Project Description")
* [Installation](##Installation "Project Installation")
* [Usage](##Usage "Usage Guidlines")
* [Testing Guidelines](##Tests  "Testing Guidelines")
* [Questions](##Questions  "Questions")


## Information for ${answers.title} ##  
=^..^=   =^..^=   =^..^=    =^..^=    =^..^=    =^..^=    =^..^=

## Description ## 
${answers.description}

## Installation ##
${answers.installation}

## Usage ##
${answers.usage}

## License ##
${answers.license}

## Contributing ##
${answers.contribution}

## Tests ##
${answers.test_instructions}

## Questions ##
You can reach out with any questions by contacting me via GitHub: http://www.github.com/${answers.gituser} or via email: ${answers.email}

 `;

// Bonus using async/await and try/catch
const init = async () => {
  console.log("Let's Get This Read-Me Party Started! Please Answer the Following Questions...");
  try {
    const answers = await promptUser();

    const html = gernateReadMe(answers);

    await writeFileAsync('ReadmeHomework.md', html);

    console.log('Successfully wrote to ReadmeHomework.md');
  } catch (err) {
    console.log(err);
  }
};

init();
