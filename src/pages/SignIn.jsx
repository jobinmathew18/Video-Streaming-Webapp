import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { loginFailure, loginStart, loginSuccess } from "../redux/userSlice";
import { auth, provider } from "../firebase";
import { signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: calc(100vh - 78px);
  color: ${({ theme }) => theme.text};
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  background-color: ${({ theme }) => theme.bgLighter};
  border: 1px solid ${({ theme }) => theme.soft};
  gap: 10px;
  padding: 20px 30px;
`;

const Title = styled.h1`
  font-size: 24px;
`;

const SubTitle = styled.h2`
  font-size: 20px;
  font-weight: 300;
  margin-bottom: 5px;
`;

const Input = styled.input`
  border: 1px solid ${({ theme }) => theme.soft};
  border-radius: 5px;
  padding: 10px;
  background-color: transparent;
  width: 100%;
  outline: none;
  color: ${({ theme }) => theme.text}; ;
`;

const Button = styled.button`
  border-radius: 3px;
  border: none;
  padding: 10px 20px;
  font-weight: 500;
  cursor: pointer;
  background-color: ${({ theme }) => theme.soft};
  color: ${({ theme }) => theme.textSoft}; ;
`;

const More = styled.div`
  display: flex;
  font-size: 12px;
  margin-top: 10px;
  color: ${({ theme }) => theme.textSoft};
`;

const Links = styled.div`
  display: flex;
`;

const Link = styled.div`
  margin-left: 30px;
`;

const SignIn = () => {
  const [inputs, setInputs] = useState({});
  const [credentials, setCredentials] = useState({}) 
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const handleSignChange = (e)=>{
    setCredentials((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  } 
  // console.log(credentials)

  const handleChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };
  // console.log(inputs)

  const handleSignup = async (e)=>{
    e.preventDefault();
    const {name,email,password} = credentials;
    try {
      await axios.post('/auth/signup', {name,email,password})
      setCredentials({})
      navigate('/signin')
    } catch (error) {
      console.log(error);
    }
  }

  const handleLogin = async (e) => {
    e.preventDefault();
    dispatch(loginStart());
    const { email, password } = inputs;
    try {
      const res = await axios.post("/auth/signin", { email, password });
      // localStorage.setItem("loggedUser", JSON.stringify(res.data))
      dispatch(loginSuccess(res.data));
      navigate('/')
    } catch (error) {
      dispatch(loginFailure());
      console.log(error);
    }
  };

  const signinWithGoogle = async () => {
    dispatch(loginStart())
    signInWithPopup(auth, provider)
      .then((result) => {
        // console.log(result);
        axios.post('/auth/google',{
          name: result.user.displayName,          //we will not send passowrd to req.body because we are using email of users that are logged in google and therefore google stores their password.
          email: result.user.email,
          img: result.user.photoURL
        }).then((res)=>{
          // localStorage.setItem("loggedUser", JSON.stringify(res.data))
          dispatch(loginSuccess(res.data))
          navigate('/')
        })
      })
      .catch((error) => dispatch(loginFailure()));
  };

  return (
    <Container>
      <Wrapper>
        <Title>Sign in</Title>
        <SubTitle>to continue to YouTube</SubTitle>
        <Input
          type="email"
          placeholder="email"
          name="email"
          onChange={handleChange}
        />
        <Input
          type="password"
          placeholder="password"
          name="password"
          onChange={handleChange}
        />
        <Button onClick={handleLogin}>Sign in</Button>
        <Title>or</Title>
        <Button onClick={signinWithGoogle}>Signin with Google</Button>
        <Title>or</Title>
        <Input
          type="text"
          placeholder="username"
          name="name"
          onChange={handleSignChange}
        />
        <Input
          type="email"
          placeholder="email"
          name="email"
          onChange={handleSignChange}
        />
        <Input
          type="password"
          placeholder="password"
          name="password"
          onChange={handleSignChange}
        />
        <Button onClick={handleSignup}>Sign up</Button>
      </Wrapper>
      <More>
        English(USA)
        <Links>
          <Link>Help</Link>
          <Link>Privacy</Link>
          <Link>Terms</Link>
        </Links>
      </More>
    </Container>
  );
};

export default SignIn;
