import { ActionDropDownActions, ActionDropDownStateType } from "@/types/types";
import { useReducer } from "react";
export const INITIAL_STATE = {
  isModalOpen: false,
  isDropDownOpen: false,
  action: null,
  name: '',
  isLoading: false
}
function reducer(state: ActionDropDownStateType, action: ActionDropDownActions): ActionDropDownStateType {
  switch (action.type) {
    case 'SET_IS_MODAL_OPEN':
      return {
        ...state,
        isModalOpen: action.payload
      }
    case 'SET_IS_DROP_DOWN_OPEN':
      return {
        ...state,
        isDropDownOpen: action.payload
      }
    case 'SET_ACTION':
      return {
        ...state,
        action: action.payload
      }
    case 'SET_NAME':
      return {
        ...state,
        name: action.payload
      }
    case 'SET_IS_LOADING':
      return {
        ...state,
        isLoading: action.payload
      }
    case 'SET_TO_INITIAL_STATE':
      return action.payload
  }
}
export default function useActionDropDown(initialState: ActionDropDownStateType) {
  const [state, dispatch] = useReducer(reducer, initialState)
  return { state, dispatch }
}
