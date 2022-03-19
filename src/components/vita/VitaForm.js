import React, {useContext, useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { VitaContext } from "./VitaProvider";
import { JobTypeContext } from "../jobtype/JobtypeProvider";
import { MissionContext } from "../mission/MissionProvider";
import { ProspectContext } from "../prospect/ProspectProvider";

export const VitaForm = () => {
    const history = useNavigate();
    const { addVita } = useContext(VitaContext);
    const { jobtypes, getJobTypes } = useContext(JobTypeContext);
    const { missions, getMissions } = useContext(MissionContext);
    const { prospects, getProspects } = useContext(ProspectContext);
    const [currentVita, setCurrentVita] = useState({
        applicant_id: parseInt(localStorage.getItem("lu_token")),
        job_type_id: "",
        mission_id: "",
        prospect_id: "",
        published: false,
        slug: ""
    });

    useEffect(() => {
        getJobTypes();
        getMissions();
        getProspects();
    },[]);

    const changeVitatState = (e) => {
        const key = e.target.name;
        const newVitaState = { ...currentVita };
        newVitaState[key] = e.target.value;
        setCurrentVita(newVitaState);
      };

      return (
          <form>
               <h2 className="vitaForm__nickname">Create New Vita</h2>
      <fieldset>
        <div className="form-group">
          <label htmlFor="nickname">Vita Nickname: </label>
          <input
            type="text"
            name="slug"
            required
            autoFocus
            className="form-control"
            value={currentVita.slug}
            onChange={changeVitatState}
          />
        </div>
      </fieldset>
      <fieldset>
                <div className="form-group">
                    <label htmlFor="jobtype_id">Select Job Type:</label>
                    <select
                        name="jobtype_id"
                        id="jobtype_id"
                        className="form-control"
                        value={currentVita.jobtype_id}
                        onChange= {changeVitatState}
                        >
                    <option value="0"> Job Type </option>

                    {
                     jobtypes.map((jobtype) => (
                    
                    <option key={jobtype.id} value={jobtype.id}>
                        {jobtype.label}
                        
                    </option>)
                    )
                }
                </select>          
            </div>
            </fieldset>
      <fieldset>
        <div className="form-group">
          <label htmlFor="mission_id">Select Mission Statement:</label>
            <select
            mission_id="mission_id"
            name="mission_id"
            id="mission_id"
            className="form-control"
            value={currentVita.mission_id}
            onChange= {changeVitatState}
            >
              <option value="0"> Mission </option>
              {
                missions.map((mission) => (
                  
                  <option key={mission.id} value={mission.id}>
                    {mission.mission_text}
                    
                  </option>)
                )
              }
            </select>          
        </div>
      </fieldset>
      <fieldset>
        <div className="form-group">
          <label htmlFor="prospect_id">Select Company:</label>
            <select
            prospect_id="prospect_id"
            name="prospect_id"
            id="prospect_id"
            className="form-control"
            value={currentVita.prospect_id}
            onChange= {changeVitatState}
            >
              <option value="0"> Company </option>
              {
                prospects.map((prospect) => (
                  
                  <option key={prospect.id} value={prospect.id}>
                    {prospect.prospect_name}
                    
                  </option>)
                )
              }
            </select>          
        </div>
      </fieldset>

      <button 
        type="submit"
        onClick={(evt) => {
          evt.preventDefault();

          const event = {
              ...currentVita,
              applicant_id: parseInt(localStorage.getItem("lu_token")),
          };

          addVita(event).then(() => history("/vitas"));
        }}
        className="gen_button"
        >
          Create Vita
      </button>
          </form>
      )


}