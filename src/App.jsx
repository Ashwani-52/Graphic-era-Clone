import { useState } from 'react'
import IDCard from './IDCard.jsx'
import ReportViewer from './ReportViewer.jsx'

export default function App() {
  const [route, setRoute] = useState('home')

  if (route === 'report') {
    return <ReportViewer onBack={() => setRoute('home')} />
  }

  return <IDCard onNavigate={(r) => setRoute(r)} />
}
