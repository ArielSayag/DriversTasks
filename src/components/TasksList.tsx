import { useState , useEffect,useCallback} from "react";
import { ApiResponse, Task } from "../types";
import { fetchData } from "../driver_api";
import TaskComp from "./Task";
import { useAppContext } from "../context/AppContext";

const config=[
  {label:'Title'},
  {label:'Scheduled for'},
  {label:'Assign to'},
  {label:'Address'},
  {label:'LAT'},
  {label:'LNG'},
  {label:'Display'},
];
function TasksList(){

  const { tasks  } = useAppContext()

  const RenderedTasks = useCallback(() => <>
  { tasks.map((task)=>{
    return <TaskComp key={task.id} prop={task}/>
  })}</>,[tasks])

  
  const RenderHeader = useCallback(() =><>
  { config.map((column) => {
    return <th key={column.label}>{column.label}</th>
  })} </>,[config])

  return (
    <table className="table-auto border-spacing-2">
      <thead>
        <tr className="border-b-2 bg-green-500">
          <RenderHeader/>
        </tr>
      </thead>
      <tbody>
        <RenderedTasks/>
      </tbody>
    </table>
  )
}

export default TasksList;