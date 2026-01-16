import { CircleX } from "lucide-react";
import React from "react";

function ErrorFunction({error}) {
  return (
        <div className="w-full h-40 flex justify-center items-center mt-10 ">
      <div className="w-full h-full bg-red-100 border border-red-400 text-red-700 px-6 py-4 rounded-lg  shadow-lg flex items-center justify-center space-x-3" >
        <CircleX  className="h-10 w-10 text-red-600 shrink-0" />
        <p className="text-3xl font-medium">{error}</p>
      </div>
    </div>
  );
}

export default ErrorFunction;
