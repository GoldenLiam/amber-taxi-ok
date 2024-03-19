import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { BookingList, Home, Trip, Login, RideDetail } from "../pages";

// Socket
import { SocketTransportationContextProvider } from "../sockets";
import { SocketTransportationContextProviderForBookingList } from "../sockets";

export const AppRoutes = () => {
    return (
        <Router>
            <Routes>

                <Route path="/" element={<Home />}>
                </Route>
                
                <Route path="/booking-list" element={ <SocketTransportationContextProviderForBookingList> <BookingList /> </SocketTransportationContextProviderForBookingList> }>
                </Route>

                <Route path="/trip/:uuid" element={ <SocketTransportationContextProvider> <Trip /> </SocketTransportationContextProvider>}>
                </Route>
                
                <Route path="/trip-detail/:uuid" element={<RideDetail />}>
                </Route>

                <Route path="/login" element={ <Login/> }>
                </Route>

            </Routes>
        </Router>
    );
}