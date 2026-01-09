'use client';

import { useState, useRef, useEffect } from 'react';
import styles from './Chatbot.module.css';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export default function Chatbot() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [followUpQuestions, setFollowUpQuestions] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async (messageText: string) => {
    if (!messageText.trim() || isLoading) return;

    const userMessage: Message = { role: 'user', content: messageText };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    setFollowUpQuestions([]);

    try {
      const response = await fetch('/api/chatbot', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: messageText,
          conversationHistory: messages,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to get response');
      }

      const data = await response.json();

      const assistantMessage: Message = {
        role: 'assistant',
        content: data.message,
      };

      setMessages((prev) => [...prev, assistantMessage]);
      setFollowUpQuestions(data.followUpQuestions || []);
    } catch (error) {
      console.error('Chat error:', error);
      const errorMessage: Message = {
        role: 'assistant',
        content: "Sorry, I'm having trouble responding right now. Please try again.",
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  };

  const starterQuestions = [
    "What are Aniketh's main technical skills?",
    "Tell me about the DevSync project",
    "What work experience does Aniketh have?",
    "What awards has Aniketh won?",
  ];

  return (
    <>
      {/* Chatbot Toggle Button */}
      <button
        className={styles.chatbotToggle}
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle chatbot"
      >
        {isOpen ? '✕' : '💬'}
      </button>

      {/* Chatbot Window */}
      {isOpen && (
        <div className={styles.chatbotWindow}>
          {/* Header */}
          <div className={styles.header}>
            <div>
              <h3>Ask about Aniketh</h3>
              <p>AI-powered portfolio assistant</p>
            </div>
            <a
              href="/api/resume?format=pdf"
              download
              className={styles.resumeBtn}
              title="Download Resume"
            >
              📄
            </a>
          </div>

          {/* Messages */}
          <div className={styles.messages}>
            {messages.length === 0 && (
              <div className={styles.welcome}>
                <h4>👋 Hi! I'm here to help.</h4>
                <p>Ask me anything about Aniketh's experience, projects, or skills!</p>
                <div className={styles.starterQuestions}>
                  {starterQuestions.map((q, i) => (
                    <button
                      key={i}
                      onClick={() => sendMessage(q)}
                      className={styles.starterBtn}
                    >
                      {q}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {messages.map((msg, i) => (
              <div
                key={i}
                className={`${styles.message} ${styles[msg.role]}`}
              >
                <div className={styles.messageContent}>{msg.content}</div>
              </div>
            ))}

            {isLoading && (
              <div className={`${styles.message} ${styles.assistant}`}>
                <div className={styles.typing}>
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Follow-up Questions */}
          {followUpQuestions.length > 0 && !isLoading && (
            <div className={styles.followUps}>
              <p className={styles.followUpLabel}>You might want to ask:</p>
              <div className={styles.followUpButtons}>
                {followUpQuestions.map((question, i) => (
                  <button
                    key={i}
                    onClick={() => sendMessage(question)}
                    className={styles.followUpBtn}
                  >
                    {question}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input Area */}
          <div className={styles.inputArea}>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask me anything..."
              disabled={isLoading}
              className={styles.input}
            />
            <button
              onClick={() => sendMessage(input)}
              disabled={isLoading || !input.trim()}
              className={styles.sendBtn}
            >
              {isLoading ? '...' : '→'}
            </button>
          </div>
        </div>
      )}
    </>
  );
}
