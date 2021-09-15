import { Link } from "react-router-dom";
import styled from "styled-components";
import { RiArticleLine } from "react-icons/ri";

const TopicPreview = (props) => {
  const TOPIC_URL = "/topics/" + props.topicId;
  return (
    <section style={{ marginBottom: "1rem" }}>
      <div>
        {/* <RiArticleLine style={{ marginRight: ".5rem" }} /> */}
        <Link to={{ pathname: TOPIC_URL, state: { props } }}>
          <BlogRightTitle>{props.topicTitle}</BlogRightTitle>
        </Link>
      </div>
      <BlogRightSubTitle>{props.topicDescription}</BlogRightSubTitle>
    </section>
  );
};

const BlogRightTitle = styled.h3`
  font-family: "Space Grotesk", sans-serif;
  font-size: 28px;
  font-weight: 600;
  max-width: 25ch;
  letter-spacing: -2px;
`;
const BlogRightSubTitle = styled.div`
  max-width: 50ch;
  font-size: 15px;
  margin-top: 12px;
  line-height: 1.4;
`;
export default TopicPreview;
