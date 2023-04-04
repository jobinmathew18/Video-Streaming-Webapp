import { CheckCircle, Delete } from "@mui/icons-material";
import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  padding-block: 30px;
  gap: 10px;
`;

const Title = styled.h1`
  color: ${({ theme }) => theme.text};
  font-weight: 600;
  letter-spacing: 6px;
  font-size: 2rem;
`;

const Wrapper = styled.div`
  margin: 10px;
  width: 90%;
  display: flex;
  flex-direction: column;
  justify-content: start;
  gap: 30px;
`;

const Item = styled.div`
  width: 100%;
  display: flex;
  justify-content: start;
  flex-direction: column;
  gap: 10px;
  background-color: ${({ theme }) => theme.bgLighter};
  padding: 20px 10px;
  border-radius: 10px;
  color: ${({ theme }) => theme.text};
`;

const Text = styled.h3``;

const Input = styled.input`
  border: none;
  background-color: transparent;
  outline: none;
  padding: 5px;
  border-bottom: 1px solid ${({ theme }) => theme.textSoft};
  color: ${({ theme }) => theme.text};
`;

const Textarea = styled.textarea`
  border: none;
  background-color: transparent;
  outline: none;
  padding: 5px;
  color: ${({ theme }) => theme.text};
  resize: none;
`;

const Span = styled.span`
  color: ${({ theme }) => theme.textSoft};
  font-size: 12px;
  font-weight: 300;
`;

const Buttons = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
`;

const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px 30px;
  font-size: 16px;
  font-weight: 500;
  border-radius: 6px;
  border: none;
  cursor: pointer;
  gap: 10px;
  background-color: #${(props) => props.color};

  &:hover {
    text-decoration: underline;
  }
`;

const DeleteUser = styled.div`
  position: absolute;
  text-align: center;
  padding: 20px 30px;
  width: 500px;
  top: 50%;
  background-color: #f1eded9f;
  border-radius: 10px;
`;

const Warning = styled.h3`
  color: #d30707;
  font-weight: 900;
`;

const Choose = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  margin-top: 15px;
`;

const Option = styled.button`
  padding: 8px 16px;
  border-radius: 5px;
  cursor: pointer;
  border: none;

  &:hover{
    text-decoration: underline;
  }
`;

const EditVideo = () => {
  const [video, setVideo] = useState({});
  const [inputs, setInputs] = useState({});
  const location = useLocation();
  const videoId = location.pathname.split("/")[3];
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [tags,setTags] = useState([])

  useEffect(() => {
    const fetchVideo = async () => {
      try {
        const res = await axios.get(`/videos/find/${videoId}`);
        setVideo(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchVideo();
  }, [videoId]);

  const handleChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const hangleTagsChange = (e)=>{
    setTags(e.target.value.split(','))
  }

  const handleUpdate = async () => {
    try {
      await axios.put(`/videos/${videoId}`, {inputs, tags});
      navigate(`/video/${videoId}`);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`/videos/${videoId}`);
      setOpen(false);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Container>
        <Title>Edit and Update Video</Title>
        <Wrapper>
          <Item>
            <Text>Title</Text>
            <Input
              defaultValue={video.title}
              name="title"
              onChange={handleChange}
            />
          </Item>
          <Item>
            <Text>Description</Text>
            <Textarea
              rows={12}
              defaultValue={video.desc}
              name="desc"
              onChange={handleChange}
            />
          </Item>
          <Item>
            <Text>Tags</Text>
            <Span>(Separate tags with commas)</Span>
            <Input
              defaultValue={video.tags}
              name="tags"
              onChange={hangleTagsChange}
            />
          </Item>
          <Buttons>
            <Button color="a1d9ef" onClick={handleUpdate}>
              {" "}
              <CheckCircle /> UPDATE
            </Button>
            <Button color="f66060" onClick={() => setOpen(true)}>
              {" "}
              <Delete /> Delete
            </Button>
          </Buttons>
        </Wrapper>
        {open && (
          <DeleteUser>
            <Warning>
              Are you sure you want to delete the video? Once the video is
              deleted you cannot restore it.
            </Warning>
            <Choose>
              <Option onClick={handleDelete}>Yes</Option>
              <Option onClick={() => setOpen(false)}>No</Option>
            </Choose>
          </DeleteUser>
        )}
      </Container>
    </>
  );
};

export default EditVideo;
