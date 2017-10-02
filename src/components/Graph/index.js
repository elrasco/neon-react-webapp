import React, { Component } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { Flex } from "reflexbox";

class Graph extends Component {
  render() {
    return (
      <Flex column>
        <h3>{this.props.title}</h3>
        <ResponsiveContainer width="98%" height={400}>
          <LineChart data={this.props.data}>
            <XAxis dataKey="created_at" interval="preserveStartEnd" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="total_count" stroke="#8884d8" />
          </LineChart>
        </ResponsiveContainer>
      </Flex>
    );
  }
}

export default Graph;
