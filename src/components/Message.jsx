import React from "react";

const Message = ({ sender, content, isSender }) => {
  return (
    <div
      className={`flex ${isSender ? "justify-end" : "justify-start"} mb-4`}
    >
      <div
        className={`p-3 rounded-xl max-w-md ${
          isSender ? "bg-blue-500 text-white text-right" : "bg-gray-200 text-black text-left"
        }`}
      >
        {!isSender && <div className="font-bold text-sm mb-1">{sender}</div>}
        <div className="text-sm">{content}</div>
      </div>
    </div>
  );
};

export default Message;
