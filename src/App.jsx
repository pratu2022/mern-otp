import { BrowserRouter, Routes, Route } from "react-router-dom"
import Signup from "./pages/Signup"
import Loginpage from "./pages/Loginpage"
import Forget from "./pages/Forget"
import { Toaster } from "react-hot-toast"
import Verify from "./pages/Verify"
import Home from "./pages/Home"

export default function App() {
  return (
    <>
      <BrowserRouter>
        <Toaster />
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Loginpage />} />
          <Route path="/forget" element={<Forget />} />
          <Route path="/verify" element={<Verify />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}