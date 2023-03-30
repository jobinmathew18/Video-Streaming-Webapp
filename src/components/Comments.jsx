import axios from "axios"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import styled from "styled-components"
import Comment from "./Comment"

const Container = styled.div`   
    padding-block: 10px;
`

const NewComment = styled.div`
    display: flex;
    align-items: center;
    gap: 20px;
`

const Avatar = styled.img`
    width: 36px;
    height: 36px;
    object-fit: cover;
    border-radius: 50%;
`

const Input = styled.input`
    background-color: transparent;
    border: none;
    color: ${({ theme }) => theme.text}; 
    outline: none;
    padding: 10px 5px 3px;
    border-bottom: 0.5px solid ${({ theme }) => theme.textSoft};
    width: 100%;
;
`

const Comments = ({videoId}) => {
    const { currentUser } = useSelector((state) => state.user);
    const [comments, setComments] = useState([])

    useEffect(()=>{
        const fetchComments = async ()=>{
            const res = await axios.get(`/comments/${videoId}`)
            setComments(res.data)
        }
        fetchComments();
    }, [videoId])
  return (
    <Container>
        <NewComment>
            <Avatar src={currentUser.img}/>
            <Input placeholder="Add a comment..."/>
        </NewComment> 
        {
            comments.map(comment=> <Comment key={comment._id} comment={comment}/>)
        }
    </Container>
  )
}

export default Comments