import { NextRequest, NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';
import { portfolioKnowledge } from './knowledge';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export async function POST(request: NextRequest) {
  try {
    const { message, conversationHistory = [] } = await request.json();

    if (!message || typeof message !== 'string') {
      return NextResponse.json(
        { error: 'Message is required and must be a string' },
        { status: 400 }
      );
    }

    // Build conversation messages
    const messages: Anthropic.MessageParam[] = [
      ...conversationHistory.map((msg: { role: string; content: string }) => ({
        role: msg.role as 'user' | 'assistant',
        content: msg.content,
      })),
      {
        role: 'user',
        content: message,
      },
    ];

    // Create the AI response
    const response = await anthropic.messages.create({
      model: 'claude-3-5-sonnet-20241022',
      max_tokens: 1024,
      system: `You are an AI assistant for Aniketh Mungara's portfolio website. Your role is to answer questions about Aniketh's background, skills, experience, projects, and education in a helpful and professional manner.

Here is the complete information about Aniketh:

${portfolioKnowledge}

Guidelines:
- Answer questions accurately based only on the information provided above
- Be conversational, friendly, and professional
- If asked about something not in the knowledge base, politely say you don't have that information
- Keep responses concise but informative
- Highlight Aniketh's strengths and achievements naturally
- If someone asks about contacting Aniketh, encourage them to use the contact form on the website
- Don't make up information or speculate beyond what's provided`,
      messages,
    });

    const assistantMessage = response.content[0].type === 'text'
      ? response.content[0].text
      : '';

    // Generate smart follow-up questions
    const followUpResponse = await anthropic.messages.create({
      model: 'claude-3-5-haiku-20241022', // Using faster model for follow-ups
      max_tokens: 200,
      system: `You are generating follow-up questions for a portfolio chatbot about Aniketh Mungara.

Based on the conversation context, suggest 3 relevant follow-up questions that the user might want to ask next.

Rules:
- Questions should be natural and conversational
- They should explore related topics or dive deeper
- Keep each question concise (under 15 words)
- Return ONLY the questions, one per line, without numbers or bullets
- Make them specific and actionable`,
      messages: [
        ...messages,
        {
          role: 'assistant',
          content: assistantMessage,
        },
        {
          role: 'user',
          content: 'Based on our conversation, what are 3 relevant follow-up questions I might want to ask?',
        },
      ],
    });

    const followUpText = followUpResponse.content[0].type === 'text'
      ? followUpResponse.content[0].text
      : '';

    const followUpQuestions = followUpText
      .split('\n')
      .map(q => q.trim())
      .filter(q => q.length > 0 && !q.match(/^\d+\./)) // Remove numbering if present
      .slice(0, 3); // Ensure max 3 questions

    return NextResponse.json({
      message: assistantMessage,
      conversationId: response.id,
      followUpQuestions,
    });
  } catch (error: any) {
    console.error('Chatbot API Error:', error);

    if (error?.status === 401) {
      return NextResponse.json(
        { error: 'API key not configured. Please set ANTHROPIC_API_KEY environment variable.' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to process your message. Please try again.' },
      { status: 500 }
    );
  }
}
