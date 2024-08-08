import axios from "axios";
import React, { useState } from "react";
import { Base } from "../Api";
import { useNavigate } from "react-router-dom";


export default function Login(props) {
const Navigate = useNavigate();
    const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  
  
  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post(`${Base}/users/signin`, formData)
      .then(response => {
        console.log(response.data);
        if (response.data.message === "login") {
            Navigate("/home")
            localStorage.setItem("userToken" , response.data.token);
            props.getUser();

          }
      })
      .catch(error => {
        console.error('There was an error submitting the form!', error);
      });
  };


  return <div>
    <div className="container mt-5">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input 
            type="email" 
            className="form-control" 
            id="email" 
            name="email" 
            value={formData.email} 
            onChange={handleChange} 
            required 
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input 
            type="password" 
            className="form-control" 
            id="password" 
            name="password" 
            value={formData.password} 
            onChange={handleChange} 
            required 
          />
        </div>
        <button type="submit" className="btn btn-primary">Login</button>
      </form>
    </div>

  </div>;
}
