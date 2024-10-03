
import React from 'react'
import { useLocation } from 'react-router-dom';
import DatabaseSetting from './DatabaseSetting';

const SettingLayout = () => {
  const location = useLocation();
//   const { id } = useParams();

  if (location.pathname === '/settings/database-settings') {
    return <DatabaseSetting />;
  } else {
    return <DatabaseSetting />; // Default view
  }
}

export default SettingLayout