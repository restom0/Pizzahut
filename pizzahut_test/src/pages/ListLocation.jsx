import {
  Avatar,
  Button,
  Card,
  IconButton,
  List,
  ListItem,
  ListItemPrefix,
  Typography,
} from "@material-tailwind/react";
import React from "react";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import MyLocationIcon from "@mui/icons-material/MyLocation";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import axios from "axios";
function ListLocation() {
  const [locations, setLocations] = React.useState(
    JSON.parse(localStorage.getItem("locations")) || []
  );
  const [search, setSearch] = React.useState("");
  const [filteredLocations, setFilteredLocations] = React.useState([]);
  const [location, setlocation] = React.useState("");
  const findLocations = async (search) => {
    try {
      const response = await axios.get(
        "http://api.weatherapi.com/v1/search.json?key=1f6ced3bfab143cda1e44028240205&q=" +
          search,
        {
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setFilteredLocations(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  const deleteLocation = (name, index) => {
    let curlocations = JSON.parse(localStorage.getItem("locations")) || [];
    curlocations.splice(index, 1);
    localStorage.setItem("locations", JSON.stringify(curlocations));
    setLocations(JSON.parse(localStorage.getItem("locations")) || []);
  };
  const addLocation = async () => {
    try {
      const response = await axios.post(
        "http://api.weatherapi.com/v1/current.json?key=1f6ced3bfab143cda1e44028240205&q=" +
          location +
          "&aqi=yes",
        {
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      let curlocations = JSON.parse(localStorage.getItem("locations")) || [];
      curlocations.push(response.data);
      localStorage.setItem("locations", JSON.stringify(curlocations));
      setlocation("");
      setFilteredLocations([]);
      setLocations(JSON.parse(localStorage.getItem("locations")) || []);
      setSearch("");
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div>
      <div className="container mx-auto w-full h-screen overflow-x-auto lg:w-96 border-2 bg-blue-500/100 text-white">
        <div className="grid grid-cols-6">
          <IconButton
            variant="text"
            className="m-3 text-center rounded-full col-span-1"
          >
            <ArrowBackIosIcon className="ps-1 text-white" />
          </IconButton>
          <div className="col-span-4 text-center my-5">
            <p>Manage cities</p>
          </div>
        </div>
        <div className="m-3 items-center gap-x-2 flex my-5">
          <div className="relative flex w-full gap-2 md:w-max">
            <div className="relative h-10 w-full min-w-[270px]">
              <input
                type="search"
                placeholder="Search location"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="peer h-full w-full rounded-[7px] border border-blue-gray-200 border-t-transparent !border-t-blue-gray-300 bg-blue-gray-100 px-3 py-2.5 pl-9 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder:text-blue-gray-300 placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2  focus:!border-blue-gray-300 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
              />
              <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-500 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all before:content-none after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all after:content-none peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-gray-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500"></label>
            </div>
            <div className="!absolute left-3 top-[13px] text-black">
              <svg
                width="13"
                height="14"
                viewBox="0 0 14 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9.97811 7.95252C10.2126 7.38634 10.3333 6.7795 10.3333 6.16667C10.3333 4.92899 9.84167 3.742 8.9665 2.86683C8.09133 1.99167 6.90434 1.5 5.66667 1.5C4.42899 1.5 3.242 1.99167 2.36683 2.86683C1.49167 3.742 1 4.92899 1 6.16667C1 6.7795 1.12071 7.38634 1.35523 7.95252C1.58975 8.51871 1.93349 9.03316 2.36683 9.4665C2.80018 9.89984 3.31462 10.2436 3.88081 10.4781C4.447 10.7126 5.05383 10.8333 5.66667 10.8333C6.2795 10.8333 6.88634 10.7126 7.45252 10.4781C8.01871 10.2436 8.53316 9.89984 8.9665 9.4665C9.39984 9.03316 9.74358 8.51871 9.97811 7.95252Z"
                  fill="#000000"
                ></path>
                <path
                  d="M13 13.5L9 9.5M10.3333 6.16667C10.3333 6.7795 10.2126 7.38634 9.97811 7.95252C9.74358 8.51871 9.39984 9.03316 8.9665 9.4665C8.53316 9.89984 8.01871 10.2436 7.45252 10.4781C6.88634 10.7126 6.2795 10.8333 5.66667 10.8333C5.05383 10.8333 4.447 10.7126 3.88081 10.4781C3.31462 10.2436 2.80018 9.89984 2.36683 9.4665C1.93349 9.03316 1.58975 8.51871 1.35523 7.95252C1.12071 7.38634 1 6.7795 1 6.16667C1 4.92899 1.49167 3.742 2.36683 2.86683C3.242 1.99167 4.42899 1.5 5.66667 1.5C6.90434 1.5 8.09133 1.99167 8.9665 2.86683C9.84167 3.742 10.3333 4.92899 10.3333 6.16667Z"
                  stroke="#000000"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
              </svg>
            </div>
          </div>
          <IconButton
            variant="text"
            className="select-none rounded-full bg-blue-gray-100 mx-auto text-center align-middle font-sans text-xs font-bold uppercase shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
            type="button"
            onClick={() => findLocations(search)}
          >
            <MyLocationIcon sx={{ fontSize: "12pt" }} />
          </IconButton>
        </div>
        <List className="text-white">
          {/* <ListItem>
            <ListItemPrefix>
              <div>
                <Typography variant="h6" color="blue-gray">
                  Tania Andrew
                </Typography>
                <Typography
                  variant="small"
                  color="gray"
                  className="font-normal"
                >
                  Software Engineer @ Material Tailwind
                </Typography>
              </div>
            </ListItemPrefix>
            <div>
              <Typography variant="h6" color="blue-gray">
                19&deg;C
              </Typography>
            </div>
          </ListItem> */}
          {filteredLocations.map((location, index) => (
            <ListItem
              key={index}
              className="text-white"
              onClick={() => setlocation(location.name)}
            >
              <ListItemPrefix>
                <div>
                  <Typography variant="h6" color="white">
                    {location.name +
                      ", " +
                      location.region +
                      ", " +
                      location.country}
                  </Typography>
                  <Typography
                    variant="small"
                    color="gray"
                    className="font-normal"
                  >
                    {"Latitude: " +
                      location.lat +
                      ", Longitude: " +
                      location.lon}
                  </Typography>
                </div>
              </ListItemPrefix>
            </ListItem>
          ))}
          {filteredLocations.length === 0 &&
            locations.map((location, index) => (
              <ListItem key={index} className="grid grid-cols-6 text-white">
                <Button
                  variant="text"
                  className="col-span-1 mx-auto text-red-900"
                  onClick={() => deleteLocation(location.name, index)}
                >
                  <DeleteOutlineIcon />
                </Button>
                <ListItemPrefix className="col-span-4">
                  <div className="">
                    <Typography className="" variant="h6" color="white">
                      {location.location.name}
                    </Typography>
                    <Typography
                      variant="small"
                      color="white"
                      className="font-normal"
                    >
                      {"AQI: " + location.current.air_quality.pm10 + " PM10"}
                    </Typography>
                  </div>
                </ListItemPrefix>
                <div>
                  <Typography variant="h6" color="white">
                    {location.current.temp_c}&deg;C
                  </Typography>
                </div>
              </ListItem>
            ))}
        </List>
        <div className="px-5">
          <Button
            disabled={location === "" ? true : false}
            variant="text"
            color="white"
            className="rounded-full w-full h-10"
            onClick={() => addLocation()}
          >
            Add Location
          </Button>
        </div>
      </div>
    </div>
  );
}

export default ListLocation;
