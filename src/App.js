import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import styled, { ThemeProvider } from "styled-components";
import Menu from "./components/Menu";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Search from "./pages/Search";
import SignIn from "./pages/SignIn";
import Video from "./pages/Video";
import { darkTheme, lightTheme } from "./utils/Theme";
import { useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { loginFailure, loginSuccess } from "./redux/userSlice";
import MyVideos from "./pages/MyVideos";
import EditVideo from "./pages/EditVideo";

const Container = styled.div`
  display: flex;
`
const Main = styled.div`
  flex: 6;
  background-color: ${({ theme }) => theme.bg}; 
` 

const Wrapper = styled.div`
`

function App() {
  const [darkMode, setDarkMode] = useState(true)
  const dispatch = useDispatch();

  useEffect(()=>{
    const fetchCurrentUser = async ()=>{
      console.log("fetching current user")
      try {
        const currentUser = await axios.get('/users/currentUser')
        dispatch(loginSuccess(currentUser.data))
      } catch (error) {
        dispatch(loginFailure())
      }
    }
    fetchCurrentUser()
  }, [dispatch])

  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <Container>
        <BrowserRouter>
          <Menu darkMode={darkMode} setDarkMode={setDarkMode} /> 
          <Main>
            <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
            <Wrapper>
              <Routes>
                <Route path="/">
                  <Route index element={<Home type="random"/>} />                           
                  <Route path="trending" element={<Home type="trending" />} />
                  <Route path="subscribed" element={<Home type="subscribed" />} />
                  <Route path="search" element={<Search/>} />
                  <Route path="signin" element={<SignIn/>} />
                  <Route path="video"> 
                    <Route path=":id" element={<Video/>} /> 
                    <Route path="myvideos" element={<MyVideos/>} />
                    <Route path="editvideo">
                      <Route path=":id" element={<EditVideo/>}/>
                    </Route>
                  </Route>
                </Route>
              </Routes>
            </Wrapper>
          </Main>
        </BrowserRouter>
      </Container>
    </ThemeProvider>

  );
}

export default App;
