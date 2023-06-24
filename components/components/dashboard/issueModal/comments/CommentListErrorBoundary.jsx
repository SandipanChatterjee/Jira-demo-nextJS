import React, { Fragment } from "react";

export const CommentUserNameContent = ({ name }) => {
  return <b>{name.toString()}</b>;
};
export const CommentBodyContent = ({ commentBody }) => {
  return <p>{commentBody.toString()}</p>;
};
