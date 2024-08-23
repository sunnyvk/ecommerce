import axios from "axios";
import { useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

function Registration() {

    let [icreds, setICreds] = useState({
        first_name : "",
        last_name : "",
        email : "", 
        password : "",
        mobile : ""
    });
    let [error, setError] = useState("");

    const history = useHistory();

    const onInputChange = (event) => {
        let copyOfICreds = { ...icreds }
        copyOfICreds[event.target.name] = event.target.value;
        setICreds(copyOfICreds);
    }

    const registerUser = () => {

        if(!icreds.email.includes("@") || icreds.email.length < 4){
            setError("Invalid Email type");
            return;
        }
        if(icreds.password < 3){
            setError("password length should be greater");
            return;
        }

        if(icreds.first_name == "" || icreds.last_name == ""){
            setError("Name cannot be empty")
            return;
        }

        if(icreds.mobile.length != 10) {
            setError("Enter 10 digit mobile no.")
            return;
        }

        axios.post("http://127.0.0.1:9999/users/", icreds)
             .then(res => history.push("/"))
    }


    return (
        <>

              <form action="" method="POST" role="form">
        
        <div class="form-group">
            <label for="">First Name</label>
            <input type="text" name="first_name" value={icreds.first_name} onChange={onInputChange} class="form-control" id="" placeholder="first name"/>
            <label for="">Last Name</label>
            <input type="text" name="last_name" value={icreds.last_name} onChange={onInputChange} class="form-control" id="" placeholder="last name"/>
            <label for="">Email</label>
            <input type="text" name="email" value={icreds.email} onChange={onInputChange} class="form-control" id="" placeholder="email"/>
            <label for="">Password</label>
            <input type="password" name="password" value={icreds.password} onChange={onInputChange} class="form-control" id="" placeholder="password"/>
            <label for="">Mobile</label>
            <input type="number" name="mobile" value={icreds.mobile} onChange={onInputChange} class="form-control" id="" placeholder="mobile"  onKeyPress={(event) => {
                    if (!/[0-9]/.test(event.key)) {
                    event.preventDefault();
                    }
                }}/>
        </div>
    
        
    
        <button type="button" onClick={registerUser} class="btn btn-primary">Register</button>
    </form>

    <div><h1>{error}</h1></div>
        </>
        
    )
}

export default Registration;