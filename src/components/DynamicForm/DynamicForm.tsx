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

// Define the field type based on the JSON structure
type Field = {
    name: string;
    label: string;
    type: "text" | "email" | "number" | "select" | "checkbox" | "radio";
    required: boolean;
    options?: string[]; // For select and radio
};

// Props for the DynamicForm component
interface DynamicFormProps {
  fields: Field[];
  onSubmit: (data: Record<string, any>) => void;
}

// Create a dynamic Zod schema based on the fields
const createSchema = (fields: Field[]) => {
  const schemaShape: Record<string, z.ZodTypeAny> = {};
  fields.forEach((field) => {
    let fieldSchema: z.ZodTypeAny;
    switch (field.type) {
      case "text":
        fieldSchema = z.string();
        break;
      case "email":
        fieldSchema = z.string().email("Invalid email address");
        break;
      case "number":
        fieldSchema = z.number();
        break;
      case "select":
        fieldSchema = z.string();
        break;
      default:
        fieldSchema = z.string();
    }
    if (field.required) {
      if (field.type === "text" || field.type === "email" || field.type === "select" || field.type === "number" || field.type === "checkbox" || field.type === "radio") {
        fieldSchema = (fieldSchema as z.ZodString).min(1, `${field.label} is required`);
      } else {
        fieldSchema = fieldSchema;
      }
    } else {
      fieldSchema = fieldSchema.optional();
    }
    schemaShape[field.name] = fieldSchema;
  });
  return z.object(schemaShape);
};

export default function DynamicForm({ fields, onSubmit }: DynamicFormProps) {
  const schema = createSchema(fields);
  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: fields.reduce((acc, field) => {
      acc[field.name] = field.type === "number" ? undefined : "";
      return acc;
    }, {} as Record<string, any>),
  });

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
      {fields.map((field) => (
        <div key={field.name} className="flex flex-col">
          <label htmlFor={field.name} className="mb-1">
            {field.label} {field.required && <span className="text-red-500">*</span>}
          </label>
          {field.type === "select" ? (
            <Select
              onValueChange={(value) => form.setValue(field.name, value)}
              defaultValue={form.getValues(field.name)}
            >
              <SelectTrigger id={field.name}>
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
          ) : (
            <Input
              type={field.type}
              id={field.name}
              placeholder={`Enter ${field.label.toLowerCase()}`}
              {...form.register(field.name, {
                valueAsNumber: field.type === "number",
              })}
            />
          )}
          {form.formState.errors[field.name] && (
            <p className="text-red-500 text-sm mt-1">
              {form.formState.errors[field.name]?.message as string}
            </p>
          )}
        </div>
      ))}
      <Button type="submit" className="w-full">
        Submit
      </Button>
    </form>
  );
}