import { useState } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import './App.css'

import Login from './components/screens/login'
import Register from './components/screens/Register'
import Setting from './components/screens/setting'
import Dashboard from './components/screens/dashboard'
import History from './components/screens/history'
import AddTask from './components/screens/addTask'
import TaskOverview from './components/screens/taskOverview'
import ClashTask from './components/screens/clashTask'
import ReminderAlarm from './components/screens/reminderAlarm'
import Notifications from './components/screens/notifications'
import EditTask from './components/screens/editTask'
import ForwardTask from './components/screens/forwardTask'
import Contacts from './components/screens/contacts'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/addTask" element={<AddTask />} />
        <Route path="/editTask/:taskId" element={<EditTask />} />
        <Route path="/taskOverview/:taskId" element={<TaskOverview />} />
        <Route path="/forwardTask" element={<ForwardTask />} />
        <Route path="/contacts" element={<Contacts />} /> {/* <-- Fixed to uppercase <Contacts /> */}
        <Route path="/clashTask" element={<ClashTask />} />
        <Route path="/reminderAlarm/:alarmId" element={<ReminderAlarm />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/settings" element={<Setting />} />
        <Route path="/history" element={<History />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;