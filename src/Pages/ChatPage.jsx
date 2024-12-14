import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { useNavigate } from "react-router-dom";
import Message from "../components/Message";

// Gantilah dengan URL WebSocket yang aman jika diperlukan
const socket = io("https://smartconweb.my.id/api/", {
  transports: ["websocket"],
  query: { token: localStorage.getItem("token") },
});

const ChatPage = () => {
  const [roomId, setRoomId] = useState("");
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const [inRoom, setInRoom] = useState(false); // State untuk menentukan apakah user sudah join room
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

    // Cleanup socket events saat komponen di-unmount
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
    setInRoom(true); // Menyembunyikan form join room setelah bergabung
    setMessages([]); // Reset pesan saat masuk ke room baru
  };

  const handleLeaveRoom = () => {
    if (!roomId.trim()) return;

    // Emit event untuk keluar dari room
    socket.emit("leave_room", { room_id: roomId });
    setRoomId(""); // Reset room ID
    setInRoom(false); // Tampilkan form join room
    setMessages([]); // Reset pesan
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
      setNewMessage(""); // Reset input field setelah pesan terkirim
    }
  };

  const handleDeleteChatHistory = () => {
    if (!roomId.trim()) {
      alert("Please join a room first!");
      return;
    }

    if (window.confirm("Are you sure you want to delete the chat history for this room?")) {
      fetch(`https://smartconweb.my.id/api/chats/${roomId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
        .then((response) => {
          if (response.ok) {
            setMessages([]); // Reset chat di frontend
            alert("Chat history deleted successfully.");
          } else {
            alert("Failed to delete chat history.");
          }
        })
        .catch((error) => {
          console.error("Error deleting chat history:", error);
          alert("An error occurred while deleting chat history.");
        });
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-200">
      <header className="flex items-center justify-between bg-green-500 text-white px-6 py-3 shadow-md">
        <div>
          <h1 className="text-xl font-bold">{inRoom ? `Room: ${roomId}` : "Forum Komunitas"}</h1>
          <p className="text-sm">{inRoom ? "Connected" : "Not Connected"}</p>
        </div>
        {inRoom && (
          <div className="flex space-x-4">
            <button
              className="bg-yellow-500 px-4 py-2 rounded-md text-sm font-medium"
              onClick={handleDeleteChatHistory}
            >
              Delete Chat History
            </button>
            <button
              className="bg-red-500 px-4 py-2 rounded-md text-sm font-medium"
              onClick={handleLeaveRoom}
            >
              Leave Room
            </button>
          </div>
        )}
      </header>

      <div className="flex-1 overflow-y-auto p-4 bg-white">
        {messages.length > 0 ? (
          messages.map((msg, index) => (
            <Message
              key={index}
              sender={msg.sender_id === user.user_id ? "You" : msg.sender_name}
              content={msg.content}
              isSender={msg.sender_id === user.user_id}
            />
          ))
        ) : (
          <p className="text-center text-gray-500">
            {inRoom ? "No messages yet. Start the conversation!" : "Join a room to see messages."}
          </p>
        )}
      </div>

      {inRoom ? (
        <footer className="bg-gray-100 px-4 py-3 flex items-center shadow-md">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            className="flex-1 border border-gray-300 rounded-lg px-4 py-2"
            placeholder="Type a message..."
          />
          <button
            onClick={handleSendMessage}
            className="ml-4 bg-blue-500 text-white px-4 py-2 rounded-lg"
          >
            Send
          </button>
        </footer>
      ) : (
        <div className="bg-gray-100 px-4 py-3 shadow-md">
          <div className="flex items-center">
            <input
              type="text"
              value={roomId}
              onChange={(e) => setRoomId(e.target.value)}
              className="flex-1 border border-gray-300 rounded-lg px-4 py-2"
              placeholder="Enter Room ID..."
            />
            <button
              onClick={handleJoinRoom}
              className="ml-4 bg-green-500 text-white px-4 py-2 rounded-lg"
            >
              Join Room
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatPage;
