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

const Comments = () => {
  return (
    <Container>
        <NewComment>
            <Avatar src="/images/logo.png"/>
            <Input placeholder="Add a comment..."/>
        </NewComment> 
        <Comment/>
        <Comment/>
        <Comment/>
        <Comment/>
        <Comment/>
        <Comment/>
    </Container>
  )
}

export default Comments