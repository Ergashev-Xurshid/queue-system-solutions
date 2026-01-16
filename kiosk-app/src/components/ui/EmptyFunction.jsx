import { t } from "i18next";
import { FolderOpen } from "lucide-react";
import React from "react";

function EmptyFunction() {
  return (
    <div className="w-full h-40 flex justify-center items-center mt-10 ">
      <div className="w-full h-full bg-gray-100 border border-gray-400 text-gray-700 px-6 py-4 rounded-lg  shadow-lg flex items-center justify-center space-x-3" >
        <FolderOpen className="h-10 w-10 text-gray-600 shrink-0" />
        <p className="text-3xl font-medium">{t("noData")}</p>
      </div>
    </div>
  );
}

export default EmptyFunction;
