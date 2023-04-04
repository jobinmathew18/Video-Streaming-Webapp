import {
  AccountCircle,
  AccountCircleOutlined,
  Close,
  Language,
  Logout,
  SearchOutlined,
  SettingsBrightnessOutlined,
  VideoCallOutlined,
  VideoLibrary,
} from "@mui/icons-material";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Upload from "./Upload";
import UserImage from "./UserImage";
import axios from "axios";
import { logout } from "../redux/userSlice";

const Container = styled.div`
  position: sticky;
  top: 0;
  background-color: ${({ theme }) => theme.bg};
  padding: 20px;
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 30px;
  text-align: center;
`;

const Left = styled.div`
  flex: 9;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Search = styled.div`
  align-items: center;
  justify-content: center;
  gap: 10px;
  width: 37rem;
  display: flex;
  border: 0.5px solid gray;
  border-radius: 15px;
  background-color: ${({ theme }) => theme.bgLighter};
  padding-right: 15px;
`;

const Input = styled.input`
  width: inherit;
  padding: 10px;
  border-top-left-radius: 15px;
  border-bottom-left-radius: 15px;
  background-color: ${({ theme }) => theme.bg};
  color: ${({ theme }) => theme.text};
  font-weight: 500;
  border: none;
  outline: none;
`;

const Sign = styled.div`
  flex: 2;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding-inline: 10px;
`;

const Button = styled.button`
  background-color: transparent;
  padding: 5px 10px;
  width: 110px;
  border-radius: 10px;
  border: 0.2px solid #298fb8;
  outline: none;
  font-size: 14px;
  color: #298fb8;
  display: flex;
  align-items: center;
  gap: 7px;
  cursor: pointer;

  &:hover {
    background-color: #bae3f4;
  }
`;

const Icon = styled.span`
  color: ${({ theme }) => theme.text};
`;

const User = styled.div`
  display: flex;
  align-items: center;
  gap: 40px;
  font-weight: 500;
  color: ${({ theme }) => theme.text};
`;

const Avatar = styled.div`
  height: 32px;
  min-width: 32px;
  cursor: pointer;
`;

const Image = styled.img`
  height: 100%;
  width: 100%;
  border-radius: 50%;
  object-fit: cover;
`;

const Settings = styled.div`
  /* height: 600px; */
  width: 280px;
  background-color: ${({ theme }) => theme.bgLighter};
  position: absolute;
  border-radius: 10px;
  right: 40px;
`;

const InnerWrapper = styled.div`
  margin: 15px 10px;
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  color: ${({ theme }) => theme.text};
`;

const UserInfo = styled.div`
  display: flex;
  margin: 20px 10px 10px;
  justify-content: start;
  align-items: center;
  gap: 10px;
`;

const RightInfo = styled.div``;

const Info = styled.h4`
  margin-bottom: 4px;
  font-weight: 400;
  font-size: 14px;
`;

const Item = styled.div`
  padding: 6px 10px;
  margin-block: 4px;
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.hover};
    border-radius: 10px;
  }
`;

const Hr = styled.hr`
  margin-block: 5px;
  border: 0.5px solid ${({ theme }) => theme.soft};
`;

const CloseIcon = styled.div`
  position: absolute;
  top: 5px;
  right: 8px;
  color: ${({ theme }) => theme.text};
  cursor: pointer;
`;

const Navbar = ({ darkMode, setDarkMode }) => {
  const { currentUser } = useSelector((state) => state.user);
  const [open, setOpen] = useState(false);
  const [openSettings, setOpenSettings] = useState(false);
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSearch = () => {
    query.length > 0 && navigate(`/search?q=${query}`);
  };

  const handleSignout = async () => {
    try {
      await axios.post("/auth/signout");
      dispatch(logout());
      navigate("/signin");
      setOpenSettings(false);
    } catch (error) {
      console.log(error);
    }
  };

  const changeMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <>
      <Container>
        <Wrapper>
          <Left>
            <Search>
              <Input
                placeholder="Search"
                onChange={(e) => setQuery(e.target.value)}
              />
              <Icon>
                <SearchOutlined
                  style={{ cursor: "pointer" }}
                  onClick={handleSearch}
                />
              </Icon>
            </Search>
          </Left>
          <Sign>
            {currentUser ? (
              <User>
                <VideoCallOutlined
                  onClick={() => setOpen(true)}
                  style={{ cursor: "pointer" }}
                />
                <Avatar onClick={() => setOpenSettings(true)}>
                  {currentUser.img ? (
                    <Image src={currentUser.img} />
                  ) : (
                    <UserImage name={currentUser.name} color="a0a0e2" />
                  )}
                </Avatar>
              </User>
            ) : (
              <Link to="/signin" style={{ textDecoration: "none" }}>
                <Button>
                  <AccountCircleOutlined /> SIGN IN
                </Button>
              </Link>
            )}
          </Sign>
        </Wrapper>
      </Container>
      {open && <Upload setOpen={setOpen} />}

      {openSettings && (
        <Settings>
          <InnerWrapper>
            {currentUser && (
              <>
                <UserInfo>
                  <Avatar>
                    {currentUser.img ? (
                      <Image src={currentUser.img} />
                    ) : (
                      <UserImage name={currentUser.name} color="a0a0e2" />
                    )}
                  </Avatar>
                  <RightInfo>
                    <Info>{currentUser.name}</Info>
                    <Info>{currentUser.email}</Info>
                  </RightInfo>
                </UserInfo>
                <Hr />
              </>
            )}
            <Item>
              <AccountCircle /> Profile
            </Item>
            <Link to='/video/myvideos' style={{textDecoration: "none", color: "inherit"}} onClick={()=>setOpenSettings(false)}>
              <Item>
                <VideoLibrary /> My Videos
              </Item>
            </Link>
            <Item onClick={changeMode}>
              <SettingsBrightnessOutlined /> Change Theme
            </Item>
            <Item>
              <Language /> Location: India
            </Item>
            <Item onClick={handleSignout}>
              <Logout /> Sign out
            </Item>
          </InnerWrapper>
          <CloseIcon onClick={() => setOpenSettings(false)}>
            <Close />
          </CloseIcon>
        </Settings>
      )}
    </>
  );
};

export default Navbar;
