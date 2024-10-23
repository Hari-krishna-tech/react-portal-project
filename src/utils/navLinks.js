export const navLinks = [
  {
    name: "Report Scheduler",
    route: "/reportscheduler",
    role: "ROLE_REPORT_SCHEDULER",
    subItems: [
      {
        name: "Jobs",
        role: "ROLE_REPORT_SCHEDULER",
        route: "/reportscheduler/jobs",
      },
      {
        name: "Create Jobs",
        role: "ROLE_REPORT_SCHEDULER",
        route: "/reportscheduler/create-jobs",
      },
    ],
  },
  {
    name: "Seasonal Information",
    route: "/seasonalinfo",
    role: "ROLE_SEASONAL_INFO",
    subItems: [
      {
        name: "List Seasonal Information",
        role: "ROLE_SEASONAL_INFO",
        route: "/seasonalinfo/list",
      },
      {
        name: "Seasonal Information Logs",
        role: "ROLE_SEASONAL_INFO",
        route: "/seasonalinfo/logs",
      },
    ],
  },
  {
    name: "User Recertification",
    route: "/userrecertification",
    role: "ROLE_USER_RECERTIFICATION",

    subItems: [
      {
        name: "Create Job",
        role: "ROLE_USER_RECERTIFICATION",
        route: "/userrecertification/create-job",
      },
      {
        name: "Show Jobs",
        role: "ROLE_USER_RECERTIFICATION",
        route: "/userrecertification/show-jobs",
      },
    ],
  },
  {
    name: "Outage",
    route: "/outage",
    role: "ROLE_OUTAGE",
    subItems: [
      { name: "Create", role: "ROLE_OUTAGE", route: "/outage/create" },
      { name: "List", role: "ROLE_OUTAGE", route: "/outage/list" },
    ],
  },
  {
    name: "Settings",
    route: "/settings",
    role: "ANY_ROLE",
    subItems: [
      {
        name: "Database Settings",
        role: "ROLE_DATABASE_SETTING",
        route: "/settings/database-settings",
      },
    ],
  },
];
