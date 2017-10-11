import React from "react";
import PostPreviewListGroup from "./PostPreviewListGroup";
import FilterPeriod from "./FilterPeriod";
import { Flex } from "reflexbox";

const Home = props => (
  <Flex column>
    {/* <FilterBar></FilterBar> */}
    <FilterPeriod period="today" />
    <PostPreviewListGroup title={"Today"} apiPrefix={"today"} />
  </Flex>
);

export default Home;
