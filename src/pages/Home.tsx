import CustomLink from "../components/CustomLink.tsx";
import AuthLayout from "../layouts/AuthLayout.tsx";
import {useEffect} from "react";

const Home = () => {
  useEffect(() => {
    localStorage.clear();
  }, []);

  return (
    <AuthLayout>
      <AuthLayout.Header>
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl">To Do List</h1>
        <p className="text-sm sm:text-base lg:text-lg">This is a simple project for managing a to-do list.</p>
      </AuthLayout.Header>
      <AuthLayout.Main>
        <CustomLink to="/register">
          Register
        </CustomLink>
        <CustomLink to="/login">
          Log In
        </CustomLink>
      </AuthLayout.Main>
      <AuthLayout.Footer>
        {/* TODO */}
      </AuthLayout.Footer>
    </AuthLayout>
  );
};

export default Home;