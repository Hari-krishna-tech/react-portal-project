import React from 'react';
import { useLocation, useParams } from 'react-router-dom';
import SeasonalInformation from './SeasonalInformation';
import SeasonalInformationLogs from './SeasonalInformationLogs';


const SeasonalInformationLayout = () => {
  const location = useLocation();
//   const { id } = useParams();

  if (location.pathname === '/seasonalinfo/list') {
    return <SeasonalInformation />;
  } else if (location.pathname === '/seasonalinfo/logs') {
    return <SeasonalInformationLogs />;
  } else {
    return <SeasonalInformation />; // Default view
  }
};

export default SeasonalInformationLayout;