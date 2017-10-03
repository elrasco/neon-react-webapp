import React, { Component } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { Flex } from "reflexbox";
import TooltipFormatter from "./TooltipFormatter";

class Graph extends Component {
  tickFormatter(value) {
    if (value === 0) return 0;
    const valueInHour = Math.round(value / 60);
    if (valueInHour < 24) return valueInHour + "h";
    return Math.round(value / 60 / 24) + "d";
  }
  render() {
    return (
      <Flex column>
        <h3>{this.props.title}</h3>
        <ResponsiveContainer width="98%" height={400}>
          <LineChart data={this.props.data}>
            <XAxis domain={[this.props.data, this.props.data]} dataKey="fromTheFirst" type="number" minTickGap={1} tickFormatter={this.tickFormatter} interval="0" />
            <YAxis />
            <Tooltip content={<TooltipFormatter />} />
            <Line type="monotone" dataKey="total_count" dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </Flex>
    );
  }
}

export default Graph;
