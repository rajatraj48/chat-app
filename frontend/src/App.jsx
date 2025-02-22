import Navbar from "./components/Navbar";
import Login from "./page/Login";
import Signup from "./page/Signup";
import Setting from "./page/Setting";
import Profile from "./page/Profile";
import Homepage from "./page/Homepage";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <div >
    <Navbar />

    <Routes>
      <Route path="/" element={<Homepage/>} />
      <Route path="/signup" element={ <Signup /> } />
      <Route path="/login" element={ <Login /> } />
      <Route path="/settings" element={<Setting />} />
      <Route path="/profile" element={<Profile /> } />
    </Routes>

    {/* <Toaster /> */}
  </div>
  );
}

export default App;
