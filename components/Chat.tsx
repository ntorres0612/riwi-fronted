'use client';
import { useEffect, useRef, useState } from 'react';
import type { ChatResponse } from '../lib/types';
import styles from '../styles/Chat.module.css';
import chatImage from "./chat.svg";
import Image from "next/image";



type Message = { role: 'user' | 'assistant'; content: string | object };

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:4000';

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [customerId, setCustomerId] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const scroller = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scroller.current?.scrollTo({ top: scroller.current.scrollHeight, behavior: 'smooth' });

    setCustomerId(generateNumericCustomerId());
  }, [messages]);

  const send = async () => {
    setError(null);
    const q = input.trim();
    if (!q) return;
    const next: Message[] = [...messages, { role: "user", content: q }];

    setMessages(next);
    setInput('');
    setLoading(true);
    try {
      const resp = await fetch(`${API_BASE}/api/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: q, customerId: customerId || undefined }),
      });
      if (!resp.ok) {
        const data = await resp.json().catch(() => ({}));
        setError(data?.error || `Error ${resp.status}`);
        setLoading(false);
        return;
      }
      const data: ChatResponse = await resp.json();
      setMessages(prev => [...prev, { role: 'assistant', content: data.answer }]);
    } catch (e: any) {
      setError(e.message || 'Network error');
    } finally {
      setLoading(false);
    }
  };

  function generateNumericCustomerId(length: number = 6): string {
    const digits = "0123456789";
    let result = "";
    for (let i = 0; i < length; i++) {
      result += digits[Math.floor(Math.random() * digits.length)];
    }
    return result;
  }

  const onKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') send();
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <Image src={chatImage} alt="Chat" width={32} height={32} />

        <h1> Chat de la tienda</h1>
      </header>

      <div ref={scroller} className={styles.scroller}>
        <div className={styles.messages}>
          {messages.map((m, i) => (
            <div
              key={i}
              className={`${styles.messageRow} ${m.role === 'user' ? styles.user : styles.assistant}`}
            >
              <div
                className={`${styles.bubble} ${m.role === 'user' ? styles.userBubble : styles.assistantBubble
                  }`}
              >
                {typeof m.content === 'string' ? (
                  m.content
                ) : (
                  <pre style={{ margin: 0, fontSize: 12 }}>{JSON.stringify(m.content, null, 2)}</pre>
                )}
              </div>
            </div>
          ))}
          {error && <div className={styles.error}>Error: {error}</div>}
        </div>
      </div>

      <footer className={styles.footer}>
        <div className={styles.footerInner}>
          <div className={styles.inputs}>
            <input
              placeholder="customerId (opcional)"
              value={customerId}
              disabled
              onChange={(e) => setCustomerId(e.target.value)}
              className={styles.input}
            />
            <input
              placeholder="Escribe tu pregunta..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={onKey}
              className={styles.input}
            />
            <button onClick={send} disabled={loading} className={styles.button}>
              {loading ? 'Enviando...' : 'Enviar'}
            </button>
          </div>
          <small className={styles.muted}>
            Backend: <code>{API_BASE}</code>
          </small>
        </div>
      </footer>
    </div>
  );
}
