import React from "react";
import PostPreviewListGroup from "./PostPreviewListGroup";
import FilterPeriod from "./FilterPeriod";
import FilterPages from "./FilterPages";
import { Flex } from "reflexbox";

const Home = props => (
  <Flex column>
    <FilterPages />
    <FilterPeriod period="today" />
    <PostPreviewListGroup title={"Today"} apiPrefix={"today"} />
  </Flex>
);

export default Home;
