import React,{useState} from "react";

export const MissionContext = React.createContext();

export const MissionProvider = (props) => {
  const [missions, setMission] = useState([]);

  const getMissions = () => {
    return fetch(`${process.env.REACT_APP_DATABASE_URL}/missions`, {
      headers: {
        Authorization: `Token ${localStorage.getItem("lu_token")}`,
      },
    })
      .then((response) => response.json())
      .then(setMission);
  };

  const addMission = newMission => {
    return fetch(`${process.env.REACT_APP_DATABASE_URL}/missions`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${localStorage.getItem("lu_token")}`,
        },
        body: JSON.stringify(newMission)
    })
        .then(getMissions)
    };

  const getMissionById = (id) => {
    return fetch(`${process.env.REACT_APP_DATABASE_URL}/missions/${id}`, {
        headers: {
            Authorization: `Token ${localStorage.getItem("lu_token")}`
        }
    })
    .then(res => res.json())
  }

  const deleteMission = (missionID) => {
    return fetch(`${process.env.REACT_APP_DATABASE_URL}/missions/${missionID}`, {
      method: "DELETE",
      headers: {
          Authorization: `Token ${localStorage.getItem("lu_token")}`
      }
    })
    .then(getMissions)
  }

  const editMission = (mission) => {
    return fetch(`${process.env.REACT_APP_DATABASE_URL}/missions/${mission.id}`, {
      method: 'PUT',
      headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${localStorage.getItem("lu_token")}`,
      },
      body: JSON.stringify(mission)
    })
      .then(getMissions)
      }  

  return (
    <MissionContext.Provider value={{ 
      missions,
      addMission,
      getMissions,
      editMission,
      deleteMission,
      getMissionById
      }}>
      {props.children}
    </MissionContext.Provider>
  );
}; 