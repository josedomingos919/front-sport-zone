import React from "react";
import { OrbitProgress } from "react-loading-indicators";

const ActivityIndicator = ({ size = "medium", color = "#ffff" }) => {
  return (
    <div className="smal-indicator">
      <OrbitProgress color={color} size={size} />
    </div>
  );
};

export default ActivityIndicator;
