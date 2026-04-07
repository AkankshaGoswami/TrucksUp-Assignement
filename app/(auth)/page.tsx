"use client";

import { Fragment } from "react";

import { useState } from "react";
import { Row, Col, Card, Button, Form, FormLabel, FormControl } from "react-bootstrap";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

const SignIn = () => {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setError("");

    if (!username || !password) {
      setError("Please fill all fields");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (data.success) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("username", username);

        router.push("/dashboard");
      } else {
        setError(data.message || "Login failed");
      }
    } catch (err) {
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Fragment>
      <Row className="mb-8">
        <Col xl={{ span: 4, offset: 4 }} md={12}>
          <div className="text-center">
            <Link
              href="/"
              className="fs-2 fw-bold d-flex align-items-center gap-2 justify-content-center mb-6"
            >
              <span>TrucksUp</span>
            </Link>
            <h1 className="mb-1">Welcome Back</h1>
          </div>
        </Col>
      </Row>

      <Row className="justify-content-center">
        <Col xl={5} lg={6} md={8}>
          <Card className="card-lg mb-6">
            <Card.Body className="p-6">
              <Form className="mb-6">
                {/* Username */}
                <div className="mb-3">
                  <FormLabel>Username</FormLabel>
                  <FormControl
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>

                {/* Password */}
                <div className="mb-3">
                  <FormLabel>Password</FormLabel>
                  <FormControl
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>

                {error && (
                  <p style={{ color: "red", fontSize: "14px" }}>{error}</p>
                )}

                <div className="d-grid">
                  <Button
                    variant="primary"
                    type="button"
                    onClick={handleLogin}
                    disabled={loading}
                  >
                    {loading ? "Signing In..." : "Sign In"}
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Fragment>
  );
};

export default SignIn;
