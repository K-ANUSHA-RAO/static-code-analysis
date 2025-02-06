import React from "react";

const Sidebar = () => {
  return (
    <aside className="w-64 bg-gray-800 text-white h-screen p-4">
      <ul>
        <li className="p-2 hover:bg-gray-700 cursor-pointer">Dashboard</li>
        <li className="p-2 hover:bg-gray-700 cursor-pointer">Results</li>
      </ul>
    </aside>
  );
};

export default Sidebar;