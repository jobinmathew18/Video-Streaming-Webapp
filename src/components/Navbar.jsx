import { AccountCircleOutlined, SearchOutlined, VideoCallOutlined } from "@mui/icons-material";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";

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
  gap: 20px;
  font-weight: 500;
  color: ${({ theme }) => theme.text};
`

const Avatar = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: #999;
`
const Navbar = () => {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <Container>
      <Wrapper>
        <Left>
          <Search>
            <Input placeholder="Search" />
            <Icon>
              <SearchOutlined />
            </Icon>
          </Search>
        </Left>
        <Sign>
          {currentUser ? (
            <User>
              <VideoCallOutlined/>
              <Avatar src={currentUser.img}/>
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
  );
};

export default Navbar;
