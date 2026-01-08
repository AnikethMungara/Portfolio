# New Features Documentation

## 🚀 Recently Added Features

### 1. Smart Follow-up Questions
### 2. Resume/CV Download

---

## 📋 Feature 1: Smart Follow-up Questions

### Overview
The chatbot now intelligently suggests 3 relevant follow-up questions after each response, helping visitors explore Aniketh's portfolio more deeply.

### How It Works
- After answering a question, the chatbot analyzes the conversation context
- Uses Claude 3.5 Haiku (faster model) to generate contextually relevant questions
- Returns 3 concise, actionable follow-up questions
- Questions are tailored to explore related topics or dive deeper

### API Response Format

```typescript
{
  "message": "Aniketh has worked on several impressive projects...",
  "conversationId": "msg_abc123",
  "followUpQuestions": [
    "What technologies did Aniketh use in DevSync?",
    "Tell me more about the CiteSight project",
    "What awards has Aniketh won?"
  ]
}
```

### Frontend Integration Example

```typescript
const [followUpQuestions, setFollowUpQuestions] = useState<string[]>([]);

const sendMessage = async (userMessage: string) => {
  const response = await fetch('/api/chatbot', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      message: userMessage,
      conversationHistory: messages,
    }),
  });

  const data = await response.json();
  setFollowUpQuestions(data.followUpQuestions);
  // Display these as clickable buttons/chips in your UI
};
```

### UI Implementation Ideas

**Option 1: Clickable Buttons**
```tsx
<div className="follow-up-questions">
  {followUpQuestions.map((question, index) => (
    <button
      key={index}
      onClick={() => sendMessage(question)}
      className="question-chip"
    >
      {question}
    </button>
  ))}
</div>
```

**Option 2: Expandable Section**
```tsx
<details>
  <summary>You might want to ask...</summary>
  <ul>
    {followUpQuestions.map((q, i) => (
      <li key={i} onClick={() => sendMessage(q)}>{q}</li>
    ))}
  </ul>
</details>
```

### Benefits
- **Better UX**: Users don't need to think of what to ask next
- **Discovery**: Helps visitors explore areas they might not have considered
- **Engagement**: Keeps the conversation flowing naturally
- **Guided Navigation**: Directs attention to important portfolio aspects

---

## 📄 Feature 2: Resume/CV Download

### Overview
Visitors can download Aniketh's resume in PDF or JSON format through a simple API endpoint.

### Endpoints

#### Download PDF Resume
```
GET /api/resume?format=pdf
```
Downloads a professionally formatted PDF resume.

#### Get Resume Data (JSON)
```
GET /api/resume?format=json
```
Returns resume data as structured JSON.

### PDF Resume Features

✅ **Professional Layout**
- Clean, ATS-friendly design
- Proper spacing and typography
- Multi-page support with automatic pagination
- Section headers with visual hierarchy

✅ **Complete Sections**
- Personal information and contact details
- Professional summary
- Education with GPA and coursework
- Work experience with achievements
- Notable projects with tech stacks
- Technical skills categorized
- Awards and certifications

✅ **Automatic Word Wrapping**
- Long text automatically wraps to fit page
- No content overflow or cut-off text
- Consistent margins throughout

### Usage Examples

#### Direct Download Link

```html
<a href="/api/resume?format=pdf" download>
  Download Resume (PDF)
</a>
```

#### Fetch API with Custom Filename

```typescript
const downloadResume = async () => {
  const response = await fetch('/api/resume?format=pdf');
  const blob = await response.blob();
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'Aniketh_Mungara_Resume.pdf';
  document.body.appendChild(a);
  a.click();
  a.remove();
  window.URL.revokeObjectURL(url);
};
```

#### Get JSON Data

```typescript
const getResumeData = async () => {
  const response = await fetch('/api/resume?format=json');
  const data = await response.json();
  console.log(data);
  // Use data to populate custom UI
};
```

### Customization

#### Update Resume Content

Edit [app/api/resume/data.ts](app/api/resume/data.ts):

```typescript
export const resumeData = {
  personalInfo: {
    name: 'Aniketh Mungara',
    email: 'your.email@example.com', // UPDATE THIS
    phone: '+1 (XXX) XXX-XXXX',       // UPDATE THIS
    // ... other fields
  },
  // ... rest of the data
};
```

#### Customize PDF Styling

Edit [app/api/resume/route.ts](app/api/resume/route.ts):

```typescript
// Change colors
addText('SECTION TITLE', 12, true, [0, 100, 200]); // RGB color

// Change font sizes
pdf.setFontSize(14); // Larger headers

// Adjust spacing
addSpace(10); // More space between sections

// Modify margins
const margin = 25; // Wider margins
```

### Frontend Integration Examples

#### Simple Download Button

```tsx
export function ResumeDownloadButton() {
  return (
    <a
      href="/api/resume?format=pdf"
      download="Aniketh_Mungara_Resume.pdf"
      className="download-btn"
    >
      📄 Download Resume
    </a>
  );
}
```

#### Button with Loading State

```tsx
export function ResumeDownloadButton() {
  const [loading, setLoading] = useState(false);

  const handleDownload = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/resume?format=pdf');
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'Aniketh_Mungara_Resume.pdf';
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Download failed:', error);
      alert('Failed to download resume. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <button onClick={handleDownload} disabled={loading}>
      {loading ? 'Generating...' : '📄 Download Resume'}
    </button>
  );
}
```

#### Format Selector

```tsx
export function ResumeDownload() {
  const [format, setFormat] = useState<'pdf' | 'json'>('pdf');

  return (
    <div>
      <select value={format} onChange={(e) => setFormat(e.target.value as any)}>
        <option value="pdf">PDF Format</option>
        <option value="json">JSON Format</option>
      </select>
      <a href={`/api/resume?format=${format}`} download>
        Download Resume
      </a>
    </div>
  );
}
```

### Chatbot Integration

You can also trigger resume downloads through the chatbot!

**Option 1: Add to Chatbot Knowledge**

Users can ask: "Can I download your resume?" or "Do you have a CV?"

The chatbot will respond: "Yes! You can download my resume at /api/resume?format=pdf"

**Option 2: Smart Download Detection**

Modify the chatbot to detect resume-related queries and return a special response:

```typescript
// In chatbot route.ts
if (message.toLowerCase().includes('resume') || message.toLowerCase().includes('cv')) {
  return NextResponse.json({
    message: "I'd be happy to share my resume with you!",
    followUpQuestions: [
      "What projects should I focus on?",
      "Tell me about your experience",
      "What are your technical skills?"
    ],
    downloadLink: '/api/resume?format=pdf' // Add this field
  });
}
```

### Where to Add Download Button

Recommended locations:
1. **Hero Section** - Prominent CTA next to "Contact Me"
2. **Navigation Bar** - Always accessible
3. **About Section** - After reading the introduction
4. **Contact Section** - Before/alongside contact form
5. **Chatbot Interface** - As a quick action button

---

## 🎨 Combined Feature: Smart Chatbot with Resume Downloads

### Example: Full Chatbot Component

```tsx
'use client';

import { useState } from 'react';

export default function Chatbot() {
  const [messages, setMessages] = useState<Array<{role: string, content: string}>>([]);
  const [input, setInput] = useState('');
  const [followUps, setFollowUps] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const sendMessage = async (msg: string) => {
    setLoading(true);
    setMessages(prev => [...prev, { role: 'user', content: msg }]);

    try {
      const response = await fetch('/api/chatbot', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: msg,
          conversationHistory: messages,
        }),
      });

      const data = await response.json();
      setMessages(prev => [...prev, { role: 'assistant', content: data.message }]);
      setFollowUps(data.followUpQuestions);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
      setInput('');
    }
  };

  return (
    <div className="chatbot">
      {/* Header with Resume Download */}
      <div className="chatbot-header">
        <h3>Ask me anything!</h3>
        <a href="/api/resume?format=pdf" download>
          📄 Download Resume
        </a>
      </div>

      {/* Messages */}
      <div className="messages">
        {messages.map((msg, i) => (
          <div key={i} className={`message ${msg.role}`}>
            {msg.content}
          </div>
        ))}
        {loading && <div className="loading">Thinking...</div>}
      </div>

      {/* Follow-up Questions */}
      {followUps.length > 0 && (
        <div className="follow-ups">
          <p>You might want to ask:</p>
          {followUps.map((q, i) => (
            <button
              key={i}
              onClick={() => sendMessage(q)}
              className="follow-up-btn"
            >
              {q}
            </button>
          ))}
        </div>
      )}

      {/* Input */}
      <div className="input-area">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && sendMessage(input)}
          placeholder="Ask about my experience, projects, skills..."
        />
        <button onClick={() => sendMessage(input)}>Send</button>
      </div>
    </div>
  );
}
```

---

## 📊 Testing the Features

### Test Smart Follow-up Questions

```bash
curl -X POST http://localhost:3000/api/chatbot \
  -H "Content-Type: application/json" \
  -d '{"message": "What projects has Aniketh worked on?"}'
```

Expected response:
```json
{
  "message": "Aniketh has worked on several impressive projects...",
  "conversationId": "msg_xxx",
  "followUpQuestions": [
    "What technologies did he use in DevSync?",
    "Tell me about the CiteSight award",
    "What other AI/ML projects has he built?"
  ]
}
```

### Test Resume Download

```bash
# Download PDF
curl http://localhost:3000/api/resume?format=pdf --output resume.pdf

# Get JSON data
curl http://localhost:3000/api/resume?format=json
```

---

## 🔧 Configuration

### Update Personal Information

Edit [app/api/resume/data.ts](app/api/resume/data.ts):

```typescript
personalInfo: {
  email: 'your.actual.email@example.com',
  phone: '+1 (555) 123-4567',
  portfolio: 'https://yourdomain.com',
  linkedin: 'linkedin.com/in/your-profile',
}
```

### Adjust Follow-up Question Generation

Edit [app/api/chatbot/route.ts](app/api/chatbot/route.ts):

```typescript
// Use more tokens for longer questions
max_tokens: 300,

// Change the number of questions
.slice(0, 5) // Get 5 questions instead of 3
```

---

## 💰 Cost Considerations

### Follow-up Questions
- Uses Claude 3.5 Haiku (cheaper, faster model)
- ~200 tokens per request
- Cost: ~$0.0002 per follow-up generation
- Minimal impact on overall API costs

### Resume Generation
- **PDF**: No API costs, runs locally with jsPDF
- **JSON**: No API costs, simple data retrieval
- Fast generation (<100ms)
- No external dependencies or API calls

---

## 🚀 Deployment Notes

Both features work seamlessly in production:

1. **Vercel**: No additional configuration needed
2. **Environment Variables**: Only `ANTHROPIC_API_KEY` required (already set)
3. **Edge Functions**: Compatible with edge runtime
4. **Caching**: Consider caching PDF generation for better performance

---

## 📈 Future Enhancements

### Smart Follow-ups
- [ ] Track which follow-up questions are clicked most
- [ ] Personalize based on user's previous questions
- [ ] Add categories (projects, skills, experience)

### Resume Downloads
- [ ] Multiple resume templates (modern, classic, minimal)
- [ ] Tailored resumes for different job types
- [ ] Word document (.docx) export
- [ ] Markdown format for developers
- [ ] Integration with LinkedIn profile

---

## 🎯 Quick Start

1. **Start Development Server**
   ```bash
   npm run dev
   ```

2. **Set Environment Variable**
   ```bash
   # .env.local
   ANTHROPIC_API_KEY=your_key_here
   ```

3. **Test Endpoints**
   - Chatbot: `POST /api/chatbot`
   - Resume: `GET /api/resume?format=pdf`

4. **Build Frontend**
   - Create chat UI component
   - Add resume download button
   - Display follow-up questions

---

## 📚 Additional Resources

- [CHATBOT_README.md](CHATBOT_README.md) - Detailed chatbot documentation
- [app/api/chatbot/types.ts](app/api/chatbot/types.ts) - TypeScript type definitions
- [app/api/resume/data.ts](app/api/resume/data.ts) - Resume data structure

---

**Questions?** Check the main documentation or test the endpoints locally!
