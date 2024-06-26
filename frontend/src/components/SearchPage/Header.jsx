/* eslint-disable no-restricted-globals */
import FlightIcon from "@mui/icons-material/Flight";
import HotelIcon from "@mui/icons-material/Hotel";
import HomeWorkIcon from "@mui/icons-material/HomeWork";
import HolidayVillageIcon from "@mui/icons-material/HolidayVillage";
import TrainIcon from "@mui/icons-material/Train";
import DirectionsBusFilledIcon from "@mui/icons-material/DirectionsBusFilled";
import LocalTaxiIcon from "@mui/icons-material/LocalTaxi";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import DownhillSkiingIcon from "@mui/icons-material/DownhillSkiing";
import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { Login } from "../login/Login";
import bmtLogo from "./bmt_logo.jpg";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const Icondivcss = styled.div`
  .icondiv {
    height: 60px;
    width: 100%;
    margin: auto;
    background-color: white;
    display: flex;
    flex-direction: row;
    position: sticky; /* Change to sticky */
    top: 0; /* Position at the top of the viewport */
    z-index: 100;
    text-align: center;
    box-shadow: 1px 3px 5px #c0c0c0;
    transition: background-color 0.3s ease-in-out; /* Add smooth transition */
    .icons {
      display: flex;
      flex-direction: row;
      justify-content: space-around;
      width: 60%;

      p {
        padding: 0px;
        margin: -6px;
        color: #555454;
        font-size: 11px;
      }
      span {
        color: #a3a3a3;
        cursor: pointer;
      }
      span:hover {
        color: #2db0fc;
      }
      div:hover {
        color: #2db0fc;
      }
    }
  }
  .disnone {
    display: none;
  }
  .imgdiv {
    position: relative;
    top: 10px;
    left: 0px;
    img {
      width: 50%;
    }
  }
  .login {
    position: relative;
    top: 10px;
    left: 150px;
  }
`;

export const Header = () => {
  const [auth, setAuth] = useState(false);
  const [userName, setUserName] = useState("");
  const navigate = useNavigate();
  const handleLogout = () => {
    axios
      .get("http://localhost:8080/logout")
      .then((res) => location.reload(true));
    navigate("/").catch((err) => console.log(err));
  };
  useEffect(() => {
    axios
      .get("http://localhost:8080/")
      .then((res) => {
        console.log(res.data);
        if (res.data.status === "success") {
          setAuth(true);
          setUserName(res.data.name);
        } else {
          setAuth(false);
        }
      })
      .catch((err) => {
        console.log(err);
        setAuth(false);
      });
  }, []);
  const [nav, setNav] = useState(false);
  const handleChange = () => {
    if (window.scrollY >= 100) {
      setNav(true);
    } else {
      setNav(false);
    }
  };
  window.addEventListener("scroll", handleChange);
  return (
    <Icondivcss>
      <div className={nav ? "icondiv" : "disnone"}>
        <div className="imgdiv">
          <Link to="/">
            <img src={bmtLogo} alt="Logo" />
          </Link>
        </div>
        <div className="icons">
          <div>
            <span>
              <FlightIcon style={{ fontSize: 30, padding: 4 }}></FlightIcon>
            </span>
            <p>Flights</p>
          </div>
          <div>
            <span>
              <HotelIcon style={{ fontSize: 30, padding: 4 }}></HotelIcon>
            </span>
            <p>Hotels</p>
          </div>

          <div>
            <span>
              <HolidayVillageIcon
                style={{ fontSize: 30, padding: 4 }}
              ></HolidayVillageIcon>
            </span>
            <p>Hoiday packages</p>
          </div>
          <div>
            <span>
              <TrainIcon style={{ fontSize: 30, padding: 4 }}></TrainIcon>
            </span>
            <p>Trains</p>
          </div>
          <div>
            <span>
              <DirectionsBusFilledIcon
                style={{ fontSize: 30, padding: 4 }}
              ></DirectionsBusFilledIcon>
            </span>
            <p>Buses</p>
          </div>
          <div>
            <span>
              <LocalTaxiIcon
                style={{ fontSize: 30, padding: 4 }}
              ></LocalTaxiIcon>
            </span>
            <p>Intercity</p>
          </div>
        </div>
        {auth ? (
          <>
            <div className="login me-2">
              <div className="d-flex justify-content-center align-items-center">
                <div className="me-3" style={{ fontWeight: "500" }}>
                  {" "}
                  {userName}
                </div>
                <Link
                  to="/logout"
                  className="btn btn-danger"
                  onClick={handleLogout}
                >
                  Logout
                </Link>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="login me-2">
              <Link to="/register" className="btn btn-primary">
                Register
              </Link>
            </div>
            <div className="login">
              <Link to="/login" className="btn btn-danger">
                Login
              </Link>
            </div>
          </>
        )}
      </div>
    </Icondivcss>
  );
};
