import AuthLayout from "../layouts/AuthLayout.tsx";
import {useEffect, useState} from "react";
import * as React from "react";
import {registerUser} from "../api/auth.ts";
import CustomLink from "../components/CustomLink.tsx";
import CustomInput from "../components/CustomInput.tsx";
import CustomButton from "../components/CustomButton.tsx";
import {useNavigate} from "react-router-dom";

const Register = () => {
  const [name, setName] = useState("");
  const [nameError, setNameError] = useState<string | null>(null);
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState<string | null>(null);
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await registerUser(name, email, password);

    // Reset errors
    setNameError(null);
    setEmailError(null);
    setPasswordError(null);
    setError(null);

    if (!response.success) {
      if (Array.isArray(response.error.errors)) {
        const errorsByField = response.error.errors.reduce((acc: Record<string, string>, err: any) => {
          const field = err.path && err.path[0];
          if (field) {
            acc[field] = err.message;
          }
          return acc;
        }, {});

        setNameError(errorsByField.name || null);
        setEmailError(errorsByField.email || null);
        setPasswordError(errorsByField.password || null);
      } else {
        setError(response.error.message);
      }
    } else {
      const token = response.data.token;
      localStorage.setItem('authToken', token);
      navigate("/todos");
    }
  };

  useEffect(() => {
    localStorage.clear();
  }, []);

  return (
    <AuthLayout>
      <AuthLayout.Header>
        <h1 className="text-3xl">Register new account</h1>
      </AuthLayout.Header>
      <AuthLayout.Main>
        <form onSubmit={handleSubmit} className="flex flex-col gap-y-3 w-full">
          <CustomInput
            type="text"
            value={name}
            placeholder="John Doe"
            onChange={(e) => setName(e.target.value)}
          />
          {nameError && <p className="text-red-700">{nameError}</p>}
          <CustomInput
            type="email"
            value={email}
            placeholder="john@doe.com"
            onChange={(e) => setEmail(e.target.value)}
          />
          {emailError && <p className="text-red-700">{emailError}</p>}
          <CustomInput
            type="password"
            value={password}
            placeholder="123456789"
            onChange={(e) => setPassword(e.target.value)}
          />
          {passwordError && <p className="text-red-700">{passwordError}</p>}
          <CustomButton type="submit">
            Submit
          </CustomButton>
          {error && <p className="text-red-700">{error}</p>}
        </form>
        <CustomLink to="/">
          Go Back to Menu
        </CustomLink>
      </AuthLayout.Main>
    </AuthLayout>
  );
};

export default Register;