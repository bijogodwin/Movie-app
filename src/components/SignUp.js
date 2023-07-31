import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../Config/firebase-config";
import { Link } from "react-router-dom";

function SignUp() {
  const [user, setUser] = useState({
    userName: "",
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      await createUserWithEmailAndPassword(auth, user.email, user.password)
        .then((use) => {
          addDoc(collection(db, "userDetails"), {
            ...user,
          });
          alert("UserDetails added successfully");
          window.location.href = "/logIn";
        })
        .catch((err) => {
          alert(err);
        });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="signup_page">
      <h1>SignUp Page</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicName">
          <Form.Label>User Name</Form.Label>
          <Form.Control
            style={{ textAlign: "start" }}
            placeholder="Enter Username"
            aria-label="Username"
            aria-describedby="basic-addon1"
            name="userName"
            value={user.userName}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter user email"
            name="email"
            value={user.email}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            name="password"
            value={user.password}
            onChange={handleChange}
          />
        </Form.Group>
        <p>
          Already have an account? <Link to="/login">LogIn Page</Link>
        </p>
        <Form.Group className="mb-3" controlId="formBasicButton">
          <Button variant="primary" type="submit">
            SignUp
          </Button>
        </Form.Group>
      </Form>
    </div>
  );
}

export default SignUp;
