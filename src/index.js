import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import store from "./store";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import ServiceBookingPage from "./components/ServiceBookingPage/ServiceBookingPage";
import ServiceListingPage from "./components/ServiceListingPage/ServiceListingPage";
import reportWebVitals from "./reportWebVitals";
import ReviewPage from "./components/ReviewPage/ReviewPage";
import ConfirmPage from "./components/ConfirmPage/ConfirmPage";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />}>
            <Route path=":companyId" element={<ServiceListingPage />} />
            <Route path="service/:serviceId" element={<ServiceBookingPage />} />
            <Route path="review" element={<ReviewPage />} />
            <Route path="confirm/:bookingId" element={<ConfirmPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
