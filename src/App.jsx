import { BrowserRouter, Route, Routes } from "react-router-dom";

import Home from "./pages/Home";
import { PhotoDetail } from "./pages/DetailPage";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/photos" element={<Home />} />
          <Route path="/photos/:id" element={<PhotoDetail />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
