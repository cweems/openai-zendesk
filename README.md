# OpenAI Zendesk Integration
A express app that Zendesk App Framework that uses GPT-3 to triage and summarize tickets.

## Features
- 🚦 Triage new incoming tickets to include a priority, summary note, and group assignee. 
- 📝 Summarize long ticket discussions for use-cases like agent handoff.

## Pre-Requisites
- **Zendesk Support:** You can create a free trial by following these [instructions](https://developer.zendesk.com/documentation/api-basics/getting-started/getting-a-trial-or-sponsored-account-for-development/).
- **OpenAI account:** You can [create one here](https://openai.com/).
- **Ngrok:** If you're running the app locally, you'll need a tunnel service like [Ngrok](https://ngrok.com/) so that Zendesk webhooks can reach your localhost.

## Running Locally
---
### App Setup
Clone the sample app, install dependencies, and create a `.env` file to store API keys:

```bash
# Clone the repository:
$ git clone [repo name]

# Switch to the app's directory:
$ cd openai-zendesk

# Install dependencies:
$ npm install

# Copy the example .env file:
$ cp .env.example .env
```

### Adding Secrets to your `.env`
Configure four values in your .env file:
- **Zendesk Email:** This can be your email or someone else's. You might want to create a separate user account named "Agent Assist Bot" so it's clear who is posting on the tickets.
- **Zendek API Key:** You can create one in the Zendesk Admin portal under `Apps & Integrations > Zendesk API`.
- **Zendesk Remote URI:** The API URL for your Zendesk instance. It will look like: `https://{{your_custom_subdomain}}.zendesk.com/api/v2`.
- **OpenAI API Key:** you can [create one here](https://platform.openai.com/account/api-keys).

### Running Your App
Use NPM to start up your app backend like this:
```bash
# Restart automatically if you make changes:
$ npm run dev

# Just run the app:
$ npm run start
```

You can serve the app's front-end using the Zendesk CLI:
```bash
$ zcli apps:server
```

