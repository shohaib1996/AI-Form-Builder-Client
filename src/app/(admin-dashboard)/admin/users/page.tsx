"use client"

import { useState, useEffect } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Pagination from "@/components/forms/Pagination" // Assuming this component exists
import { fetchAllUsers, updateUserPlan, updateUserRole } from "@/lib/api" // Assuming these functions exist
import { toast } from "sonner" // Assuming sonner is configured

interface User {
  _id: string
  name: string
  email: string
  planType: "normal" | "premium"
  role?: "user" | "admin" // Made optional to handle existing data without role
  formCount: number
  responseCount: number
}

interface UsersResponse {
  success: boolean
  data: User[]
  meta: {
    page: number
    limit: number
    total: number
  }
}

const UsersPage = () => {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(10)
  const [total, setTotal] = useState(0)
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
    const loadUsers = async () => {
      setLoading(true)
      try {
        const response = await fetchAllUsers(page, limit, searchTerm)
        setUsers(response.data)
        setTotal(response.meta.total)
      } catch (error) {
        toast.error("Failed to fetch users.")
      } finally {
        setLoading(false)
      }
    }
    loadUsers()
  }, [page, limit, searchTerm])

  const handleUpdatePlan = async (userId: string, currentPlan: "normal" | "premium") => {
    const newPlan = currentPlan === "normal" ? "premium" : "normal"
    try {
      await updateUserPlan(userId, { planType: newPlan })
      setUsers(users.map((user) => (user._id === userId ? { ...user, planType: newPlan } : user)))
      toast.success(`User plan updated to ${newPlan}.`)
    } catch (error) {
      toast.error("Failed to update user plan.")
    }
  }

  const handleUpdateRole = async (userId: string, currentRole: "user" | "admin") => {
    const newRole = currentRole === "user" ? "admin" : "user"
    try {
      await updateUserRole(userId, { role: newRole })
      setUsers(users.map((user) => (user._id === userId ? { ...user, role: newRole } : user)))
      toast.success(`User role updated to ${newRole}.`)
    } catch (error) {
      toast.error("Failed to update user role.")
    }
  }

  return (
    <div className="space-y-4 w-full min-w-0 overflow-x-auto">
      {/* Header: Title and Search Bar */}
      <div className="flex justify-between items-center flex-col sm:flex-row gap-4">
        <h2 className="text-2xl font-bold text-left w-full sm:w-auto">User Management</h2>
        <Input
          placeholder="Search by name or email..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full sm:w-64"
        />
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-md border">
        <Table className="">
          <TableHeader>
            <TableRow>
              <TableHead className="w-[150px]">Name</TableHead>
              <TableHead className="w-[200px]">Email</TableHead>
              <TableHead className="w-[120px]">Plan</TableHead>
              <TableHead className="w-[120px]">Role</TableHead>
              <TableHead className="w-[100px]">Forms</TableHead>
              <TableHead className="w-[120px]">Responses</TableHead>
              <TableHead className="w-[200px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center">
                  Loading...
                </TableCell>
              </TableRow>
            ) : users.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center">
                  No users found.
                </TableCell>
              </TableRow>
            ) : (
              users.map((user) => (
                <TableRow key={user._id}>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.planType}</TableCell>
                  <TableCell>{user.role || "user"}</TableCell> {/* Display role directly, default to "user" */}
                  <TableCell>{user.formCount}</TableCell>
                  <TableCell>{user.responseCount}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" onClick={() => handleUpdatePlan(user._id, user.planType)}>
                        {user.planType === "normal" ? "Upgrade to Premium" : "Downgrade to Normal"}
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleUpdateRole(user._id, user.role || "user")}
                      >
                        {(user.role || "user") === "user" ? "Make Admin" : "Make User"}
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Total Users Count */}
      <div className="text-sm text-muted-foreground mt-4">Total Users: {total}</div>

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
  )
}

export default UsersPage
