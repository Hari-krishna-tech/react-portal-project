import { lazy } from "react";

export const menuItems = [
  {
    name: "Report Scheduler",
    route: "/reportscheduler",
    role: "ROLE_REPORT_SCHEDULER",
    component: lazy(() =>
      import("../components/dashboard/reportScheduler/ReportSchedulerLayout")
    ),
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
      {
        name: "Update Job",
        role: "ROLE_REPORT_SCHEDULER",
        route: "/reportscheduler/update-job/:id",
      },
    ],
  },
  {
    name: "Seasonal Information",
    route: "/seasonalinfo",
    role: "ROLE_SEASONAL_INFO",
    component: lazy(() =>
      import(
        "../components/dashboard/seasonalInformation/SeasonalInformationLayout"
      )
    ),
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
    component: lazy(() =>
      import("../components/dashboard/userRecertification/UserRecertification")
    ),
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
    component: lazy(() => import("../components/dashboard/outage/Outage")),
    subItems: [
      { name: "Create", role: "ROLE_OUTAGE", route: "/outage/create" },
      { name: "List", role: "ROLE_OUTAGE", route: "/outage/list" },
    ],
  },
  {
    name: "Settings",
    route: "/settings",
    role: "ANY_ROLE",
    component: lazy(() =>
      import("../components/dashboard/settings/SettingLayout")
    ),
    subItems: [
      {
        name: "Database Settings",
        role: "ROLE_DATABASE_SETTING",
        route: "/settings/database-settings",
      },
      {
        name: "Database Settings List",
        role: "ROLE_DATABASE_SETTING",
        route: "/settings/database-settings/list",
      },
      {
        name: "Update Database Settings",
        role: "ROLE_DATABASE_SETTING",
        route: "/settings/update-database-settings/:id",
      },
    ],
  },
];
