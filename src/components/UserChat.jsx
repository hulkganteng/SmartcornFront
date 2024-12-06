// src/components/UserChat.js
import React, { useState, useEffect } from "react";

const UserChat = ({ roomId }) => {
  const [users, setUsers] = useState([]); // State untuk menyimpan daftar pengguna
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsersInRoom = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/chats/${roomId}/users`, {
          method: "GET",
        });

        if (!response.ok) {
          throw new Error("Gagal memuat pengguna");
        }

        const data = await response.json();
        setUsers(data);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    fetchUsersInRoom();
  }, [roomId]);

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-bold text-green-700 mb-4">Pengguna di Room</h2>
      {loading ? (
        <p>Memuat pengguna...</p>
      ) : (
        <div>
          {users.length > 0 ? (
            <ul>
              {users.map((user) => (
                <li key={user.user_id} className="mb-2">
                  <span className="font-semibold">{user.username}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p>Tidak ada pengguna di room ini.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default UserChat;
