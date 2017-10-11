import React from "react";
import { Flex, Box } from "reflexbox";
import Links from "./Links";
import "./index.css";

const Preview = props => {
  const obj = props.object;
  const content = props.object[props.type];
  let getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
  let get_rnd_thumb = () => `https://s3.eu-central-1.amazonaws.com/smallfish-media/assets/images/fugu/fe/trianglify/${getRandomInt(1, 10)}.svg`;
  let picture = content => content.picture || get_rnd_thumb();
  return (
    <Flex column {...props} className="Preview">
      <Links image={picture(content)} data={props} content={content} />
      <Flex className="reactions" justify="start">
        <i className="fa fa-eye" aria-hidden="false" />
        <Box>{obj.diff}</Box>
      </Flex>
    </Flex>
  );
};

export default Preview;
