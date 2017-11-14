import React from "react";
import { Flex, Box } from "reflexbox";
import Links from "./Links";
import "./index.css";

const Preview = props => {
  const obj = props.object;
  const formatObj = value => {
    return Math.round(value / 100) / 10 + "K";
  };
  const content = props.object[props.type];
  let getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
  let get_rnd_thumb = () => `https://s3.eu-central-1.amazonaws.com/smallfish-media/assets/images/fugu/fe/trianglify/${getRandomInt(1, 10)}.svg`;
  let picture = content => content.picture || get_rnd_thumb();
  return (
    <Flex column {...props} className="Preview">
      <Links image={picture(content)} data={props} content={content} publisher={obj} />
      <Flex column className="reactions" justify="start">
        <div className="divider" />
        <Flex className="metrics" justify="space-between">
          <Box className="metric">
            <i className="fa fa-thumbs-o-up" aria-hidden="true" />
            <strong>{formatObj(obj.likes_diff)}</strong>
          </Box>
          <Box className="metric">
            <i className="fa fa-smile-o" aria-hidden="true" />
            <strong>{formatObj(obj.reactions_diff)}</strong>
          </Box>
          <Box className="metric">
            <i className="fa fa-comment-o" aria-hidden="true" />
            <strong>{formatObj(obj.comments_diff)}</strong>
          </Box>
          <Box className="metric">
            <i className="fa fa-share-square-o" aria-hidden="true" />
            <strong>{formatObj(obj.shares_diff)}</strong>
          </Box>
        </Flex>
        <div className="divider" />
        <Flex justify="center" align="start">
          {props.object.video && (
            <a className="origin_link" href={"http://www.facebook.com/" + props.object.video.objectId} target="_blank">
              See more
            </a>
          )}
          {props.object.post && (
            <a className="origin_link" href={"http://facebook.com/" + props.object.post.objectId} target="_blank">
              See more
            </a>
          )}
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Preview;
