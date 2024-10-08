import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import zod from 'zod'
import axios from 'axios'
import './DatabaseSetting.css'

const databaseSettingSchema = zod.object({
    databaseSettingName: zod.string(),
    databaseUrl: zod.string().url(),
    databaseName: zod.string().min(1).max(50),
    databaseUsername: zod.string().min(1).max(50),
    databasePassword: zod.string().min(1).max(50),
    createdBy : zod.string(),
    createdAt: zod.string(),
    updatedBy : zod.string().optional(),
    updatedAt: zod.string().optional(),
    
    // it can be empty [""]
})

const DatabaseSetting = () => {
  const user = useSelector(state => state.auth.user);
  const [formData, setFormData] = useState({
    databaseSettingName: '',
    databaseUrl: '',
    databaseName: '',
    databaseUsername: '',
    databasePassword: '',
    createdBy: user,
    createdAt: new Date().toISOString(),
    updatedBy: '',
    updatedAt: ''
  })

  const [showPassword, setShowPassword] = useState(false);
  const [selectDatabase, setSelectDatabase] = useState("jdbc:mysql://")
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {

      // Reconstruct full database URL
      const fullDatabaseUrl = `${selectDatabase}${formData.databaseUrl}/${formData.databaseName}`;
      const dataToSubmit = {
        ...formData,
        databaseUrl: fullDatabaseUrl
      };
      // add zod test
      const validatedData = databaseSettingSchema.parse(dataToSubmit)
      const response = await axios.post('http://localhost:10000/database-settings/', validatedData);
      if (response.status === 200 || response.status === 201) {
        setShowSuccessModal(true);
        setTimeout(() => setShowSuccessModal(false), 3000);
      }
      setFormData({
        databaseSettingName: '',
        databaseUrl: '',
        databaseName: '',
        databaseUsername: '',
        databasePassword: '',
        createdBy: user,
        createdAt: new Date().toISOString(),
        updatedBy: '',
        updatedAt: null
      })
    } catch (error) {
      console.error('Error saving database settings:', error);
      // Optionally, you can show an error message to the user here
    }
  }

  return (
    <div className='database-setting-container'>
      {showSuccessModal && (
        <div className="success-modal">
          Settings saved successfully!
        </div>
      )}
      <div className='database-setting-form'>
        <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '20px'
        }}>
            <h1 className='form-title'><i className='fas fa-gear'></i>Database Setting</h1>
            <Link to="/settings/database-settings/list" className="btn btn-secondary">
                <i className="fas fa-list"></i> View All Settings
            </Link>
        </div>

        <form className='database-form' onSubmit={handleSubmit}>
            <div className="form-group">
                <label><i className="fas fa-gear"></i> Database Setting Name</label>
                <input value={formData.databaseSettingName} name='databaseSettingName' type="text" onChange={handleChange}/>
            </div>
            <div className="form-group">
                <label><i className="fas fa-server"></i> Select Database</label>
                <select id="database" value={selectDatabase} onChange={(e) => setSelectDatabase(e.target.value)}>
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
            <div className="password-input-wrapper">
              <input 
                value={formData.databasePassword} 
                name='databasePassword' 
                type={showPassword ? "text" : "password"} 
                onChange={handleChange}
              />
              <button 
                type="button" 
                className="password-toggle" 
                onClick={() => setShowPassword(!showPassword)}
              >
                <i className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
              </button>
            </div>
            </div>

            <div className="form-actions">
                <button type="submit" className="btn btn-primary">
                  <i className="fas fa-save"></i> Save Database Setting
                </button>
                {/* <button type="button" className="btn btn-danger" onClick={() => navigate("/reportscheduler/jobs")}>
                  <i className="fas fa-trash"></i> Cancel
                </button> */}
            </div>
        </form>
      </div>
    </div>
  )
}

export default DatabaseSetting