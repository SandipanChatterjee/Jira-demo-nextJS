export const actionTypes = {
  SEARCH: "SEARCH",
  SEARCH_DATA: "SEARCH_DATA",
};

export const search = (data) => {
  return {
    type: actionTypes.SEARCH,
    searchValue: data,
  };
};

export const searchedDataHandler = (data) => {
  console.log("data#", data);
  const dataArr = JSON.parse(JSON.stringify(data));
  return {
    type: actionTypes.SEARCH_DATA,
    searchedData: dataArr,
  };
};
