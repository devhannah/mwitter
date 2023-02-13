import { authService } from "fBase";
import { getAuth } from "firebase/auth";
import React from "react";
import { useNavigate } from "react-router-dom";

const Profile = () => {
    const navigate = useNavigate();
    const auth = getAuth();
    const onLogOutClick = () => {
        auth.signOut();
        navigate("/", {replace: true});
    }
    return (
        <>
            <button onClick={onLogOutClick}>Log out</button>
        </>)
}

export default Profile;