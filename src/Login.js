import { Button } from '@material-ui/core'
import React from 'react'
import { auth, provider } from './firebase';
import "./Login.css"
import { useStateValue } from './StateProvider';
function Login() {
    const [{}, dispatch] = useStateValue();
    const signIn = () => {
        auth.signInWithPopup(provider)
        .then(result => {
            dispatch ({
                type: "SET_USER",
                user: result.user,
            })
        })
        .catch((error) => alert(error.message));
    };
    return (
        <div className="login">
            <div className="login__container">
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIkKLKmQ1CzsKbYJvntKboM_1s7u-vermZKw&usqp=CAU" alt="" />
                <div className="login__text">
                    <h1>Sign in to WhatsApp</h1>
                </div>
                <Button type="submit" onClick={signIn}>
                    Sign In With Google
                </Button>
            </div>
            
        </div>
    )
}

export default Login
