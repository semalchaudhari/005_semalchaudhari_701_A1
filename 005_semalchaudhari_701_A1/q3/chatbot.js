function getResponse(question) {

    question = question.toLowerCase();

    if (question.includes("course")) {
        return "We offer BCA, BSc IT, MCA and MSc IT.";
    }
    else if (question.includes("fee")) {
        return "The annual fee is Rs. 50,000.";
    }
    else if (question.includes("admission")) {
        return "Admissions start from June every year.";
    }
    else if (question.includes("contact")) {
        return "Contact us at 9876543210.";
    }
    else {
        return "Sorry! I don't understand your question.";
    }
}

module.exports = getResponse;