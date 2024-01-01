import { ReactNode, createContext, useContext, useEffect, useState } from "react";
import { checkAuthStatus, loginUser, logoutUser, signupUser } from "../helpers/api-communicator";
import { RiLockPasswordFill } from "react-icons/ri";

type User = {
    name: string;
    email: string;
};

type UserAuth = {
    isLoggedIn: boolean;
    user: User | null;
    login: (email: string, password: string) => Promise<void>; // Don't want the promise returning anything
    signup: (name: string, email: string, password: string) => Promise<void>;
    logout: () => Promise<void>; // Removes any cookies
};

const AuthContext = createContext<UserAuth | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null); // Default is a NULL object
    const [isLoggedIn, setIsLoggedIn] = useState(false); // Default is "False"

    useEffect(() => {
        // fetch if the user's cookies are valid then skip login
        async function checkStatus() { // Checks if the User is already logged in or not
            const data = await checkAuthStatus();
            if (data) { // If the data is good set user "logged-in" to true
                setUser({ email: data.email, name: data.name });
                setIsLoggedIn(true);
            }
        }
        checkStatus();
    }, []);
    const login = async (email: string, password: string) => {
        const data = await loginUser(email, password);
        if (data) { // If the data is good set user "logged-in" to true
            setUser({ email: data.email, name: data.name });
            setIsLoggedIn(true);
        }
    };
    const signup = async (name: string, email: string, password: string) => {
        const data = await signupUser(name, email, password);
        if (data) {
            setUser({ email: data.email, name: data.name });
            setIsLoggedIn(true);    
        }
    };
    const logout = async () => {
        await logoutUser();
        setIsLoggedIn(false);
        setUser(null);
        window.location.reload(); // It takes some time for the HTTP only cookies to be removed, so we need to reload the page
    };

    const value = {
        user,
        isLoggedIn,
        login,
        logout,
        signup
    };
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
    // Returns all the states to the children components
};

export const useAuth = () => useContext(AuthContext);