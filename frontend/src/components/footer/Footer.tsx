import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <footer>
            <div
                style={{
                    width: "100%",
                    padding: 20,
                    minHeight: "20vh",
                    maxHeight: "30vh",
                }}
            >
                <p style={{ fontSize: "30px", textAlign: "center", padding: "20px" }}>
                    Built by
                    <span>
                        <Link 
                            style={{ color: "black" }} 
                            className="nav-link" 
                            to={"https://github.com/Shido-3"}
                        >
                            Shido-3
                        </Link>
                    </span>
                </p>
            </div>
        </footer>
    );
};

export default Footer;