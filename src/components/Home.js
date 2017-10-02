import React from "react";
import PostPreviewListGroup from "./PostPreviewListGroup";
import { Flex } from "reflexbox";

const Border = props => (
  <Flex column>
    <PostPreviewListGroup title={"Today"} apiPrefix={"today"} />
    <PostPreviewListGroup title={"Yesterday"} apiPrefix={"yesterday"} />
    <PostPreviewListGroup title={"Last 7 days"} apiPrefix={"sevenD"} />
    <PostPreviewListGroup title={"Last 30 days"} apiPrefix={"thirtyD"} />
  </Flex>
);

export default Border;
