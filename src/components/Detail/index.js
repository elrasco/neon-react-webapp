import React, { Component } from "react";
import { Flex, Box } from "reflexbox";
import Graph from "../Graph";
import Post from "./Post";
import R from "ramda";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from "recharts";

class Detail extends Component {
  constructor() {
    super();
    this.state = { post: {}, series: [], loading: true, prediction: { show: false, loading: false, series: [], status: false }, concepts: [] };
  }

  stringToColour(str) {
    var hash = 0;
    for (var i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    var colour = "#";
    for (var i = 0; i < 3; i++) {
      var value = (hash >> (i * 8)) & 0xff;
      colour += ("00" + value.toString(16)).substr(-2);
    }
    return colour;
  }

  componentDidMount() {
    const apiHost = process.env.REACT_APP_API_URL;
    const apiPrefix = `${apiHost}/api/detail`;
    const objectId = this.props.match.params.objectId;
    const type = this.props.match.params.type;
    const object = `${type}/${objectId}`;
    const call = reaction => fetch(`${apiPrefix}/${object}/${reaction}`).then(response => response.json());

    let series = [];
    let calls = [];

    ["reactions", "comments", "likes", "shares"].forEach(r => {
      calls.push(call(r));
    });

    if (type === "video") {
      fetch(`${apiHost}/api/predictions/${objectId}`)
        .then(response => response.json())
        .then(response => {
          let concepts_series = {};
          if (response.status === "ANALYZED") {
            let concepts = [];
            let concepts_series_array = [];
            response.prediction.frames.forEach((f, i) => {
              concepts_series_array.push({});
              f.data.concepts.forEach(c => {
                if (!concepts.includes(c.id)) {
                  concepts.push(c.id);
                }
                let object = {};
                object[c.id] = c.value;
                concepts_series_array[i] = Object.assign({}, concepts_series_array[i], object);
              });
            });

            console.log(this.state.prediction.series);
            const okKeys = Object.keys(concepts_series).filter(key => concepts_series[key].series.filter(value => value > 0).length > response.prediction.frames.length * 0.4);
            console.log(okKeys);
            this.setState(
              {
                concepts: concepts.filter(c => {
                  concepts_series_array.map();
                })
              },
              () => {
                this.setState({ prediction: { show: true, series: concepts_series_array } });
              }
            );
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
        console.log(this.state.series);
      })
      .then(() => this.setState({ loading: false }));
  }

  render() {
    return (
      <Flex column>
        {this.state.loading && <div className="loader">Loading</div>}
        <Box>
          <Post data={this.state.post} />
        </Box>
        <Flex wrap w={1} p={2}>
          <Box w={0.8}>
            {<Graph title={"Interactions"} data={this.state.series} dataKeys={["comments_total_count", "likes_total_count", "shares_total_count", "reactions_total_count"]} />}
          </Box>
        </Flex>
        {this.state.prediction.show && (
          <Flex wrap w={1} p={2}>
            <Box w={0.8}>
              <Flex column>
                <h3>{this.props.title}</h3>
                <ResponsiveContainer width="98%" height={400}>
                  <LineChart data={this.state.prediction.series}>
                    <XAxis />
                    <YAxis domain={["auto", "auto"]} />
                    <Tooltip />
                    <Legend verticalAlign="top" align="right" layout="vertical" height={36} />
                    {this.state.concepts.map(k => {
                      return <Line type="linear" connectNulls={true} stroke={this.stringToColour(k)} dataKey={k} dot={false} />;
                    })}
                  </LineChart>
                </ResponsiveContainer>
              </Flex>
            </Box>
          </Flex>
        )}
      </Flex>
    );
  }
}

export default Detail;
