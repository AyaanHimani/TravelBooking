import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import bmtLogo from "./bmt_logo.jpg";
import { Link, useLocation } from "react-router-dom";
import paymentdone from "./payment_done_image.png";
import paymentdonesound from "./payment_complete_sound.mp3";

const PaymentContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 50px;
  background: linear-gradient(
    to right,
    #8f92fa 0%,
    #6165f0 25%,
    #6c70eb 50%,
    #3339e9 100%
  );
  min-height: 100vh;
`;

const Title = styled.h2`
  font-size: 36px;
  font-weight: bold;
  margin-bottom: 40px;
  color: #fff;
`;

const SectionContainer = styled.div`
  width: 100%;
  max-width: 600px;
  margin-bottom: 40px;
  padding: 30px;
  border-radius: 10px;
  background-color: #fff;
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.1);
`;

const Subtitle = styled.h3`
  font-size: 24px;
  margin-bottom: 20px;
  color: #333;
`;

const Text = styled.p`
  font-size: 18px;
  margin-bottom: 20px;
  color: #555;
`;

const Button = styled.button`
  width: 30%;
  padding: 15px 20px;
  background-color: #cc0621d9;
  color: #fff;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #8f1111;
  }
`;

const CompanyNameLogo = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 30px;
  padding-bottom: 20px;
  border-bottom: 2px solid #fff;
`;

const CompanyLogo = styled.img`
  width: 100px;
  height: auto;
  margin-right: 20px;
`;

const CompanyName = styled.h1`
  font-size: 36px;
  font-weight: bold;
  color: #fff;
  margin: 0;
`;

const PaymentDoneContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 40px;
  background-color: #fff;
  border-radius: 10px;
  padding: 40px;
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.1);
`;

const PaymentDoneImage = styled.img`
  width: 120px;
  height: auto;
  margin-bottom: 20px;
`;

const PaymentDoneText = styled.h3`
  font-size: 28px;
  font-weight: bold;
  color: #333;
  margin-bottom: 20px;
`;

const AdditionalText = styled.p`
  font-size: 18px;
  color: #555;
  text-align: center;
`;

const spinAnimation = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const ProcessingIcon = styled.div`
  border: 8px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top: 8px solid #fff;
  width: 50px;
  height: 50px;
  animation: ${spinAnimation} 1s linear infinite;
`;

export const PaymentPage = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const totalPrice = searchParams.get("totalPrice");
  const numberOfTravellers = searchParams.get("numberOfTravellers");

  const [loading, setLoading] = useState(false);
  const [paymentCompleted, setPaymentCompleted] = useState(false);
  const [ticketDownloaded, setTicketDownloaded] = useState(false);

  const generatePNR = () => {
    return Math.floor(10000 + Math.random() * 90000);
  };

  const handlePayment = () => {
    const flightData = JSON.parse(localStorage.getItem("buy"));
    if (!flightData || Object.keys(flightData).length === 0) {
      console.error("No flight data found in local storage.");
      return;
    }

    setLoading(true);
    console.log("Payment started...");

    // Generate and store PNR
    const pnr = generatePNR();
    localStorage.setItem("ticket_id", pnr);
    console.log("PNR generated");

    // Get traveler data from local storage
    const travelerData = JSON.parse(localStorage.getItem("travellers"));
    const userId = JSON.parse(localStorage.getItem("userId")); // Get the userId from localStorage
    // Add userId to each traveler object
    const travelersWithUserId = travelerData.map((traveler) => ({
      ...traveler,
      user_id: userId,
      ticket_id: pnr,
    }));
    // Send traveler data to backend
    fetch("http://localhost:8080/storeTravelerDetails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ travelers: travelersWithUserId }), // Send travelers with userId
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to store traveler details");
        }
        console.log("Traveler details stored successfully");
        // Include travelers key in flightData object
        flightData.travelers = travelerData;
        flightData.user_id = userId; // Add userId to flightData
        flightData.ticket_id = pnr; // Add ticket_id to flightData
        // Send flight data to backend
        return fetch("http://localhost:8080/storeFlightDetails", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(flightData),
        });
      })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to store flight details");
        }
        console.log("Flight details stored successfully");
        setTimeout(() => {
          setLoading(false);
          setPaymentCompleted(true);
          console.log("Payment completed!");
          // localStorage.removeItem("buy"); // Remove the 'buy' data from local storage
        }, 3000); // Retaining the 3-second delay
      })
      .catch((error) => {
        console.error("Error:", error);
        setLoading(false);
      });
  };

  useEffect(() => {
    if (!loading && paymentCompleted && !ticketDownloaded) {
      // Play sound effect upon completion of payment process
      const audio = new Audio(paymentdonesound);
      audio.play();
      console.log("Sound played!");
    }
  }, [loading, paymentCompleted]);

  const handleDownloadTicket = () => {
    setLoading(true); // Set loading state to true when download ticket button is clicked
    const userId = JSON.parse(localStorage.getItem("userId")); // Get userId from localStorage
    const ticketId = JSON.parse(localStorage.getItem("ticket_id")); // Get ticket_id from localStorage
    fetch(`http://localhost:8080/generate-and-download-ticket/${userId}/${ticketId}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to download ticket");
        }
        return response.blob();
      })
      .then((blob) => {
        const url = window.URL.createObjectURL(new Blob([blob]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "flight_ticket.pdf");
        document.body.appendChild(link);
        link.click();
        link.parentNode.removeChild(link);
        setTicketDownloaded(true);
      })
      .catch((error) => {
        console.error("Error downloading ticket:", error);
      })
      .finally(() => {
        setLoading(false); // Set loading state to false after download process completes or encounters an error
      });
  };

  return (
    <PaymentContainer>
      <CompanyNameLogo>
        <CompanyLogo src={bmtLogo} alt="Company Logo" />
        <CompanyName>BookMyTrip</CompanyName>
      </CompanyNameLogo>
      <Title>Complete Your Payment</Title>
      <SectionContainer>
        <Subtitle>Total Price for Payment</Subtitle>
        <Text>Total Price: {totalPrice} INR</Text>
        <Subtitle>Number of Travellers</Subtitle>
        <Text>Total Travellers: {numberOfTravellers}</Text>
      </SectionContainer>
      {paymentCompleted ? (
        <PaymentDoneContainer>
          <PaymentDoneImage src={paymentdone} alt="Payment Done" />
          <PaymentDoneText>Payment Successful!</PaymentDoneText>
          <AdditionalText>
            Your booking is confirmed. Thank you for choosing BookMyTrip.
          </AdditionalText>
          {!ticketDownloaded ? (
            <Button onClick={handleDownloadTicket} disabled={loading}>
              {loading ? <div className="spinner-border mt-2" role="status"></div> : "Download Ticket"}
            </Button>
          ) : null}
        </PaymentDoneContainer>
      ) : (
        <>
          {loading ? (
            <SectionContainer>
              <Subtitle>Processing Payment</Subtitle>
              <Subtitle className="d-flex justify-content-center align-items-center flex-column mt-5">
                <div className="spinner-border mt-2" role="status"></div>
                <div>
                  <span className="sr-only">Payment Processing ...</span>
                </div>
              </Subtitle>
              <ProcessingIcon />
            </SectionContainer>
          ) : (
            <Button onClick={handlePayment}>Complete Payment</Button>
          )}
        </>
      )}
      <Link
        to="/"
        style={{ textDecoration: "none", color: "white", marginTop: "20px" }}
      >
        Back to Home
      </Link>
    </PaymentContainer>
  );
};
