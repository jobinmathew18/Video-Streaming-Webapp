import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import styled, { ThemeProvider } from "styled-components";
import Menu from "./components/Menu";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import Video from "./pages/Video";
import { darkTheme, lightTheme } from "./utils/Theme";

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
  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <Container>
        <BrowserRouter>
          <Menu darkMode={darkMode} setDarkMode={setDarkMode} />
          <Main>
            <Navbar />
            <Wrapper>
              <Routes>
                <Route path="/">
                  <Route index element={<Home type="random"/>} />                           
                  <Route path="trending" element={<Home type="trending" />} />
                  <Route path="subscribed" element={<Home type="subscribed" />} />
                  <Route path="signin" element={<SignIn/>} />
                  <Route path="video"> 
                    <Route path=":id" element={<Video/>} />
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
