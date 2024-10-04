import React, {useState} from 'react'
import { useSelector } from 'react-redux'
import zod from 'zod'
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
    updatedAt: null
  })

  const [selectDatabase, setSelectDatabase] = useState("jdbc:mysql://")


  const handleChange = () => {

  }
  return (
    <div className='database-setting-container'>
        <div className='database-setting-form'>
            <h1 className='form-title'><i className='fas fa-gear'></i>Database Setting</h1>
        
    <form className='database-form'>

        <div className="form-group">
            <label><i className="fas fa-gear"></i> Database Setting Name</label>
            <input value={formData.sdatabaseSettingName} name='databaseSettingName' type="text" onChange={handleChange}/>
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

        <div className="form-actions">
            <button type="submit" className="btn btn-primary">
              <i className="fas fa-save"></i> Save Database Setting
            </button>
            <button type="button" className="btn btn-danger" onClick={() => navigate("/reportscheduler/jobs")}>
              <i className="fas fa-trash"></i> Cancel
            </button>
          </div>
        </form>
       </div>
    </div>
  )
}

export default DatabaseSetting