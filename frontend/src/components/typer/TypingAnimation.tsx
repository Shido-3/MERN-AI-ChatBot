import { TypeAnimation } from "react-type-animation";

const TypingAnimation = () => {
    return (
        <TypeAnimation
            sequence={[
                // Same substring at the start will only be typed out once, initially
                'Your Own ChatGPT',
                2000, // wait 2s before typing the next string
                'Powered By OpenAI',
                2000
            ]}
            speed={50}
            style={{ 
                fontSize: "60px",
                color: "black",
                fontWeight: 600,
                display: 'inline-block'
            }}
            repeat={Infinity}
        />
    );
};

export default TypingAnimation;