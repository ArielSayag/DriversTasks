import { Driver, Task } from "../types";
import { useState } from "react";
import { message } from "antd";
import {RiUser5Line} from "react-icons/ri";
import styled from '@emotion/styled';
import Modal from './Modal';
import { useAppContext } from "../context/AppContext";

const ButtonContainer=styled.div`
  display:flex;
  justify-content: space-between;
  padding:2px 2px 0px 2px;
 
`;

const DeleteDriver =styled.button`
  border:1px solid lightgray;
  border-radius:2px;
  margin:50px 5px 0px 5px;
  padding:10px;
  font-size: 0.875rem;
  line-height: 1.25rem;
  background-color:red;
  color: rgb(255 255 255);
`;
const LocationDriver =styled.button`
  border:1px solid lightgray;
  border-radius:2px;
  margin:50px 5px 0px 5px;
  padding:10px;
  font-size: 0.875rem;
  line-height: 1.25rem;
  background-color: rgb(6 182 212);
  color: rgb(255 255 255);
`;

const UserContainer= styled.div`
  display: flex;
  margin-left:5px;
  margin-bottom:5px;
`;

const TextUser=styled.div`
  display: grid;
  height: fit-content;
  margin-left:8px;
`;
const TaskSpan=styled.span`
  font-size: 0.75rem;
  line-height: 1rem;
  --tw-text-opacity: 1;
  color: rgb(100 116 139 / var(--tw-text-opacity));
  margin-left:15px;
`;
function DriverComp({prop}:{prop: Driver}): JSX.Element{

  const [isModalOpen, setIsModalOpen] = useState(false);

  const {changeSelectedDriver,getSelectedDriverTasks,getDriverTasks} = useAppContext()

  const handleLocation = () => {
    changeSelectedDriver(prop.id);
  }
  
  return(
    <div className="w-full rounded-lg bg-primary-100 p-4 text-primary-600">
      <div className="pt-2 pb-2 flex  justify-between border-2 border-black ">
        <div>
          <UserContainer >
            <RiUser5Line size={50} color="gray" className="p-1 border-2 rounded-full border-gray-500"/>
            <TextUser>
              <h1 className="font-bold">{prop.name}</h1>
              <span className="text-xs text-slate-500">Age:{prop.age}</span>
            </TextUser>
          </UserContainer>
          <TaskSpan >Task:{getDriverTasks(prop.id)?.length}</TaskSpan>
        </div>
        <ButtonContainer>
          <LocationDriver onClick={handleLocation}>location</LocationDriver>
          <DeleteDriver onClick={()=>{
            setIsModalOpen(true);
          }}>remove</DeleteDriver>
        </ButtonContainer>
      </div>
      {isModalOpen && <Modal driver={prop} />}
    </div>
  )
}

export default DriverComp