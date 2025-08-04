"use client"

import { useState, useEffect } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Pagination from "@/components/forms/Pagination"
import { fetchAllForms } from "@/lib/api"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { Copy } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface Form {
  _id: string
  title: string
  userId: {
    email: string
  }
  responses: number
  views: number
  createdAt: string // ISO date string
}

interface FormsResponse {
  success: boolean
  data: Form[]
  meta: {
    page: number
    limit: number
    total: number
  }
}

const FormsManagement = () => {
  const [forms, setForms] = useState<Form[]>([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(10)
  const [total, setTotal] = useState(0)
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
    const loadForms = async () => {
      setLoading(true)
      try {
        const response: FormsResponse = await fetchAllForms(page, limit, searchTerm)
        setForms(response.data)
        setTotal(response.meta.total)
      } catch (error) {
        console.log(error)
        toast.error("Failed to fetch forms.")
      } finally {
        setLoading(false)
      }
    }
    loadForms()
  }, [page, limit, searchTerm])

  const handleCopyEmail = (email: string) => {
    navigator.clipboard.writeText(email)
    toast.success("Email copied to clipboard!")
  }

  return (
    <TooltipProvider>
      <div className="space-y-4 w-full min-w-0 overflow-x-auto">
        {/* Header: Title, Total Forms, and Search Bar */}
        <div className="flex justify-between items-baseline lg:items-center flex-col sm:flex-row gap-4">
          <div className="flex flex-col items-start w-full sm:w-auto">
            <h2 className="text-2xl font-bold text-left">Forms Management</h2>
            <div className="text-sm text-muted-foreground">Total Forms: {total}</div>
          </div>
          <Input
            placeholder="Search by form title or creator email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full sm:w-64"
          />
        </div>

        {/* Table */}
        <div className="overflow-x-auto rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[200px]">Form Title</TableHead>
                <TableHead className="w-[200px]">Creator Email</TableHead>
                <TableHead className="w-[120px]">Responses</TableHead>
                <TableHead className="w-[100px]">Views</TableHead>
                <TableHead className="w-[150px]">Date Created</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center">
                    Loading forms...
                  </TableCell>
                </TableRow>
              ) : forms.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center">
                    No forms found.
                  </TableCell>
                </TableRow>
              ) : (
                forms.map((form) => (
                  <TableRow key={form._id}>
                    <TableCell className="font-medium">{form.title}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <span className="max-w-[150px] truncate">{form.userId.email}</span>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-6 w-6 cursor-pointer"
                              onClick={() => handleCopyEmail(form.userId.email)}
                            >
                              <Copy className="h-4 w-4" />
                              <span className="sr-only">Copy email</span>
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Copy email</p>
                          </TooltipContent>
                        </Tooltip>
                      </div>
                    </TableCell>
                    <TableCell>{form.responses ?? 0}</TableCell>
                    <TableCell>{form.views ?? 0}</TableCell>
                    <TableCell>{new Date(form.createdAt).toLocaleDateString()}</TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>

        {/* Pagination */}
        <Pagination
          currentPage={page}
          totalPages={Math.ceil(total / limit)}
          totalItems={total}
          itemsPerPage={limit}
          onPageChange={setPage}
          onItemsPerPageChange={setLimit}
        />
      </div>
    </TooltipProvider>
  )
}

export default FormsManagement
