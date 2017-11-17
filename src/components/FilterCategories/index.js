import React, { Component } from "react";
import { Flex } from "reflexbox";
import { observer, inject } from "mobx-react";
import "./index.css";

@inject("listingStore")
@observer
class FilterCategories extends Component {
  componentDidMount() {}
  check = e => {
    this.props.listingStore.checkCategory(e.target.id);
  };
  render() {
    const categories = this.props.listingStore.categories.map(cat => {
      return (
        <Flex key={cat.id} className={"category_" + cat.id + " category"}>
          {cat.checked && <img id={cat.id} className="checkbox" src="https://s3.eu-central-1.amazonaws.com/smallfish-media/assets/images/shark/check_on.svg" alt="" onClick={this.check} />}
          {!cat.checked && <img id={cat.id} className="checkbox" src="https://s3.eu-central-1.amazonaws.com/smallfish-media/assets/images/shark/check_off.svg" alt="" onClick={this.check} />}
          <Flex className="category_descr"> {cat.descr} </Flex>
        </Flex>
      );
    });
    return (
      <Flex column w={1} className="FilterCategories" justify="start" align="start">
        <Flex className="category_title"> Categories:</Flex>
        {categories}
      </Flex>
    );
  }
}

export default FilterCategories;
