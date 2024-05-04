import { IconButton } from "@material-tailwind/react";
import React from "react";

function CurrentLocation() {
  return (
    <div>
      <div className="container mx-auto h-screen" style={{ width: "30%" }}>
        <div className="grid grid-cols-6">
          <IconButton variant="text" className="m-3 rounded-full col-span-1">
            <p style={{ fontSize: "18pt" }}>+</p>
          </IconButton>
          <div className="col-span-4">
            <p>Kokatta, West Bengal</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CurrentLocation;
