import {auth, provider} from '../config/firebase';
import {signInWithPopup} from 'firebase/auth'
import { useNavigate } from 'react-router-dom';
// This component handles the log in pop up
// On the project has been used google authentication
export const Login = () => {
    const navigate = useNavigate();

    const signInWithGoogle = async () => {
        const result = await signInWithPopup(auth, provider);
        navigate("/"); // redirection to home page (calculator)
    };

    return (
        <div> 
            <p> Sign In with Google To Continue</p>
            <button onClick={signInWithGoogle}> Sign In With Google</button>
        </div>
    );
};