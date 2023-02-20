# OpenAI Zendesk Integration
An Node Express app for Zendesk that uses GPT-3 to triage and summarize tickets.

## Features
🚦 **Ticket Triage:** Use GPT-3 to triage new incoming tickets to include a priority, summary note, and group assignee.

📝 **Summarize Tickets:** reduce long ticket discussions for use-cases like agent handoff.

![openai-zendesk-header](https://user-images.githubusercontent.com/1418949/219985712-dfdd8e4d-9da2-437f-aca7-e5463c6be0ca.png)

## Pre-Requisites
- **Zendesk Support:** You can create a free trial by following these [instructions](https://developer.zendesk.com/documentation/api-basics/getting-started/getting-a-trial-or-sponsored-account-for-development/).
- **Zendesk CLI:** Follow [these instructions](https://developer.zendesk.com/documentation/apps/getting-started/using-zcli/).
- **OpenAI account:** You can [create one here](https://openai.com/).
- **Ngrok:** If you're running the app locally, you'll need a tunnel service like [Ngrok](https://ngrok.com/) so that Zendesk webhooks can reach your localhost.

## Running Locally

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
When running locally, the app uses the Zendesk CLI to serve the front-end `assets` folder to an iframe in Zendesk. The express app runs as a back-end and connects Zendesk to the GPT-3 API.

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

Now open a Zendesk Support ticket, adding `?zcli_apps=true` to the end of the URL, for example: `https://{{your_custom_subdomain}}.zendesk.com/agent/tickets/1?zcli_apps=true`

If all goes well, you'll see the Ticket Summary interface loaded in the sidebar. If you click on the "Summarize Ticket" button a note should appear on the ticket summarizing the conversation.

<img width="354" alt="Screen Shot 2023-02-19 at 3 15 59 PM" src="https://user-images.githubusercontent.com/1418949/219981641-4e4d2aea-330f-46eb-9142-0b70f8b55fb2.png">

### Triaging New Tickets
The openai-zendesk integration can auto-triage tickets so that each ticket receives a priority, group assignee, and summary comment. This process has three steps:
1. Run Ngrok as a tunnel to your local environment
2. Create a Zendesk Webhook
3. Create a Zendesk Trigger that calls your webhook

To receive webhooks locally, you'll need to spin up Ngrok pointed at your express app:

```bash
$ ngrok http 3000
```

Once Ngrok is running, create a Zendesk Webhook:

- In Zendesk Admin go to `Apps & Integrations > Webhooks`.
- Click on `Create Webhook` and then click on `Trigger or Automation`.
---
<img width="812" alt="Screen Shot 2023-02-19 at 3 35 44 PM" src="https://user-images.githubusercontent.com/1418949/219982706-c52b40e3-3e07-4d24-b949-2c8aebcf4f5d.png">

---
- Give your webhook a name, and set `{{your-ngrok-url}}/triage` as the Endpoint URL.
- Then, click create webhook.

<img width="544" alt="Screen Shot 2023-02-19 at 3 40 04 PM" src="https://user-images.githubusercontent.com/1418949/219982667-eb67e73d-378c-48e1-be72-ed40cbdca620.png">
---

To create a Zendesk Trigger, follow these steps:
- Go to `Zendesk Admin > Objects and Rules > Triggers > Click on Add Trigger`
- Under conditions, determine when you want the trigger to fire. In our case, we fire the trigger when the ticket is new, has no priority, and doesn't have an owner.

<img width="1162" alt="Screen Shot 2023-02-19 at 3 41 43 PM" src="https://user-images.githubusercontent.com/1418949/219983205-23bffb4a-94f9-4a7a-8d48-7e4a72cdc177.png">

---

- Under the Actions section, select `Notify active webhook` and then select the name of the webhook you created.
- Set the JSON body of the request to include the ticket id:

```json
{
   "ticket_id": "{{ticket.id}}" 
}
```

<img width="888" alt="Screen Shot 2023-02-19 at 3 42 09 PM" src="https://user-images.githubusercontent.com/1418949/219983320-6a240888-85f6-4dbb-ac3d-d13e83cc975e.png">

---

To test our your webhook integration, create a new ticket. Your app should receive a webhook within 3 - 5 seconds triggering the ticket to be processed and triaged.
