import React, { Component } from "react";
import { FormattedNumber } from "react-intl";
class TooltipFormatter extends Component {
  render() {
    const { active } = this.props;

    if (active) {
      const { payload, concepts } = this.props;
      return (
        <div style={{ background: "white", border: "1px solid rgba(0, 0, 0, 0.5)", padding: "10px" }}>
          <ul style={{ "list-style": "none" }}>
            {payload.sort((p1, p2) => p2.value - p1.value).map(p => {
              return (
                <li>
                  <span style={{ color: p.stroke, "font-weight": "bold" }}>{concepts.find(c => c.id === p.dataKey).name}</span>
                  <span>&nbsp;({p.value})</span>
                </li>
              );
            })}
          </ul>
        </div>
      );
    }

    return null;
  }
}

export default TooltipFormatter;
