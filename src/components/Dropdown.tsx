import {useState,useCallback} from "react";
import styled from '@emotion/styled'
import {IoMdArrowDropdown ,IoMdArrowDropup} from 'react-icons/io';
import { useAppContext } from "../context/AppContext";
import { Driver, Task } from "../types";


const DropHeadContainer = styled.div`
  border:1px solid gray;
  border-radius: 0.125rem;
  display:flex;
  justify-content: space-between;
  align-items: center;
  padding:2px;
  positive:absolute;
`;

const DropDown = styled.div`
  position:relative;
  
`
const DropDownItem = styled.div`
  text-align-center;
  display:flex;
  padding:2px;
  justify-content: space-between;
  align-items: center;
  width:100%;
  &:hover{
    background-color: rgb(226 232 240);
  }
`

const RenderedOptionsStyle = styled.div`
  position:absolute;
  border:1px solid lightgray;
  display:flex;
  padding:2px;
  flex-direction:column;
  width:100%;
`

function Dropdown({prop}:{prop:Task}){

  const [isOpen, setIsOpen]=useState(false);
  const [selection,setSelection]=useState(prop.assign_to)
  const { drivers , tasks } = useAppContext()

  const RenderedOptions = useCallback(() => <RenderedOptionsStyle> {
    drivers.map((driver)=><DropDownItem key={driver.id} onClick={() => handleOptionClick(driver)} >{driver.name}</DropDownItem>)
    }</RenderedOptionsStyle>, [drivers]) 


  const handleClick = () => {
    setIsOpen((current) => !current)
  }

  const handleOptionClick =(driver:Driver)=>{
    setSelection(driver.name);
    const tasksForDriver = tasks.filter((task) => {
      if (prop.id === task.id) {
        task.assign_to = driver.name;
        return true;
      }
      return false;
    });
  }

  return(
      <DropDown onClick={handleClick} >
        <DropHeadContainer >
          <div>{selection}</div>
          {!isOpen && <IoMdArrowDropdown />}
          {isOpen && <IoMdArrowDropup />}
        </DropHeadContainer>
      {isOpen && <RenderedOptions/>}
      </DropDown>
  )
}

export default Dropdown;