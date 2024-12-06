// RoomSelection.js
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

function RoomSelection() {
  const [rooms, setRooms] = useState([]);  // State untuk daftar rooms
  const history = useHistory();  // Untuk menavigasi ke halaman chat setelah memilih room

  // Ambil daftar rooms dari backend
  useEffect(() => {
    const fetchRooms = async () => {
      const response = await fetch("http://localhost:3000/api/chats/rooms", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,  // Kirim token untuk autentikasi
        },
      });

      if (response.ok) {
        const data = await response.json();
        setRooms(data);
      } else {
        console.error("Error fetching rooms");
      }
    };

    fetchRooms();
  }, []);

  // Fungsi untuk menangani pemilihan room
  const handleRoomSelect = (roomId) => {
    history.push(`/chat/${roomId}`);  // Navigasi ke halaman chat dengan roomId yang dipilih
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-bold text-green-700 mb-4">Pilih Room Chat</h2>
      
      {/* Tampilkan daftar room yang tersedia */}
      <div className="space-y-4">
        {rooms.map((room) => (
          <div
            key={room.room_id}
            className="flex justify-between items-center p-4 bg-gray-100 rounded shadow cursor-pointer hover:bg-gray-200"
            onClick={() => handleRoomSelect(room.room_id)}
          >
            <p className="text-xl font-semibold">{room.name}</p>
            <p className="text-sm text-gray-500">Room ID: {room.room_id}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RoomSelection;
