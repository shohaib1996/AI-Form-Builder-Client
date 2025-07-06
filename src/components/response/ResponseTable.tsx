"use client";

import api from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import * as XLSX from "xlsx";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

const fetchResponses = async (formId: string) => {
  const { data } = await api.get(`/response/${formId}/responses`);
  if (Array.isArray(data)) {
    return data;
  }
  return data?.data || [];
};

const ResponseTable = ({ id }: { id: string }) => {
  const { data: responses, isLoading } = useQuery({
    queryKey: ["responses", id],
    queryFn: () => fetchResponses(id),
    enabled: !!id,
  });

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

  const exportToExcel = () => {
    if (!responses || responses.length === 0) return;

    const worksheet = XLSX.utils.json_to_sheet(
      responses.map((response: any) => {
        const row: any = {
          "Response ID": response._id,
          "Submitted At": new Date(response.submittedAt).toLocaleString(),
        };

        // Add all answer fields to the row
        Object.keys(response.answers).forEach((key: string) => {
          row[key] = response.answers[key];
        });

        return row;
      })
    );

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Responses");
    XLSX.writeFile(workbook, "form-responses.xlsx");
  };

  return (
    <div className="">
      <div className="flex justify-between items-center mb-4 px-4">
        <h1 className="text-2xl font-bold">Form Responses</h1>
        <Button
          onClick={exportToExcel}
          disabled={!responses || responses.length === 0}
        >
          Export to Excel
        </Button>
      </div>

      {responses && responses.length > 0 ? (
        <div className="overflow-x-auto px-4">
          <Table className="w-full table-fixed">
            <TableHeader>
              <TableRow>
                <TableHead className="w-1/3 text-left">Response ID</TableHead>
                <TableHead className="w-1/3 text-left">Submitted At</TableHead>
                <TableHead className="w-1/3 text-left">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {responses?.map((response: any) => (
                <TableRow key={response._id}>
                  <TableCell className="w-1/3 truncate">
                    {response._id}
                  </TableCell>
                  <TableCell className="w-1/3">
                    {new Date(response.submittedAt).toLocaleString()}
                  </TableCell>
                  <TableCell className="w-1/3">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline">View</Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Response Details</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div className="grid grid-cols-2 gap-4">
                            <p className="font-semibold">Response ID:</p>
                            <p>{response._id}</p>
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <p className="font-semibold">Submitted At:</p>
                            <p>
                              {new Date(response.submittedAt).toLocaleString()}
                            </p>
                          </div>
                          <hr />
                          <h3 className="font-semibold text-lg">Answers:</h3>
                          {Object.entries(response.answers).map(
                            ([key, value]: [string, any]) => (
                              <div key={key} className="grid grid-cols-2 gap-4">
                                <p className="font-semibold capitalize">
                                  {key}:
                                </p>
                                <p>{value}</p>
                              </div>
                            )
                          )}
                        </div>
                      </DialogContent>
                    </Dialog>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      ) : (
        <div className="text-center text-gray-500">No responses found </div>
      )}
    </div>
  );
};

export default ResponseTable;
