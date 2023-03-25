import {
  AccountCircleOutlined,
  ArticleOutlined,
  ExploreOutlined,
  FlagOutlined,
  HelpOutlineOutlined,
  HistoryOutlined,
  Home,
  LibraryMusicOutlined,
  LiveTvOutlined,
  MovieOutlined,
  SettingsBrightnessOutlined,
  SettingsOutlined,
  SportsBaseballOutlined,
  SportsEsportsOutlined,
  SubscriptionsOutlined,
  VideoLibraryOutlined,
} from "@mui/icons-material";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  flex: 1;
  background-color: ${({ theme }) => theme.bg};
  height: 100vh;
  color: ${({ theme }) => theme.text};
  font-size: 14px;
  font-weight: 400;
  position: sticky;
  top: 0;
  overflow-y: scroll;
  ::-webkit-scrollbar {
    width: 0;
  }
  ::-webkit-scrollbar-track {
    background-color: #f1f1f1;
  }

  ::-webkit-scrollbar-thumb {
    background-color: rgb(179, 179, 179);
  }

  &:hover {
    ::-webkit-scrollbar {
      width: 5px;
    }
  }
`;

const Wrapper = styled.div`
  padding: 0px 12px 10px 12px;
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 5px;
  width: fit-content;
  cursor: pointer;
`;

const Img = styled.img`
  height: 75px;
  width: 110px;
`;

const ImgLight = styled.img`
  height: 20px;
  width: 90px;
  margin: 27px 10px;
`;

const Item = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  cursor: pointer;
  padding: 7.5px 5px;

  &:hover {
    background-color: ${({ theme }) => theme.hover};
    border-radius: 10px;
  }
`;

const Hr = styled.hr`
  margin: 15px 0;
  border: 0.5px solid ${({ theme }) => theme.soft};
`;

const Login = styled.div`
  padding-right: 5px;
`;

const Button = styled.div`
  background-color: transparent;
  padding: 5px 10px;
  width: 110px;
  border-radius: 10px;
  border: 0.2px solid #298fb8;
  outline: none;
  font-size: 14px;
  color: #298fb8;
  margin-block: 13px 5px;
  display: flex;
  align-items: center;
  gap: 7px;
  cursor: pointer;

  &:hover {
    background-color: #bae3f4;
  }
`;

const Title = styled.h2`
  font-size: 14px;
  font-weight: 500;
  color: #aaaaaa;
  margin-bottom: 20px;
`;

const Menu = ({ darkMode, setDarkMode }) => {
  const changeMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <Container>
      <Wrapper>
        <Link to='/' style={{textDecoration:"none"}}>
          <Logo>
            {darkMode && <Img src="/images/logoDark.png" />}
            {!darkMode && <ImgLight src="/images/logo.png" />}
          </Logo >
        </Link>
        <Item>
          <Home /> Home
        </Item>
        <Item>
          <ExploreOutlined /> Explore
        </Item>
        <Item>
          <SubscriptionsOutlined /> Subscriptions
        </Item>
        <Hr />
        <Item>
          <VideoLibraryOutlined /> Library
        </Item>
        <Item>
          <HistoryOutlined /> History
        </Item>
        <Hr />
        <Login>
          Sign in to like videos, comment and subscribe.
          <Button>
            <AccountCircleOutlined /> SIGN IN
          </Button>
        </Login>
        <Hr />
        <Title>More form YouTube</Title>
        <Item>
          <LibraryMusicOutlined /> Music
        </Item>
        <Item>
          <SportsBaseballOutlined /> Sports
        </Item>
        <Item>
          <SportsEsportsOutlined /> Gaming
        </Item>
        <Item>
          <MovieOutlined /> Movies
        </Item>
        <Item>
          <ArticleOutlined /> News
        </Item>
        <Item>
          <LiveTvOutlined /> Live
        </Item>
        <Hr />
        <Item>
          <SettingsOutlined /> Settings
        </Item>
        <Item>
          <FlagOutlined /> Report
        </Item>
        <Item>
          <HelpOutlineOutlined /> Help
        </Item>
        <Item onClick={changeMode}>
          <SettingsBrightnessOutlined /> Change Theme
        </Item>
      </Wrapper>
    </Container>
  );
};

export default Menu;
