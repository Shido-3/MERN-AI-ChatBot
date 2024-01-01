import React from "react";
import { Avatar, Box, Typography } from "@mui/material";
import { useAuth } from "../../context/AuthContext";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"; // This is to hightlight the code portion of the response from ChatGPT
import { coldarkDark } from "react-syntax-highlighter/dist/esm/styles/prism";

function extractCodeFromString(message: string) {
    if (message.includes("```")) { // Good indication that the message is a code block
        const blocks = message.split("```"); // Splits the message where the three backticks are found
        return blocks; // Returns the array containing the split message
    }
//    return message;
}

function isCodeBlock(str: string) {
    if ( // Checks if the message contains any of the following characters, which are all good indications of a code block
        str.includes("=") ||
        str.includes(";") ||
        str.includes("[") ||
        str.includes("]") ||
        str.includes("{") ||
        str.includes("}") ||
        str.includes("#") ||
        str.includes("//")
    ) {
        return true;
    }
    return false;
}

const ChatItem = ({ // This function accepts two parameters, content and role, content must be a string and role must either have the value of "user" or "assistant"
    content,
    role
} : {
    content: string;
    role: "user" | "assistant";
}) => {
    const messageBlocks = extractCodeFromString(content); // Returns array if code block, undefined if it is not
    const auth = useAuth();
    return role === "assistant" ? ( /* 
    The question mark serves as an "OR" statement, if the role is assistant, the logic before the 
    semi-colon is returned, if not it is the one after
    */
    <Box 
        sx={{
            display: "flex", 
            p: 2, 
            backgroundColor: "#560900", 
            my: 1, 
            gap: 2,
            borderRadius: 2
        }}
    >
        <Avatar sx={{ marginLeft: "0", backgroundColor: "white" }}>
            <img src="openai.png" alt="openai" width={"30px"} />
        </Avatar>
        <Box>
            {!messageBlocks && ( // If undefined just render the message normally
                <Typography sx={{ fontSize: "20px" }}>{content}</Typography>
            )}
            {messageBlocks && // If array
                messageBlocks.length && // If it has a length
                messageBlocks.map((block) =>
                    isCodeBlock(block) ? ( // Checks if each index of array is a code snippet or not, if so go through code styling
                        <SyntaxHighlighter style={coldarkDark} language="javascript">
                            {block}
                        </SyntaxHighlighter>
                    ) : (
                        <Typography sx={{ fontSize: "20px" }}>{block}</Typography>
                    )
            )}
        </Box>
    </Box>
    ) : (
    <Box 
        sx={{ 
            display: "flex", 
            p: 2, 
            backgroundColor: "#004d56", 
            borderRadius: 2, 
            gap: 2 
        }}
    >
        <Avatar sx={{ marginLeft: "0", backgroundColor: "black", color: "white" }}>
            {auth?.user?.name[0]}
            {auth?.user?.name.split(" ")[1][0]}
        </Avatar>
        <Box>
            {!messageBlocks && ( // If undefined just render the message normally
                <Typography sx={{ fontSize: "20px" }}>{content}</Typography>
            )}
            {messageBlocks && // If array
                messageBlocks.length && // If it has a length
                messageBlocks.map((block) =>
                    isCodeBlock(block) ? ( // Checks if each index of array is a code snippet or not, if so go through code styling
                        <SyntaxHighlighter style={coldarkDark} language="javascript">
                            {block}
                        </SyntaxHighlighter>
                    ) : (
                        <Typography sx={{ fontSize: "20px" }}>{block}</Typography>
                    )
            )}
        </Box>
    </Box>
    );
};

export default ChatItem;