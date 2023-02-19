const { Configuration, OpenAIApi } = require("openai");


function parseGpt3Response(choices) {
    try {
        let result = choices[0].text;
        console.log({result})

        // Remove newlines that GPT-3 inserts
        result = result.replace(/(\r\n|\r|\n)/g, "");
        let resultJSON = JSON.parse(result);

        // GPT-3 sometimes returns "Normal or Priority" when Zendesk
        // expects to receive lowercase.
        resultJSON.priority = resultJSON.priority.toLowerCase();
        
        return resultJSON;
    } catch (err) {

        // TODO: Error handle this - put in separate queue.
        console.log('Failed to parse GPT-3 response')
        throw new Error(err);
    }
}

async function getGpt3Summary (chatText) {    
    const configuration = new Configuration({
        apiKey: process.env.OPENAI_API_KEY,
    })
    
    const openai = new OpenAIApi(configuration);
    
    const prompt = `The following is a support ticket from a customer, reply with a json object like this:
    { "summary": "a summary of the ticket conversation", "priority": "low, normal, high, or urgent.", "assignee": "can be support, legal, or product" }
    ${chatText}`;

    try {
        const completion = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: prompt,
            temperature: 0.7,
            max_tokens: 256
        })

        return parseGpt3Response(completion.data.choices)
    } catch(error) {
        console.log(error.response);
        throw new Error(error.response);
    }
}

module.exports = getGpt3Summary;