import { taskUpdated, taskDeleted } from "./actionTypes";

export function taskReducer(state = [], action) {
  switch (action.type) {
    case taskUpdated: {
      const newArray = [...state];
      const elIndex = newArray.findIndex((e) => e.id === action.payload.id);
      newArray[elIndex] = { ...newArray[elIndex], ...action.payload };
      return newArray;
    }
    case taskDeleted: {
      const newArray = state.filter((f) => {
        return f.id !== action.payload.id;
      });
      return newArray;
    }
    default:
      return state;
  }
}
