import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "./Home"
import CreateWallet from "./components/CreateWallet"
import Login from "./components/Login/Login"
import WidgetDiamtoBsc from "./components/Swap/WidgetDiamtoBsc"
import WidgetBsctoDiam from "./components/Swap/WidgetBsctoDiam"
import SwapLayout from "./components/Swap/SwapLayout"

function App() {

  const diam_details = localStorage.getItem("diam_wallet");

  return (
    <div className="h-screen w-screen overflow-auto ">
      <BrowserRouter>
        <Routes>
        <Route path="/" element={<Home />} />
          <Route
            path="/login"
            element={
              diam_details ? (
                <Login diam_details={diam_details} />
              ) : (
                <CreateWallet />
              )
            }
          />
          <Route path='/*' element={<SwapLayout />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
