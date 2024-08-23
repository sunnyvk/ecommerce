import Login from "./Login";
import {Route} from "react-router-dom";
function ProtectedRoute( props ) {
    let isLoggedIn = false;

    let isValidUser = sessionStorage.getItem("isValidUser");

    if(isValidUser === "true") isLoggedIn = true;
    else isLoggedIn = false;
    if (isLoggedIn) {
        return props.component;
    }
    else return <Login/>
}

export default ProtectedRoute;