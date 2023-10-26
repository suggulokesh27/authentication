import React from "react";
import { Link } from "@mui/material";
import { useNavigate } from "react-router-dom";


const Home = () => {

    const navigate = useNavigate()
    let isAuth = JSON.parse(localStorage.getItem("session"));
    const now = new Date();

    if(isAuth){
        if(now > isAuth.expiresAt){
            localStorage.clear();
        };
    }

    const signOut = () => {
        isAuth = null;
        localStorage.clear();
        navigate("/signin")
    }

    return (
        <div style={{ 'margin': "30px", "padding": "10px" }}>
            {!isAuth ?
                <div
                    style={{
                        "color": "black",
                        "backgroundColor": "green",
                        "textAlign": "center",
                    }}>
                    <Link href="/signup" style={{ "color": "black", 'margin': "10px" }}>SignUp</Link>
                    <Link href="/signin" style={{ "color": "black", 'margin': "10px" }}>SignIn</Link>
                </div>
                :
                <div>
                <button
                    style={{
                        "color": "black", 'margin': "10px", "backgroundColor": "green",
                        "border": "solid 1px green",
                    }}
                    onClick={signOut}
                >
                    SignOut
                </button>
                </div>
            }
        </div>
    )
}


export default Home;