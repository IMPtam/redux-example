import httpService from "./httpService";
import { nanoid } from "nanoid";
const todoEndPoint = "todos/";
const todoService = {
  fetch: async () => {
    const { data } = await httpService.get(todoEndPoint, {
      params: { _page: 1, _limit: 10 },
    });
    return data;
  },
  post: async () => {
    console.log(nanoid());
    const { data } = await httpService.post(todoEndPoint, {
      userId: 1,
      id: nanoid(),
      title: "Новая задача",
      completed: false,
    });
    return data;
  },
};

export default todoService;
