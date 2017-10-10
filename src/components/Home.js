import React from "react";
import PostPreviewListGroup from "./PostPreviewListGroup";
import FilterPeriod from "./FilterPeriod";
import { Flex } from "reflexbox";

const Home = props => (
  <Flex column>
    {/* <FilterBar></FilterBar> */}
    <FilterPeriod />
    <PostPreviewListGroup title={"Today"} apiPrefix={"today"} />
    {/* <PostPreviewListGroup title={"Yesterday"} apiPrefix={"yesterday"} />
    <PostPreviewListGroup title={"Last 7 days"} apiPrefix={"sevenD"} />
    <PostPreviewListGroup title={"Last 30 days"} apiPrefix={"thirtyD"} /> */}
  </Flex>
);

export default Home;
