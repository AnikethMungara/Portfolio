# Example Frontend Components

These are example components showing how to integrate the chatbot and resume download features. Copy and customize these for your portfolio!

---

## 🤖 Complete Chatbot Component with Follow-up Questions

Create: `components/Chatbot.tsx`

```tsx
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
    "What are Aniketh's main skills?",
    "Tell me about DevSync",
    "What experience does Aniketh have?",
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
          {followUpQuestions.length > 0 && (
            <div className={styles.followUps}>
              <p className={styles.followUpLabel}>You might want to ask:</p>
              <div className={styles.followUpButtons}>
                {followUpQuestions.map((question, i) => (
                  <button
                    key={i}
                    onClick={() => sendMessage(question)}
                    className={styles.followUpBtn}
                    disabled={isLoading}
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
```

---

## 🎨 Chatbot Styles

Create: `components/Chatbot.module.css`

```css
.chatbotToggle {
  position: fixed;
  bottom: 30px;
  right: 30px;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  font-size: 24px;
  cursor: pointer;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
  transition: transform 0.2s, box-shadow 0.2s;
  z-index: 1000;
}

.chatbotToggle:hover {
  transform: scale(1.1);
  box-shadow: 0 6px 25px rgba(0, 0, 0, 0.4);
}

.chatbotWindow {
  position: fixed;
  bottom: 100px;
  right: 30px;
  width: 400px;
  max-width: calc(100vw - 60px);
  height: 600px;
  max-height: calc(100vh - 150px);
  background: white;
  border-radius: 16px;
  box-shadow: 0 10px 50px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  z-index: 999;
  animation: slideUp 0.3s ease-out;
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.header {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.header h3 {
  margin: 0;
  font-size: 18px;
  font-weight: 600;
}

.header p {
  margin: 4px 0 0 0;
  font-size: 12px;
  opacity: 0.9;
}

.resumeBtn {
  background: rgba(255, 255, 255, 0.2);
  border: none;
  padding: 8px 12px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 18px;
  transition: background 0.2s;
  text-decoration: none;
  color: white;
}

.resumeBtn:hover {
  background: rgba(255, 255, 255, 0.3);
}

.messages {
  flex: 1;
  overflow-y: auto;
  padding: 20px;
  background: #f7f7f7;
}

.welcome {
  text-align: center;
  padding: 20px;
}

.welcome h4 {
  margin: 0 0 8px 0;
  color: #333;
}

.welcome p {
  margin: 0 0 20px 0;
  color: #666;
  font-size: 14px;
}

.starterQuestions {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.starterBtn {
  background: white;
  border: 1px solid #e0e0e0;
  padding: 10px 16px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 13px;
  text-align: left;
  transition: all 0.2s;
  color: #333;
}

.starterBtn:hover {
  background: #667eea;
  color: white;
  border-color: #667eea;
}

.message {
  margin-bottom: 16px;
  display: flex;
  animation: fadeIn 0.3s ease-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.message.user {
  justify-content: flex-end;
}

.message.assistant {
  justify-content: flex-start;
}

.messageContent {
  max-width: 80%;
  padding: 12px 16px;
  border-radius: 12px;
  font-size: 14px;
  line-height: 1.5;
}

.message.user .messageContent {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border-bottom-right-radius: 4px;
}

.message.assistant .messageContent {
  background: white;
  color: #333;
  border: 1px solid #e0e0e0;
  border-bottom-left-radius: 4px;
}

.typing {
  display: flex;
  gap: 4px;
  padding: 12px 16px;
}

.typing span {
  width: 8px;
  height: 8px;
  background: #667eea;
  border-radius: 50%;
  animation: typing 1.4s infinite;
}

.typing span:nth-child(2) {
  animation-delay: 0.2s;
}

.typing span:nth-child(3) {
  animation-delay: 0.4s;
}

@keyframes typing {
  0%, 60%, 100% {
    transform: translateY(0);
  }
  30% {
    transform: translateY(-10px);
  }
}

.followUps {
  background: white;
  border-top: 1px solid #e0e0e0;
  padding: 12px 20px;
}

.followUpLabel {
  margin: 0 0 8px 0;
  font-size: 12px;
  color: #666;
  font-weight: 500;
}

.followUpButtons {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.followUpBtn {
  background: #f0f0f0;
  border: none;
  padding: 8px 12px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 12px;
  text-align: left;
  transition: all 0.2s;
  color: #333;
}

.followUpBtn:hover:not(:disabled) {
  background: #667eea;
  color: white;
}

.followUpBtn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.inputArea {
  display: flex;
  gap: 8px;
  padding: 16px 20px;
  background: white;
  border-top: 1px solid #e0e0e0;
}

.input {
  flex: 1;
  padding: 12px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  font-size: 14px;
  outline: none;
  transition: border-color 0.2s;
}

.input:focus {
  border-color: #667eea;
}

.input:disabled {
  background: #f5f5f5;
  cursor: not-allowed;
}

.sendBtn {
  padding: 12px 20px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 18px;
  transition: opacity 0.2s;
}

.sendBtn:hover:not(:disabled) {
  opacity: 0.9;
}

.sendBtn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* Mobile responsive */
@media (max-width: 768px) {
  .chatbotWindow {
    bottom: 0;
    right: 0;
    left: 0;
    width: 100%;
    height: 100%;
    max-height: 100vh;
    border-radius: 0;
  }

  .chatbotToggle {
    bottom: 20px;
    right: 20px;
  }
}
```

---

## 📄 Resume Download Button Component

Create: `components/ResumeDownload.tsx`

```tsx
'use client';

import { useState } from 'react';
import styles from './ResumeDownload.module.css';

export default function ResumeDownload() {
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = async () => {
    setIsDownloading(true);
    try {
      const response = await fetch('/api/resume?format=pdf');

      if (!response.ok) {
        throw new Error('Download failed');
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'Aniketh_Mungara_Resume.pdf';
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Download error:', error);
      alert('Failed to download resume. Please try again.');
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <button
      onClick={handleDownload}
      disabled={isDownloading}
      className={styles.downloadBtn}
    >
      {isDownloading ? (
        <>
          <span className={styles.spinner}></span>
          Generating...
        </>
      ) : (
        <>
          📄 Download Resume
        </>
      )}
    </button>
  );
}
```

---

## 🎨 Resume Download Button Styles

Create: `components/ResumeDownload.module.css`

```css
.downloadBtn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 12px 24px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
}

.downloadBtn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(102, 126, 234, 0.5);
}

.downloadBtn:active:not(:disabled) {
  transform: translateY(0);
}

.downloadBtn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.spinner {
  width: 16px;
  height: 16px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top-color: white;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
```

---

## 📍 Integration in Your Portfolio

### Add Chatbot to Layout

Edit `app/layout.tsx`:

```tsx
import Chatbot from '@/components/Chatbot';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {children}
        <Chatbot /> {/* Add this */}
      </body>
    </html>
  );
}
```

### Add Resume Download to Hero Section

Edit `components/sections/Hero.tsx`:

```tsx
import ResumeDownload from '@/components/ResumeDownload';

export default function Hero() {
  return (
    <section className={styles.hero}>
      {/* ... existing code ... */}
      <div className={styles.cta}>
        <a href="#contact" className={styles.contactBtn}>
          Get in Touch
        </a>
        <ResumeDownload /> {/* Add this */}
      </div>
    </section>
  );
}
```

### Add Resume Download to Navigation

Edit `components/ui/Navigation.tsx`:

```tsx
export default function Navigation() {
  return (
    <nav>
      {/* ... existing nav items ... */}
      <a href="/api/resume?format=pdf" download>
        Resume
      </a>
    </nav>
  );
}
```

---

## 🎯 Quick Testing

After adding the components:

1. **Test Chatbot**:
   - Click the floating chatbot button
   - Try starter questions
   - Check if follow-up questions appear
   - Click a follow-up question

2. **Test Resume Download**:
   - Click the download button
   - Verify PDF downloads
   - Check PDF content and formatting

3. **Test on Mobile**:
   - Chatbot should be fullscreen
   - Buttons should be touch-friendly
   - Download should work on mobile browsers

---

## 🔧 Customization Tips

### Change Chatbot Colors

In `Chatbot.module.css`:
```css
/* Change primary gradient */
background: linear-gradient(135deg, #your-color-1 0%, #your-color-2 100%);
```

### Change Chatbot Position

In `Chatbot.module.css`:
```css
.chatbotToggle {
  bottom: 30px;  /* Change this */
  right: 30px;   /* Change this */
  left: 30px;    /* Or position on left */
}
```

### Change Starter Questions

In `Chatbot.tsx`:
```tsx
const starterQuestions = [
  "Your custom question 1",
  "Your custom question 2",
  "Your custom question 3",
];
```

### Add More Download Formats

Create multiple download buttons:
```tsx
<div className={styles.downloadOptions}>
  <a href="/api/resume?format=pdf">PDF</a>
  <a href="/api/resume?format=json">JSON</a>
</div>
```

---

**These components are production-ready!** Copy them to your project and customize the styles to match your portfolio theme.
