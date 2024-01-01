import React, { useState } from "react";
import { TypeAnimation } from "react-type-animation";
import { Box } from "@mui/material";

const MernStackTypingAnimation = () => {

    const [textColor, setTextColor] = useState('black');
    
    return (
        <Box
            sx={{ 
                fontSize: "30px",
                color: textColor,
                fontWeight: 300,
                display: 'inline-block'
            }}
        >
            <TypeAnimation
                sequence={[
                    () => setTextColor("#3a863e"),
                    "MongoDB",
                    2000,
                    () => setTextColor("#353535"),
                    "Express",
                    2000,
                    () => setTextColor("#24618f"),
                    "React",
                    2000,
                    () => setTextColor("#78b743"),
                    "Node JS",
                    2000
                ]}
                speed={50}
                repeat={Infinity}
            />
        </Box>
    );
};

export default MernStackTypingAnimation;