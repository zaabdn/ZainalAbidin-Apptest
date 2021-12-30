import { ListContactType } from "../actionType"

const initialState = {
  contacts: {},
}

const contactReducers = (state = initialState, action) => {
  switch (action.type) {
    case ListContactType.GET_DATA_LIST_CONTACT_BY_ID:
      return { ...state, contacts: action.payload }
    default:
      return { ...state }
  }
}

export default contactReducers
