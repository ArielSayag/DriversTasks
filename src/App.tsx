import { message } from "antd";
import DriversList from "./components/DriverList";
import DriversMap from "./components/DriversMap";
import TasksList from "./components/TasksList";
import styled from '@emotion/styled';
import { useState } from 'react';
import { Driver , Task } from "./types";


const AppContainer = styled.div`
  box-sizing:border-box;
  margin-inline:auto;
  min-height:100vh;
  padding:16px;
  max-width:95%;
  display:grid;
  grid-template-rows:1fr 1fr;
  grid-template-columns:40% 60%;


  background:whitesmoke;
 

  @media only screen and (max-width:800px) {
    grid-template-rows:1fr 1fr fr;
    grid-template-columns:1fr;
  }
`


const TaskListContainer = styled.div`
  grid-column:1 / -1;
  display:grid;
  height:fit-content;
  padding:32px;
`

const DriverListContainer = styled.div`
  display:flex;
  flex-direction:column;
`

const MapContainer = styled.div`
  display:grid;
`

function App(){

 
  return (
    <>
        <h1 className="text-center p-2 text-xl  text-white bg-green-700" >Welcome To Drivers App</h1>
    <AppContainer>
        <DriverListContainer>
            <DriversList />
        </DriverListContainer>

        <MapContainer id="map">
            <DriversMap />
        </MapContainer>
       
        <TaskListContainer className="footer">
          <TasksList />
        </TaskListContainer>
    </AppContainer>
    </>
  )
}

export default App;
