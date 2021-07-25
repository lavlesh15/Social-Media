import React from 'react'
import "./header.css";
import { IconButton } from '@material-ui/core';
import InfoIcon from '@material-ui/icons/Info';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
import MenuIcon from '@material-ui/icons/Menu';

function Header() {
    return (
        <div className="header">
            <div>
            <div className="head">
              <img src="https://t4.ftcdn.net/jpg/02/93/09/93/360_F_293099368_lk9Sp8gEDLKgMBFKAoA8JAA1NeKmJKXu.jpg" alt="" /> 
             <h3> Postbox <sup>&#174;</sup>  </h3>

            </div>
            </div>

            <div className="icon">
              <IconButton> <ChatBubbleOutlineIcon/> </IconButton>
              <IconButton> <InfoIcon/> </IconButton>
              <IconButton> <MenuIcon/> </IconButton>
                
            </div>

        </div>
    )
}

export default Header
