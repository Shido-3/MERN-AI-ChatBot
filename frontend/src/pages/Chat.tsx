import { React, useEffect, useLayoutEffect, useRef, useState } from "react";
import { Avatar, Button, Box, IconButton, Typography } from "@mui/material";
import { red } from "@mui/material/colors";
import { useAuth } from "../context/AuthContext";
import ChatItem from "../components/chat/ChatItem";
import { FaRegArrowAltCircleUp } from "react-icons/fa";
import { deleteUserChats, getUserChats, sendChatRequest } from "../helpers/api-communicator";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

type Message = {
    role: "user" | "assistant";
    content: string;
};

const Chat = () => {
    const navigate = useNavigate(); // Used to redirect users
    const inputRef = useRef<HTMLInputElement | null>(null); // Used for editing the DOM and doesn't cause a re-render
    const auth = useAuth();
    const [chatMessages, setChatMessages] = useState<Message[]>([]); // Declares "chatMessages" as an empty array, "setChatMessages" is the function to add or remove messages from the array
    const handleSubmit = async () => {
        const content = inputRef.current?.value as string; // Takes the user input as a string
        console.log(content); 
        if (inputRef && inputRef.current) { // If there is already a value stored in content from the user input
            inputRef.current.value = ""; // Set the value back to nothing to prepare it for the next user input
        }
        const newMessage: Message = { role: "user", content: content }; // You are saying "newMessage" is of type "Message"
        setChatMessages((prev) => [...prev, newMessage]); // You are using the function defined before "setChatMessages" to store the newMessage in the chatMessages array
        // "prev" means take the existing messages from the "chatMessages" array, make a copy of it, and add the "newMessage" into it, then set this temp array
        // as the new array
        // This is good React practice, creating a new state based off the existing state and not directly modifying the existing state
        
        const chatData = await sendChatRequest(content);
        setChatMessages([...chatData.chats]);
    };

    const handleDeleteChats = async () => {
        try {
            toast.loading("Deleting Chats", { id: "deletechats" });
            await deleteUserChats();
            setChatMessages([]);
            toast.success("Deleted Chats Successfully", { id: "deletechats" });
        } catch (error) {
            console.log(error);
            toast.error("Deleting chats failed", { id: "deletechats" });
        }
    };

    useLayoutEffect(() => { // useLayoutEffect is pefect in this scenario as you are manipulating the DOM before the browser begins to paint
        if (auth?.isLoggedIn && auth.user) {
          toast.loading("Loading Chats", { id: "loadchats" });
          getUserChats()
            .then((data) => {
              setChatMessages([...data.chats]);
              toast.success("Successfully loaded chats", { id: "loadchats" });
            })
            .catch((err) => {
              console.log(err);
              toast.error("Loading Failed", { id: "loadchats" });
            });
        }
    }, [auth]);

    useEffect(() => {
        if (!auth?.user) {
            return navigate("/login");
        }
    }, [auth]); // The [auth] dependency ensures that the effect runs whenever the auth object changes, 
    // making it a way to react to changes in the authentication status.

    return (
        <Box
            sx={{
                display: "flex",
                flex: 1,
                width: "100%",
                height: "100%",
                marginTop: 3,
                gap: 3
            }}
        >
            <Box sx={{ display: { md: "flex", xs: "none", sm: "none" }, flex: 0.2, flexDirection: "column" }}>
                <Box 
                    sx={{ 
                        display: "flex", 
                        width: "100%", 
                        height: "60vh", 
                        backgroundColor: "#736B60",
                        borderRadius: 5,
                        border: "3px solid black",
                        flexDirection: "column",
                        mx: 3
                    }}
                >
                    <Avatar 
                        sx={{
                            mx: "auto",
                            my: 2,
                            backgroundColor: "white",
                            color: "black",
                            fontWeight: 700
                        }}
                    >
                        {auth?.user?.name[0]}
                        {auth?.user?.name.split(" ")[1][0]}
                    </Avatar>
                    <Typography sx={{ mx: "auto", fontFamily: "work sans" }}>
                        Hello, {auth?.user?.name.split(" ")[0]}!
                    </Typography>
                    <Typography sx={{ mx: "auto", fontFamily: "work Sans", my: 4, p: 3 }}>
                        I'm MERN-GPT, a ChatBot, how can I be of assistance?
                    </Typography>
                    <Button
                        onClick={handleDeleteChats} 
                        sx={{
                            width: "200px",
                            my: "auto",
                            color: "white",
                            fontWeight: "700",
                            borderRadius: 3,
                            mx: "auto",
                            backgroundColor: red[300],
                            ":hover": {
                                backgroundColor: red.A400
                            }
                        }}
                    >
                        Clear Conversation
                    </Button>
                </Box>
            </Box>
            <Box sx={{ display: "flex", flex: { md: 0.8, xs: 1, sm: 1 }, flexDirection: "column", px: 3, border: "1px solid black" }}>
                <Typography 
                    sx={{  
                        fontSize: "40px", 
                        color: "black", 
                        mb: 2,
                        mx: "auto", 
                        fontWeight: 600
                    }}
                >
                    Model - GPT 3.5 Turbo
                </Typography>
                <Box
                    sx={{
                        width: "100%",
                        height: "55vh",
                        borderRadius: 3,
                        mx: "auto",
                        display: "flex",
                        flexDirection: "column",
                        overflow: "scroll",
                        overflowX: "hidden",
                        overflowY: "auto",
                        scrollBehaviour: "smooth"
                    }}
                >
                    {chatMessages.map((chat, index) => (
                        //@ts-expect-error - used to ignore any errors (In this case, the error on role) 
                        <ChatItem content={chat.content} role={chat.role} key={index} />
                    ))}
                </Box>
                <div 
                    style={{ 
                        width: "100%",  
                        borderRadius: 8,
                        backgroundColor: "#736B60",
                        display: "flex",
                        margin: "auto",
                        border: "3px solid black"
                    }}
                >
                    {" "}
                    <input 
                        ref={inputRef}
                        type="text"
                        style={{
                            width: "100%",
                            backgroundColor: "transparent",
                            padding: "30px",
                            border: "none",
                            outline: "none",
                            color: "white",
                            fontSize: "20px"
                        }}
                    />
                    <IconButton onClick={handleSubmit} sx={{ ml: "auto", mx: 1, color: "white" }}>
                        <FaRegArrowAltCircleUp />
                    </IconButton>
                </div>
            </Box>
        </Box>
    );
};

// The question mark is to handle cases where a property on a object might be "null" or "undefined"
// Instead of causing a run time error, it'll simply just return a "undefined" message 

// "mx:" sets the right and left hand margin to the desired value

export default Chat;