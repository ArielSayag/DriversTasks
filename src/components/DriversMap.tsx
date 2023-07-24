import React, { useState , useEffect ,useCallback} from 'react'
import { GoogleMap, useJsApiLoader,Marker } from '@react-google-maps/api';
import marker from '../marker.svg';
import deliveryTruck from '../deliveryTruck.svg';
import { Task,Driver, Location } from '../types';
import { useAppContext } from '../context/AppContext';
const containerStyle = {
  width: '100%',
  height: '100%'
};

const center = {
  lat: -3.745,
  lng: -38.523
};

interface MarkerIcon {
  url:string;
  scaledSize: {width:number,height:number},
  origin:{x:number,y:number},
  anchor:{x:number, y:number}
}

const driverMarkerProps = {
  url: deliveryTruck,
  scaledSize:{width:50,height:50},
  origin: {x:0,y:0},
  anchor: {x:20,y:-20}
} as google.maps.Icon

const tasksMarkerProps = {
  url: marker,
  origin: {x:0,y:0},
  scaledSize: {width: 50, height: 50},
  anchor: {x:0,y:-20}
} as google.maps.Icon


function getMapCenter(location: Location) : google.maps.LatLng {
  if(!location.latitude || !location.longitude) 
  return new google.maps.LatLng(0,0)
  return  new google.maps.LatLng(parseInt(location.latitude), parseInt(location.longitude))
}

function DriversMap() {
 
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.REACT_APP_API_KEY!
  })



  const {getSelectedDriver,getSelectedDriverTasks,selectedDriverId,tasks} = useAppContext()
  const [map, setMap] = React.useState<google.maps.Map | null>(null)
  const [driverMarker,setDriverMarker]=useState<google.maps.Marker | null>(null);
  const [tasksMarker,setTasksMarker]=useState<google.maps.Marker[]>([]);


  useEffect(() => {
    const selectedDriver = getSelectedDriver()
    const tasks = getSelectedDriverTasks()
    if (map && selectedDriver && tasks) {
      const driverLatLng = getMapCenter(selectedDriver.location)
      const driverMarker = new window.google.maps.Marker({
        position: driverLatLng,
        map: map,
        icon: driverMarkerProps
      });
      setDriverMarker(driverMarker);

      const markers:google.maps.Marker[] = [];

      map.moveCamera({center: getMapCenter(selectedDriver.location)})

      tasks.forEach((task) => {
        const taskLatLng = getMapCenter(task.location)
        const taskMarker = new window.google.maps.Marker({
          position: taskLatLng,
          map: map,
          icon: tasksMarkerProps
        });
        markers.push(taskMarker);
      });
      setTasksMarker(markers);
    }
  }, [map, selectedDriverId, tasks]);

  const onLoad = React.useCallback(function callback(map : google.maps.Map) {
    // This is just an example of getting and using the map instance!!! don't just blindly copy!
    const bounds = new window.google.maps.LatLngBounds(center);

    map.fitBounds(bounds);
    setMap(map)
  }, [])

  const onUnmount = React.useCallback(function callback(map : google.maps.Map) {
    setMap(null)
  }, [])



  const Markers = useCallback(() => {
    const selectedDriver = getSelectedDriver()
    const tasks = getSelectedDriverTasks()
    if(!selectedDriver || !tasks) return null
    return <>
     {tasksMarker.map((marker, index) => (
              <Marker key={index} label="location" position={marker.getPosition()!} icon={tasksMarkerProps} />
            ))
        } 
    </>
  },[selectedDriverId,tasks])

  return isLoaded ? (
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={10}
        onLoad={onLoad}
        onUnmount={onUnmount}
      >
        { /* Child components, such as markers, info windows, etc. */ }
        <></>
        {driverMarker && 
        <Marker position={driverMarker.getPosition()!}  icon={driverMarkerProps}/>}
        
        <Markers/>
      </GoogleMap>
  ) : <></>
}

export default React.memo(DriversMap)
