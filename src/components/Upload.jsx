import React, { useEffect, useState } from "react";
import styled from "styled-components";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from '../firebase'
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";

const Container = styled.div`
  height: 100%;
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background-color: #000000a8;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 3;
`;
const Wrapper = styled.div`
  width: 600px;
  height: 600px;
  background-color: ${({ theme }) => theme.bgLighter};
  color: ${({ theme }) => theme.text};
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  position: relative;
`;

const Close = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
  z-index: 3;
`;

const Title = styled.h1`
  text-align: center;
  font-weight: 300;
`;

const Input = styled.input`
  border: 1px solid ${({ theme }) => theme.soft};
  color: ${({ theme }) => theme.text};
  border-radius: 3px;
  padding: 10px;
  background-color: transparent;
  z-index: 3;
`;

const Description = styled.textarea`
  border: 1px solid ${({ theme }) => theme.soft};
  color: ${({ theme }) => theme.text};
  border-radius: 3px;
  padding: 10px;
  background-color: transparent;
  z-index: 3;
  resize: none;
`;

const Button = styled.button`
  border-radius: 3px;
  border: none;
  padding: 10px 20px;
  font-weight: 500;
  cursor: pointer;
  background-color: ${({ theme }) => theme.soft};
  color: ${({ theme }) => theme.textSoft};
`;

const Label = styled.label`
  font-size: 14px;
  display: inline;
`;

const Error = styled.span`
  font-size: 14px;
  font-weight: 300;
  color: red;
`

const Upload = ({ setOpen }) => {
  const [img, setImg] = useState(null);
  const [video, setVideo] = useState(null);
  const [imgPerc, setImgPerc] = useState(0);
  const [videoPerc, setVideoPerc] = useState(0);
  const [inputs, setInputs] = useState({});
  const [tags, setTags] = useState([]);
  const [error,setError] = useState(null)
  const navigate = useNavigate()

  const handleTags = (e) => {
    setTags(e.target.value.split(","));
  };

  const handleChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  // uploading image and video in firebase storage
  const uploadFile = (file, urlType) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        urlType === "imgUrl"
          ? setImgPerc(Math.round(progress))
          : setVideoPerc(Math.round(progress));
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
          default:
            break;
        }
      },
      (error) => {
        console.log(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setInputs((prev) => {
            return { ...prev, [urlType]: downloadURL};
          });
        });
      }
    );
  };

  // when we upload video in input field then this useEffect will get trigger
  useEffect(() => {
    video && uploadFile(video, 'videoUrl');
    // console.log("video processing");
  }, [video]);

  //when we upload image in input field then this useEffect will get trigger
  useEffect(() => {
    img && uploadFile(img, 'imgUrl');
  }, [img]);

  const handleUpload = async (e)=>{
    e.preventDefault()
    try {
      const res = await axios.post('/videos', {...inputs, tags})
      console.log({...inputs, tags})
      setError(null)
      setOpen(false)
      res.status === 200 && navigate(`/video/${res.data._id}`)
    } catch (error) {
      setError("Something went wrong!")
    }
  }

  return (
    <Container>
      <Wrapper>
        <Close onClick={() => setOpen(false)}>X</Close>
        <Title>Upload a New Video</Title>
        <Label>Video: </Label>
        {videoPerc > 0 ? (
          "Uploading: " + videoPerc + "%"
        ) : (
          <Input
            type="file"
            accept="video/*"
            onChange={(e) => setVideo(e.target.files[0])}
            required
          />
        )}
        <Input
          type="text"
          placeholder="Title"
          name="title"
          onChange={handleChange}
          required
        />
        <Description
          placeholder="Description"
          rows={8}
          name="desc"
          onChange={handleChange}
        />
        <Input
          type="text"
          placeholder="Video tags (Separate tags with commas)"
          onChange={handleTags}
          required
        />
        <Label>Thumbnail Image: </Label>
        {imgPerc > 0 ? (
          "Uploading: " + imgPerc + "%"
        ) : (
          <Input
            type="file"
            accept="image/*"
            onChange={(e) => setImg(e.target.files[0])}
            required
          />
        )}
        <Button onClick={handleUpload}>UPLOAD</Button>
        <Error>{error}</Error>
      </Wrapper>
    </Container>
  );
};

export default Upload;
