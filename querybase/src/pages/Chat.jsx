<<<<<<< HEAD
import { useState } from 'react';
import qaData from '../data/tenant_rights_qa_final.json';

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.6-flash:generateContent?key=${API_KEY}`;

const exampleQuestions = [
  "Can my landlord evict me without any notice?",
  "How much can my landlord charge for a security deposit?",
  "Can my landlord just lock me out without going to court?",
  "Can my landlord evict me for asking for repairs?",
  "How much can my landlord raise my rent in a year?"
];

function Chat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const sendQuestion = async (question) => {
    if (!question.trim()) return;

    const userMessage = { role: 'user', text: question };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    const prompt = `You are a legal Q&A assistant for tenant rights in California.
Below is a list of approved Q&A pairs. Match the user's question to the closest one and answer using ONLY that information, including its source.
If nothing matches well, say: "I don't have verified information on that yet."

Q&A data:
${JSON.stringify(qaData, null, 2)}

User question: ${question}`;

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }]
        })
      });
      const data = await response.json();
      const reply = data.candidates?.[0]?.content?.parts?.[0]?.text || "Something went wrong — no response.";
      setMessages((prev) => [...prev, { role: 'assistant', text: reply }]);
    } catch (err) {
      setMessages((prev) => [...prev, { role: 'assistant', text: "Error reaching the API: " + err.message }]);
    }
    setLoading(false);
  };

  const handleSend = () => sendQuestion(input);

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
      <h2>Asking about: Tenant Rights in California</h2>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '12px' }}>
        {exampleQuestions.map((q, i) => (
          <button
            key={i}
            onClick={() => sendQuestion(q)}
            disabled={loading}
            style={{
              fontSize: '12px',
              padding: '6px 10px',
              borderRadius: '16px',
              border: '1px solid #ccc',
              backgroundColor: '#f5f5f5',
              cursor: 'pointer'
            }}
          >
            {q}
          </button>
        ))}
      </div>

      <div style={{ border: '1px solid #ccc', borderRadius: '8px', height: '400px', overflowY: 'auto', padding: '10px', marginBottom: '10px' }}>
        {messages.map((msg, index) => (
          <div key={index} style={{ textAlign: msg.role === 'user' ? 'right' : 'left', margin: '8px 0' }}>
            <span style={{
              display: 'inline-block',
              padding: '8px 12px',
              borderRadius: '12px',
              backgroundColor: msg.role === 'user' ? '#DCF8C6' : '#F1F0F0',
            }}>
              {msg.text}
            </span>
          </div>
        ))}
        {loading && <div style={{ textAlign: 'left', color: '#999' }}>Thinking...</div>}
      </div>

      <div style={{ display: 'flex', gap: '8px' }}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Ask a question..."
          style={{ flex: 1, padding: '10px', borderRadius: '8px', border: '1px solid #ccc' }}
        />
        <button onClick={handleSend} disabled={loading} style={{ padding: '10px 20px', borderRadius: '8px' }}>
          Send
        </button>
      </div>
    </div>
  );
}

export default Chat;
=======
function Chat() {
  return <div className="p-6">Chat screen (coming soon)</div>;
}

export default Chat;
>>>>>>> f2bc663eccab3b1dfeafa8a03e6772a97733b8e0
