<script lang="ts">
  import Kanban from "../components/kanban-table.svelte";
  import KanbanColumn from "../components/kanban-column.svelte";
  import Input from "../components/input.svelte";

  let taskIdToEdit: string = null;
  let modalEditVisible: boolean = false;

  // const createTaskFunc = () => {
  //   let id = -1;
  //   return ((id: number) => (title: string, category: string, labels: string[]) => {
  //     id++;
  //     return {
  //       id, title, labels, category, temp: null
  //     }
  //   })(id);
  // }

  // const createTask = createTaskFunc();
  // let tasks = [
  //   createTask('Заголовок сдвинут вправо', 'Todo', ['bug', 'bow']),
  //   createTask('Кнопка отправки не работает', 'Todo', ['bug', 'low']),
  //   createTask('Пропадает поле формы', 'In progress', ['bug', 'low']),
  //   createTask('Обновить версию React', 'Done', ['bug', 'low']),
  // ];
  const deleteTask = async (taskId: string) => {
    const cookies = document.cookie.split(";");
    const token = cookies.find((el) => el.includes("token="));
    const tokenVal = token.split("=")[1];
    const response = await fetch(
      `http://localhost:1000/reports/${taskId}`,
      {
        method: 'DELETE',
        headers: {
          Authorization: "Basic " + tokenVal,
        },
      }
    );
    if(response.status === 200) {
      removeTask(tasks.findIndex(task => task.report_id === taskId));
    }
  }
  const getShortData = async (
    limit: number = 50,
    offset: number = 0,
    short: boolean = true
  ) => {
    const cookies = document.cookie.split(";");
    const token = cookies.find((el) => el.includes("token="));
    const tokenVal = token.split("=")[1];
    const response = await fetch(
      `http://localhost:1000/reports?short=${short}&limit=${limit}&offset=${offset}`,
      {
        headers: {
          Authorization: "Basic " + tokenVal,
        },
      }
    );
    const data = await response.json();
    return data;
  };
  let tasks: {
    report_id: string;
    status: string;
    title: string;
    date_created: string;
    tags: {tag_id: string, name: string, color: string}[];
    temp: boolean;
  }[] = [];
  getShortData().then((value) => {
    console.log(value)
    tasks = value;
  });
  const createColumnPropsFunc = () => {
    let id = -1;
    return ((id: number) => (title: string, pColor: string, sColor: string) => {
      id++;
      return {
        id,
        title,
        pColor,
        sColor,
      };
    })(id);
  };
  const createColumnProps = createColumnPropsFunc();

  const columns = [
    createColumnProps("To do", "#AFFFA1", "#41C62C"),
    createColumnProps("Doing", "#C1DAFF", "#0059DF"),
    createColumnProps("Done", "#FFE0CA", "#FF6B00"),
  ];
  import { afterUpdate, onDestroy, onMount } from "svelte";
  import ModalTaskOpen from "./ModalTaskOpen.svelte";
  let dragParams = {
    id: null,
    x: null,
    y: null,
    width: null,
    height: null,
    relX: null,
    relY: null,
  };
  const removeTask = (id: number) => {
    tasks = [...tasks.slice(0, id), ...tasks.slice(id + 1)];
  };
  const openEditModal = (id: string) => {
    taskIdToEdit = id;
    modalEditVisible = true;
  };
  // const initServerSendEvents = () => {
  //     const eventSource = new EventSource("http://localhost:4000/getData");
  //     eventSource.onmessage = (event) => {
  //     console.log(event.data);
  //     };
  //     eventSource.onopen = (event) => {
  //     console.log(event);
  //     };
  // };
  // onMount(() => {
  //     initServerSendEvents();
  // });
  const onMouseUp = (event: MouseEvent) => {
    if (dragParams.id === null) return;
    const taskId = tasks.findIndex((el) => el.temp);
    const task = tasks[taskId];
    const columnDOMElements = columns.map((el) =>
      document.getElementById(`column${el.id}`)
    );
    const middlePartOfTask = {
      x: event.clientX - dragParams.relX + dragParams.width / 2,
      y: event.clientY - dragParams.relY + dragParams.height / 2,
    };
    const columnId = columnDOMElements.find((el) => {
      const { x, y, height, width } = el.getBoundingClientRect();
      return (
        x <= middlePartOfTask.x &&
        x + width >= middlePartOfTask.x &&
        y <= middlePartOfTask.y &&
        y + height >= middlePartOfTask.y
      );
    })?.id;
    switch (columnId) {
      case "column0":
        task.status = "To do";
        break;
      case "column1":
        task.status = "Doing";
        break;
      case "column2":
        task.status = "Done";
        break;
      default:
        break;
    }

    removeTask(tasks.findIndex((el) => el.report_id === dragParams.id));
    removeTask(tasks.findIndex((el) => el.report_id === dragParams.id));
    const newTask = { ...task, temp: null };
    tasks = [...tasks, newTask];

    dragParams = { ...dragParams, id: null };
  };
  const onMouseMove = (event: MouseEvent) => {
    let { clientX, clientY } = event;
    const { relX, relY } = dragParams;
    dragParams = { ...dragParams, x: clientX - relX, y: clientY - relY };
  };
  const onMouseDown = (
    id: string,
    x: number,
    y: number,
    width: number,
    height: number,
    relX: number,
    relY: number
  ) => {
    dragParams = { id, x: x - relX, y: y - relY, width, height, relX, relY };
    const taskDragged = tasks.find((el) => el.report_id === id);
    tasks = [...tasks, { ...taskDragged, temp: true }];
  };
  onMount(() => {
    document.addEventListener("mouseup", onMouseUp);
    document.addEventListener("mousemove", onMouseMove);
  });
  onDestroy(() => {
    document.removeEventListener("mouseup", onMouseUp);
    document.removeEventListener("mousemove", onMouseMove);
  });
  $: filterTasks = (title: string) => {
    return tasks.filter((el) => el.status === title);
  };
</script>

<div class="all-site-contents">
  <div class="all-site-contents__main-content">
    <Input />
    <Kanban>
      {#each columns as col}
        <KanbanColumn
          {openEditModal}
          {onMouseDown}
          {deleteTask}
          id={col.id}
          {dragParams}
          columnTitle={col.title}
          tasks={filterTasks(col.title)}
          pColor={col.pColor}
          sColor={col.sColor}
        />
      {/each}
    </Kanban>
  </div>
  {#if modalEditVisible}
    <ModalTaskOpen
      onClose={() => (modalEditVisible = false)}
      taskId={taskIdToEdit}
    />
  {/if}
</div>

<style lang="scss">
  .all-site-contents {
    padding-top: 10px;
    width: 100%;
    position: relative;
    display: flex;

    justify-content: center;
    &__main-content {
      width: 1200px;
      display: flex;
      flex-direction: column;
      gap: 10px;
    }
  }
</style>
