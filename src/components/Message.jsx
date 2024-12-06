// src/components/Message.jsx
import React from "react";

const Message = ({ sender, content, isSender }) => {
  return (
    <div className={`flex ${isSender ? "justify-end" : "justify-start"} items-center`}>
      <div className={`p-3 max-w-xs rounded-lg ${isSender ? "bg-blue-500 text-white" : "bg-gray-300 text-black"}`}>
        <p className="font-semibold">{sender}</p>
        <p>{content}</p>
      </div>
    </div>
  );
};

export default Message;
