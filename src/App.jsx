import { useState } from 'react'
import './App.css'
import DailySingleColumnPage from './page/DailySingleColumnPage'
import DailyTwoColumnPage from './page/DailyTwoColumnPage'
import DailyReflectionPage from './page/DailyReflectionPage'
import DailyWorkplaceInfoPage from './page/DailyWorkplaceInfoPage'
import DailyWorkplaceProcessPage from './page/DailyWorkplaceProcessPage'
import DailyCoverPage from './page/DailyCoverPage'
import DailyBookDetailsPage from './page/DailyBookDetailsPage'
import { GlobalProvider } from './context/GlobalContext'

function App() {
  return (
    <GlobalProvider>
      <AppContent />
    </GlobalProvider>
  )
}

function AppContent() {
  const [currentPage, setCurrentPage] = useState('cover')

  const sidebarStyle = {
    width: '260px',
    backgroundColor: '#2c3e50',
    color: '#ecf0f1',
    height: '100vh',
    padding: '24px 16px',
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    position: 'fixed',
    left: 0,
    top: 0
  }

  const mainContentStyle = {
    marginLeft: '260px',
    minHeight: '100vh',
    width: 'calc(100% - 260px)'
  }

  const buttonStyle = (isActive) => ({
    padding: '12px 16px',
    backgroundColor: isActive ? '#34495e' : 'transparent',
    color: '#ecf0f1',
    border: 'none',
    textAlign: 'left',
    cursor: 'pointer',
    borderRadius: '6px',
    fontSize: '15px',
    transition: 'background-color 0.2s',
    fontWeight: isActive ? 'bold' : 'normal'
  })

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      {/* Sidebar */}
      <div style={sidebarStyle}>
        <h2 style={{ margin: '0 0 24px 0', fontSize: '20px', borderBottom: '1px solid #34495e', paddingBottom: '16px' }}>
          สมุดบันทึกสหกิจศึกษา <br/> by ขี้เกียจเขียน
        </h2>
        <button 
          style={buttonStyle(currentPage === 'cover')} 
          onClick={() => setCurrentPage('cover')}
        >
          1. หน้าปกรายงาน
        </button>
        <button 
          style={buttonStyle(currentPage === 'book_details')} 
          onClick={() => setCurrentPage('book_details')}
        >
          2. รายละเอียดเล่ม
        </button>
        <button 
          style={buttonStyle(currentPage === 'workplace')} 
          onClick={() => setCurrentPage('workplace')}
        >
          3. รายงานปฏิบัติงานรายวัน
        </button>
        <button 
          style={buttonStyle(currentPage === 'process')} 
          onClick={() => setCurrentPage('process')}
        >
          4. ผังโครงสร้าง/กระบวนการผลิต
        </button>
        <button 
          style={buttonStyle(currentPage === 'reflection')} 
          onClick={() => setCurrentPage('reflection')}
        >
          5. รายละเอียด/สรุปผล
        </button>
        <button 
          style={buttonStyle(currentPage === 'two')} 
          onClick={() => setCurrentPage('two')}
        >
          6. แบบ 2 คอลัมน์
        </button>
        <button 
          style={buttonStyle(currentPage === 'single')} 
          onClick={() => setCurrentPage('single')}
        >
          7. แบบ 1 คอลัมน์
        </button>
      </div>

      {/* Main Content */}
      <div style={mainContentStyle}>
        {currentPage === 'single' && <DailySingleColumnPage />}
        {currentPage === 'two' && <DailyTwoColumnPage />}
        {currentPage === 'reflection' && <DailyReflectionPage />}
        {currentPage === 'workplace' && <DailyWorkplaceInfoPage />}
        {currentPage === 'process' && <DailyWorkplaceProcessPage />}
        {currentPage === 'cover' && <DailyCoverPage />}
        {currentPage === 'book_details' && <DailyBookDetailsPage />}


      </div>
    </div>
  )
}

export default App
