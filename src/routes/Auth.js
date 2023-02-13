import { async } from "@firebase/util";
import { authService } from "fBase";
import React, { useState } from "react";
import { 
    getAuth, 
    signInWithEmailAndPassword, 
    signInWithPopup,
    createUserWithEmailAndPassword,
    GoogleAuthProvider,
    GithubAuthProvider, 

} from "firebase/auth";

const Auth = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");  
    const [newAccount, setNewAccount] = useState(true);
    const [error, setError] = useState("");
    const onChange = (e) => {
        console.log(e.target.name)
        const { target : { name, value }} = e;
        console.log(value);
        if (name === "email") {
            setEmail(value);
        } else if (name ==="password") {
            setPassword(value);
        }
    }
    const onSubmit = async(e) => {
        e.preventDefault();
        try {
            let data;
            const auth = getAuth();
            if (newAccount) {
                // create account
                data = await createUserWithEmailAndPassword(
                    auth, email, password
                );
                // Cannot create property '_canInitEmulator' on string 'test@test.com'
                // 이 오류는 createUserWith... parameter를 제대로 넘겨주지 않아서 생긴 오류
                // auth, email, password 다 넘겨줘야 함!
            } else {
                // Log in
                data = await signInWithEmailAndPassword(
                    auth, email, password
                );
            }
            console.log(data);
        } catch (error) {
            console.log(error);
            setError(error.message);
        }
    }

    const toggleAccount = () => {
        setNewAccount(prev => !prev);
    }

    const onSocialClick = async(event) => {
        console.log(event.target.name)
        const auth = getAuth();
        const { target : { name } } = event;
        let provider;
        if (name === "google") {
            provider = new GoogleAuthProvider();
        } else if (name === "github") {
            provider = new GithubAuthProvider();
        }
        const data = await signInWithPopup(
            auth, provider
        )
        console.log(data);
    }
    return (
        <div>
            <form onSubmit={onSubmit}>
                <input 
                    name="email" 
                    type="email" 
                    placeholder="Email" 
                    required 
                    value={email}
                    onChange={onChange}
                    />
                <input 
                    name="password" 
                    type="password" 
                    placeholder="password" 
                    required 
                    value={password}
                    onChange={onChange}
                    />
                <input type="submit" value={newAccount ? "Create Account" : "Log In"} />
                {error}
            </form>
            <span onClick={toggleAccount}>
                {newAccount ? "Sign in" : "Create Account"}</span>
            <div>
                <button onClick={onSocialClick} name="google">Continue with Google</button>
                <button onClick={onSocialClick} name="github">Continue with Github</button>
            </div>
        </div>
    )
}
;
export default Auth;