import React from "react";
import FontAwesome from "react-fontawesome";
import cssModules from 'react-css-modules';
import style from "./style.css";

export const Footer = () => {
  return (
    <footer className='footer-container'>
      <h2>Spofford Design, Inc.</h2>
      <div>
        <h4>Copyright 2018</h4>
      </div>
    </footer>
  )
};

export default cssModules(Footer, style);
