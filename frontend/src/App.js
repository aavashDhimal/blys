import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import './App.css';
import SuccessPage from "./pages/success";
import VerifyPage from "./pages/verify";

function App() {
  const [isVerified, setIsVerified] = useState(false);

  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
      <Route path="/" element={<VerifyPage setIsVerified={setIsVerified} isVerified={isVerified} />} />
          <Route path="/success" element={<SuccessPage isVerified={isVerified} setIsVerified={setIsVerified} />} />
      </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;