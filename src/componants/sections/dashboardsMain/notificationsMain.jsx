import React from 'react'
import DashboardHeader from '../../ui/DashboardHeader'
import Notification from '../../ui/Notification'
import BackToTopButton from '../../ui/BackToTopButton'

const notificationsMain = () => {
  return (
    <div className=''>
      {/* Header */}
      <DashboardHeader h1="Notification" />

      {/* Notifications */}
      <Notification />

      {/* Back to Top Button */}
      <BackToTopButton />

      {/* Pagination */}
      
      
      
    </div>
  )
}

export default notificationsMain