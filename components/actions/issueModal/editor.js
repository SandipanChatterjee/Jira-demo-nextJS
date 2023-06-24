export const actionTypes = {
  show_title_editor: "show_title_editor",
  set_title_text: "set_title_text",
  show_description_editor: "show_description_editor",
  set_description_text: "set_description_text",
};

export const setTitleEditor = (flag) => {
  console.log("flag###", flag);
  return {
    type: actionTypes.show_title_editor,
    showTitleEditor: flag,
  };
};

export const setTitleText = (data) => {
  return {
    type: actionTypes.set_title_text,
    titleText: data,
  };
};

export const setDescriptionEditor = (data) => {
  return {
    type: actionTypes.show_description_editor,
    showDescriptionEditor: data,
  };
};

export const setDescriptionText = (data) => {
  return {
    type: actionTypes.set_description_text,
    descriptionText: data,
  };
};
