import React from "react";
import { Flex } from "reflexbox";
import PostPreviewList from "../PostPreviewList";
import "./index.css";

const PostPreviewListGroup = props => (
  <Flex>
    <Flex p={"5px"} w={"100px"} align={"center"}>
      {props.title}
    </Flex>
    <Flex align={"center"} p={"5px"} className="PostPreviewListContainer" auto>
      <PostPreviewList src={process.env.REACT_APP_API_URL + "/api/" + props.apiPrefix + "Videos?limit=3"} linkName={"more"} linkTo={"/listing/v/" + props.apiPrefix} w={0.5} />
      <PostPreviewList
        src={process.env.REACT_APP_API_URL + "/api/" + props.apiPrefix + "Posts?limit=3"}
        type="post"
        linkName={"more"}
        linkTo={"/listing/p/" + props.apiPrefix}
        w={0.5}
      />
    </Flex>
  </Flex>
);

export default PostPreviewListGroup;
