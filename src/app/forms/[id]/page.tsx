"use client";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import DynamicForm from "@/components/DynamicForm/DynamicForm";
import { notFound } from "next/navigation";
import api from "@/lib/axios";

export default function FormPage() {
  const params = useParams();
  const id = Array.isArray(params.id) ? params.id[0] : params.id;

  const { data, isLoading, error } = useQuery({
    queryKey: ["form", id],
    queryFn: async () => {
      const res = await api.get(`/form/${id}`);
      return res.data;
    },
    enabled: !!id,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="p-4 rounded-lg bg-white shadow-md max-w-2xl w-full text-center">
          Loading form...
        </div>
      </div>
    );
  }

  if (error || !data?.success || !data.data) {
    notFound();
  }

  const formData = data.data;

  console.log(formData._id)

  const handleFormSubmit = (formValues: Record<string, any>) => {
    console.log("Form submission data:", formValues);
    // You can send the submission to your backend here
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="p-4 rounded-lg bg-white shadow-md max-w-2xl w-full">
        <h1 className="text-2xl font-bold mb-2">{formData.title}</h1>
        <p className="text-gray-600 mb-4">{formData.description}</p>
        <DynamicForm fields={formData.fields.fields} formId={formData._id} />
      </div>
    </div>
  );
}