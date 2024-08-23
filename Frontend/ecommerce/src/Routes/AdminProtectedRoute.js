import Login from "./Login";
import {Route} from "react-router-dom";


function AdminProtectedRoute( props ) {
    let isLoggedIn = false;

    let isValidSeller = sessionStorage.getItem("role");

    if(isValidSeller === "ADMIN") isLoggedIn = true;
    else isLoggedIn = false;
    if (isLoggedIn) {
        return props.component
    }
    else return <Login/>
}

export default AdminProtectedRoute;