import axios from "axios";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { format } from "timeago.js";
import UserImage from "./UserImage";

const Container = styled.div`
  display: flex;
  gap: 20px;
  margin: 30px 0;
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

const Details = styled.div`
  display: flex;
  flex-direction: column;
  color: ${({ theme }) => theme.text};
`;

const Name = styled.span`
    font-size: 13px;
    font-weight: 500;
`;

const Date = styled.span`
    font-size: 12px;
    font-weight: 400;
    color: ${({ theme }) => theme.textSoft};
    margin-left: 5px;
`;

const Text = styled.span` 
    font-size: 13px;
    font-weight: 400;
    margin-top: 5px;
`;

const Comment = ({comment}) => {
  const [channel, setChannel] = useState({})
  // console.log(channel)

  useEffect(()=>{
    const fetchUser = async ()=>{
      const res = await axios.get(`/users/find/${comment.userId}`)
      setChannel(res.data)
    }
    fetchUser()
  }, [comment.userId])

  return (
    <Container>
      <Avatar>
          {channel.img ? (
            <Image src={channel.img} />
          ) : (
            <UserImage name={channel.name} color="d4d4ce" />
          )}
        </Avatar>
      <Details>
        <Name>
          {channel.name} <Date>{ format(comment.createdAt) }</Date>{" "}
        </Name>
        <Text>{comment.comment}</Text>
      </Details>
    </Container>
  );
};

export default Comment;
