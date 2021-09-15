import { usePromiseTracker } from "react-promise-tracker";
import Loader from "react-loader-spinner";
import GroupList from "../Groups/GroupList";
import TopicList from "../Topics/TopicList";
import CurrentUser from "../users/CurrentUser";
import styled from "styled-components";

const LoadingIndicator = () => {
  const { promiseInProgress } = usePromiseTracker();
  return (
    promiseInProgress && (
      <div
        style={{
          width: "100%",
          height: "100",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Loader type="ThreeDots" color="#2bad60" height="100" width="100" />
      </div>
    )
  );
};

const Timeline = ({ currentUser }) => {
  return (
    <Section>
      <CurrentUser currentUser={currentUser} />
      <TopicList />
      <GroupList />
      <LoadingIndicator />
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
