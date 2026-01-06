# AI Chatbot Backend Documentation

## Overview

This chatbot backend is an AI-powered assistant that can answer questions about Aniketh Mungara's portfolio, including his background, skills, experience, projects, and education. It uses the Anthropic Claude API (Claude 3.5 Sonnet) to provide intelligent, context-aware responses.

## Architecture

### File Structure

```
app/api/chatbot/
├── route.ts          # Main API endpoint handler
├── knowledge.ts      # Portfolio knowledge base
└── types.ts          # TypeScript type definitions
```

### Components

1. **API Route** ([app/api/chatbot/route.ts](app/api/chatbot/route.ts))
   - Handles POST requests to `/api/chatbot`
   - Manages conversation history
   - Integrates with Anthropic Claude API
   - Returns AI-generated responses

2. **Knowledge Base** ([app/api/chatbot/knowledge.ts](app/api/chatbot/knowledge.ts))
   - Contains comprehensive information about Aniketh
   - Structured data about education, experience, projects, and skills
   - Used as context for the AI model

3. **Type Definitions** ([app/api/chatbot/types.ts](app/api/chatbot/types.ts))
   - TypeScript interfaces for request/response structures
   - Ensures type safety across the chatbot system

## Setup Instructions

### 1. Install Dependencies

The required dependency has already been installed:

```bash
npm install @anthropic-ai/sdk
```

### 2. Get an Anthropic API Key

1. Visit [https://console.anthropic.com/](https://console.anthropic.com/)
2. Sign up or log in to your account
3. Navigate to API Keys section
4. Create a new API key

### 3. Configure Environment Variables

Create a `.env.local` file in the root directory:

```bash
ANTHROPIC_API_KEY=your_actual_api_key_here
```

**Important**: Never commit your `.env.local` file to version control. The `.gitignore` file should already include this.

### 4. Start the Development Server

```bash
npm run dev
```

The chatbot API will be available at `http://localhost:3000/api/chatbot`

## API Usage

### Endpoint

```
POST /api/chatbot
```

### Request Format

```typescript
{
  "message": "What projects has Aniketh worked on?",
  "conversationHistory": [
    {
      "role": "user",
      "content": "Tell me about Aniketh"
    },
    {
      "role": "assistant",
      "content": "Aniketh Mungara is a Computer Science student..."
    }
  ]
}
```

### Request Fields

- `message` (required): The user's question or message
- `conversationHistory` (optional): Array of previous messages to maintain context

### Response Format

#### Success Response (200)

```typescript
{
  "message": "Aniketh has worked on several impressive projects...",
  "conversationId": "msg_abc123"
}
```

#### Error Response (400/500)

```typescript
{
  "error": "Error message describing what went wrong"
}
```

## Example Usage

### Using fetch (JavaScript/TypeScript)

```typescript
async function askChatbot(message: string, history: ChatMessage[] = []) {
  const response = await fetch('/api/chatbot', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      message,
      conversationHistory: history,
    }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error);
  }

  return await response.json();
}

// Example call
const result = await askChatbot("What are Aniketh's technical skills?");
console.log(result.message);
```

### Using cURL

```bash
curl -X POST http://localhost:3000/api/chatbot \
  -H "Content-Type: application/json" \
  -d '{
    "message": "What is Aniketh studying?"
  }'
```

## Features

### Conversation Memory

The chatbot supports multi-turn conversations by accepting a `conversationHistory` array. This allows it to:
- Maintain context across multiple messages
- Provide more relevant follow-up responses
- Handle clarifying questions

### Knowledge Scope

The chatbot can answer questions about:
- Educational background
- Work experience and achievements
- Technical skills and expertise
- Personal projects and accomplishments
- Professional philosophy and interests

### Response Guidelines

The AI assistant is configured to:
- Answer based only on provided knowledge
- Be conversational and professional
- Keep responses concise but informative
- Admit when information isn't available
- Encourage contact through the website's contact form

## Customization

### Updating the Knowledge Base

To update information about Aniketh, edit [app/api/chatbot/knowledge.ts](app/api/chatbot/knowledge.ts):

```typescript
export const portfolioKnowledge = `
  # Add or modify sections here
`;
```

### Changing AI Model

To use a different Claude model, modify [app/api/chatbot/route.ts](app/api/chatbot/route.ts):

```typescript
const response = await anthropic.messages.create({
  model: 'claude-3-5-sonnet-20241022', // Change this
  // ... other options
});
```

Available models:
- `claude-3-5-sonnet-20241022` (recommended - balanced performance)
- `claude-3-5-haiku-20241022` (faster, more cost-effective)
- `claude-opus-4-20250514` (most capable, higher cost)

### Adjusting Response Length

Modify the `max_tokens` parameter in [app/api/chatbot/route.ts](app/api/chatbot/route.ts):

```typescript
const response = await anthropic.messages.create({
  max_tokens: 1024, // Increase for longer responses
  // ... other options
});
```

## Error Handling

The API handles several error cases:

1. **Missing API Key** (500)
   - Returns: "API key not configured"
   - Solution: Set `ANTHROPIC_API_KEY` in `.env.local`

2. **Invalid Request** (400)
   - Returns: "Message is required and must be a string"
   - Solution: Ensure request body includes valid `message` field

3. **API Errors** (500)
   - Returns: "Failed to process your message"
   - Solution: Check API key validity and Anthropic service status

## Cost Considerations

- Claude 3.5 Sonnet costs approximately $3 per million input tokens and $15 per million output tokens
- Each request includes the knowledge base (~2,000 tokens) plus conversation history
- Monitor usage at [https://console.anthropic.com/](https://console.anthropic.com/)

## Security Best Practices

1. **Never expose your API key**
   - Keep `.env.local` out of version control
   - Use environment variables in production

2. **Rate Limiting**
   - Consider implementing rate limiting for production use
   - Protect against abuse and unexpected costs

3. **Input Validation**
   - The API validates message format
   - Consider adding content filtering for production

## Production Deployment

### Vercel Deployment

1. Add `ANTHROPIC_API_KEY` to your Vercel project settings
2. Deploy normally with `vercel deploy`
3. The API route will be available at `https://your-domain.com/api/chatbot`

### Other Platforms

Ensure your hosting platform:
- Supports Next.js API routes
- Allows setting environment variables
- Has Node.js runtime support

## Frontend Integration (Future)

When building the frontend, you'll want to:

1. Create a chat UI component
2. Manage conversation state
3. Call the `/api/chatbot` endpoint
4. Display messages with proper formatting
5. Handle loading and error states

Example state management:

```typescript
const [messages, setMessages] = useState<ChatMessage[]>([]);
const [loading, setLoading] = useState(false);

const sendMessage = async (userMessage: string) => {
  setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
  setLoading(true);

  try {
    const response = await fetch('/api/chatbot', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message: userMessage,
        conversationHistory: messages,
      }),
    });

    const data = await response.json();
    setMessages(prev => [...prev, { role: 'assistant', content: data.message }]);
  } catch (error) {
    console.error('Chat error:', error);
  } finally {
    setLoading(false);
  }
};
```

## Testing

### Manual Testing

Test the endpoint using a REST client or cURL:

```bash
# Test basic question
curl -X POST http://localhost:3000/api/chatbot \
  -H "Content-Type: application/json" \
  -d '{"message": "Who is Aniketh?"}'

# Test with conversation history
curl -X POST http://localhost:3000/api/chatbot \
  -H "Content-Type: application/json" \
  -d '{
    "message": "Tell me more about that",
    "conversationHistory": [
      {"role": "user", "content": "What projects has Aniketh built?"},
      {"role": "assistant", "content": "Aniketh has built several projects..."}
    ]
  }'
```

### Example Questions to Test

- "Who is Aniketh Mungara?"
- "What are Aniketh's technical skills?"
- "Tell me about DevSync"
- "What is Aniketh studying?"
- "What work experience does Aniketh have?"
- "What awards has Aniketh won?"

## Troubleshooting

### API Key Issues

```
Error: API key not configured
```
**Solution**: Create `.env.local` with valid `ANTHROPIC_API_KEY`

### Module Not Found

```
Error: Cannot find module '@anthropic-ai/sdk'
```
**Solution**: Run `npm install @anthropic-ai/sdk`

### TypeScript Errors

```
Error: Cannot find type definitions
```
**Solution**: Ensure TypeScript is properly configured in `tsconfig.json`

## Support and Documentation

- **Anthropic API Docs**: [https://docs.anthropic.com/](https://docs.anthropic.com/)
- **Claude Models**: [https://docs.anthropic.com/en/docs/models-overview](https://docs.anthropic.com/en/docs/models-overview)
- **Next.js API Routes**: [https://nextjs.org/docs/app/building-your-application/routing/route-handlers](https://nextjs.org/docs/app/building-your-application/routing/route-handlers)

## License

This chatbot is part of Aniketh Mungara's portfolio project.
