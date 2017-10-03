import React, { Component } from "react";
import { FormattedNumber } from "react-intl";
class TooltipFormatter extends Component {
  render() {
    const { active } = this.props;

    if (active) {
      const { payload } = this.props;
      let when, value;
      try {
        when = payload[0].payload.created_at_label;
        value = payload[0].value;
      } catch (e) {}
      return (
        <div className="custom-tooltip">
          <p className="desc">{when}</p>
          <p className="label">
            Value: <FormattedNumber value={value} />
          </p>
        </div>
      );
    }

    return null;
  }
}

export default TooltipFormatter;
