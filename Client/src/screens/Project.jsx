/* eslint-disable react/prop-types */

import { useLocation } from "react-router-dom"

export default function Project() {

    const location = useLocation();
    const project = location.state.project;

    console.log(project);
    
  return (
    <div>
      Project
    </div>
  )
}
