import { useState } from 'react'
import './App.css'

function App() {
  // State to store the conversation history
  // This is an array of objects, each with a 'role' (user or assistant) and 'content' (the message)
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Hello! How can I help you today?' }
  ])

  // State to store the current user input
  const [input, setInput] = useState('')

  // State to track if we're waiting for a response from the API
  const [isLoading, setIsLoading] = useState(false)

  // Function to handle sending a message to the OpenAI API
  const sendMessage = async () => {
    // Don't send empty messages
    if (input.trim() === '') return

    // Add the user's message to the conversation
    const userMessage = { role: 'user', content: input }
    const newMessages = [...messages, userMessage]
    setMessages(newMessages)

    // Clear the input field
    setInput('')

    // Set loading state to true while waiting for API response
    setIsLoading(true)

    try {
      // Get the API key from environment variables
      const apiKey = import.meta.env.VITE_OPEN_API_KEY

      // Debug: Log API key status to console (not the actual key for security)
      console.log('API Key status:', apiKey ? 'API key is present' : 'No API key found')

      // Check if API key is available
      if (!apiKey) {
        // If no API key is found, use the simulation mode
        console.warn('No OpenAI API key found. Using simulation mode.')

        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000))

        // Simulate a response from the assistant
        const assistantMessage = { 
          role: 'assistant', 
          content: `I received your message: "${input}". This is a simulated response because no API key was provided. Please check the README.md for instructions on setting up your OpenAI API key.`
        }

        // Add the assistant's response to the conversation
        setMessages([...newMessages, assistantMessage])
      } else {
        // Make the actual API call to OpenAI
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`
          },
          body: JSON.stringify({
            model: 'gpt-3.5-turbo',
            messages: newMessages.map(msg => ({ role: msg.role, content: msg.content })),
            temperature: 0.7
          })
        })

        // Parse the response
        const data = await response.json()

        // Check if the response contains an error
        if (data.error) {
          throw new Error(data.error.message || 'Unknown error from OpenAI API')
        }

        // Extract the assistant's message from the response
        const assistantMessage = { 
          role: 'assistant', 
          content: data.choices[0].message.content 
        }

        // Add the assistant's response to the conversation
        setMessages([...newMessages, assistantMessage])
      }
    } catch (error) {
      console.error('Error communicating with the API:', error)
      // Add an error message to the conversation
      setMessages([
        ...newMessages, 
        { role: 'assistant', content: `Sorry, there was an error processing your request: ${error.message}` }
      ])
    } finally {
      // Set loading state back to false
      setIsLoading(false)
    }
  }

  // Function to handle pressing Enter in the input field
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault() // Prevent default to avoid form submission or new line
      sendMessage()
    }
  }

  return (
    <div className="chat-container">
      {/* Header section */}
      <header className="chat-header">
        <h1>Simple OpenAI Chatbot</h1>
        <p>Ask me anything and I'll try to help!</p>
      </header>

      {/* Messages section - this displays the conversation history */}
      <div className="messages-container">
        {messages.map((message, index) => (
          <div 
            key={index} 
            className={`message ${message.role === 'user' ? 'user-message' : 'assistant-message'}`}
          >
            <div className="message-content">{message.content}</div>
          </div>
        ))}
        {isLoading && (
          <div className="message assistant-message">
            <div className="message-content">Thinking...</div>
          </div>
        )}
      </div>

      {/* Input section - this is where the user types their message */}
      <div className="input-container">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type your message here..."
          disabled={isLoading}
        />
        <button 
          onClick={sendMessage} 
          disabled={isLoading || input.trim() === ''}
        >
          Send
        </button>
      </div>
    </div>
  )
}

export default App
