import { createStore, combineReducers, applyMiddleware } from "redux"
import thunk from "redux-thunk"

import contactReducers from "./reducers/listContactReducers"

const reducers = combineReducers({
  contactReducers,
})

const store = createStore(reducers, applyMiddleware(thunk))

export default store
