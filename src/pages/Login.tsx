import * as React from "react";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {loginUser} from "../api/auth.ts";
import AuthLayout from "../layouts/AuthLayout.tsx";
import CustomLink from "../components/CustomLink.tsx";
import CustomButton from "../components/CustomButton.tsx";
import CustomInput from "../components/CustomInput.tsx";
import PasswordInput from "../components/PasswordInput.tsx";

const Login = () => {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState<string | null>(null);
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const response = await loginUser(email, password);
    setLoading(false);

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

        setEmailError(errorsByField.email || null);
        setPasswordError(errorsByField.password || null);
      } else {
        setError(response.error.message);
      }
    } else {
      const token = response.data.token;
      localStorage.setItem('authToken', token);
      navigate('/todos');
    }
  };

  useEffect(() => {
    localStorage.clear();
  }, []);

  return (
    <AuthLayout>
      <AuthLayout.Header>
        <h1 className="text-3xl">Log In</h1>
        <p>Please enter your credentials to log in to your account</p>
      </AuthLayout.Header>
      <AuthLayout.Main>
        <form onSubmit={handleSubmit} className="flex flex-col gap-y-3 w-full" autoComplete="off">
          <CustomInput
            type="email"
            placeholder="john@doe.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}/>
          {emailError && <p className="text-red-600">{emailError}</p>}
          <PasswordInput
            placeholder="123456789"
            value={password}
            onChange={(e) => setPassword(e.target.value)}/>
          {passwordError && <p className="text-red-600">{passwordError}</p>}
          <CustomButton type="submit">
            {loading ? "Logging in..." : "Log In"}
          </CustomButton>
        </form>
        <CustomLink to="/">
          Go Back to Menu
        </CustomLink>
        {error && <p className="text-red-600">{error}</p>}
      </AuthLayout.Main>
    </AuthLayout>
  );
};

export default Login;