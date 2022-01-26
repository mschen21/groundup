import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import store from "./store";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import ServiceCalendar from "./components/ServiceCalendar";
import ServiceListing from "./components/ServiceListing";
import reportWebVitals from "./reportWebVitals";
import ReviewPage from "./components/ReviewPage";
import ConfirmPage from "./components/ConfirmPage";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />}>
            <Route path=":companyId" element={<ServiceListing />} />
            <Route path="service/:serviceId" element={<ServiceCalendar />} />
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
