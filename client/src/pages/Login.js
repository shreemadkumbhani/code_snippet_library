import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import GoogleButton from "../components/GoogleButton";

function Login() {
  const navigate = useNavigate(); // Initialize useHistory hook

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // Update form data on input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        // Redirect to desired page upon successful login
        navigate("/");
      } else {
        // Handle login failure
        console.error("Login failed!");
      }
    } catch (error) {
      console.error("Error occurred during login:", error);
    }
  };

  return (
    <section className="vh-100">
      <Container className="py-0 h-75">
        <Row className="d-flex justify-content-center align-items-center h-100">
          <Col xs={12} md={8} lg={6} xl={5}>
            <Card bg="dark" text="white" style={{ borderRadius: '1rem' }}>
              <Card.Body className="p-5 text-center">
                <div className="mb-md-0 mt-md-0 pb-2">
                  <h2 className="fw-bold mb-2 text-uppercase">Login</h2>
                  <p className="text-white-50 mb-5">
                    Please Enter your Email and Password!
                  </p>
                  <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-4" controlId="formBasicEmail">
                      <Form.Control
                        type="email"
                        placeholder="Email"
                        className="formInput"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                      />
                    </Form.Group>
                    <Form.Group className="mb-4" controlId="formBasicPassword">
                      <Form.Control
                        type="password"
                        placeholder="Password"
                        className="formInput"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                      />
                    </Form.Group>

                    <Button
                      variant="outline-light"
                      className="btn-lg px-5 loginBtn"
                      type="submit"
                    >
                      Login
                    </Button>
                  </Form>
                  <br />
                  <div class="or-container">
                    <hr />
                    <span class="or">OR</span>
                    <hr />
                  </div>
                  <br />
                  <GoogleButton />
                </div>
                <div>
                  <p className="mb-0 mt-2">
                    Don't have an account?{" "}
                    <a href="/signup" className="text-white-50 fw-bold">
                      Sign Up
                    </a>
                  </p>
                  <p className="small mb-0 pb-lg-2">
                    <a className="text-white-50" href="#!">
                      Forgot password?
                    </a>
                  </p>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </section>
  );
}
export default Login;
