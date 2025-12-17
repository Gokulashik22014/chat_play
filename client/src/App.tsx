import { useEffect, useState } from "react";
import { Client } from "@stomp/stompjs";

type ChatMessage = {
  sender: string;
  receiver:string;
  message: string;
};

let client: Client;

const App = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    connect();
    return () => disconnect();
  }, []);

  const connect = () => {
    console.log("what")
    client = new Client({
      brokerURL: "ws://localhost:3000/ws",
      reconnectDelay: 5000,

      onConnect: () => {
        client.subscribe("/topic/messages", (message) => {
          const parsed: ChatMessage = JSON.parse(message.body);
          setMessages((prev) => [...prev, parsed]);
        });
      },
    });

    client.activate();
    console.log("is this working")
  };

  const disconnect = () => {
    if (client && client.active) {
      client.deactivate();
    }
  };

  const sendMessage = () => {
    if (!input.trim()) return;

    client.publish({
      destination: "/app/send",
      body: JSON.stringify({
        sender: "User",
        receiver:"All",
        message: input,
      }),
    });

    setInput("");
  };

  return (
    <div>
      {messages.map((msg, index) => (
        <div key={index}>
          <strong>{msg.sender}:</strong> {msg.message}
        </div>
      ))}

      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />

      <button onClick={sendMessage}>Send</button>
    </div>
  );
};

export default App;
