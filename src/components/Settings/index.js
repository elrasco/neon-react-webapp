import React, { Component } from "react";
import { observer, inject } from "mobx-react";
import PageSetting from "../PageSetting";
import { Flex, Box } from "reflexbox";

@inject("listingStore", "settingsStore")
@observer
class Listing extends Component {
  state = {};
  render() {
    return (
      <Flex>
        <Box w={1 / 2}>{this.props.listingStore.pages && this.props.listingStore.pages.map(page => <PageSetting page={page} />)}</Box>
        <Box w={1 / 2}>qui ci andranno i tags</Box>
      </Flex>
    );
  }
}

export default Listing;
