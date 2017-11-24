import React, { Component } from "react";
import { Flex, Box } from "reflexbox";
import Graph from "../Graph";
import Post from "./Post";
import "./index.css";
import ConceptsGraph from "./ConceptsGraph";

class Detail extends Component {
  constructor() {
    super();
    this.state = {
      post: {},
      series: [],
      loading: true,
      clickedPollingAnalysys: false,
      prediction: { show_button: false, show: false, loading: false, series: [], status: false, concepts: [] }
    };

    this.apiHost = process.env.REACT_APP_API_URL;
    this.apiPrefix = `${this.apiHost}/api/detail`;

    this.clickDeepAnalysys = this.clickDeepAnalysys.bind(this);
  }

  showAnalysys(prediction) {
    let concepts = [];
    let concepts_series_array = [];
    prediction.frames.forEach((f, i) => {
      concepts_series_array.push({});
      f.data.concepts.forEach(c => {
        let index = concepts.findIndex(_c => _c.id === c.id);
        if (index === -1) {
          concepts.push(Object.assign({}, c, { count: 1, value: c.value, avg: c.value }));
        } else {
          concepts[index].count++;
          concepts[index].value = concepts[index].value + c.value;
          concepts[index].avg = concepts[index].value / concepts[index].count;
        }
        let object = {};
        object[c.id] = c.value;
        concepts_series_array[i] = Object.assign({}, concepts_series_array[i], object);
      });
    });

    concepts = concepts
      .map(c =>
        Object.assign({}, c, {
          name: c.name.toUpperCase()
        })
      )
      .sort((c1, c2) => c2.count - c1.count)
      .slice(0, 15)
      .sort((c1, c2) => c2.avg - c1.avg);

    this.setState({ prediction: { concepts } }, () => {
      this.setState({ prediction: Object.assign({}, this.state.prediction, { show_button: false, show: true, series: concepts_series_array }) });
    });
  }

  pollingAnalysys() {
    return this.callForDeepAnalysys().then(response => {
      if (response.status === "ANALYZED") {
        this.showAnalysys(response.prediction);
      } else {
        this.pollingAnalysysTimeout = setTimeout(() => {
          this.pollingAnalysys();
        }, response.status === "UNKNOWN" ? 1500 : 7000);
      }
    });
  }

  clickDeepAnalysys() {
    if (this.state.clickedPollingAnalysys === true) {
      return;
    }
    this.setState({ clickedPollingAnalysys: true });
    return this.pollingAnalysys();
  }

  componentWillUnmount() {
    console.log("componentWillUnmount");
    this.setState({ clickedPollingAnalysys: false });
    if (this.pollingAnalysysTimeout) {
      clearTimeout(this.pollingAnalysysTimeout);
    }
  }

  componentDidMount() {
    this.objectId = this.props.match.params.objectId;
    this.type = this.props.match.params.type;

    const object = `${this.type}/${this.objectId}`;
    const call = reaction => fetch(`${this.apiPrefix}/${object}/${reaction}`).then(response => response.json());

    let series = [];
    let calls = [];

    ["reactions", "comments", "likes", "shares"].forEach(r => {
      calls.push(call(r));
    });

    if (this.type === "video") {
      this.deepAnalysysStatus().then(response => {
        if (response.status === "TO_BE_ANALYZED") {
          this.setState({ prediction: { show_button: "action", button_loading_content: "Deep Analysys" } });
        } else if (response.status === "ANALYZED") {
          this.showAnalysys(response.prediction);
        } else if (response.status === "ANALYZING") {
          this.setState({ clickedPollingAnalysys: true, show_button: "loading" });
          this.pollingAnalysysTimeout = setTimeout(() => {
            this.pollingAnalysys();
          }, 1500);
        }
      });
    }

    Promise.all(calls)
      .then(([reactions, comments, likes, shares]) => {
        this.setState({ post: reactions.post });
        for (let i = 0; i < reactions.data.length; i++) {
          series.push({
            reactions_total_count: reactions.data[i].total_count,
            likes_total_count: likes.data[i].total_count,
            comments_total_count: comments.data[i].total_count,
            shares_total_count: shares.data[i].total_count,
            created_at: reactions.data[i].created_at,
            created_at_label: reactions.data[i].created_at_label,
            fromTheFirst: reactions.data[i].fromTheFirst
          });
        }
        this.setState({ series: series });
      })
      .then(() => this.setState({ loading: false }));
  }

  deepAnalysysStatus() {
    return fetch(`${this.apiHost}/api/predictions/${this.objectId}`)
      .then(response => response.json())
      .catch(err => {
        return {
          status: "TO_BE_ANALYZED"
        };
      });
  }

  callForDeepAnalysys() {
    this.setState({ prediction: { show_button: "loading", button_loading_content: "Analyzing..." } });
    return fetch(`${this.apiHost}/api/predictions/${this.objectId}`, { method: "PUT" })
      .then(response => response.json())
      .catch(err => {
        return {
          status: "ERROR"
        };
      });
  }

  render() {
    return (
      <Flex column className="graphs_container">
        {this.state.loading && <div className="loader">Loading</div>}
        <Box>
          <Post data={this.state.post} />
        </Box>
        <Flex wrap w={0.8} p={2} className="metrics_graph">
          <Box w={0.8}>
            {<Graph title={"Interactions"} data={this.state.series} dataKeys={["comments_total_count", "likes_total_count", "shares_total_count", "reactions_total_count"]} />}
          </Box>
        </Flex>
        {this.state.prediction.show && (
          <Flex wrap w={0.8} p={2} className="concepts_graph">
            <Box w={0.8}>{<ConceptsGraph prediction={this.state.prediction} />}</Box>
          </Flex>
        )}
        {this.state.prediction.show_button && (
          <div className={"origin_link " + this.state.prediction.show_button} disabled={this.state.clickedPollingAnalysys} onClick={this.clickDeepAnalysys}>
            <span>{this.state.prediction.button_loading_content}</span>
          </div>
        )}
      </Flex>
    );
  }
}

export default Detail;
