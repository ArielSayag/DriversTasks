import { useEffect, useState } from "react";
import { Driver,ApiResponse, Task } from '../types';
import DriverComp from "./Driver";
import InputSearch from "./SearchInput";
import { useAppContext } from "../context/AppContext";
function DriversList() {

  const {drivers}= useAppContext()
  const [filteredDrivers, setFilteredDrivers] = useState<Driver[]>([]);
 
  useEffect(() => {
    setFilteredDrivers(drivers);
  
  }, [drivers])

  const handleChange = (nameDriver: string) => {
    const filtered = drivers.filter(driver =>
      driver.name.toLowerCase().includes(nameDriver.toLowerCase())
    );
    setFilteredDrivers(filtered);
  };



  const renderedDrivers = filteredDrivers.map((driver) => (
    <DriverComp key={driver.id} prop={driver}/>
  ));
  
  return(
    <div className=" box-border">
      <InputSearch onChange={handleChange} />
      <div className="border-2 rounded mt-2">
        <h3 className="bg-green-500 rounded-t text-center">Drivers List</h3>
        {renderedDrivers}
      </div>

    </div>
  )
}

export default DriversList