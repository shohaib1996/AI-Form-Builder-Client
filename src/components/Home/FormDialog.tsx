import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import DynamicForm from "@/components/DynamicForm/DynamicForm";
import {
  FacebookShareButton,
  WhatsappShareButton,
  InstapaperShareButton,
  PinterestShareButton,
  FacebookIcon,
  WhatsappIcon,
  InstapaperIcon,
  PinterestIcon,
} from "react-share";
import { Copy } from "lucide-react";
import { toast } from "sonner";
import Link from "next/link";

interface FormDialogProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  generatedForm: GeneratedFormType | null;
  selectedTemplate: number;
  setSelectedTemplate: (template: number) => void;
  templateNames: string[];
  templateStyles: Record<number, string>;
  getFormUrl: (id: string) => string;
  handleFormSubmit: (formValues: Record<string, any>) => void;
  mutationStatus: string;
  mutationError: Error | null;
}

type GeneratedFormType = {
  _id: string;
  title: string;
  description?: string;
  fields: {
    fields: Array<any>;
  };
};

export function FormDialog({
  isOpen,
  setIsOpen,
  generatedForm,
  selectedTemplate,
  setSelectedTemplate,
  templateNames,
  templateStyles,
  getFormUrl,
  handleFormSubmit,
  mutationStatus,
  mutationError,
}: FormDialogProps) {
  const formUrl = generatedForm ? getFormUrl(generatedForm._id) : "";

  const copyToClipboard = () => {
    navigator.clipboard.writeText(formUrl);
    // Optional: Add a toast notification here to indicate success
    toast.success("Form URL copied to clipboard!");
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-6xl w-full">
        {mutationStatus === "pending" ? (
          <div className="space-y-4">
            <Skeleton className="h-8 w-3/4" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-10 w-full" />
          </div>
        ) : generatedForm ? (
          <div className="space-y-4">
            <div className="flex justify-between items-center flex-wrap gap-2">
              <div className="flex flex-wrap gap-2">
                {templateNames.map((name, index) => (
                  <Button
                    key={index + 1}
                    variant={
                      selectedTemplate === index + 1 ? "default" : "outline"
                    }
                    size="sm"
                    onClick={() => setSelectedTemplate(index + 1)}
                  >
                    {name}
                  </Button>
                ))}
              </div>
            </div>

            <div className="text-sm text-muted-foreground">
              <strong>Share this form:</strong>{" "}
              <Link
                href={formUrl}
                className="text-blue-500 underline break-all font-bold"
                target="_blank"
                rel="noopener noreferrer"
              >
                Go to Form
              </Link>
              <div className="flex gap-2 mt-2">
                <FacebookShareButton url={formUrl}>
                  <FacebookIcon size={32} round />
                </FacebookShareButton>
                <WhatsappShareButton url={formUrl}>
                  <WhatsappIcon size={32} round />
                </WhatsappShareButton>
                <InstapaperShareButton url={formUrl}>
                  <InstapaperIcon size={32} round />
                </InstapaperShareButton>
                <PinterestShareButton url={formUrl} media={formUrl}>
                  <PinterestIcon size={32} round />
                </PinterestShareButton>
                <Button className="cursor-pointer" variant="outline" size="icon" onClick={copyToClipboard}>
                  <Copy className="h-4 w-4 " />
                </Button>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4">{generatedForm.title}</h2>
              <div
                className={`p-4 rounded-lg ${templateStyles[selectedTemplate]} w-full`}
              >
                {generatedForm.fields?.fields ? (
                  <DynamicForm
                    fields={generatedForm.fields.fields}
                    onSubmit={handleFormSubmit}
                  />
                ) : (
                  <p>No fields found for this form.</p>
                )}
              </div>
            </div>
          </div>
        ) : null}

        {mutationStatus === "error" && (
          <p className="text-red-500">
            Error: {mutationError?.message || "Something went wrong"}
          </p>
        )}
      </DialogContent>
    </Dialog>
  );
}