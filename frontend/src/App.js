// import {Button} from '@mui/material';
import { Main } from "./components/HomePage/Main";
import { Route, Routes } from "react-router-dom";
import { Search } from "./components/SearchPage/Search";

import { PaymentPage } from "./components/paymentPage/completePayment";
import { Checkout } from "./components/checkout";

import { TrainBooking } from "./components/SearchPage/TrainBooking";
import { Register } from "./components/Register/Register";
import { Login } from "./components/login/Login";
import { Hotel } from "./components/SearchPage/hotel_search";
import { Cab } from "./components/SearchPage/cab";
import { Bus } from "./components/SearchPage/bus_search";
import { Holiday } from "./components/SearchPage/holiday";
import ProtectedRoutes from "./components/ProtectedRoute/ProtectedRoutes";
import UserProfile from "./components/UserProfile/UserProfile";
import Bookings from "./components/UserProfile/Bookings";
import {AddBooking} from "./components/UserProfile/addedBooking";
import {DisplayAddedBooking} from "./components/UserProfile/DisplayAddedBooking";
function App() {
  return (
    <div>
      <Routes>
        <Route path="/register" exact element={<Register />}></Route>
        <Route path="/login" exact element={<Login />}></Route>
        <Route path="/" exact element={<Main />} />
        <Route element={<ProtectedRoutes />}>
          <Route path="/user" exact element={<UserProfile />} />
          <Route path="/search" exact element={<Search />} />
          <Route path="/checkout" exact element={<Checkout />}></Route>

          <Route path="/train-search" element={<TrainBooking />} />
          <Route path="/payment" exact element={<PaymentPage />} />
          <Route path="/holiday-package-search" element={<Holiday/>} />
          <Route path="/hotel-search" element={<Hotel />} />
          <Route path="/cab-search" element={<Cab />} />
          <Route path="/bus-search" element={<Bus />} />
          <Route path="/bookings" element={<Bookings/>}/>
          <Route path="/add-booking" element={<AddBooking/>} />
          <Route path="/display-added-booking" element={<DisplayAddedBooking/>} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
