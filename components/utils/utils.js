import React from "react";
import {
  ArrowUpward,
  ArrowDownward,
  CheckCircleRounded,
  ErrorRounded,
  AssignmentReturnedRounded,
} from "@material-ui/icons";
import { useDispatch } from "react-redux";

export const issueStatus = {
  backlog: "backlog",
  selected: "selected",
  inprogress: "inprogress",
  done: "done",
};

// used in draggable
export const move = (
  source,
  destination,
  droppableSource,
  droppableDestination,
  itemId
) => {
  const sourceClone = Array.from(source);
  const destClone = Array.from(destination);
  const itemToBeRemovedIndex = sourceClone.findIndex((el) => el.id === itemId);
  console.log("itemToBeRemoved#", itemToBeRemovedIndex);
  console.log("droppableSource#", droppableSource);
  const [removed] = sourceClone.splice(itemToBeRemovedIndex, 1);
  console.log(
    "id#",
    droppableDestination.droppableId,
    Object.keys(issueStatus),
    sourceClone,
    destClone,
    itemId
  );

  destClone.splice(droppableDestination.index, 0, removed);
  const result = {};
  result[droppableSource.droppableId] = sourceClone;
  result[droppableDestination.droppableId] = destClone;

  return result;
};

//reorder a draggable list
export const reorder = (list, startIndex, endIndex) => {
  console.log(list, startIndex, endIndex);
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

export const convertToArrayOfObjects = (data) => {
  let backlog = [],
    selected = [],
    inProgress = [],
    completed = [];
  const output = data.map((el) => {
    if (el.status == issueStatus.backlog) {
      backlog.push(el);
    } else if (el.status == issueStatus.selected) {
      selected.push(el);
    } else if (el.status == issueStatus.inprogress) {
      inProgress.push(el);
    } else {
      completed.push(el);
    }
    return [backlog, selected, inProgress, completed];
  });

  return output[0];
};

export const useOutsideAlerter = (ref, setActive) => {
  const dispatch = useDispatch();
  React.useEffect(() => {
    /**
     * Alert if clicked on outside of element
     */
    function handleClickOutside(event) {
      // console.log(event);
      if (ref.current && !ref.current.contains(event.target)) {
        dispatch(setActive(false));
      }
    }

    // Bind the event listener
    if (typeof window !== "undefined") {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      // Unbind the event listener on clean up
      if (typeof window !== "undefined") {
        document.removeEventListener("mousedown", handleClickOutside);
      }
    };
  }, [ref]);
};

//status-priority

export const priorityObj = {
  1: "Highest",
  2: "High",
  3: "Medium",
  4: "Low",
  5: "Lowest",
};

export const priorityIcon = {
  1: (
    <ArrowUpward
      className="priority"
      style={{ color: "#8B0000", fontSize: "1rem", marginTop: "5px" }}
    />
  ),
  2: (
    <ArrowUpward
      className="priority"
      style={{ color: "#FF7F7F", fontSize: "1rem", marginTop: "5px" }}
    />
  ),
  3: (
    <ArrowUpward
      className="priority"
      style={{ color: "#FFA500", fontSize: "1rem", marginTop: "5px" }}
    />
  ),
  4: (
    <ArrowDownward
      className="priority"
      style={{ color: "#90EE90", fontSize: "1rem", marginTop: "5px" }}
    />
  ),
  5: (
    <ArrowDownward
      className="priority"
      style={{ color: "#006400", fontSize: "1rem", marginTop: "5px" }}
    />
  ),
};

//status - type

export const type = {
  0: "task",
  1: "story",
  2: "bug",
};

export const typeIconObj = {
  0: <CheckCircleRounded style={{ color: "#4FADE6", fontSize: "1rem" }} />,
  1: (
    <AssignmentReturnedRounded style={{ color: "#65BA43", fontSize: "1rem" }} />
  ),
  2: <ErrorRounded style={{ color: "#E44D42", fontSize: "1rem" }} />,
};

export const modules = {
  toolbar: [
    [{ header: [1, 2, false] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["link", "image"],
    ["clean"],
  ],
};
export const formats = [
  "header",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
];

export const projectCategory = ["software", "marketing", "business"];
