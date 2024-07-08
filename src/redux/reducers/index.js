import { combineReducers } from "redux";

import { auth } from "./auth";
import { posts } from "./post";
import { modal } from "./modal";
import { chat } from "./chats";
const Reducers = combineReducers({
  auth,
  posts,
  modal,
  chat,
});

export default Reducers;
