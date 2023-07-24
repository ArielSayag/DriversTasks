
type Location = { longitude:string | undefined, latitude:string }

interface Driver {
  id: string;
  name: string;
  age: string;
  location:Location;
}

interface Task {
  id: string;
  title:string;
  scheduled_for: string;
  assign_to: string;
  address: string;
  location:Location;
}

interface ApiResponse {
  data: {
    drivers:Driver[],
    tasks:Task[]
  }
}

export {
  Driver,
  Task,
  Location,
  ApiResponse
}

