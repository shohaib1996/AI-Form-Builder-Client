"use client";
import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/lib/axios";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import Link from "next/link";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import { Sparkles, Copy, Eye, Trash, Link2 } from "lucide-react";
import { motion } from "framer-motion";
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
} from "@/components/ui/alert-dialog";
import { useRouter } from "next/navigation";
export interface FieldOption {
  name: string;
  label: string;
  type: 'text' | 'email' | 'number' | 'select'| 'radio' | 'checkbox';
  required: boolean;
  options?: string[];
}

export interface Fields {
  fields: FieldOption[];
}

export interface Form {
  _id: string;
  userId: string;
  title: string;
  description: string;
  fields: Fields;
  isPublished: boolean;
  templateId: string;
  createdAt: string; // or Date if you want to parse
  updatedAt: string; // or Date if you want to parse
  __v: number;
}


const MyForms = () => {
    const router = useRouter();
  const queryClient = useQueryClient();
  const [deleteId, setDeleteId] = useState<string | null>(null);

  // Fetch all forms
  const { data, isLoading, error } = useQuery({
    queryKey: ["forms"],
    queryFn: async () => {
      const res = await api.get("/form");
      return res.data.data;
    },
  });

  // Publish/unpublish mutation
  const publishMutation = useMutation({
    mutationFn: async ({
      id,
      isPublished,
    }: {
      id: string;
      isPublished: boolean;
    }) => {
      const res = await api.patch(`/form/${id}/publish`, { isPublished });
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["forms"] });
      toast.success("Publish status updated!");
    },
    onError: () => {
      toast.error("Failed to update publish status.");
    },
  });

  // Delete mutation
  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      await api.delete(`/form/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["forms"] });
      toast.success("Form deleted!");
      setDeleteId(null);
    },
    onError: () => {
      toast.error("Failed to delete form.");
      setDeleteId(null);
    },
  });

  // Copy to clipboard handler
  const handleCopy = (id: string) => {
    navigator.clipboard.writeText(id);
    toast.success("Form ID copied!");
  };
  const handleCopyLink = (id: string) => {
    const formUrl = `${window.location.origin}/forms/${id}`;
    navigator.clipboard.writeText(formUrl);
    toast.success("Form link copied!");
  };

  if (isLoading) {
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
    );
  }

  if (error) {
    return <div>Error loading forms.</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">My Forms</h1>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Form ID</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Is Published</TableHead>
              <TableHead>Template ID</TableHead>
              <TableHead>Options</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.map((form: Form) => (
              <TableRow key={form._id}>
                <TableCell className="flex items-center gap-2">
                  <span>{form._id}</span>
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
                <TableCell>{form.title}</TableCell>
                <TableCell
                  className="truncate max-w-xs"
                  title={form.description}
                >
                  {form.description}
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
                <TableCell>{form.templateId}</TableCell>
                <TableCell className="flex gap-2">
                  <Link href={`/forms/${form._id}`}>
                    <Button size="icon" variant="outline" title="View" className="cursor-pointer">
                      <Eye className="w-4 h-4" />
                    </Button>
                  </Link>
                  <Button
                    className="cursor-pointer"
                    size="icon"
                    variant="outline"
                    onClick={() => handleCopyLink(form._id)}
                    title="Copy Form Link"
                  >
                    <Link2 className="w-4 h-4 text-muted-foreground" />
                  </Button>
                  <Button
                    className="cursor-pointer"
                    variant="outline"
                    title="View Responses"
                    onClick={() => router.push(`/dashboard/responses/${form._id}`) }
                  >
                    Responses
                  </Button>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button
                        size="icon"
                        variant="destructive"
                        onClick={() => setDeleteId(form._id)}
                        title="Delete"
                      >
                        <Trash className="w-4 h-4" />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>
                          Are you sure you want to delete this form?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                          This action cannot be undone. This will permanently
                          delete your form and all its data.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel onClick={() => setDeleteId(null)}>
                          Cancel
                        </AlertDialogCancel>
                        <AlertDialogAction
                          className="bg-red-500 text-white hover:bg-red-600"
                          onClick={() => {
                            if (deleteId) deleteMutation.mutate(deleteId);
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
            ))}
            {data?.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} className="text-center">
                  No forms found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default MyForms;
