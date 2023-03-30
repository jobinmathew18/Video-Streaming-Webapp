import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { format } from "timeago.js";

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

const Card = ({type, video}) => {
  // console.log(video)

  const [channel, setChannel] = useState({})

  useEffect(()=>{
    const fetchChannel = async ()=>{
      const res = await axios.get(`/users/find/${video.userId}`)
      setChannel(res.data)
    }
    fetchChannel();
  }, [video.userId])
  
  return (
    <Link to={`/video/${video._id}`} style={{textDecoration:"none"}}>
      <Container type={type}>
        <Image type={type} src={video.imgUrl} />
        <Details type={type}>
          <ChannelImage type={type} src={channel.img} />
          <Texts>
            <Title type={type} >{video.title}</Title>  
            <ChannelName type={type}>{channel.name}</ChannelName>
            <Info type={type}>{video.views} views . {format(video.createdAt)}</Info>  
          </Texts>
        </Details>
      </Container>
    </Link>
  );
};

export default Card;
