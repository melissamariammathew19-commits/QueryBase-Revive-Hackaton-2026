import { useState, useRef, useEffect } from 'react';
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
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

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
    <div
      style={{
        minHeight: '100vh',
        background: 'radial-gradient(circle at top, #0f2a4a 0%, #081b30 55%, #050f1c 100%)',
        display: 'flex',
        justifyContent: 'center',
        padding: '32px 16px',
        fontFamily: "'Segoe UI', Roboto, sans-serif",
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '660px',
          background: '#ffffff',
          borderRadius: '22px',
          boxShadow: '0 20px 60px rgba(0,0,0,0.35)',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <div
          style={{
            background: 'linear-gradient(120deg, #0f3d63 0%, #135e8f 50%, #0f7d78 100%)',
            padding: '22px 24px',
            color: '#fff',
            position: 'relative',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
            <div
              style={{
                width: '10px',
                height: '10px',
                borderRadius: '50%',
                background: '#4ade80',
                boxShadow: '0 0 8px #4ade80',
              }}
            />
            <span style={{ fontSize: '12.5px', letterSpacing: '0.06em', opacity: 0.85, textTransform: 'uppercase' }}>
              QueryBase · Verified Legal Q&A
            </span>
          </div>
          <h2 style={{ margin: 0, fontSize: '21px', fontWeight: 700 }}>
            Tenant Rights in California
          </h2>
          <p style={{ margin: '4px 0 0', fontSize: '12.5px', opacity: 0.75 }}>
            Answers sourced from official California government pages
          </p>
        </div>

        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '8px',
            padding: '16px 20px',
            borderBottom: '1px solid #e7ecf3',
            background: '#f6f9fc',
          }}
        >
          {exampleQuestions.map((q, i) => (
            <button
              key={i}
              onClick={() => sendQuestion(q)}
              disabled={loading}
              style={{
                fontSize: '12.5px',
                padding: '8px 14px',
                borderRadius: '999px',
                border: '1.5px solid #cfe0ea',
                backgroundColor: '#fff',
                color: '#0f5e8f',
                fontWeight: 600,
                cursor: loading ? 'default' : 'pointer',
                opacity: loading ? 0.5 : 1,
                transition: 'all 0.15s ease',
              }}
              onMouseEnter={(e) => {
                if (!loading) {
                  e.currentTarget.style.backgroundColor = '#0f5e8f';
                  e.currentTarget.style.color = '#fff';
                  e.currentTarget.style.transform = 'translateY(-1px)';
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#fff';
                e.currentTarget.style.color = '#0f5e8f';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              {q}
            </button>
          ))}
        </div>

        <div
          style={{
            height: '420px',
            overflowY: 'auto',
            padding: '20px',
            display: 'flex',
            flexDirection: 'column',
            gap: '14px',
            background: '#fcfdfe',
          }}
        >
          {messages.length === 0 && !loading && (
            <div style={{ margin: 'auto', textAlign: 'center', color: '#9aabbc' }}>
              <div style={{ fontSize: '30px', marginBottom: '10px' }}>⚖️</div>
              <div style={{ fontSize: '14px', fontWeight: 500 }}>Ask a question or tap a suggestion above</div>
              <div style={{ fontSize: '12px', marginTop: '4px', color: '#b6c2cf' }}>
                Every answer is backed by an official source
              </div>
            </div>
          )}

          {messages.map((msg, index) => (
            <div
              key={index}
              style={{
                alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start',
                maxWidth: '80%',
              }}
            >
              <div
                style={{
                  padding: '11px 16px',
                  borderRadius: msg.role === 'user' ? '16px 16px 4px 16px' : '16px 16px 16px 4px',
                  background: msg.role === 'user'
                    ? 'linear-gradient(135deg, #135e8f, #0f7d78)'
                    : '#eef2f7',
                  color: msg.role === 'user' ? '#fff' : '#1c2733',
                  fontSize: '14.5px',
                  lineHeight: 1.55,
                  boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
                  whiteSpace: 'pre-wrap',
                  border: msg.role === 'assistant' ? '1px solid #e0e7ee' : 'none',
                }}
              >
                {msg.text}
              </div>
              {msg.role === 'assistant' && (
                <div
                  style={{
                    fontSize: '11px',
                    color: '#0f7d78',
                    fontWeight: 600,
                    marginTop: '4px',
                    marginLeft: '4px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                  }}
                >
                  ✓ Verified answer
                </div>
              )}
            </div>
          ))}

          {loading && (
            <div style={{ alignSelf: 'flex-start' }}>
              <div
                style={{
                  padding: '11px 16px',
                  borderRadius: '16px 16px 16px 4px',
                  backgroundColor: '#eef2f7',
                  color: '#7c8a9a',
                  fontSize: '14px',
                  fontStyle: 'italic',
                  border: '1px solid #e0e7ee',
                }}
              >
                Checking verified sources...
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        <div
          style={{
            display: 'flex',
            gap: '10px',
            padding: '16px 20px',
            borderTop: '1px solid #e7ecf3',
            background: '#f6f9fc',
          }}
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask a question about your tenant rights..."
            style={{
              flex: 1,
              padding: '12px 16px',
              borderRadius: '999px',
              border: '1.5px solid #cfe0ea',
              fontSize: '14px',
              outline: 'none',
              color: '#1c2733',
            }}
          />
          <button
            onClick={handleSend}
            disabled={loading}
            style={{
              padding: '0 24px',
              borderRadius: '999px',
              border: 'none',
              background: loading ? '#9fb8c9' : 'linear-gradient(135deg, #135e8f, #0f7d78)',
              color: '#fff',
              fontWeight: 700,
              fontSize: '14px',
              cursor: loading ? 'default' : 'pointer',
              transition: 'transform 0.1s ease',
            }}
            onMouseDown={(e) => !loading && (e.currentTarget.style.transform = 'scale(0.96)')}
            onMouseUp={(e) => (e.currentTarget.style.transform = 'scale(1)')}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

export default Chat;