import React, { useEffect } from "react";
import { Box, Typography, Button } from "@mui/material";
import CustomizedInput from "../components/shared/CustomizedInput";
import { RiLoginCircleLine } from "react-icons/ri";
import { toast } from "react-hot-toast";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Slideshow from "../components/Slideshow";

const Signup = () => {
    const navigate = useNavigate();
    const auth = useAuth();
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => { // Listens to an event happening
        e.preventDefault(); // Prevents the webpage from refreshing
        const formData = new FormData(e.currentTarget); // Selects the Form as the target after it has been submitted
        const name = formData.get("name") as string;
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;
        try {
            toast.loading("Signing Up", { id: "signup" }); // Gives a notification saying "Signing In" as you are waiting to sign in
            await auth?.signup(name, email, password);
            toast.success("Signed Up Successfully", { id: "signup" }); // The ID ensures that only ONE toast notification is displayed at a time
            toast.success("Signed In Successfully", { id: "login" });
        } catch (error) {
            console.log(error);
            toast.error("Signed Up Failed", { id: "signup" });
        }
    };
    useEffect(() => { // After you are logged in, you are then redirected to "chat"
        if (auth?.user) {
            return navigate("/chat");
        }
    }, [auth]);
    return (
        <Box width={"100%"} height={"100%"} display="flex" flex={1}>
            <Box 
                padding={8} 
                mt={8} 
                display={{ md: "flex", sm: "none", xs: "none"}} 
            >
                <Slideshow />
            </Box>
            <Box
                display={"flex"}
                flex={{ xs: 1, md: 0.5 }}
                justifyContent={"center"}
                alignItems={"center"}
                padding={2}
                marginLeft={"auto"}
                marginRight={10}
                marginTop={8}
            >
                <form
                    onSubmit={handleSubmit} 
                    style={{
                        margin: "auto", 
                        padding: "30px", 
                        borderRadius: "20px",
                        border: "3px solid black"
                    }}
                >
                    <Box 
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            alignItems: "center"
                        }}
                    >
                        <Typography
                            variant="h4"
                            textAlign="center"
                            padding={2}
                            fontWeight={600}
                            color={"black"}
                        >
                            Sign Up
                        </Typography>
                        <CustomizedInput type="text" name="name" label="Name" />
                        <CustomizedInput type="email" name="email" label="Email" />
                        <CustomizedInput type="password" name="password" label="Password" />
                        <Button
                            type="submit"
                            sx={{
                                px: 2,
                                py: 1,
                                marginTop: 2,
                                width: "400px",
                                borderRadius: 2,
                                bgcolor: "#006400",
                                color: "#E5DDD2",
                                ":hover": {
                                    bgcolor: "white",
                                    color: "black"
                                }
                            }}
                            endIcon={<RiLoginCircleLine />}
                        >
                            Sign Up
                        </Button>
                    </Box>    
                </form>
            </Box>
        </Box>
    );
};

export default Signup;