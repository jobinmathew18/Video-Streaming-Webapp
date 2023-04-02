import { BorderColor } from "@mui/icons-material";
import { current } from "@reduxjs/toolkit";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { format } from "timeago.js";

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  margin: 20px 30px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 35px;
`;

const Title = styled.h1`
  color: ${({ theme }) => theme.text};
  font-weight: 600;
  letter-spacing: 6px;
  font-size: 2rem;
`;

const Table = styled.table`
  width: 90%;
  color: ${({ theme }) => theme.text};
  border: 0.5px solid ${({ theme }) => theme.textSoft};
`;

const Tr = styled.tr`
  font-weight: 500;
  width: 300px;
  text-align: center;
`;

const Th = styled.th`
  font-size: 19px;
  padding: 20px 5px;
  border: 0.5px solid ${({ theme }) => theme.textSoft};
`;

const Td = styled.td`
  color: ${({ theme }) => theme.alt};
  padding: 15px 11px;
  font-weight: 400;
  border: 0.5px solid ${({ theme }) => theme.textSoft};
`;

const Item = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 20px;
  padding-inline: 4px;
`;

const Image = styled.img`
  width: 120px;
  height: 70px;
  object-fit: cover;
  border-radius: 10px;
`;

const Name = styled.h4`
  text-align: left;
`;

const Id = styled.span`
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

const MyVideos = () => {
  const { currentUser } = useSelector((state) => state.user);
  const userId = currentUser?._id;
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchVideos = async () => {
      const res = await axios.get(`/videos/find/user/${userId}`);
      setVideos(res.data);
    };
    fetchVideos();
  }, [userId]);

  //   console.log(videos);

  return (
    <Container>
      <Wrapper>
        <Title>My Videos</Title>
        <Table>
          <Tr>
            <Th width="25%">Id</Th>
            <Th width="45%">Video</Th>
            <Th width="15%">Uploaded Date</Th>
            <Th width="15%">Edit</Th>
          </Tr>
          {videos.map((video) => (
            <Tr>
              <Td>
                <Link to={`/video/${video._id}`} style={{textDecoration: "none", color: "inherit"}}>
                  <Id>{video._id}</Id>
                </Link>
              </Td>
              <Td>
                <Item>
                  <Image src={video.imgUrl}></Image>
                  <Name>{video.title}</Name>
                </Item>
              </Td>
              <Td>{format(video.createdAt)}</Td>
              <Td>
                <Link to={`/video/editvideo/${video._id}`} style={{textDecoration: "none", color: "inherit"}}>
                  <BorderColor />
                </Link>
              </Td>
            </Tr>
          ))}
        </Table>
      </Wrapper>
    </Container>
  );
};

export default MyVideos;
