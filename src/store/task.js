import { createSlice } from "@reduxjs/toolkit";
import todoService from "../services/todoService";
import { setError } from "./error";

const initialState = {
  entities: [
    // { id: 1, title: "Task1", completed: false },
    // { id: 2, title: "Task2", completed: false },
  ],
  isLoading: true,
  // error: null,
};

// const update = createAction("task/updated");
// const remove = createAction("task/removed");

// const TASK_UPDATED = "task/updated";
// const TASK_DELETED = "task/deleted";

const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    recived(state, action) {
      state.entities = action.payload;
      state.isLoading = false;
      // return action.payload;
    },
    update(state, action) {
      const elIndex = state.entities.findIndex(
        (e) => e.id === action.payload.id
      );
      state.entities[elIndex] = {
        ...state.entities[elIndex],
        ...action.payload,
      };
    },
    remove(state, action) {
      state.entities = state.entities.filter(
        (el) => el.id !== action.payload.id
      );
    },
    taskRequested(state) {
      state.isLoading = true;
    },
    taskRequestFailed(state, action) {
      // state.error = action.payload;
      state.isLoading = false;
    },
    taskCreated(state, action) {
      state.entities.push(action.payload);
      state.isLoading = false;
    },
  },
});
const { actions, reducer: taskReducer } = taskSlice;
const {
  update,
  remove,
  recived,
  taskRequested,
  taskRequestFailed,
  taskCreated,
} = actions;

// const taskRequested = createAction("task/requested");
// const taskRequestFailed = createAction("task/requestFailed");

export const createTasks = () => async (dispatch) => {
  dispatch(taskRequested());
  try {
    const data = await todoService.post();
    dispatch(taskCreated(data));
  } catch (error) {
    dispatch(taskRequestFailed());
    dispatch(setError(error.message));
  }
};

export const loadTasks = () => async (dispatch) => {
  try {
    dispatch(taskRequested());
    const data = await todoService.fetch();
    dispatch(recived(data));
  } catch (error) {
    dispatch(taskRequestFailed());
    dispatch(setError(error.message));
  }
};

export const completeTask = (id) => (dispatch, getState) => {
  dispatch(update({ id, completed: true }));
};

// export function taskCompleted(id) {
//   return update({ id, completed: true });
//   // return {
//   //   type: TASK_UPDATED,
//   //   payload: { id, completed: true },
//   // };
// }

export function titleChanged(id) {
  return update({ id, title: `Новое название ${id}` });
  // return {
  //   type: TASK_UPDATED,
  //   payload: { id, title: `Новое название ${id}` },
  // };
}

export function taskDeleted(id) {
  return remove({ id });
  // return {
  //   type: TASK_DELETED,
  //   payload: { id },
  // };
}

export const getTasks = () => (state) => state.tasks.entities;
export const getTaskLoadingStatus = () => (state) => state.tasks.isLoading;

// const taskReducer = createReducer(initialState, (builder) => {
//   builder
//     .addCase(update, (state, action) => {
//       const elIndex = state.findIndex((e) => e.id === action.payload.id);
//       state[elIndex] = { ...state[elIndex], ...action.payload };
//     })
//     .addCase(remove, (state, action) => {
//       return state.filter((f) => f.id !== action.payload.id);
//     });
// });

// function taskReducer(state = [], action) {
//   switch (action.type) {
//     case update.type: {
//       const newArray = [...state];
//       const elIndex = newArray.findIndex((e) => e.id === action.payload.id);
//       newArray[elIndex] = { ...newArray[elIndex], ...action.payload };
//       return newArray;
//     }
//     case remove.type: {
//       const newArray = state.filter((f) => {
//         return f.id !== action.payload.id;
//       });
//       return newArray;
//     }
//     default:
//       return state;
//   }
// }

export default taskReducer;
