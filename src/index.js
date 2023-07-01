import React from "react";
import ReactDOM from "react-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { BlueEnergyApp } from "./BlueEnergyApp";
import "./styles.css";
import "./styles/styles.scss";
import AOS from 'aos';
import "aos/dist/aos.css";
import 'aos/dist/aos.js';
AOS.init();

ReactDOM.render(
    <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENTID}><BlueEnergyApp /></GoogleOAuthProvider>,
    document.getElementById("root"),
    document.addEventListener("DOMContentLoaded", function () {
        setTimeout(function () { AOS.refresh(); }, 1000)
    }),
    document.addEventListener("load", function () {
        AOS.refresh();
    }),
);
