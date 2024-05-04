import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ListLocation from "./pages/ListLocation";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ListLocation />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
