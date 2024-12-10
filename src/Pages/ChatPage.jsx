import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { useNavigate } from "react-router-dom";
import Message from "../components/Message";

const socket = io("http://localhost:3000", {
  transports: ["websocket"],
  query: { token: localStorage.getItem("token") },
});

const ChatPage = () => {
  const [roomId, setRoomId] = useState("");
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }

    // Mendengarkan pesan yang diterima dari server
    socket.on("receive_message", (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    // Mendapatkan riwayat pesan ketika bergabung ke room
    socket.on("chat_history", (history) => {
      setMessages(history);
    });

    return () => {
      socket.off("receive_message");
      socket.off("chat_history");
    };
  }, [user, navigate]);

  const handleJoinRoom = () => {
    if (!roomId.trim()) {
      alert("Room ID is required!");
      return;
    }

    // Emit event untuk join room
    socket.emit("join_room", { username: user.first_name, room_id: roomId });
    setMessages([]);
  };

  const handleSendMessage = () => {
    if (!roomId.trim()) {
      alert("Please join a room first!");
      return;
    }

    if (newMessage.trim() !== "") {
      const message = {
        content: newMessage,
        room_id: roomId,
      };

      // Emit event untuk mengirim pesan ke server
      socket.emit("send_message", message);

      // Jangan tambahkan pesan secara manual ke state
      setNewMessage(""); // Reset input field
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-4">
      <div className="bg-white p-4 rounded-lg shadow-md">
        <div className="flex mb-4">
          <input
            type="text"
            value={roomId}
            onChange={(e) => setRoomId(e.target.value)}
            className="flex-1 p-2 border border-gray-300 rounded-md"
            placeholder="Enter Room ID..."
          />
          <button
            onClick={handleJoinRoom}
            className="ml-2 p-2 bg-green-500 text-white rounded-md"
          >
            Join Room
          </button>
        </div>

        <div className="flex flex-col h-80 overflow-y-auto mb-4">
          {messages.map((msg, index) => (
            <Message
              key={index}
              sender={msg.sender_id === user.user_id ? "You" : msg.sender_name} // Nama pengirim
              content={msg.content}
              isSender={msg.sender_id === user.user_id} // Logika pengirim atau penerima
              senderId={msg.sender_id} // Kirim sender_id untuk menentukan warna
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
