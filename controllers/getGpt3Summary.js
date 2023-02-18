const { Configuration, OpenAIApi } = require("openai");

async function getGpt3Summary (chatText) {
    console.log('###', process.env.OPENAI_API_KEY)
    
    const configuration = new Configuration({
        apiKey: process.env.OPENAI_API_KEY,
    })
    
    const openai = new OpenAIApi(configuration);
    
    const prompt = `The following is a conversation between a support agent and a customer,
    can you summarize it and give your rating of the urgency of the request? \n\n
    ${chatText}`

    try {
        const completion = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: prompt,
            temperature: 0.7,
            max_tokens: 256
        })

        return completion.data.choices
    } catch(error) {
        console.log(error.response);
        throw new Error(error.response);
    }
}

module.exports = getGpt3Summary;