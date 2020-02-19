const PDFDocument= require("pdfkit")
const markdownpdf=require("markdown-pdf")
const inquirer = require("inquirer")
const fs = require("fs")
let data = {}
const axios = require("axios")
// What is your GitHub username? <user_will_provide_github_username>
// What is your project's name?
// Please write a short description of your project?
// What kind of license should your project have? User can choose from list of items
// What command should be run to install dependencies? (default to "npm i" if user doesn't respond)
// What command should be run to run tests? (default to "npm test" if user doesn't respond)
// What does the user need to know about using the repo?
// What does the user need to know about contributing to the repo?


//creating all questions

function askQuestion() {
    inquirer.prompt([
        {
            type: "input",
            message: "What is your GitHub username?",
            name: "userName"
        },
        {
            type: "input",
            message: "What is your project's name?",
            name: "projectName"
        },
        {
            type: "input",
            message: "Please write a short description of your project?",
            name: "description"
        },
        {
            type: "input",
            message: "What kind of license should your project have?",
            name: "license"
        },

        {
            type: "input",
            message: "What command should be run to install dependencies?",
            name: "command"
        },
        {
            type: "input",
            message: "What command should be run to run tests?",
            name: "runTest"
        },
        {
            type: "input",
            message: "What does the user need to know about using the repo?",
            name: "repo"
        }
    ]).then(function (input) {


        data.userName = input.userName
        data.projectName = input.projectName
        data.description = input.description
        data.license = input.license
        data.command = input.command
        data.runTest = input.runTest
        data.repo = input.repo

        let userName = data.userName
        let queryurl = "https://api.github.com/users/" + userName
        let license = data.license
        if (license == 'Apache 2.0') {
            license = `[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)`;
        }
        //this is to grab user github then grabs the info from api
        axios.get(queryurl).then(function (response) {
            data.avatar_url = response.data.avatar_url
            let body = `
## Project Name: ${data.projectName}
## User Name: ${data.userName}
### Description: ${data.description}
### Table of Contents:
    License
    Installation
    Test
    Questions

### License: 
You need this license for this project: 
${data.license}
### Installation: 
Please use the following command to install dependencies: **${data.command}**
### Repo: ${data.repo}
### Test: 
Please use the following command to run tests--> **${data.runTest}**
### Questions: 
![alt text](${data.avatar_url})
    `
    
    const doc= new PDFDocument();
    doc.pipe(fs.createWriteStream('output.pdf'))
    ;
    doc
    .fontSize(25)
    .text('readMe',100,100);
    doc.end();




            fs.writeFile("README.md", license + body, function (error) {
                if (error) {
                    console.log(error)
                }
                markdownpdf()
                .from("README.md")
                .to("readMe.pdf", function(){
                    console.log("done")
                })
                console.log("success")
            })

        })




    })


}


askQuestion()




//we need one badge 
//this is apache 2.0
//[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)