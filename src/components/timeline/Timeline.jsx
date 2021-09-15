import GroupList from "../Groups/GroupList";
import TopicList from "../Topics/TopicList";
import CurrentUser from "../Users/CurrentUser";
import styled from "styled-components";

const Timeline = ({ currentUser }) => {
  return (
    <Section>
      <CurrentUser currentUser={currentUser} />
      <TopicList />
      <GroupList />
    </Section>
  );
};

const Section = styled.section`
  display: grid;
  grid-template-columns: 0.5fr 2fr 1fr;

  gap: 3rem;
  margin: 2rem;
`;

export default Timeline;
