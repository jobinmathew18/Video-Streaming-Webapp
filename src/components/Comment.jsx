import styled from "styled-components";

const Container = styled.div`
  display: flex;
  gap: 20px;
  margin: 30px 0;
`;

const Avatar = styled.img`
  width: 36px;
  height: 36px;
  object-fit: cover;
  border-radius: 50%;
`;

const Details = styled.div`
  display: flex;
  flex-direction: column;
  color: ${({ theme }) => theme.text};
`;

const Name = styled.span`
    font-size: 13px;
    font-weight: 500;
`;

const Date = styled.span`
    font-size: 12px;
    font-weight: 400;
    color: ${({ theme }) => theme.textSoft};
    margin-left: 5px;
`;

const Text = styled.span`
    font-size: 13px;
    font-weight: 400;
    margin-top: 5px;
`;

const Comment = () => {
  return (
    <Container>
      <Avatar src="/images/logoDark.png" />
      <Details>
        <Name>
          Jeswin Mathew <Date>1 day ago</Date>{" "}
        </Name>
        <Text>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Natus animi
          quam assumenda eaque quae veniam dolorem quibusdam, incidunt cumque
          quisquam at. Distinctio adipisci quod ad cumque, tempora quis
          accusamus perferendis.
        </Text>
      </Details>
    </Container>
  );
};

export default Comment;
