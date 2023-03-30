import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
    height: 100%;
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background-color: #000000a8;
    display: flex;
    align-items: center;
    justify-content: center;
`
const Wrapper = styled.div`
    width: 600px;
    height: 600px;
    background-color: ${({ theme }) => theme.bgLighter};
    color:  ${({ theme }) => theme.text};
    padding: 20px;
    display: flex;
    flex-direction: column;
    gap: 20px;
    position: relative;
`

const Close = styled.div`
    position: absolute;
    top: 10px;
    right: 10px;
    cursor: pointer;
    z-index: 3;
`

const Title = styled.h1`
    text-align: center;
    font-weight: 300;
`

const Input = styled.input`
    border: 1px solid ${({ theme }) => theme.soft};
    color: ${({ theme }) => theme.text};
    border-radius: 3px;
    padding: 10px;
    background-color: transparent;
    z-index: 3;
`

const Upload = ({setOpen}) => {
    console.log(setOpen)
  return (
    <Container>
        <Wrapper>
            <Close onClick={()=> setOpen(false)}>X</Close>
            <Title>Upload a New Video</Title>
            <Input/>
        </Wrapper>
    </Container>
  )
}

export default Upload