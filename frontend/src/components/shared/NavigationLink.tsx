import { Link } from "react-router-dom";

type Props = { // Properties for the header link
    to: string, // The link to where you want to go
    bg: string, // Background color
    text: string, // The text
    textColor: string, // Text color
    onClick?: () => Promise<void>; // If you want to make it a button
};

const NavigationLink = (props: Props) => { // Takes "Props" as an argument, which is basically just the button itself
    return (
        <Link
            onClick={props.onClick}
            className="nav-link"
            to={props.to} // Where the link will take you
            style={{ background: props.bg, color: props.textColor, border: "2px solid black" }}
        >
            {props.text}
        </Link>
    );
};

export default NavigationLink;