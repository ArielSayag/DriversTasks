import { useState } from "react"
import { Task } from "../types"
import Dropdown from "./Dropdown";

function TaskComp({prop}:{prop:Task}){

  const [isChecked,setIsChecked] = useState(false);

  const handleClick = () =>{
    setIsChecked((current) => !current);
  }

  return(
    <tr className="text-center">
      <td>{prop.title}</td>
      <td>{prop.scheduled_for}</td>
      <td><Dropdown prop={prop}/></td>
      <td>{prop.address}</td>
      <td>{prop.location.latitude}</td>
      <td>{prop.location.longitude}</td>
      <td><input type="checkbox" checked={isChecked} onChange={handleClick} /></td>
    </tr>
  )
}

export default TaskComp