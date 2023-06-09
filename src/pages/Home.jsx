import axios from "axios";
import { useEffect, useState } from "react";
import styled from "styled-components";
import Card from "../components/Card";

const Center = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Container = styled.div`
  width: 90%;
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: start;
  flex-wrap: wrap;
  padding: 8px 20px;
  gap: 40px;
`;

const Home = ({ type }) => { 
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const res = await axios.get(`/videos/${type}`);
        setVideos(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchVideos();
  }, [type]); //will only run once when the page refreshes

  return (
    <Center>
      <Container>
        <Wrapper>
          {videos.map((video) => (
            <Card key={video._id} video={video} /> 
          ))}
        </Wrapper>
      </Container>
    </Center>
  );
};

export default Home;
