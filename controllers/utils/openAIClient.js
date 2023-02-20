const { Configuration, OpenAIApi } = require("openai");

function openAiClient () {
    const configuration = new Configuration({
        apiKey: process.env.OPENAI_API_KEY,
    })

    return new OpenAIApi(configuration);
}

function completionOptions (prompt) {
    return {
        model: "text-davinci-003",
        prompt: prompt,
        temperature: 0.7,
        max_tokens: 256
    }
}

module.exports = { openAiClient, completionOptions }