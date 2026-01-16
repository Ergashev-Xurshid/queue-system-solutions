import React, { useState } from "react";
import { Toaster } from "sonner";
import { router } from "../router/adminRoutes";
function App() {
  const [admin, setAdmin] = useState(null);
  return (
    <>
      <Toaster position="top-right" richColors closeButton />
      {router(setAdmin, admin)}
    </>
  );
}

export default App;
