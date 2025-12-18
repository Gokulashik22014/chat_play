import { useEffect, useState } from "react";
import { Client } from "@stomp/stompjs";

type ChatMessage = {
  sender: string;
  receiver: string;
  message: string;
};

let client: Client;

const App = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [sender, setSender] = useState("");
  const [receiver, setReceiver] = useState("");
  const [active,setActive]=useState(false)
  useEffect(() => {
    if(active)connect();
    return () => disconnect();
  }, [active]);

  const connect = () => {
    console.log("what");
    client = new Client({
      brokerURL: "ws://localhost:3000/ws",
      reconnectDelay: 5000,
      connectHeaders:{
        userId:sender,
      },
      onConnect: () => {
        client.subscribe("/user/queue/messages", (message) => {
          const parsed: ChatMessage = JSON.parse(message.body);
          setMessages((prev) => [...prev, parsed]);
        });
      },
    });

    client.activate();
    console.log("is this working");
  };

  const disconnect = () => {
    if (client && client.active) {
      client.deactivate();
    }
  };

  const sendMessage = () => {
    if (!input.trim()) return;

    client.publish({
      destination: "/app/send/one",
      body: JSON.stringify({
        sender: sender,
        receiver: receiver,
        message: input,
      }),
    });

    setInput("");
  };

  return (
    <div>
      <div>
        <input
          type="text"
          placeholder="sender"
          onChange={(e) => setSender(e.target.value)}
          value={sender}
          disabled={active}
        />
        <button onClick={()=>setActive(true)}>Confirm username</button>
        <input
          type="text"
          placeholder="receiver"
          onChange={(e) => setReceiver(e.target.value)}
          value={receiver}
        />
      </div>
      <div>
        {messages.map((msg, index) => (
          <div key={index}>
            <strong>{msg.sender}:</strong> {msg.message}
          </div>
        ))}
      </div>

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
