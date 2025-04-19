import React from 'react'
import DashboardHeader from '../../ui/DashboardHeader'
import SearchBar from '../../ui/SearchBar'
import Table from '../../ui/Table'

const CancelledMain = () => {
  return (
    <div>
      {/* Header */}
      <DashboardHeader h1="Cancelled" />

      <SearchBar  />

      {/* Table Component */}     
      <Table />
    </div>
  )
}

export default CancelledMain