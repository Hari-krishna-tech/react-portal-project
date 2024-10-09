import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';
import cronstrue from 'cronstrue';
import Cron from 'cron-validate'
import zod from 'zod';
import './ReportSchedulerUpdateJob.css';

const jobSchema = zod.object({
  jobName: zod.string().min(1).max(50),
  sqlQuery: zod.array(zod.string().min(1).max(100000)).min(1),
  databaseSettingsId: zod.number().positive(),
  keyUserEmail: zod.array(zod.string().email()),
  cc: zod.array(zod.string().email()).optional(),
  emailBody: zod.string().min(1).max(1000),
  emailSubject: zod.string().min(1).max(100),
  cronFrequency: zod.string().min(1),
  startDateTime: zod.string(),
  endDateTime: zod.string(),
  createdBy: zod.string(),
  createdAt: zod.string(),
  updatedBy: zod.string(),
  updatedAt: zod.string(),
});

  // Helper function to get local datetime string
  const getLocalDateTime = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    return `${year}-${month}-${day}T${hours}:${minutes}`;
  };

const UpdateJob = ({jobId}) => {
  const user = useSelector(state => state.auth.user);
  const [formData, setFormData] = useState({
    jobName: "",
    sqlQuery: [""],
    databaseSettingsId: -1,
    keyUserEmail: '',
    cc: '',
    emailBody: "",
    emailSubject: "",
    cronFrequency: "",
    startDateTime: "",
    endDateTime: "",
    createdBy: "",
    createdAt: null,
    updatedBy: user,
    updatedAt: getLocalDateTime(),
  });

  const [databaseSettings, setDatabaseSettings] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const linkRef = useRef(null);

  useEffect(() => {
    // Fetch database settings
    axios.get('http://localhost:10000/database-settings/list/id')
      .then(res => setDatabaseSettings(res.data))
      .catch(err => console.error("Error fetching database settings:", err));

    // Fetch job data
    axios.get(`http://localhost:10000/api/jobs/${jobId}`)
      .then(res => {
        const jobData = res.data;
        setFormData({
          ...jobData,
          databaseSettingsId: jobData.databaseSettings.id,
          updatedAt : getLocalDateTime(),
          updatedBy: user,
          keyUserEmail: jobData.keyUserEmail.reduce((acc, key) => acc +";" + key),
          cc: jobData.cc.reduce((acc, cc) => acc +";" + cc)
        });
      })
      .catch(err => console.error("Error fetching job data:", err));
  }, [jobId]);

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
    if(newArray.length === 1) return;
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
    console.log(formData);
    const result = jobSchema.safeParse(formData);
    
    if(!result.success || !Cron(formData.cronFrequency).isValid()) {
      setShowModal(true);
      console.log(result.error?.message);
      return;
    }

    axios.put(`http://localhost:10000/api/jobs/${jobId}`, result.data)
      .then(res => {
        console.log(res.data);
        linkRef.current.click();
      })
      .catch(error => {
        console.log(error);
        // TODO: Show modal about error from the backend
      });
  };

  return (
    <>
      <div className="create-job-container">
        <div className="create-job-form">
          <h1 className="form-title"><i className="fas fa-calendar-plus"></i> Update Job</h1>
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
              <label><i className="fas fa-server"></i> Database Settings</label>
              <select 
                name="databaseSettingsId" 
                value={formData.databaseSettingsId} 
                onChange={handleChange}
              >
                <option value="">Select a database setting</option>
                {databaseSettings.map(setting => (
                  <option key={setting.id} value={setting.id}>
                    {setting.databaseSettingName}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label><i className="fas fa-envelope"></i> Key User Emails</label>
              <textarea
                name="keyUserEmail"
                value={formData.keyUserEmail}
                onChange={handleChange}
                rows="3"
                placeholder="Enter emails separated by semicolons (e.g., user1@example.com;user2@example.com)"
              />
            </div>
            <div className="form-group">
              <label><i className="fas fa-envelope"></i> CC Emails</label>
              <textarea
                name="cc"
                value={formData.cc}
                onChange={handleChange}
                rows="3"
                placeholder="Enter emails separated by semicolons (e.g., cc1@example.com;cc2@example.com)"
              />
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
              <input value={formData.cronFrequency} name='cronFrequency' type="text" onChange={handleChange}/>
              <p className="cron-description">{Cron(formData.cronFrequency).isValid() ? cronstrue.toString(formData.cronFrequency) : "Enter Valid Expression"}</p>
            </div>
            <div className="form-group">
              <label><i className="fas fa-play"></i> Start Date</label>
              <input value={formData.startDateTime} onChange={handleChange} type="datetime-local" id="startTime" name="startDateTime" required />
            </div>
            <div className="form-group">
              <label><i className="fas fa-stop"></i> End Date</label>
              <input value={formData.endDateTime} onChange={handleChange} type="datetime-local" id="endTime" name="endDateTime" required />
            </div>
            <div className="form-actions">
              <button type="submit" className="btn btn-primary">
                <i className="fas fa-save"></i> Update Job
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

export default UpdateJob;