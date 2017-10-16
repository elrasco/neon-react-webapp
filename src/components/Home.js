import React from "react";
import PostPreviewListGroup from "./PostPreviewListGroup";
import FilterBar from "./FilterBar";
import FilterPages from "./FilterPages";
import { Flex } from "reflexbox";

const Home = props => (
  <Flex column>
    <FilterPages />
    <FilterBar period="today" />
    <PostPreviewListGroup title={"Today"} apiPrefix={"today"} />
  </Flex>
);

export default Home;
