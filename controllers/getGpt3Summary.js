const { openAiClient, completionOptions } = require('./utils/openAIClient')

async function getGpt3Summary (chatText) {
  const openai = openAiClient()

  const prompt = `The following is a conversation between a support agent and a customer, summarize the ticket and provide the next action required.
    ${chatText}`

  try {
    const completion = await openai.createCompletion(completionOptions(prompt))

    return completion.data.choices[0].text
  } catch (error) {
    console.log(error.response)
    throw new Error(error.response)
  }
}

module.exports = getGpt3Summary
