import {
  LibraryAdd,
  ReplyOutlined,
  ThumbDownOffAltOutlined,
  ThumbUpOutlined,
} from "@mui/icons-material";
import styled from "styled-components";
import Card from "../components/Card";
import Comments from "../components/Comments";

const Container = styled.div`
  display: flex;
  gap: 24px;
  padding: 5px 20px 30px;
`;

const Content = styled.div`
  flex: 5;
`;

const VideoWrapper = styled.div``;

const Title = styled.h1`
  font-size: 18px;
  font-weight: 500;
  margin-block: 20px 7px;
  color: ${({ theme }) => theme.text};
`;

const Details = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Info = styled.span`
  color: ${({ theme }) => theme.textSoft};
`;

const Buttons = styled.div`
  display: flex;
  gap: 20px;
  color: ${({ theme }) => theme.text};
`;

const Button = styled.div`
  display: flex;
  align-items: center;
  gap: 3px;
  background-color: ${({ theme }) => theme.bgLighter};
  padding: 2px 4px;
  border-radius: 8px;
  cursor: pointer;
`;

const Hr = styled.hr`
  margin: 15px 0;
  border: 0.5px solid ${({ theme }) => theme.soft};
  margin-inline: 60px;
`;

const Channel = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 20px;
`;

const ChannelInfo = styled.div`
  display: flex;
  gap: 20px;
`;

const Image = styled.img`
  height: 50px;
  width: 50px;
  border-radius: 50%;
  object-fit: cover;
`;

const ChannelDetail = styled.div`
  display: flex;
  flex-direction: column;
  color: ${({ theme }) => theme.text};
`;

const ChannelName = styled.span`
  font-weight: 500;
`;

const ChannelCounter = styled.span`
  font-size: 13px;
  font-weight: 400;
  color: ${({ theme }) => theme.textSoft};
  margin-block: 3px 13px;
`;

const Desciption = styled.p`
  font-size: 14px;
  font-weight: 400;
  background-color: ${({ theme }) => theme.bgLighter};
  padding: 5px 10px;
  border-radius: 7px;
`;

const Subscribe = styled.div`
    background-color: #cc1a00;
    font-weight: 500;
    color: white;
    border: none;
    border-radius: 10px;
    height: max-content;
    padding: 8px 16px;
    cursor: pointer;
`;

const Recommendation = styled.div`
  flex: 2;
`;

const Video = () => {
  return (
    <Container>
      <Content>
        <VideoWrapper>
          <iframe
            width="100%"
            height="550"
            src="https://www.youtube.com/embed/k3Vfj-e1Ma4"
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          ></iframe>
        </VideoWrapper>
        <Title>What is JWT and Why Should You Use JWT</Title>
        <Details>
          <Info>433,768 views . Mar 18, 2023</Info>
          <Buttons>
            <Button>
              <ThumbUpOutlined />
              1k
            </Button>
            <Button>
              <ThumbDownOffAltOutlined />
              Dislike
            </Button>
            <Button>
              <ReplyOutlined />
              Share
            </Button>
            <Button>
              <LibraryAdd />
              Save
            </Button>
          </Buttons>
        </Details>
        <Hr />
        <Channel>
          <ChannelInfo>
            <Image src="/images/logo.png" />
            <ChannelDetail>
              <ChannelName>Jobin Mathew</ChannelName>
              <ChannelCounter>100K subscribers</ChannelCounter>
              <Desciption>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum
                sequi at excepturi voluptatum consectetur, dicta pariatur odit
                tenetur, neque soluta suscipit magni fugiat quo eius quibusdam
                error itaque? Reiciendis, numquam!
              </Desciption>
            </ChannelDetail>
          </ChannelInfo>
          <Subscribe>Subscribe</Subscribe>
        </Channel>
        <Hr/>
        <Comments/>
      </Content>
      <Recommendation>
        <Card type="sm"/>
        <Card type="sm"/>
        <Card type="sm"/>
        <Card type="sm"/>
        <Card type="sm"/>
        <Card type="sm"/>
        <Card type="sm"/>
        <Card type="sm"/>
        <Card type="sm"/>
        <Card type="sm"/>
        <Card type="sm"/>
        <Card type="sm"/>
        <Card type="sm"/>
      </Recommendation>
    </Container>
  );
};

export default Video;
