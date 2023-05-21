import { combineReducers } from "redux";
import userReduce from "./userReduce";

const rootReduce = combineReducers({
  user: userReduce,
});

export default rootReduce;
