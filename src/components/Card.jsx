import { Link } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  width: ${(props)=> props.type === 'sm' ? "350px" : "350px"};
  margin-bottom: ${(props)=> props.type === 'sm' ? "10px" : "20px"};
  cursor: pointer;
  background-color: transparent;
  display: ${(props)=> props.type === 'sm' && "flex"};
  gap: 10px;
  align-items: ${(props)=> props.type === 'sm' && "center"};
  justify-content: ${(props)=> props.type === 'sm' && "center"};
`;
const Image = styled.img`
  width: ${(props)=> props.type === 'sm' ? "45%" : "100%"};
  height: ${(props)=> props.type === 'sm' ? "86px" : "202px"};
  background-color: #999;
  object-fit: contain;
  border-radius: 13px;
`;

const Details = styled.div`
  display: flex;
  margin-top: ${(props)=> props.type === 'sm' ? "0px" : "13px"};
  gap: 12px;
`;

const ChannelImage = styled.img`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-color: #999;
  object-fit: cover;
  display: ${(props)=> props.type === 'sm' && "none"};
`;

const Texts = styled.div``;

const Title = styled.h1`
  font-size: ${(props)=> props.type === 'sm' ? "14px" : "17px"};
  font-weight: 500;
  color: ${({ theme }) => theme.text};
  width: ${(props)=> props.type === 'sm' && "96%"};
`;

const ChannelName = styled.h2`
  font-size: ${(props)=> props.type === 'sm' ? "13px" : "14px"};
  font-weight: 400;
  color: ${({ theme }) => theme.textSoft};
  margin-top: ${(props)=> props.type === 'sm' ? "5px" : "8px"};
`;

const Info = styled.div`
  font-size: ${(props)=> props.type === 'sm' ? "12px" : "14px"};
  font-weight: 400;
  color: ${({ theme }) => theme.textSoft};
  margin-top: 3px;
`;

const Card = ({type}) => {
  return (
    <Link to='/video/test' style={{textDecoration:"none"}}>
      <Container type={type}>
        <Image type={type} src="/images/logo.png" />
        <Details type={type}>
          <ChannelImage type={type} src="/images/logo.png" />
          <Texts>
            <Title type={type} >What is JWT and Why Should You Use JWT</Title>
            <ChannelName type={type}>Jobin Mathew</ChannelName>
            <Info type={type}>433K views . 1 day ago</Info> 
          </Texts>
        </Details>
      </Container>
    </Link>
  );
};

export default Card;
