import {
  AccountCircleOutlined,
  SearchOutlined,
  VideoCallOutlined,
} from "@mui/icons-material";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Upload from "./Upload";
import UserImage from "./UserImage";

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
  gap: 10px;
  font-weight: 500;
  color: ${({ theme }) => theme.text};
`;

const Avatar = styled.div`
  height: 32px;
  min-width: 32px;
  margin-left: 20px;
`;

const Image = styled.img`
  height: 100%;
  width: 100%;
  border-radius: 50%;
  object-fit: cover;
`;

const Navbar = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const navigate = useNavigate()

  const handleSearch =()=>{
    query.length>0 && navigate(`/search?q=${query}`)
  }

  return (
    <>
      <Container>
        <Wrapper>
          <Left>
            <Search>
              <Input placeholder="Search" onChange={(e)=> setQuery(e.target.value)}/>
              <Icon>
                <SearchOutlined style={{cursor: "pointer"}} onClick={handleSearch}/>
              </Icon>
            </Search>
          </Left>
          <Sign>
            {currentUser ? (
              <User>
                <VideoCallOutlined onClick={() => setOpen(true)} style={{cursor: "pointer"}}/>
                <Avatar>
                  {currentUser.img ? <Image src={currentUser.img} /> : <UserImage name={currentUser.name} color="a0a0e2"/>}
                </Avatar>
                {currentUser.name}
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
      {open && <Upload setOpen={setOpen}/>}
    </>
  );
};

export default Navbar;
