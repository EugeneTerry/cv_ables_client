/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { VitaContext } from "./VitaProvider";
import { JobTypeContext } from "../jobtype/JobtypeProvider";
import { MissionContext } from "../mission/MissionProvider";
import { ProspectContext } from "../prospect/ProspectProvider";
import { Button } from "react-bootstrap";


export const VitaForm = () => {
  const history = useNavigate();
  const { addVita, getVitaById, editVita } = useContext(VitaContext);
  const { jobtypes, getJobTypes } = useContext(JobTypeContext);
  const { missions, getMissions } = useContext(MissionContext);
  const { prospects, getProspects } = useContext(ProspectContext);
  const { vitaId } = useParams()

  const [currentVita, setCurrentVita] = useState({
    applicant_id: parseInt(localStorage.getItem("lu_token")),
    jobtype_id: "",
    mission_id: "",
    prospect_id: "",
    published: false,
    slug: ""
  });

  const changeVitatState = (e) => {
    const key = e.target.name;
    const newVitaState = { ...currentVita };
    newVitaState[key] = e.target.value;
    setCurrentVita(newVitaState);
  };

  useEffect(() => {
    getJobTypes();
    getMissions();
    getProspects();
  }, []);

  useEffect(() => {
    if (vitaId) {
      getVitaById(vitaId).then((data) => {
        setCurrentVita(prevState => ({
          ...prevState,
          prospect_id: data.prospect.id,
          mission_id: data.mission.id,
          jobtype_id: data.job_type.id,
          published: data.published,
          slug: data.slug,
          duties: data.duties

        }))
      })

    }

  }, [vitaId])


  return (
    <form className="container">
      <h1 className="vitaForm__nickname">{vitaId ? 'Edit' : 'Create'} Vita</h1>
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
            className="form-select"
            value={currentVita.jobtype_id}
            onChange={changeVitatState}
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
            className="form-select"
            value={currentVita.mission_id}
            onChange={changeVitatState}
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
            className="form-select"
            value={currentVita.prospect_id}
            onChange={changeVitatState}
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
      <Button
        type="submit"
        variant="success"
        onClick={(evt) => {
          evt.preventDefault();

          const event = {
            ...currentVita,
            applicant_id: parseInt(localStorage.getItem("lu_token")),
          };
          if (vitaId) {
            editVita({ ...event, id: vitaId }).then(() => history("/vitas"));
          } else {
            addVita(event).then(() => history("/vitas"));
          }
        }}
        className="gen_button"
      >
        {vitaId ? 'Edit' : 'Create'} Vita
      </Button>

    </form>
  )


}