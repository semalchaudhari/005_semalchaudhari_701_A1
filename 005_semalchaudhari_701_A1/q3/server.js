const readline = require("readline");
const getResponse = require("./chatbot");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

console.log("=== College Chatbot ===");
console.log("Type 'exit' to quit.");

function chat() {

    rl.question("You: ", (question) => {

        if (question.toLowerCase() === "exit") {
            console.log("Chatbot: Thank you!");
            rl.close();
            return;
        }

        console.log("Chatbot:", getResponse(question));

        chat();
    });
}

chat();