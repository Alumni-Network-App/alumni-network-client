import { Link } from "react-router-dom";

import styled from "styled-components";

const GroupPreview = (props) => {
  const GROUP_URL = "/groups/" + props.groupId;
  return (
    <article>
      <BlogTitleDate>
        <BlogRightPage> {props.topicId} </BlogRightPage>
        <Public>public</Public>
      </BlogTitleDate>
      <Link to={{ pathname: GROUP_URL, state: { props } }}>
        <BlogRightTitle> {props.groupTitle} </BlogRightTitle>
      </Link>

      <BlogRightSubTitle>{props.groupDescription}</BlogRightSubTitle>
    </article>
  );
};

const Public = styled.div`
  text-align: center;
  background-color: cyan;
  width: 7rem;
  border-radius: 50px;
  padding: 0.4rem;
`;
const BlogRightSubTitle = styled.p`
  max-width: 33ch;
  font-size: 15px;
  margin-top: 12px;
  line-height: 1.4;
`;

const BlogRightTitle = styled.h3`
  font-family: "Space Grotesk", sans-serif;
  font-size: 28px;
  font-weight: 600;
  max-width: 16ch;
  letter-spacing: -2px;
`;

const BlogRightPage = styled.p`
  font-family: "Space Grotesk", sans-serif;
  margin-bottom: 16px;
  font-size: 56px;
`;

const BlogTitleDate = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: space-between;
`;

export default GroupPreview;
