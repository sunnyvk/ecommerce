import Login from "./Login";
import {Route} from "react-router-dom";
function SellerProtectedRoute( props ) {
    let isLoggedIn = false;

    let isValidSeller = sessionStorage.getItem("role");

    if(isValidSeller === "SELLER" && sessionStorage.status === "APPROVED") isLoggedIn = true;
    else isLoggedIn = false;
    if (isLoggedIn) {
        return props.component
    }
    else return <Login/>
}

export default SellerProtectedRoute;