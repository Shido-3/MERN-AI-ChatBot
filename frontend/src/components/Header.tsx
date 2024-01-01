import React from "react";
import { AppBar, Toolbar } from "@mui/material"; // Components exported from Material UI
import Logo from "./shared/Logo"
import { useAuth } from "../context/AuthContext";
import NavigationLink from "./shared/NavigationLink";

const Header = () => {
    const auth = useAuth();
    return (
        <AppBar sx={{ bgcolor: "transparent", position: "static", boxShadow: "none" }}>
            <Toolbar sx={{ display: "flex" }}>
                <Logo />
                <div>
                    {auth?.isLoggedIn ? ( // Checks whether or not the user is logged in, and depending on the result different Links are rendered
                        <>
                            <NavigationLink 
                                bg="#006400"
                                to="/chat"
                                text="Go To Chat"
                                textColor="#E5DDD2"
                            />
                            <NavigationLink 
                                bg="#8B0000"
                                to="/"
                                text="Logout"
                                textColor="#E5DDD2"
                                onClick={auth.logout}
                            />
                        </>
                    ) : (
                        <>
                            <NavigationLink 
                                bg="#736B60"
                                to="/login"
                                text="Login"
                                textColor="#E5DDD2"
                            />
                            <NavigationLink 
                                bg="#4B4237"
                                to="/signup"
                                text="Signup"
                                textColor="#E5DDD2"
                            /> 
                        </>
                    )}
                </div>
            </Toolbar>
        </AppBar>
    );
};

export default Header;