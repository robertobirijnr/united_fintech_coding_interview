import React from 'react';
import { Navigate } from 'react-router-dom';
import DashboardLayout from 'src/layouts/DashboardLayout';
import MainLayout from 'src/layouts/MainLayout';
import CustomerListView from 'src/views/jobsite/JobsiteView';
import DashboardView from 'src/views/Dashboard';
import NotFoundView from 'src/views/errors/NotFoundView';
import SettingsView from 'src/views/settings';

const routes = [
  {
    path: 'app',
    element: <DashboardLayout />,
    children: [
      { path: 'job_sites', element: <CustomerListView /> },
      { path: 'dashboard', element: <DashboardView /> },
      { path: 'settings', element: <SettingsView /> },
      { path: '*', element: <Navigate to="/404" /> }
    ]
  },
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { path: '404', element: <NotFoundView /> },
      { path: '/', element: <Navigate to="/app/dashboard" /> },
      { path: '*', element: <Navigate to="/404" /> }
    ]
  }
];

export default routes;
