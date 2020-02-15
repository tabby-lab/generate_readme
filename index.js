const inquirer = require("inquirer")
const fs=require("fs")
let data={}
const axios=require("axios")
// What is your GitHub username? <user_will_provide_github_username>
// What is your project's name?
// Please write a short description of your project?
// What kind of license should your project have? User can choose from list of items
// What command should be run to install dependencies? (default to "npm i" if user doesn't respond)
// What command should be run to run tests? (default to "npm test" if user doesn't respond)
// What does the user need to know about using the repo?
// What does the user need to know about contributing to the repo?
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
    ]).then(function(input){


        data.userName=input.userName
        data.projectName=input.projectName
        data.description=input.description
        data.license=input.license
        data.command=input.command
        data.runTest=input.runTest
        data.repo=input.repo

        let userName =data.userName
let queryurl = "https://api.github.com/users/" + userName
        axios.get(queryurl).then(function(response){ 


            data.avatar_url=response.data.avatar_url
        let body=`
        userName: ${data.userName}
        projectName: ${data.projectName}
        description: ${data.description}
        license: ${data.license}
        command: ${data.command}
        runTest:${data.runTest}
        repo: ${data.repo}
        ![alt text](${data.avatar_url})
    `
    
    fs.writeFile("README.md",body,function(error){
        if (error){
            console.log(error)
        }
        console.log("success")
    })

        })




    })
    
   
}


askQuestion()


