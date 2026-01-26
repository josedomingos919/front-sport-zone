import React from "react";

const ActivityIndicator = ({ size = 8, color = "blue-500", message }) => {
  return (
    <div className="flex flex-col items-center justify-center space-y-2 p-4">
      <div
        className={`border-4 border-t-${color} border-gray-200 rounded-full w-${size} h-${size} animate-spin`}
      ></div>
      {message && <span className="text-gray-700 font-medium">{message}</span>}
    </div>
  );
};

export default ActivityIndicator;
