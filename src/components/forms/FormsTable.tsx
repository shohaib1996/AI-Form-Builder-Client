"use client"
import type React from "react"
import { useState } from "react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import api from "@/lib/axios"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { toast } from "sonner"
import Link from "next/link"
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table"
import { Copy, Eye, Trash, Link2 } from "lucide-react"
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog"
import { useRouter } from "next/navigation"
import type { Form } from "@/types/form"

interface FormsTableProps {
  forms: Form[]
}

const FormsTable: React.FC<FormsTableProps> = ({ forms }) => {
  const router = useRouter()
  const queryClient = useQueryClient()
  const [deleteId, setDeleteId] = useState<string | null>(null)

  // Publish/unpublish mutation
  const publishMutation = useMutation({
    mutationFn: async ({
      id,
      isPublished,
    }: {
      id: string
      isPublished: boolean
    }) => {
      const res = await api.patch(`/form/${id}/publish`, { isPublished })
      return res.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["forms"] })
      toast.success("Publish status updated!")
    },
    onError: () => {
      toast.error("Failed to update publish status.")
    },
  })

  // Delete mutation
  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      await api.delete(`/form/${id}`)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["forms"] })
      toast.success("Form deleted!")
      setDeleteId(null)
    },
    onError: () => {
      toast.error("Failed to delete form.")
      setDeleteId(null)
    },
  })

  // Copy to clipboard handler
  const handleCopy = (id: string) => {
    navigator.clipboard.writeText(id)
    toast.success("Form ID copied!")
  }
  const handleCopyLink = (id: string) => {
    const formUrl = `${window.location.origin}/forms/${id}`
    navigator.clipboard.writeText(formUrl)
    toast.success("Form link copied!")
  }

  return (
    <div className="overflow-x-auto rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="min-w-[150px]">Form ID</TableHead>
            <TableHead className="min-w-[150px]">Title</TableHead>
            <TableHead className="min-w-[200px]">Description</TableHead>
            <TableHead className="text-center">Published</TableHead>
            <TableHead className="min-w-[150px]">Template ID</TableHead>
            <TableHead className="min-w-[280px] text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {forms.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="h-24 text-center text-muted-foreground">
                No forms found.
              </TableCell>
            </TableRow>
          ) : (
            forms.map((form) => (
              <TableRow key={form._id}>
                <TableCell className="font-medium flex items-center gap-2">
                  <span className="truncate max-w-[100px]">{form._id}</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleCopy(form._id)}
                    className="p-1 hover:bg-muted rounded transition cursor-pointer outline-0"
                    title="Copy Form ID"
                  >
                    <Copy className="w-4 h-4 text-muted-foreground" />
                  </Button>
                </TableCell>
                <TableCell className="truncate max-w-[150px]">{form.title}</TableCell>
                <TableCell className="truncate max-w-[200px] text-muted-foreground" title={form.description}>
                  {form.description || "No description"}
                </TableCell>
                <TableCell className="text-center">
                  <Switch
                    className="cursor-pointer"
                    checked={form.isPublished}
                    onCheckedChange={(checked) =>
                      publishMutation.mutate({
                        id: form._id,
                        isPublished: checked,
                      })
                    }
                  />
                </TableCell>
                <TableCell className="truncate max-w-[150px] text-muted-foreground">
                  {form.templateId || "N/A"}
                </TableCell>
                <TableCell className="flex justify-end gap-2">
                  <Link href={`/forms/${form._id}`} passHref>
                    <Button size="icon" variant="outline" title="View Form" className="cursor-pointer bg-transparent">
                      <Eye className="w-4 h-4" />
                    </Button>
                  </Link>
                  <Button
                    className="cursor-pointer bg-transparent"
                    size="icon"
                    variant="outline"
                    onClick={() => handleCopyLink(form._id)}
                    title="Copy Public Link"
                  >
                    <Link2 className="w-4 h-4 text-muted-foreground" />
                  </Button>
                  <Button
                    className="cursor-pointer bg-transparent"
                    variant="outline"
                    title="View Responses"
                    onClick={() => router.push(`/dashboard/responses/${form._id}`)}
                  >
                    Responses
                  </Button>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button
                        size="icon"
                        variant="destructive"
                        onClick={() => setDeleteId(form._id)}
                        title="Delete Form"
                      >
                        <Trash className="w-4 h-4" />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure you want to delete this form?</AlertDialogTitle>
                        <AlertDialogDescription>
                          This action cannot be undone. This will permanently delete your form and all its data.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel onClick={() => setDeleteId(null)}>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          className="bg-red-500 text-white hover:bg-red-600"
                          onClick={() => {
                            if (deleteId) deleteMutation.mutate(deleteId)
                          }}
                          disabled={deleteMutation.isPending}
                        >
                          {deleteMutation.isPending ? "Deleting..." : "Delete"}
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  )
}

export default FormsTable
