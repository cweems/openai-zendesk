require('dotenv').config()
console.log(process.env)

const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
})

const openai = new OpenAIApi(configuration);

const getGpt3Summary = async function(chatText) {
    const prompt = `The following is a conversation between a support agent and a customer,
    can you summarize it and give your rating of the urgency of the request?
    Respond in json format like this: { summary: "This is the summary of the conversation", urgency: "high" } \n\n
    ${chatText}`

    try {
        const completion = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: prompt,
            temperature: 0.7,
            max_tokens: 256
        })

        console.log(completion.data.choices)
    } catch(error) {
        console.log(error);
    }
}

const sampleConversation = `
Customer: Hi there, I'm having an issue with my account. It was suspended and I'd like to request a refund.     Charlie
Support agent: I'm sorry to hear that. Can you please provide me with your account information, such as your username or email address, so I can look into it?
Customer: My email address is charlie@mail.com.
Support agent: Thank you, Charlie. I see that your account was suspended due to a violation of our terms of service. However, we can definitely process a refund for you. Can you please confirm the payment method you used to subscribe to our service?
Customer: Yes, I used my credit card.
Support agent: Thank you. In that case, I'll need to verify some information with you to process the refund. Can you confirm the last four digits of the credit card you used, as well as the expiration date?
Customer: Sure, the last four digits are 1234 and the expiration date is 05/25.
Support agent: Great, thank you for confirming that information. We'll process the refund to the same credit card within the next 3-5 business days. Is there anything else I can help you with today?
Customer: No, that's all. Thank you for your help.
Support agent: You're welcome, Charlie. If you have any other questions or concerns, don't hesitate to reach out to us. Have a great day!`

getGpt3Summary(sampleConversation)