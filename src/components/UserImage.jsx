import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    background-color: #${props=> props.color};
    font-weight: 500;
    font-size: 20px;
    color: black;
`

const UserImage = ({name,color}) => {
    const alphabet = name?.charAt(0).toUpperCase()
    
  return (
    <Container color={color}>{alphabet}</Container> 
  )
}
 
export default UserImage