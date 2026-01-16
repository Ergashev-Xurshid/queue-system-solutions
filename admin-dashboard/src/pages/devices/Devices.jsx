import { Layers2 } from "lucide-react";
import React from "react";
import DevicesLogin from "./DevicesLogin";

function Devices() {
  return (
    <div className="relative h-screen">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
          Devices
        </h2>
        <button
          className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors cursor-pointer"
        >
          <Layers2 className="w-5 h-5" />
          Add Devices
        </button>
      </div>
      <DevicesLogin/>
    </div>
  );
}

export default Devices;
