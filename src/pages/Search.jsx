import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
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
  justify-content: flex-start;
  flex-wrap: wrap;
  padding: 8px 20px;
  gap: 40px;
`;

const Search = () => {
  const [videos, setVideos] = useState([]);
  const location = useLocation();
  const query = location.search;
//   console.log(query);

  useEffect(() => {
    const fetchVideos = async () => {
      const res = await axios.get(`/videos/search${query}`);
      setVideos(res.data);
    };
    fetchVideos();
  }, [query]);

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

export default Search;
