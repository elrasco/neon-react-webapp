import React, { Component } from "react";
import { Flex } from "reflexbox";
import { observer, inject } from "mobx-react";
import "./index.css";

@inject("listingStore")
@observer
class FilterCategories extends Component {
  componentDidMount() {}
  checkCategory = e => {
    this.props.listingStore.checkCategory(e.target.id);
  };
  // checkCountry = country => {
  //   this.props.listingStore.checkCountry(country.target.id);
  // };
  render() {
    // const countries = this.props.listingStore.countries.map(country => {
    //   return (
    //     <Flex key={country.id} className={"category_" + country.id + " category"}>
    //       {country.checked && (
    //         <img id={country.id} className="checkbox" src="https://s3.eu-central-1.amazonaws.com/smallfish-media/assets/images/shark/check_on.svg" alt="" onClick={this.checkCountry} />
    //       )}
    //       {!country.checked && (
    //         <img id={country.id} className="checkbox" src="https://s3.eu-central-1.amazonaws.com/smallfish-media/assets/images/shark/check_off.svg" alt="" onClick={this.checkCountry} />
    //       )}
    //       <Flex className="category_descr"> {country.descr} </Flex>
    //     </Flex>
    //   );
    // });
    const categories = this.props.listingStore.categories.map(cat => {
      return (
        <Flex key={cat.id} className={"category_" + cat.id + " category"}>
          {cat.checked && <img id={cat.id} className="checkbox" src="https://s3.eu-central-1.amazonaws.com/smallfish-media/assets/images/shark/check_on.svg" alt="" onClick={this.checkCategory} />}
          {!cat.checked && <img id={cat.id} className="checkbox" src="https://s3.eu-central-1.amazonaws.com/smallfish-media/assets/images/shark/check_off.svg" alt="" onClick={this.checkCategory} />}
          <Flex className="category_descr"> {cat.descr} </Flex>
        </Flex>
      );
    });
    return (
      <Flex column w={1} className="FilterCategories" justify="start" align="start">
        <Flex className="category_title"> Categories:</Flex>
        {categories}
        {/* <Flex className="category_title"> Countries:</Flex>
        {countries} */}
      </Flex>
    );
  }
}

export default FilterCategories;
