import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useParams, useNavigate } from 'react-router-dom'
import zod from 'zod'
import axios from 'axios'
import './DatabaseSetting.css'

const databaseSettingSchema = zod.object({
    databaseSettingName: zod.string(),
    databaseUrl: zod.string().url(),
    databaseName: zod.string().min(1).max(50),
    databaseUsername: zod.string().min(1).max(50),
    databasePassword: zod.string().min(1).max(50),
    createdBy: zod.string(),
    createdAt: zod.string(),
    updatedBy: zod.string().optional(),
    updatedAt: zod.string().optional(),
})

const UpdateDatabaseSetting = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const user = useSelector(state => state.auth.user)
  const [formData, setFormData] = useState({
    databaseSettingName: '',
    databaseUrl: '',
    databaseName: '',
    databaseUsername: '',
    databasePassword: '',
    createdBy: '',
    createdAt: '',
    updatedBy: user,
    updatedAt: new Date().toISOString()
  })

  const [selectDatabase, setSelectDatabase] = useState("jdbc:mysql://")
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    const fetchDatabaseSetting = async () => {
      try {
        const response = await axios.get(`http://localhost:10000/database-settings/${id}`)
        
        // Extract databaseUrl components
        const fullDatabaseUrl = response.data.databaseUrl;
        const databasePrefix = fullDatabaseUrl.match(/^jdbc:[^:]+:\/\//)[0];
        const remainingUrl = fullDatabaseUrl.replace(databasePrefix, '');
        const [extractedDatabaseUrl, extractedDatabaseName] = remainingUrl.split('/');
        
        setFormData({
          ...response.data,
          databaseUrl: extractedDatabaseUrl,
          databaseName: extractedDatabaseName,
          updatedBy: user,
          updatedAt: new Date().toISOString()
        })
        setSelectDatabase(databasePrefix)
      } catch (error) {
        console.error("Failed to fetch database setting:", error)
      }
    }

    fetchDatabaseSetting()
  }, [id])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      // Reconstruct full database URL
      const fullDatabaseUrl = `${selectDatabase}${formData.databaseUrl}/${formData.databaseName}`;
      const dataToSubmit = {
        ...formData,
        databaseUrl: fullDatabaseUrl
      };
      
      const validatedData = databaseSettingSchema.parse(dataToSubmit)
      await axios.put(`http://localhost:10000/database-settings/${id}`, validatedData)
      navigate("/settings/database-settings/list")
    } catch (error) {
      console.error("Failed to update database setting:", error)
    }
  }

  return (
    <div className='database-setting-container'>
      <div className='database-setting-form'>
        <h1 className='form-title'><i className='fas fa-edit'></i>Update Database Setting</h1>
        
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
              <i className="fas fa-save"></i> Update Database Setting
            </button>
            <button type="button" className="btn btn-danger" onClick={() => navigate("/settings/database-settings")}>
              <i className="fas fa-times"></i> Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default UpdateDatabaseSetting
