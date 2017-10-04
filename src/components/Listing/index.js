import React, { Component } from "react";
import PostPreviewList from "../PostPreviewList";
import { Flex} from "reflexbox";
import Pages from '../../services/Pages';

class Listing extends Component {
  constructor(props) {
    super(props);
    this.state = { pages: [] };
    this.checked = true;
    this.checkedPages = [];
    
    const updateStatus = name => {
      let pagesToUpdate = this.state.pages;
      const index = pagesToUpdate.findIndex(page => page.objectId === name);
      pagesToUpdate[index].checked = !pagesToUpdate[index].checked;
      return pagesToUpdate;
    }

    this.handleInputChange = event => {
      const name = event.target.name;
      this.setState({
        pages: updateStatus(name)
      });
      this.showFilteredPosts = this.pagesToConsider !== 0 ? true : false;
      this.pagesToConsider = this.state.pages.filter(page => page.checked === true ).map(page => page.objectId);
      this.checked = this.pagesToConsider.length === 0 ? true : false;  
    }
  }
  
  componentDidMount() {
    Pages.getAll()
    .then(response => {
      const mappedPages = response.map(page => {
        return {
          name: page.name,
          objectId: page.objectId,
          fan_count: page.fan_count,
          checked: false
        }
      })
      this.setState({ pages: mappedPages });
    });
  }
  
  render() {

    const apiPrefix = this.props.match.params.period;
    const apiSuffix = this.props.match.params.type === "v" ? "Videos" : "Posts";
    const type = this.props.match.params.type === "v" ? "video" : "post";
    const pages = this.state.pages.map(page => {
      return (
        <div key={page.objectId}> 
          <label> 
            <input
              name={page.objectId}
              type="checkbox"
              checked={this.state[page.objectId]}
              onChange={this.handleInputChange} />
              {page.name} 
            </label>
        </div>
      );
    })
    
    return (
      <Flex>
        {!this.showFilteredPosts | this.checked && <PostPreviewList w={4/5} src={process.env.REACT_APP_API_URL + "/api/" + apiPrefix + apiSuffix + "?limit=100"} type={type} />}
        {this.showFilteredPosts & !this.checked && <PostPreviewList w={4/5} src={`${process.env.REACT_APP_API_URL}/api/${apiPrefix + apiSuffix}/byPage/${this.pagesToConsider.toString()}?limit=100`} type={type} />}
        <Flex column w={1/5} p={2}>
        <label>
          <input 
            name="allPages"
            type="checkbox"
            checked={this.checked}
            onChange={this.handleInputChange} />
        All pages
        </label>
           {pages} 
        </Flex>
      </Flex>
    );
  }
}

export default Listing;
