import { ListContactType } from "../actionType"

export const setListContactById = (data) => {
  return {
    type: ListContactType.GET_DATA_LIST_CONTACT_BY_ID,
    payload: data,
  }
}
