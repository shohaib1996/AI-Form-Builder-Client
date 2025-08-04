"use client"
import React, { useState, useCallback, useMemo } from "react"
import { useQuery } from "@tanstack/react-query"
import api from "@/lib/axios"
import { motion } from "framer-motion"
import { Sparkles } from "lucide-react"
import SearchBar from "@/components/forms/SearchBar"
import Pagination from "@/components/forms/Pagination"
import FormsTable from "@/components/forms/FormsTable"
import type { FormResponse } from "@/types/form"
import { useDebounce } from "@/hooks/use-debounce"

const MyForms = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(10)

  // Debounce search term to avoid too many API calls
  const debouncedSearchTerm = useDebounce(searchTerm, 500)

  // Reset to first page when search term changes
  React.useEffect(() => {
    setCurrentPage(1)
  }, [debouncedSearchTerm])

  // Fetch forms with pagination and search
  const { data, isLoading, error } = useQuery({
    queryKey: ["forms", currentPage, itemsPerPage, debouncedSearchTerm],
    queryFn: async (): Promise<FormResponse> => {
      const params = new URLSearchParams({
        page: currentPage.toString(),
        limit: itemsPerPage.toString(),
      })

      if (debouncedSearchTerm.trim()) {
        params.append("searchTerm", debouncedSearchTerm.trim())
      }

      const res = await api.get(`/form?${params.toString()}`)
      return res.data
    },
    // Use placeholderData instead of keepPreviousData for React Query v5+
    placeholderData: (previousData) => previousData,
  })

  // Memoized calculations for totalPages
  const totalPages = useMemo(() => {
    // Ensure data and data.meta exist before accessing
    if (!data || !data.meta) {
      return 0
    }
    return Math.ceil(data.meta.total / data.meta.limit)
  }, [data])

  // Handlers for state changes
  const handleSearchChange = useCallback((value: string) => {
    setSearchTerm(value)
  }, [])

  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page)
  }, [])

  const handleItemsPerPageChange = useCallback((newItemsPerPage: number) => {
    setItemsPerPage(newItemsPerPage)
    setCurrentPage(1) // Reset to first page when changing items per page
  }, [])

  // Initial loading state (when no data is present yet)
  if (isLoading && !data) {
    return (
      <div className="flex items-center h-screen justify-center w-[90vw] md:w-[70vw] lg:w-[80vw] mx-auto">
        <motion.div
          className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center animate-spin"
          whileHover={{ rotate: 360 }}
          transition={{ duration: 0.5 }}
        >
          <Sparkles className="w-5 h-5 text-white" />
        </motion.div>
      </div>
    )
  }

  // Error state
  if (error) {
    return (
      <div className="p-4">
        <div className="text-center py-8">
          <p className="text-red-500">Error loading forms. Please try again.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="p-4 space-y-6">
      {/* Header and Search Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">My Forms</h1>
          {data?.meta && (
            <p className="text-muted-foreground">
              {data.meta.total} form{data.meta.total !== 1 ? "s" : ""} total
            </p>
          )}
        </div>
        <SearchBar
          searchTerm={searchTerm}
          onSearchChange={handleSearchChange}
          placeholder="Search forms by title or ID..."
        />
      </div>

      {/* Loading overlay for subsequent requests (when data is already present) */}
      <div className="relative">
        {isLoading && data && (
          <div className="absolute inset-0 bg-background/50 backdrop-blur-sm z-10 flex items-center justify-center">
            <motion.div
              className="w-6 h-6 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center animate-spin"
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.5 }}
            >
              <Sparkles className="w-4 h-4 text-white" />
            </motion.div>
          </div>
        )}

        {/* Forms Table */}
        <FormsTable forms={data?.data || []} />
      </div>

      {/* Pagination Controls */}
      {data?.meta && totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={data.meta.total}
          itemsPerPage={itemsPerPage}
          onPageChange={handlePageChange}
          onItemsPerPageChange={handleItemsPerPageChange}
        />
      )}

      {/* Empty State */}
      {data?.data.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground text-lg">
            {debouncedSearchTerm
              ? `No forms found matching "${debouncedSearchTerm}"`
              : "No forms found. Create your first form to get started!"}
          </p>
        </div>
      )}
    </div>
  )
}

export default MyForms
