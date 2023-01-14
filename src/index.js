import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import {
  titleChanged,
  taskDeleted,
  completeTask,
  loadTasks,
  getTasks,
  getTaskLoadingStatus,
  createTasks,
} from "./store/task";
import configureStore from "./store/store";
import { Provider, useSelector, useDispatch } from "react-redux";
import { getErrors } from "./store/error";

const store = configureStore();

const App = (params) => {
  // const [state, setState] = useState(store.getState());

  const state = useSelector(getTasks());
  const isLoading = useSelector(getTaskLoadingStatus());
  const error = useSelector(getErrors());
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadTasks());
    // store.subscribe(() => {
    //   setState(store.getState());
    // });
  }, []);

  // const completeTask = (taskId) => {
  //   store.dispatch(taskCompleted(taskId));
  //   store.dispatch(() => {});
  //   // console.log(store.getState());
  // };

  const changeTitle = (taskId) => {
    dispatch(titleChanged(taskId));
  };

  const taskDelete = (taskId) => {
    dispatch(taskDeleted(taskId));
  };

  if (isLoading) {
    return <h1>Загрузка</h1>;
  }
  if (error) {
    return <p>{error}</p>;
  }

  return (
    <>
      <h1>App</h1>
      <button onClick={() => dispatch(createTasks())}>Add task</button>
      <ul>
        {state.map((el) => (
          <li key={el.id}>
            <p>{el.title}</p>
            <p>{`Completed: ${el.completed}`}</p>
            <button onClick={() => dispatch(completeTask(el.id))}>
              Complite
            </button>
            <button
              onClick={() => {
                changeTitle(el.id);
              }}
            >
              Change Title
            </button>
            <button
              onClick={() => {
                taskDelete(el.id);
              }}
            >
              Удалить
            </button>
            <hr />
          </li>
        ))}
      </ul>
    </>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
