import { useEffect, useState } from "react";
import { Client } from "@stomp/stompjs";

type ChatMessage = {
  sender: string;
  receiver: string;
  message: string;
};
type User = {
  id: number;
  username: string;
  status: Status;
};
const Status = {
  ONLINE: "ONLINE",
  OFFLINE: "OFFLINE",
} as const;

type Status = (typeof Status)[keyof typeof Status];

let client: Client;
export default function Chat() {
  const [users, setUsers] = useState<User[]>();
  const [username, setUsername] = useState<string>("");
  const [selectedUser, setSelectedUser] = useState<User>();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    if (localStorage.getItem("username") != null) {
      setUsername(localStorage.getItem("username") as string);
    }
  }, []);
  useEffect(() => {
    if (username.length != 0) connect();
    return () => disconnect();
  }, [username]);

  const connect = () => {
    console.log("what");
    client = new Client({
      brokerURL: "ws://localhost:3000/ws",
      reconnectDelay: 5000,
      connectHeaders: {
        userId: username,
      },
      onConnect: () => {
        client.subscribe("/user/queue/messages", (message) => {
          const parsed: ChatMessage = JSON.parse(message.body);
          setMessages((prev) => [...prev, parsed]);
        });
        //subscribe to something that sends message about people joining online
        client.subscribe("/topic/present", (data) => {
          console.log("subs to topic present");
          const availUsers: User[] = JSON.parse(data.body);
          setUsers(availUsers);
          console.log(availUsers);
        });
        //send message to something to put their existence
        client.publish({
          destination: "/app/send/presence",
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
    if (selectedUser === undefined) return;
    client.publish({
      destination: "/app/send/one",
      body: JSON.stringify({
        sender: username,
        receiver: selectedUser?.username,
        message: input,
      }),
    });
    const newMessage: ChatMessage = {
      sender: username,
      receiver: selectedUser?.username,
      message: input,
    };
    setMessages((prev) => [...prev, newMessage]);
    setInput("");
  };

  return (
    <div className="h-screen flex bg-gray-900 text-white">
      {/* Sidebar */}
      <div className="w-64 bg-gray-800 p-4 border-r border-gray-700">
        <h2 className="text-xl font-bold mb-4">Online Users</h2>

        {users?.length != 0 &&
          users?.map((user) => (
            <div
              key={user.id}
              onClick={() => setSelectedUser(user)}
              className={`p-3 mb-2 rounded cursor-pointer flex justify-between items-center
              ${
                selectedUser?.id === user.id
                  ? "bg-gray-700"
                  : "hover:bg-gray-700"
              }`}
            >
              <span>{user.username}</span>
              <span
                className={`h-2 w-2 rounded-full ${
                  user.status == Status.ONLINE ? "bg-green-400" : "bg-gray-500"
                }`}
              />
            </div>
          ))}
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-gray-700 bg-gray-800">
          <h2 className="text-lg font-semibold">
            {selectedUser
              ? `Chat with ${selectedUser.username}`
              : "Select a user"}
          </h2>
        </div>

        {/* Messages */}
        <div className="flex-1 p-4 overflow-y-auto space-y-3">
          {messages.map((msg, i) => {
            const isMe = msg.sender === username;

            return (
              <div
                key={i}
                className={`max-w-sm p-3 rounded ${
                  isMe
                    ? "bg-blue-600 ml-auto text-right"
                    : "bg-gray-700 mr-auto text-left"
                }`}
              >
                {msg.message}
              </div>
            );
          })}
        </div>

        {/* Input */}
        <div className="p-4 border-t border-gray-700 bg-gray-800 flex">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 bg-gray-700 p-3 rounded text-white focus:outline-none"
          />
          <button
            onClick={sendMessage}
            className="ml-3 bg-blue-600 hover:bg-blue-700 px-6 rounded font-semibold"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
