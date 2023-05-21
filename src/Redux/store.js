import { composeWithDevTools } from "redux-devtools-extension";
import rootReduce from "./reducer/rootReduce";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";

const store = createStore(
  rootReduce,
  composeWithDevTools(applyMiddleware(thunk))
);
export default store;
