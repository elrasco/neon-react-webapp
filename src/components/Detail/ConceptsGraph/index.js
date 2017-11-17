import React, { Component } from "react";
import { Legend, LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { Flex } from "reflexbox";
import TooltipFormatter from "./TooltipFormatter";

class Graph extends Component {
  constructor(props) {
    super(props);
    console.log(props);
  }

  componentDidMount() {
    console.log(this.props);
  }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps);
  }

  stringToRgbColour(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    let colour = "#";
    for (let i = 0; i < 3; i++) {
      let value = (hash >> (i * 8)) & 0xff;
      colour += ("00" + value.toString(16)).substr(-2);
    }

    let components = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(colour);
    let rgbColour = components
      ? {
          r: parseInt(components[1], 16),
          g: parseInt(components[2], 16),
          b: parseInt(components[3], 16)
        }
      : null;

    return `rgba(${rgbColour.r}, ${rgbColour.g}, ${rgbColour.b}, 1)`;
  }
  render() {
    return (
      <Flex column>
        <h3>Concepts</h3>
        <ResponsiveContainer width="98%" height={400}>
          <LineChart data={this.props.prediction.series}>
            <XAxis />
            <YAxis domain={["auto", "auto"]} />
            <Tooltip content={<TooltipFormatter concepts={this.props.prediction.concepts} />} />
            <Legend
              verticalAlign="top"
              align="right"
              layout="vertical"
              height={20}
              wrapperStyle={{ flexWrap: "wrap", paddingLeft: "35px", maxHeight: "360px", height: "360px", overflow: "auto" }}
              payload={this.props.prediction.concepts.map(c => {
                return {
                  id: c.id,
                  value: `${c.name} (${c.avg})`,
                  type: "line",
                  color: this.stringToRgbColour(c.id)
                };
              })}
            />
            {this.props.prediction.concepts.map(k => {
              return <Line type="linear" connectNulls={false} key={"line_chart_dl_" + k.id} stroke={this.stringToRgbColour(k.id)} dataKey={k.id} dot={false} />;
            })}
          </LineChart>
        </ResponsiveContainer>
      </Flex>
    );
  }
}

export default Graph;
