"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { CheckCircle } from "lucide-react";
import api from "@/lib/axios";
import { useState } from "react";
import { Textarea } from "../ui/textarea";

// Define the field type based on the JSON structure
type Field = {
  name: string;
  label: string;
  type: "text" | "email" | "number" | "select" | "checkbox" | "radio" | "textarea";
  required: boolean;
  options?: string[]; // For select and radio
};

// Props for the DynamicForm component
interface DynamicFormProps {
  fields: Field[];
  formId: string;
}

const createSchema = (fields: Field[]) => {
  const schemaShape: Record<string, z.ZodTypeAny> = {};
  fields.forEach((field) => {
    let fieldSchema: z.ZodTypeAny;
    switch (field.type) {
      case "text":
      case "textarea":
        fieldSchema = z.string();
        break;
      case "email":
        fieldSchema = z.string().email("Invalid email address");
        break;
      case "number":
        fieldSchema = z
          .union([z.string(), z.number()])
          .refine((val) => !field.required || (!!val && !isNaN(Number(val))), {
            message: `${field.label} is required`,
          })
          .transform((val) => (val === "" ? undefined : Number(val)));
        break;
      case "select":
        fieldSchema = z.string();
        break;
      default:
        fieldSchema = z.string();
    }
    if (field.required) {
      fieldSchema = fieldSchema.refine((val: any) => val !== undefined && val !== "", {
        message: `${field.label} is required`,
      });
    } else {
      fieldSchema = fieldSchema.optional();
    }
    schemaShape[field.name] = fieldSchema;
  });
  return z.object(schemaShape);
};

export default function DynamicForm({ fields, formId }: DynamicFormProps) {
  const [submitted, setSubmitted] = useState(false);
  const schema = createSchema(fields);

  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: fields.reduce((acc, field) => {
      acc[field.name] = field.type === "number" ? undefined : "";
      return acc;
    }, {} as Record<string, any>),
  });

  const mutation = useMutation({
    mutationFn: async (values: Record<string, any>) => {
      const res = await api.post(`/response/${formId}/responses`, {
        answers: values,
      });
      return res.data;
    },
    onSuccess: () => {
      setSubmitted(true);
      toast.success("Your form has been submitted!");
    },
    onError: () => {
      toast.error("Failed to submit the form. Please try again.");
    },
  });

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center py-8">
        <CheckCircle className="w-12 h-12 text-green-500 mb-2" />
        <div className="text-lg font-semibold text-green-700">
          Your form has been submitted!
        </div>
        <div className="text-gray-500 mt-2">
          Thank you for your submission. We will get back to you soon.
        </div>
        <Button className="mt-4 bg-green-500" onClick={() => {setSubmitted(false); form.reset();}}>
          Send Another Response
        </Button>
      </div>
    );
  }

  return (
    <Form {...form}>
      <div className="space-y-4">
        {fields.map((field) => (
          <FormField
            key={field.name}
            control={form.control}
            name={field.name}
            render={({ field: rhfField }) => (
              <FormItem>
                <FormLabel>
                  {field.label}{" "}
                  {field.required && <span className="text-red-500">*</span>}
                </FormLabel>
                <FormControl>
                  {field.type === "select" ? (
                    <Select
                      onValueChange={rhfField.onChange}
                      defaultValue={rhfField.value}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder={`Select ${field.label}`} />
                      </SelectTrigger>
                      <SelectContent>
                        {field.options?.map((option) => (
                          <SelectItem key={option} value={option}>
                            {option}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  ) : field.type === "textarea" ? (
                    <Textarea
                      className="border rounded px-3 py-2 w-full"
                      placeholder={`Enter ${field.label.toLowerCase()}`}
                      {...rhfField}
                    />
                  ) : (
                    <Input
                      type={field.type}
                      placeholder={`Enter ${field.label.toLowerCase()}`}
                      {...rhfField}
                      value={rhfField.value ?? ""}
                      onChange={rhfField.onChange}
                    />
                  )}
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        ))}
        <Button
          type="button"
          className="w-full"
          disabled={mutation.isPending}
          onClick={form.handleSubmit((values) => mutation.mutate(values))}
        >
          {mutation.isPending ? "Submitting..." : "Submit"}
        </Button>
      </div>
    </Form>
  );
}