import { Task,Driver, ApiResponse } from "../types"
import { ReactNode, createContext, useContext, useState } from "react"
import { fetchData } from "../driver_api";
import {useEffect} from 'react'
interface IAppContext {
  drivers: Driver[]
  tasks: Task[]
  selectedDriverId:string | null
  getSelectedDriver: () => Driver | null
  getDriverTasks: (driverID:string) => Task[] | null
  getSelectedDriverTasks: () => Task[] | null
  changeSelectedDriver: (driverID:string) => void,
  removeDriver: (driverId : string) => void 
}

const AppContext = createContext<IAppContext | null>(null)

export const AppContextProvider = ({children} : {children:ReactNode}) => {

  const [drivers, setDrivers] = useState<Driver[]>([])
  const [tasks, setTasks] = useState<Task[]>([])

  const [driverTasks, setDriverTasks] = useState<Map<string,Task[]>>(new Map());
  const [driverMapping, setDriverMapping] = useState<Map<string, Driver>>(new Map());
  
  const [selectedDriverId,setSelectedDriverId]=useState<string | null>(null);

  const changeSelectedDriver = (driverId:string )=>{
    setSelectedDriverId(driverId)
  }

  const getSelectedDriverTasks = () => {
    if(selectedDriverId == null) return null// no driver selected
    return driverTasks.get(selectedDriverId) ?? []
  }

  const getSelectedDriver = () => {
    if(selectedDriverId == null) return null // no driver selected
    return driverMapping.get(selectedDriverId) ?? null
  }



  
  const loadingData = async () =>{
    try{
      const result = await fetchData() as ApiResponse;
      setDrivers(result.data.drivers );
      setTasks(result.data.tasks);
      
      const updatedDriverTasks = new Map<string, Task[]>();
      const updatedDriverMapping = new Map<string, Driver>();

      result.data.drivers.forEach((driver) => {
        const tasksForDriver = result.data.tasks.filter((task) => task.assign_to === driver.name);
        updatedDriverTasks.set(driver.id, tasksForDriver);
        updatedDriverMapping.set(driver.id, driver)
      });

      setDriverTasks(updatedDriverTasks);
      setDriverMapping(updatedDriverMapping)

    } catch (error) {
      console.error('Error loading data:', error);
    }
  }

  useEffect(()=>{
    loadingData();
  },[])

  function removeDriver(driverId:string) {
    setDrivers(drivers.filter(driver => driver.id !== driverId))
    const newMap = new Map(driverTasks)
    newMap.delete(driverId)
    setDriverTasks(newMap)
  }
 
  function getDriverTasks(driverId:string) {
    return driverTasks.get(driverId) ?? null
  }

  return <AppContext.Provider value={{
    drivers,
    tasks,
    selectedDriverId,
    getSelectedDriver,
    getDriverTasks,
    getSelectedDriverTasks,
    changeSelectedDriver,
    removeDriver
  }}>
    {children}
  </AppContext.Provider>
}


export const useAppContext = () => {
  const context = useContext<IAppContext | null>(AppContext);
  if(!context) {
    throw new Error("App Context was not provided!!")
  }
  return context!
}