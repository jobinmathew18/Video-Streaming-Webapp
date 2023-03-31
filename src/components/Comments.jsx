import { Send } from "@mui/icons-material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import Comment from "./Comment";
import UserImage from "./UserImage";

const Container = styled.div`
  padding-block: 10px;
`;

const NewComment = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
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

const Input = styled.input`
  background-color: transparent;
  border: none;
  color: ${({ theme }) => theme.text};
  outline: none;
  padding: 10px 5px 3px;
  border-bottom: 0.5px solid ${({ theme }) => theme.textSoft};
  width: 100%; ;
`;

const Icon = styled.span`
  color: ${({ theme }) => theme.text};
  cursor: pointer;
`;

const Comments = ({ videoId }) => {
  const { currentUser } = useSelector((state) => state.user);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    const fetchComments = async () => {
      const res = await axios.get(`/comments/${videoId}`);
      setComments(res.data);
    };
    fetchComments();
  }, [videoId]);

  const handleComment = async () => {
    const res = await axios.post(`/comments`, { comment: newComment, videoId });
    setComments([res.data, ...comments]);
    setNewComment("");
  };

  return (
    <Container>
      <NewComment>
        {currentUser &&
          <>
            <Avatar>
              {currentUser?.img ? (
                <Image src={currentUser.img} />
              ) : (
                <UserImage name={currentUser?.name} color="7171e8" />
              )}
            </Avatar>
            <Input
              placeholder="Add a comment..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
            />
            <Icon>
              <Send onClick={handleComment} />
            </Icon>
          </>
        }
      </NewComment>
      {comments.map((comment) => (
        <Comment key={comment._id} comment={comment} />
      ))}
    </Container>
  );
};

export default Comments;
