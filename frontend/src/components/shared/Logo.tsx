import React from "react";
import { Link } from "react-router-dom"; // Component exported from "react-router-dom"
import { Typography } from "@mui/material"; // Component exported from "material UI"

const Logo = () => {
    return (
        <div 
            style={{
                display: "flex", 
                marginRight: "auto", 
                alignItems: "center",
                gap: "15px"
            }}
        >
            <Link to={"/"}>
                <img 
                    src="openai.png" 
                    alt="openai" 
                    width={"30px"}
                    height={"30px"}
                />
            </Link>{" "}
            <Typography 
                sx={{
                    display: { md: "block", sm: "none", xs: "none" }, 
                    marginRight: "auto",
                    fontWeight: "800",
                    color: "black"
                }}
            >
                <span style={{ fontSize: "20px" }}>MERN</span>-GPT
            </Typography> 
        </div>
    );
};

// sx={{ display: { md:"block", sm:"none", xs:"none" }}} only on medium devices will it show the Logo, on small and extra-small devices it won't show the logo

export default Logo;