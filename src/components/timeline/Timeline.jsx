import GroupList from "../Groups/GroupList";
import TopicList from "../Topics/TopicList";

const Timeline = () => {
  return (
    <section
      style={{
        display: "grid",
        gap: "1rem",
        gridTemplateColumns: "repeat(2, 1fr)",
      }}
    >
      <GroupList />
      <TopicList />
    </section>
  );
};

export default Timeline;
