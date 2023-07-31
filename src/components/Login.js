import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { auth } from "../Config/firebase-config";
import { Link } from "react-router-dom";
const LogIn = () => {
  const [details, setDetails] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDetails((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const handleSubmit = (e) => {
    try {
      e.preventDefault();
      signInWithEmailAndPassword(auth, details.email, details.password);
      alert("Login successfully");
      window.location.href = "/";
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="login_page">
      <h1>LogIn Page</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            name="email"
            value={details.email}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            name="password"
            value={details.password}
            onChange={handleChange}
          />
        </Form.Group>
        <p>
          Go to: <Link to="/">Home Page</Link>
        </p>

        <Button variant="primary" type="submit">
          LogIn
        </Button>
      </Form>
    </div>
  );
};

export default LogIn;
