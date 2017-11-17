import React, { Component } from "react";
import { FormattedNumber } from "react-intl";
class TooltipFormatter extends Component {
  render() {
    const { active } = this.props;

    if (active) {
      const { payload } = this.props;
      let when, comments, reactions, shares, likes;
      try {
        when = payload[0].payload.created_at_label;
        comments = payload[0].value;
        likes = payload[1].value;
        shares = payload[2].value;
        reactions = payload[3].value;
      } catch (e) {}
      return (
        <div className="custom-tooltip">
          <p className="desc">{when}</p>
          <p className="label">
            <div className="comments">
              Comments: <FormattedNumber value={comments} />
            </div>
            <div className="likes">
              Likes: <FormattedNumber value={likes} />
            </div>
            <div className="shares">
              Shares: <FormattedNumber value={shares} />
            </div>
            <div className="reactions">
              Reactions: <FormattedNumber value={reactions} />
            </div>
          </p>
        </div>
      );
    }

    return null;
  }
}

export default TooltipFormatter;
