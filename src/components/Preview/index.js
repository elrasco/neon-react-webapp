import React from "react";
import { Flex, Box } from "reflexbox";
import { Link } from "react-router-dom";
import "./index.css";

const Preview = props => {
  console.log(props);
  const obj = props.object;
  const content = props.object[props.type];
  console.log(props.type);
  let getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
  let get_rnd_thumb = () => `https://s3.eu-central-1.amazonaws.com/smallfish-media/assets/images/fugu/fe/trianglify/${getRandomInt(1, 10)}.svg`;
  let picture = content => content.picture || get_rnd_thumb();
  return (
    <Flex column {...props} className="Preview">
      <Box>{obj.diff}</Box>
      <Box>
          <img src={picture(content)} alt="" style={{ width: "160px", height: "160px" }} />
        <Link to={"/detail/" + props.type + "/" + content.objectId}>
        <i className="fa fa-bar-chart" aria-hidden="true"></i>
        </Link>
        {props.object.video && 
        <a href={"http://www.facebook.com/"+ props.object.video.objectId} target="_blank">
        <i className="fa fa-paper-plane-o" aria-hidden="true"></i>
        </a>
        }
        {props.object.post && 
        <a href={"http://facebook.com/"+ props.object.post.objectId} target="_blank">
        <i className="fa fa-paper-plane-o" aria-hidden="true"></i>
        </a>
        }
      </Box>
    </Flex>
  );
};

export default Preview;
