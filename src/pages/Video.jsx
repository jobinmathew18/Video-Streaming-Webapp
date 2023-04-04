import {
  LibraryAdd,
  ReplyOutlined,
  ThumbDown,
  ThumbDownOffAltOutlined,
  ThumbUp,
  ThumbUpOutlined,
} from "@mui/icons-material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import { format } from "timeago.js";
import Comments from "../components/Comments";
import Recommendation from "../components/Recommendation";
import UserImage from "../components/UserImage";
import { subscription } from "../redux/userSlice";
import { dislike, fetchSuccess, like } from "../redux/videoSlice";

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

const Avatar = styled.div`
  height: 40px;
  min-width: 40px;
  `;

const Image = styled.img`
  height: 100%;
  width: 100%;
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

const VideoFrame = styled.video`
  max-height: 600px;
  width: 100%;
  object-fit: cover;
  background-color: transparent;
`;

const Video = () => {
  const { currentUser } = useSelector((state) => state.user);
  const { currentVideo } = useSelector((state) => state.video);
  // console.log(currentUser)
  const dispatch = useDispatch();
  const path = useLocation().pathname.split("/")[2];
  const [channel, setChannel] = useState({});
  const[subscribers, setSubscribers] = useState(0)

  useEffect(() => {
    const fetchVideo = async () => {
      try {
        const videoRes = await axios.get(`/videos/find/${path}`); //finding info about video
        const userRes = await axios.get(`/users/find/${videoRes.data.userId}`); //finding info about user who uploaded that video
        setChannel(userRes.data);
        setSubscribers(userRes.data.subscribers.length) 
        dispatch(fetchSuccess(videoRes.data)); 
        await axios.put(`/videos/view/${path}`)
      } catch (error) {
        console.log(error);
      }
    };
    fetchVideo();
  }, [path, dispatch]);

  const handleLike = async () => {
    currentUser &&
      (await axios.put(`/users/like/${currentVideo._id}`)) &&
      dispatch(like(currentUser?._id));
  };

  const handleDislike = async () => {
    currentUser &&
      (await axios.put(`/users/dislike/${currentVideo._id}`)) &&
      dispatch(dislike(currentUser?._id));
  };

  const handleSubscribe = async () => {
    currentUser && currentUser.subscribedUsers.includes(channel._id)
      ? await axios.put(`/users/unsub/${channel._id}`) && setSubscribers(subscribers - 1)
      : await axios.put(`/users/sub/${channel._id}`) && setSubscribers(subscribers + 1);
    dispatch(subscription(channel._id));
  }; 
  // console.log(currentUser.subscribedUsers)

  return (
    <Container>
      <Content>
        <VideoWrapper>
          <VideoFrame src={currentVideo?.videoUrl} autoPlay controls />
        </VideoWrapper>
        <Title>{currentVideo?.title}</Title>
        <Details>
          <Info>
            {currentVideo?.views} views . {format(currentVideo?.createdAt)}
          </Info>
          <Buttons>
            <Button onClick={handleLike}>
              {currentVideo?.likes.includes(currentUser?._id) ? (
                <ThumbUp />
              ) : (
                <ThumbUpOutlined />
              )}
              {currentVideo?.likes.length}
            </Button>
            <Button onClick={handleDislike}>
              {currentVideo?.dislikes.includes(currentUser?._id) ? (
                <ThumbDown />
              ) : (
                <ThumbDownOffAltOutlined />
              )}
              Dislikes
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
            <Avatar>
              {channel.img ? <Image src={channel.img} /> : <UserImage name={channel.name} color="e19696"/>}
            </Avatar>
            <ChannelDetail>
              <ChannelName>{channel.name}</ChannelName>
              <ChannelCounter>
                {subscribers} subscribers
              </ChannelCounter>
              {currentVideo?.desc && (
                <Desciption>{currentVideo.desc}</Desciption>
              )}
            </ChannelDetail>
          </ChannelInfo>
          <Subscribe onClick={handleSubscribe}>
            {currentUser?.subscribedUsers.includes(channel._id)
              ? "Unsubscribe"
              : "Subscribe"}
          </Subscribe>
        </Channel>
        <Hr />
        <Comments videoId={currentVideo?._id} />
      </Content>
      <Recommendation tags={currentVideo?.tags} />
    </Container>
  );
};

export default Video;
