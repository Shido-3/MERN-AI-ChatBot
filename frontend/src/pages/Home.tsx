import React from "react";
import { Box, useMediaQuery, useTheme } from "@mui/material";
import TypingAnimation from "../components/typer/TypingAnimation";
import Footer from "../components/footer/Footer";
import MernStackTypingAnimation from "../components/typer/MernStackTypingAnimaton";

const Home = () => {
    const theme = useTheme()
    const isBelowMd = useMediaQuery(theme.breakpoints.down("md")); // Figures out if the device is a mobile device or not (screen size)
    return (
        <Box width={"100%"} height={"100%"}>
            <Box
                sx={{
                    display: "flex",
                    width: "100%",
                    flexDirection: "column",
                    alignItems: "center",
                    mx: "auto",
                    marginTop: 3
                }}
            >
                <Box
                    sx={{
                        width: "100%",
                        display: "flex",
                        flexDirection: { md: "row", xs: "column", sm: "column" },
                        gap: 5,
                        my: 10,
                        paddingRight: "300px"
                    }}
                >
                    <img 
                        className="rotate"
                        src="openai.png" 
                        alt="openai logo" 
                        style={{ width: "200px", margin: "auto" }}
                    />
                    <Box
                        sx={{
                            width: "600px",
                            display: "flex",
                            flexDirection: { md: "row", xs: "column", sm: "column" },
                            alignItems: "center",
                            marginLeft: "-200px"
                        }}
                    >
                        <TypingAnimation />
                    </Box>
                </Box>
                <Box
                    sx={{
                         width: "500px",
                        display: "flex",
                        flexDirection: { md: "row", xs: "column", sm: "column" },
                        justifyContent: "center",
                        alignItems: "center",
                        marginTop: "-50px"
                    }}
                >

                    <img src="mernstack.png" alt="mernstack" style={{ width: "400px", border: "3px solid black" }} />
                </Box>
                <Box
                    sx={{
                        width: "400px",  
                        display: "flex",
                        flexDirection: { md: "row", xs: "column", sm: "column" },
                        alignItems: "center",
                        marginTop: "50px",
                        marginRight: "-150px",
                        fontSize: "30px",
                        color: "black",
                        fontWeight: 300
                    }}
                >
                    Built using&nbsp;<MernStackTypingAnimation />
                </Box>
            </Box>
            <Footer />
        </Box>
    );
};

export default Home;