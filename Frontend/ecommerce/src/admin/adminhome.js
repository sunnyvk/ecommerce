import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Adminnavbar from './adminnavbar';

function Adminhome() {


  return (
    <>
  <Adminnavbar></Adminnavbar>
<div className="container">
<img src="https://img.freepik.com/free-vector/ecommerce-web-page-concept-illustration_114360-8204.jpg?w=1060&t=st=1692873791~exp=1692874391~hmac=2fbbd77392319090f0847027ef0b1fca36df3b4dec71e2e4c044391c9dcbdc4e"  alt="ecommerce Website image page home"/>
</div>

    </>
  )
}

export default Adminhome