import { Link } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  width: 350px;
  margin-bottom: 25px;
  cursor: pointer;
`;
const Image = styled.img`
  width: 100%;
  height: 202px;
  background-color: #999;
  object-fit: contain;
  border-radius: 13px;
`;

const Details = styled.div`
  display: flex;
  margin-top: 16px;
  gap: 12px;
`;

const ChannelImage = styled.img`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-color: #999;
  object-fit: cover;
`;

const Texts = styled.div``;

const Title = styled.h1`
  font-size: 17px;
  font-weight: 500;
  color: ${({ theme }) => theme.text};
`;

const ChannelName = styled.h2`
  font-size: 14px;
  font-weight: 400;
  color: ${({ theme }) => theme.textSoft};
  margin-top: 8px;
`;

const Info = styled.div`
  font-size: 14px;
  font-weight: 400;
  color: ${({ theme }) => theme.textSoft};
  margin-top: 3px;
`;

const Card = () => {
  return (
    <Link to='/video/test' style={{textDecoration:"none"}}>
      <Container>
        <Image src="images/logo.png" />
        <Details>
          <ChannelImage src="images/logo.png" />
          <Texts>
            <Title>What is JWT and Why Should You Use JWT</Title>
            <ChannelName>Jobin Mathew</ChannelName>
            <Info>433K views . 1 day ago</Info> 
          </Texts>
        </Details>
      </Container>
    </Link>
  );
};

export default Card;
