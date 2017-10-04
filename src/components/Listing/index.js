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
    
    this.updateStatus = name => {
      let pagesToUpdate = this.state.pages;
      const index = pagesToUpdate.findIndex(page => page.objectId === name);
      pagesToUpdate[index].checked = !pagesToUpdate[index].checked;
      return pagesToUpdate;
    }

    this.handleInputChange = event => {
      this.checked = false;
      const name = event.target.name;
      this.setState({
        pages: this.updateStatus(name)
      });
      this.state.pages.forEach(page => {
        fetch(`${process.env.REACT_APP_API_URL}/api/pages`);
      })
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
        <PostPreviewList w={4/5} src={process.env.REACT_APP_API_URL + "/api/" + apiPrefix + apiSuffix + "?limit=100"} type={type} />
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
