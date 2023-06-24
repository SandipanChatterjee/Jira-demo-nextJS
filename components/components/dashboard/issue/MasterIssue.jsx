import React from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import {
  backlog,
  completed,
  currentIssueFunction,
  getCurrentIssue,
  inprogress,
  selected,
} from "../../../actions/issues";
import { searchedDataHandler } from "../../../actions/search";
import { updateIssueList } from "../../../services/updateIssueList";
import { useSelectorIssues } from "../../../utils/useSelectorIssues";
import {
  convertToArrayOfObjects,
  issueStatus,
  move,
  reorder,
  type as issueType,
  typeIconObj,
  priorityObj,
  priorityIcon,
} from "../../../utils/utils";
import { useStyles } from "./style";
import { StyledBadge } from "./style";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import Card from "@material-ui/core/Card";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Avatar from "@material-ui/core/Avatar";
import AvatarGroup from "@material-ui/lab/AvatarGroup";
import ErrorBoundary from "../../../utils/ErrorBoundary";

const MasterIssue = () => {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();

  const selector = useSelectorIssues();
  const searchedData =
    useSelector((state) => state.searchReducer.searchedData) || issueTypes;
  const searchValue = useSelector((state) => state.searchReducer.searchValue);
  const currentIssue = useSelector((state) => state.issueReducer.currentIssue);
  const users = useSelector((state) => state.projectReducer.project.users);

  const issueTypes = [
    selector.backlogIssues,
    selector.selectedIssues,
    selector.inprogressIssues,
    selector.completedIssues,
  ];

  const list = [];

  const onDragEnd = (result) => {
    const { source, destination } = result;
    console.log("onDragEnd##", result, source, destination);
    if (!destination) {
      return;
    }
    const itemId = parseInt(result.draggableId);
    const sInd = +source.droppableId;
    const dInd = +destination.droppableId;

    if (sInd === dInd) {
      console.log(issueTypes[sInd], sInd);
      const items = reorder(issueTypes[sInd], source.index, destination.index);
      const dispatchArr = [
        () => dispatch(backlog(items)),
        () => dispatch(selected(items)),
        () => dispatch(inprogress(items)),
        () => dispatch(completed(items)),
      ];
      dispatchArr[sInd]();
    } else {
      const result = move(
        issueTypes[sInd],
        issueTypes[dInd],
        source,
        destination,
        itemId
      );
      console.log("dInd#", result[dInd]);

      const dispatchArrForStartIndex = [
        () => dispatch(backlog(result[sInd])),
        () => dispatch(selected(result[sInd])),
        () => dispatch(inprogress(result[sInd])),
        () => dispatch(completed(result[sInd])),
      ];
      const dispatchArrForEndIndex = [
        () => dispatch(backlog(result[dInd])),
        () => dispatch(selected(result[dInd])),
        () => dispatch(inprogress(result[dInd])),
        () => dispatch(completed(result[dInd])),
      ];
      dispatchArrForStartIndex[sInd]();
      dispatchArrForEndIndex[dInd]();

      if (searchedData.length > 0) {
        console.log("searchedData##", searchedData, list);
        const arr = [
          selector.backlogIssues,
          selector.selectedIssues,
          selector.inprogressIssues,
          selector.completedIssues,
        ].flat(Infinity);

        let issues = arr.filter((el) => {
          return result[dInd].find((innerEl) => {
            return innerEl.id === el.id;
          });
        });
        issues.forEach((el) => {
          el.status =
            Object.keys(issueStatus)[parseInt(destination.droppableId)];
        });
        issues = issues.filter((el) => el.id === itemId);
        issues = [
          ...issues,
          ...searchedData.flat(Infinity).filter((el) => el.id !== itemId),
        ];
        let searchedDataArr = convertToArrayOfObjects(issues);
        console.log("searchedData##", searchedDataArr);
        dispatch(searchedDataHandler(searchedDataArr));
      }
    }

    const payload = {
      listPosition: destination.index,
      status: Object.keys(issueStatus)[parseInt(destination.droppableId)],
    };
    console.log(payload);
    updateIssueList(payload, parseInt(result.draggableId));
  };

  const modalOpenHanlder = (issueId) => {
    console.log(issueId);
    console.log("139");
    dispatch(getCurrentIssue(issueId));
    history.push(`/project/board/${issueId}`);
    // setModalActive(true);
  };

  const modalCloseHandler = () => {
    dispatch(currentIssueFunction({}));
    // setModalActive(false);
  };
  const typeValues = Object.values(issueType);
  const priorityKeys = Object.keys(priorityObj);

  searchedData.length > 0
    ? searchedData.length > 0
      ? list.push(...searchedData)
      : list.push(...issueTypes)
    : searchValue !== ""
    ? list.push(...[[], [], [], []])
    : list.push(...issueTypes);

  return (
    <div>
      <DragDropContext onDragEnd={onDragEnd}>
        <Grid container className="root" spacing={2}>
          <Grid item xs={12}>
            <Grid className={classes.girdDisplay}>
              {list.length > 0
                ? list.map((issueType, index) => {
                    console.log("issueType#", issueType);
                    return (
                      <Droppable droppableId={`${index}`} key={index}>
                        {(provided, snapshot) => {
                          return (
                            <Grid
                              container
                              key={0}
                              alignItems="stretch"
                              ref={provided.innerRef}
                              {...provided.droppableProps}
                              className={classes.grid}
                            >
                              <Paper className={classes.paper}>
                                <span>
                                  {Object.keys(issueStatus)[
                                    index
                                  ].toUpperCase()}
                                </span>
                                {issueType.map((issue, index) => {
                                  const id = issue.id.toString();
                                  const issueTypeIcon =
                                    typeIconObj[typeValues.indexOf(issue.type)];
                                  const issuePriorityIcon =
                                    priorityIcon[
                                      priorityKeys.indexOf(issue.priority) + 1
                                    ];
                                  const filteredUsers = users.filter((user) =>
                                    issue.userIds.includes(user.id)
                                  );

                                  return (
                                    <Draggable
                                      key={id}
                                      draggableId={id}
                                      index={index}
                                    >
                                      {(provided, snapshot) => {
                                        return (
                                          <ErrorBoundary>
                                            <Card
                                              className={classes.cardDisplay}
                                              ref={provided.innerRef}
                                              onClick={() =>
                                                modalOpenHanlder(issue.id)
                                              }
                                              {...provided.draggableProps}
                                              {...provided.dragHandleProps}
                                            >
                                              <p className={classes.titleText}>
                                                {issue.title}
                                              </p>
                                              <div
                                                className={
                                                  classes.cardIconContainer
                                                }
                                              >
                                                <div
                                                  className={classes.cardIcon}
                                                >
                                                  <span>{issueTypeIcon}</span>
                                                  <span>
                                                    {issuePriorityIcon}
                                                  </span>
                                                </div>
                                                <div
                                                  className={
                                                    classes.cardIconAvatar
                                                  }
                                                >
                                                  <AvatarGroup>
                                                    {filteredUsers.map((el) => {
                                                      console.log("el###", el);
                                                      return (
                                                        <Avatar
                                                          alt={`${el.name}`}
                                                          src={el.avatarUrl}
                                                          style={{
                                                            height: "25px",
                                                            width: "25px",
                                                          }}
                                                        />
                                                      );
                                                    })}
                                                  </AvatarGroup>
                                                </div>
                                              </div>
                                            </Card>
                                          </ErrorBoundary>
                                        );
                                      }}
                                    </Draggable>
                                  );
                                })}
                              </Paper>
                              {provided.placeholder}
                            </Grid>
                          );
                        }}
                      </Droppable>
                    );
                  })
                : null}
            </Grid>
          </Grid>
        </Grid>
      </DragDropContext>
    </div>
  );
};

export default MasterIssue;
