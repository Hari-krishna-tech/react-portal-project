import React, { useState, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import cronstrue from 'cronstrue';
import Cron from 'cron-validate'
import zod from 'zod';
import './ReportSchedulerCreateJob.css';

const jobSchema = zod.object({
  jobName: zod.string().min(1).max(50),
  sqlQuery: zod.array(zod.string().min(1).max(1000)).min(1),
  databaseUrl: zod.string().url(),
  databaseName: zod.string().min(1).max(50),
  databaseUsername: zod.string().min(1).max(50),
  databasePassword: zod.string().min(1).max(50),
  keyUserEmail: zod.array(zod.string().email()),
  // it can be empty [""]
  cc:  zod.array(zod.string().email()).optional(),
  emailBody: zod.string().min(1).max(1000),
  emailSubject: zod.string().min(1).max(100),
  cronFrequency: zod.string().min(1),
  startDateTime: zod.string(),
  endDateTime: zod.string()
});

const CreateJob = () => {
  const [formData, setFormData] = useState({
    jobName: "",
    sqlQuery: [""],
    databaseUrl: "",
    databaseName: "",
    databaseUsername: "", 
    databasePassword: "",
    keyUserEmail: [""],
    cc: [""],
    emailBody: "",
    emailSubject: "",
    cronFrequency: "",
    startDateTime: new Date().toLocaleString("sv-SE", {year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit'}).replace(" ", "T"),
    endDateTime: new Date().toLocaleString("sv-SE", {year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit'}).replace(" ", "T"),
  });

  const [cronFrequency, setCronFrequency] = useState('0 * * * *');
  const [selectDatabase, setSelectDatabase] = useState("jdbc:mysql://")

  const linkRef = useRef(null);

  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleArrayChange = (e, index, field) => {
    const newArray = [...formData[field]];
    newArray[index] = e.target.value;
    setFormData({
      ...formData,
      [field]: newArray
    });
  };
  const deleteArrayField = (field, index) => {
    
    const newArray = [...formData[field]];
    if(newArray.length == 1) return;
    newArray.splice(index, 1);
    setFormData({
     ...formData,
      [field]: newArray
    });
  }

  const addArrayField = (field) => {
    setFormData({
      ...formData,
      [field]: [...formData[field], ""]
    });
  };

  const closeModal = () => {
    setShowModal(false);
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    const finalForm = {
      ...formData, 
      cronFrequency,
      databaseUrl: selectDatabase + formData.databaseUrl + "/" + formData.databaseName,
      startDateTime: new Date(formData.startDateTime).toISOString(),
      endDateTime: new Date(formData.endDateTime).toISOString()
    }
    
   // console.log(zod.isValid(finalForm));
   const result = jobSchema.safeParse(finalForm);
    if(!result.success || !Cron(cronFrequency).isValid()) {
      setShowModal(true);
      console.log(result.error.message);
      return;
    }

    
    
    console.log(result.data);
    axios.post(`http://localhost:8080/api/jobs`, result.data).then(res => {
      console.log(res.data);

      setFormData({
        jobName: "",
        sqlQuery: [""],
        databaseUrl: "",
        databaseName: "",
        databaseUsername: "", 
        databasePassword: "",
        keyUserEmail: [""],
        cc:[""],
        emailBody: "",
        emailSubject: "",
        cronFrequency: "* * * * *",
        startDateTime: new Date().toISOString().slice(0,16),
        endDateTime: new Date().toISOString().slice(0, 16),
      });
      // navigate("/reportscheduler/jobs");
      linkRef.current.click();
    }).catch(error => {
      console.log(error);
      // todo for future show modal about error from the backend
    });
  };

  return (
    <>
    <div className="create-job-container">
      <div className="create-job-form">
        <h1 className="form-title"><i className="fas fa-calendar-plus"></i> Create New Job</h1>
        <form className="job-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label><i className="fas fa-tag"></i> Job Name</label>
            <input name='jobName' value={formData.jobName} type="text" onChange={handleChange} />
          </div>
          <div className="form-group">
            <label><i className="fas fa-database"></i> SQL Queries</label>
            {formData.sqlQuery.map((query, index) => (
              <div key={index} className="array-input">
                <textarea value={query} name='sqlQuery' rows="2" onChange={(e) => handleArrayChange(e, index, 'sqlQuery')}></textarea>
                <button type="button" className="icon-button add" onClick={() => addArrayField('sqlQuery')}>
                  <i className="fas fa-plus"></i>
                </button>
                <button type="button" className="icon-button remove" onClick={() => deleteArrayField('sqlQuery', index)}>
                  <i className="fas fa-minus"></i>
                </button>
              </div>
            ))}
          </div>

          <div className="form-group">
            <label><i className="fas fa-server"></i> Select Database</label>
            <select id="database" value={selectDatabase} onChange={() => setSelectDatabase(selectDatabase)}>
              <option value="jdbc:mysql://">MySQL</option>
              <option value="jdbc:postgresql://">PostgreSQL</option>
              <option value="jdbc:sqlserver://">MS SQL</option>
            </select>
          </div>
          <div className="form-group">
            <label><i className="fas fa-link"></i> Database Server URL</label>
            <input value={formData.databaseUrl} name='databaseUrl' type="text" onChange={handleChange} />
          </div>
          <div className="form-group">
            <label><i className="fas fa-database"></i> Database Name</label>
            <input value={formData.databaseName} name='databaseName' type="text" onChange={handleChange} />
          </div>
          <div className="form-group">
            <label><i className="fas fa-user"></i> Database Username</label>
            <input value={formData.databaseUsername} name='databaseUsername' type="text" onChange={handleChange}/>
          </div>
          <div className="form-group">
            <label><i className="fas fa-key"></i> Database Password</label>
            <input value={formData.databasePassword} name='databasePassword' type="password" onChange={handleChange}/>
          </div>
          <div className="form-group">
            <label><i className="fas fa-envelope"></i> Key User Emails</label>
            {formData.keyUserEmail.map((email, index) => (
              <div key={index} className="array-input">
                <input value={email} name='keyUserEmail' type="email" onChange={(e) => handleArrayChange(e, index, 'keyUserEmail')} />
                <button type="button" className="icon-button add" onClick={() => addArrayField('keyUserEmail')}>
                  <i className="fas fa-plus"></i>
                </button>
                <button type="button" className="icon-button remove" onClick={() => deleteArrayField('keyUserEmail', index)}>
                  <i className="fas fa-minus"></i>
                </button>
              </div>
            ))}
          </div>
          <div className="form-group">
            <label><i className="fas fa-envelope"></i> CC Emails</label>
            {formData.cc.map((email, index) => (
              <div key={index} className="array-input">
                <input value={email} name='cc' type="email" onChange={(e) => handleArrayChange(e, index, 'cc')} />
                <button type="button" className="icon-button add" onClick={() => addArrayField('cc')}>
                  <i className="fas fa-plus"></i>
                </button>
                <button type="button" className="icon-button remove" onClick={() => deleteArrayField('cc', index)}>
                  <i className="fas fa-minus"></i>
                </button>
              </div>
            ))}
          </div>
          <div className="form-group">
            <label><i className="fas fa-heading"></i> Email Subject</label>
            <input value={formData.emailSubject} name='emailSubject' type="text" onChange={handleChange}/>
          </div>
          <div className="form-group">
            <label><i className="fas fa-envelope-open-text"></i> Email Body</label>
            <textarea value={formData.emailBody} name='emailBody' rows="4" onChange={handleChange}></textarea>
          </div>
          <div className="form-group">
            <label><i className="fas fa-clock"></i> Cron Frequency</label>
            <input value={cronFrequency} name='cronFrequency' type="text" onChange={(e)=>setCronFrequency(e.target.value)}/>
            <p className="cron-description">{Cron(cronFrequency).isValid() ? cronstrue.toString(cronFrequency) : "Enter Valid Expression"}</p>
          </div>
          <div className="form-group">
            <label><i className="fas fa-play"></i> Start Date</label>
            <input defaultValue={formData.startDateTime} onChange={handleChange} type="datetime-local" id="startTime" name="startDateTime" required />
          </div>
          <div className="form-group">
            <label><i className="fas fa-stop"></i> End Date</label>
            <input defaultValue={formData.endDateTime} onChange={handleChange} type="datetime-local" id="endTime" name="endDateTime" required />
          </div>
          <div className="form-actions">
            <button type="submit" className="btn btn-primary">
              <i className="fas fa-save"></i> Save Job
            </button>
            <button type="button" className="btn btn-danger" onClick={() => navigate("/reportscheduler/jobs")}>
              <i className="fas fa-trash"></i> Cancel
            </button>
          </div>
        </form>
      </div>
    </div>

    {showModal && (
    <EnterCorrectDetailsModal onClose={closeModal} />
    )}
    <Link to="/reportscheduler/jobs" ref={linkRef} style={{display:'none'}} />
        
    </>
  );
};

const EnterCorrectDetailsModal = ({onClose}) => (
    <div className='modal-overlay'>
      <div className='modal'>
        <h3><i className="fas fa-exclamation-triangle"></i> Enter Correct Details</h3>
        <p>Please review your input and ensure all fields are filled correctly.</p>
        <div className='modal-actions'>
          <button className='btn btn-secondary' onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );

export default CreateJob;