import {Link} from "react-router-dom";
import {auth} from "../config/firebase";
import {useAuthState} from 'react-firebase-hooks/auth';  // npm install react-firebase-hooks
import {signOut} from "firebase/auth";
// This is the Navbar components
// It represents navbar of the page
export const Navbar = () => {
    //It gives the information about  user
    const [user] = useAuthState(auth);
    // This funtion uses the other funtion sigOut from firebase
    const signUserOut = async () => {
        await signOut(auth);
    };
    // This returns navbar with properly pages
    // If user has been logged in then it allowes to show the page "Create Post"
    // Calculator is allowed for everyone
    return (
        <div className="navbar">
            <div className="links">
                <Link to="/"> Calculator </Link>
                {!user ? (
                    <Link to="/login"> Login </Link>
                ) : (
                    <Link to="/createpost"> Create Post </Link>
                )}
            </div>
            <div className="user">
                {user && (
                <>
                    <p> {user?.displayName} </p>
                    <img src={user?.photoURL || ""} width="20" height="20"/>
                    <button onClick={signUserOut}> Log Out</button>
                </>
                )}
            </div>
        </div>
    );
};