import React from "react";
import { Flex, Box } from "reflexbox";
import { Link } from "react-router-dom";
import "./index.css";

const Preview = props => {
  console.log(props);
  const obj = props.object;
  const content = props.object[props.type];
  let getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
  let get_rnd_thumb = () => `https://s3.eu-central-1.amazonaws.com/smallfish-media/assets/images/fugu/fe/trianglify/${getRandomInt(1, 10)}.svg`;
  let picture = content => content.picture || get_rnd_thumb();
  return (
    <Flex column {...props} className="Preview">
      <Box>{obj.diff}</Box>
      <Box>
        <Link to={"/detail/" + props.type + "/" + content.objectId}>
          <img src={picture(content)} alt="" style={{ width: "160px", height: "160px" }} />
        </Link>
      </Box>
    </Flex>
  );
};

export default Preview;
