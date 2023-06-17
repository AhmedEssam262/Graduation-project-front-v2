import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import "./CheckoutForm.css";
import axios from "axios";
import Cookies from "universal-cookie";
import Loader from "../../Loader";

// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is a public sample test API key.
// Don’t submit any personally identifiable information in requests made with this key.
// Sign in to see your own test API key embedded in code samples.
const stripePromise = loadStripe(
  "pk_test_51M9qWBLkzeNmV6Wx5JxH5L1nVm5mfpSGoDFTwQ3kYCgq6g27TeJUvnpabzWTsREcafbUJoYYXOF4LODNKIKTbNS700GeW2fOTz"
);
const AppointmentPayment = ({
  bookedAppointment,
  selectedDate,
  doctorId,
  messageApi,
  setBookedAppointment,
  setIsPayment,
}) => {
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    const host = window?.location?.hostname;
    // Create PaymentIntent as soon as the page loads
    console.log("res", bookedAppointment, doctorId);
    axios
      .request(`http://127.0.0.1:8000/api/payment/stripe`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${new Cookies()?.get("accessToken")}`,
        },
        data: JSON.stringify({
            data:
            {
              doctorId,
              selectedDate,
              ...bookedAppointment,
            }
          
        }),
      })
      .then(({ data }) => {
        setClientSecret(data.clientSecret);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [bookedAppointment?.slotTime, selectedDate, doctorId]);

  const appearance = {
    theme: "stripe",
  };
  const options = {
    clientSecret,
    appearance,
  };

  return (
    <div className="App--payment">
      {clientSecret ? (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm
            setIsPayment={setIsPayment}
            setBookedAppointment={setBookedAppointment}
            bookedAppointment={bookedAppointment}
            doctorId={doctorId}
            selectedDate={selectedDate}
            messageApi={messageApi}
          />
        </Elements>
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default AppointmentPayment;
