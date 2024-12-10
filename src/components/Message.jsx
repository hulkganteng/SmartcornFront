import React from "react";

const getUserColor = (senderId) => {
  const colors = ["#F87171", "#60A5FA", "#34D399", "#FBBF24", "#A78BFA", "#F472B6"];
  return colors[senderId % colors.length];
};

const Message = ({ sender, content, isSender, senderId }) => {
  const userColor = getUserColor(senderId); // Ambil warna berdasarkan sender_id

  return (
    <div
      className={`flex ${isSender ? "justify-end" : "justify-start"} mb-2`}
    >
      <div
        className={`p-2 rounded-lg max-w-xs`}
        style={{
          backgroundColor: isSender ? "#2563EB" : userColor, // Biru untuk pengirim, warna unik untuk penerima
          color: isSender ? "#FFFFFF" : "#000000", // Teks putih untuk pengirim, hitam untuk penerima
        }}
      >
        {!isSender && <div className="font-bold mb-1">{sender}</div>}
        <div>{content}</div>
      </div>
    </div>
  );
};

export default Message;
