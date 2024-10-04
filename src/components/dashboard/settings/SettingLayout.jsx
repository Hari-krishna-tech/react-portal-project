
import React from 'react'
import { useLocation } from 'react-router-dom';
import DatabaseSetting from './DatabaseSetting';
import DatabaseSettingList from './DatabaseSettingList';
import UpdateDatabaseSetting from './UpdateDatabaseSetting';

const SettingLayout = () => {
  const location = useLocation();

  if (location.pathname === '/settings/database-settings') {
    return <DatabaseSetting />;
  } else if(location.pathname === '/settings/database-settings/list') {
    return <DatabaseSettingList />;
  } else if(location.pathname.startsWith('/settings/update-database-settings')) {
    return <UpdateDatabaseSetting />;
  } else {
    return <DatabaseSetting />;
  }
}

export default SettingLayout