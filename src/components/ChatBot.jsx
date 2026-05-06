import { useState } from "react";
import api from "../services/api";
import "../App.css";

export default function ChatBox() {

  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const askQuestion = async () => {
    if (!question.trim()) return;

    const userMsg = { type: "user", text: question };

    setMessages(prev => [...prev, userMsg]);
    setQuestion("");

    try {
      setLoading(true);

      const res = await api.post("/query", {
        question: userMsg.text
      });

      const fullResponse = res.data;

      // 🔥 Extract source
      const lines = fullResponse.split("\n");
      const sourceLine = lines.find(l => l.startsWith("SOURCE:"));

      const answerText = lines
        .filter(l => !l.startsWith("SOURCE:"))
        .join("\n");

      const botMsg = {
        type: "bot",
        text: answerText,
        source: sourceLine ? sourceLine.replace("SOURCE: ", "") : null
      };

      setMessages(prev => [...prev, botMsg]);

    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="chat-container">

      <div className="chat-box">
        {messages.map((msg, index) => (
          <div key={index} className={msg.type === "user" ? "user-msg" : "bot-msg"}>
            
            <p><strong>{msg.type === "user" ? "You" : "AI"}:</strong></p>
            <p>{msg.text}</p>

            {/* 🔥 Show source */}
            {msg.source && (
              <p className="source">📄 Source: {msg.source}</p>
            )}
          </div>
        ))}

        {loading && <p>🤖 Thinking...</p>}
      </div>

      <div className="input-box">
        <input
          type="text"
          placeholder="Ask anything from your documents..."
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && askQuestion()}
        />

        <button onClick={askQuestion}>Ask</button>
      </div>

    </div>
  );
}