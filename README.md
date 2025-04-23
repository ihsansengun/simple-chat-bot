# Simple OpenAI Chatbot

A simple, educational chatbot application built with React and OpenAI's API. This project demonstrates how to create a basic chat interface and integrate it with OpenAI's powerful language models.

## Table of Contents

- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Setting Up OpenAI API](#setting-up-openai-api)
- [Running the Application](#running-the-application)
- [Code Explanation](#code-explanation)
- [Customization](#customization)
- [Learning Resources](#learning-resources)

## Features

- Clean, modern chat interface
- Real-time conversation with OpenAI's language models
- Responsive design that works on desktop and mobile
- Detailed code comments for educational purposes

## Prerequisites

Before you begin, ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v14.0.0 or later)
- npm (usually comes with Node.js)
- An OpenAI API key (see [Setting Up OpenAI API](#setting-up-openai-api))

## Installation

1. Clone this repository or download the source code
2. Navigate to the project directory in your terminal
3. Install the required dependencies:

```bash
npm install
```

4. Install the OpenAI SDK:

```bash
npm install openai
```

## Setting Up OpenAI API

To use the OpenAI API, you need to:

1. Create an account at [OpenAI](https://openai.com/)
2. Navigate to the [API keys page](https://platform.openai.com/account/api-keys)
3. Create a new API key
4. Create a `.env` file in the root of your project with the following content:

```
VITE_OPEN_API_KEY=your_api_key_here
```

Replace `your_api_key_here` with your actual API key.

**Important**: After creating or modifying the `.env` file, you must restart the development server for the changes to take effect. Environment variables are only loaded when the server starts.

## Running the Application

To start the development server:

```bash
npm run dev
```

This will start the application on `http://localhost:5173` (or another port if 5173 is in use).

If you've added your API key but still see the "simulated response" message, try the following:
1. Make sure you've created a file named exactly `.env` (not `.env.example`)
2. Verify your API key is correctly formatted in the `.env` file
3. Restart the development server completely (stop it with Ctrl+C and start it again)

## Code Explanation

### App.jsx

The main component of our application contains:

1. **State Management**:
   - `messages`: Stores the conversation history
   - `input`: Manages the user's current input
   - `isLoading`: Tracks when we're waiting for a response

2. **Message Handling**:
   - `sendMessage()`: Sends the user's message to OpenAI and handles the response
   - `handleKeyDown()`: Allows sending messages by pressing Enter

3. **UI Components**:
   - Header with title and description
   - Messages container that displays the conversation
   - Input area with textarea and send button

### OpenAI Integration

To fully implement the OpenAI integration, you need to:

1. Uncomment the API call code in the `sendMessage()` function
2. Replace the simulated response with the actual API response
3. Make sure your API key is properly set in the environment variables

The API call uses the Chat Completions endpoint, which is designed for conversational applications.

## Customization

You can customize this application by:

1. **Changing the model**: Modify the `model` parameter in the API call to use different OpenAI models
2. **Adjusting the temperature**: Change the `temperature` value to control the randomness of responses
3. **Styling**: Modify the CSS in `App.css` to change the appearance
4. **Adding features**: Implement message history persistence, user authentication, etc.

## Learning Resources

- [OpenAI API Documentation](https://platform.openai.com/docs/api-reference)
- [React Documentation](https://react.dev/)
- [Vite Documentation](https://vitejs.dev/guide/)
- [CSS Flexbox Guide](https://css-tricks.com/snippets/css/a-guide-to-flexbox/)

---

This project is intended for educational purposes to demonstrate how to build a simple chatbot with React and OpenAI.
