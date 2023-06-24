import React, { useState } from "react";
import { Button } from "@material-ui/core";
import FileCopyOutlinedIcon from "@material-ui/icons/FileCopyOutlined";
const CopyLink = () => {
  const [text, setText] = useState("COPY LINK");
  const url = window.location.href;

  const copyTextHandler = () => {
    navigator.clipboard.writeText(url);
    setText("LINK COPIED");
    setTimeout(() => {
      setText("COPY LINK");
    }, 500);
  };

  return (
    <div>
      <Button size="small" onClick={copyTextHandler}>
        <FileCopyOutlinedIcon color="disabled" fontSize="medium" />
        <span style={{ fontSize: "12px" }}>{text}</span>
      </Button>
    </div>
  );
};

export default CopyLink;
