import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { useNavigate } from "react-router-dom";
import Message from "../components/Message";  // Pastikan path benar

const socket = io("http://localhost:3000", {
  transports: ["websocket"],
  query: { token: localStorage.getItem("authToken") }  // Mengambil token dari localStorage
});



const ChatPage = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const navigate = useNavigate();

  // Connect to room and load chat history
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }

    // Bergabung ke room Umum
    socket.emit("join_room", { username: user.username, room: "Umum" });

    // Dengar pesan yang diterima
    socket.on("receive_message", (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    // Meminta riwayat chat saat bergabung
    socket.emit("get_chat_history", "Umum");

    // Dengar riwayat chat
    socket.on("chat_history", (history) => {
      setMessages(history);
    });

    // Cleanup event listener saat component unmount
    return () => {
      socket.off("receive_message");
      socket.off("chat_history");
    };
  }, [user, navigate]);

  // Kirim pesan
  const handleSendMessage = () => {
    if (newMessage.trim() !== "") {
      const message = {
        content: newMessage,
        sender: user.username,
        room: "Umum",
      };
      // Kirim pesan ke server
      socket.emit("send_message", message);
      setNewMessage(""); // Reset input
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-4">
      <div className="bg-white p-4 rounded-lg shadow-md">
        <div className="flex flex-col h-80 overflow-y-auto mb-4">
          {/* Menampilkan pesan */}
          {messages.map((msg, index) => (
            <Message
              key={index}
              sender={msg.sender}
              content={msg.content}
              isSender={msg.sender === user.username}
            />
          ))}
        </div>

        <div className="flex">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            className="flex-1 p-2 border border-gray-300 rounded-md"
            placeholder="Type a message..."
          />
          <button
            onClick={handleSendMessage}
            className="ml-2 p-2 bg-blue-500 text-white rounded-md"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
