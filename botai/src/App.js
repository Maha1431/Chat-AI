import Dashboard from "./Component/Dashboard";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import React from "react";
import ConversationHistory from "./Component/conversationhistory";

function App() {
  return (
    <Router>
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/conversations" element={<ConversationHistory />} />
    </Routes>
  </Router>
     
  );
}

export default App;
