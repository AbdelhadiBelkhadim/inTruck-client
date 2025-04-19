import React, { useState, useEffect } from 'react'
import DashboardHeader from '../../ui/DashboardHeader'
import Table from '../../ui/Table'
import SearchBar from '../../ui/SearchBar'

const DeliveriesMain = () => {
  const [originalData] = useState([
    { id: '#DJFJSAD526SAD9', destination: 'Tanger', delivery: 'Delivered', totalCoverage: '15,000' },
    { id: '#DJFJSAD526SAD7', destination: 'Rabat', delivery: 'Delivered', totalCoverage: '8,000' },
    { id: '#DJFJSAD526SAD6', destination: 'Marrakech', delivery: 'Delivered', totalCoverage: '18,000' },
    { id: '#DJFJSAD526SAD5', destination: 'Agadir', delivery: 'Delivered', totalCoverage: '9,500' },
    { id: '#DJFJSAD526SAD3', destination: 'Tangier', delivery: 'Delivered', totalCoverage: '14,000' },
    { id: '#DJFJSAD526SAD2', destination: 'Meknes', delivery: 'Delivered', totalCoverage: '7,500' },
    { id: '#DJFJSAD526SAD9', destination: 'Tanger', delivery: 'Delivered', totalCoverage: '15,000' },
    { id: '#DJFJSAD526SAD7', destination: 'Rabat', delivery: 'Delivered', totalCoverage: '8,000' },
    { id: '#DJFJSAD526SAD6', destination: 'Marrakech', delivery: 'Delivered', totalCoverage: '10,000' },
    { id: '#DJFJSAD526SAD5', destination: 'Agadir', delivery: 'Delivered', totalCoverage: '9,0000' },
    { id: '#DJFJSAD526SAD3', destination: 'Tangier', delivery: 'Delivered', totalCoverage: '10,000' },
    { id: '#DJFJSAD526SAD2', destination: 'Meknes', delivery: 'Delivered', totalCoverage: '7,000' },
  ])

  const [tableData, setTableData] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 6

  useEffect(() => {
    setTableData(originalData)
  }, [originalData])

  useEffect(() => {
    let filtered = [...originalData]

    if (searchTerm) {
      filtered = filtered.filter(item =>
        item.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.destination.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    setTableData(filtered)
    setCurrentPage(1) // Reset to first page on search/filter change
  }, [searchTerm, originalData])

  const handlePageChange = (page) => {
    setCurrentPage(page)
  }

  const handleSearch = (term) => {
    setSearchTerm(term)
  }

  // Map data to include "state" field for Table component styling
  const mappedData = tableData.map(item => ({
    ...item,
    state: item.delivery
  }))

  const paginatedData = mappedData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  return (
    <div>
      {/* Header */}
      <DashboardHeader h1="Deliveries" />

      <SearchBar onSearch={handleSearch} />

      <Table 
        data={paginatedData} 
        totalItems={tableData.length}
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />

    </div>
  )
}

export default DeliveriesMain
