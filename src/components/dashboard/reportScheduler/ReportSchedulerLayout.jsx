import React from 'react';
import { useLocation, useParams } from 'react-router-dom';
import JobsList from './ReportScheduler';
import CreateJob from './ReportSchedulerCreateJob';
import UpdateJob from './ReportSchedulerUpdateJob';

const ReportSchedulerLayout = () => {
  const location = useLocation();
  const { id } = useParams();

  if (location.pathname === '/reportscheduler/jobs') {
    return <JobsList />;
  } else if (location.pathname === '/reportscheduler/create-jobs') {
    return <CreateJob />;
  } else if (location.pathname.startsWith('/reportscheduler/update-job/')) {
    return <UpdateJob jobId={id} />;
  } else {
    return <JobsList />; // Default view
  }
};

export default ReportSchedulerLayout;