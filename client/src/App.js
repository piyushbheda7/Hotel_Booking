import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Home from "./pages/home/Home";
import Hotel from "./pages/hotel/Hotel";
import List from "./pages/list/List";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register"
import PaymentSucess from "./components/paymentSucess/PaymentSucess";
import Pdf from "./components/pdf/Pdf";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/hotels" element={<List/>}/>
        <Route path="/hotels/:id" element={<Hotel/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/Pdf/:id" element={<Pdf/>}/>
        <Route path="/paymentsuccess" element={<PaymentSucess/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
