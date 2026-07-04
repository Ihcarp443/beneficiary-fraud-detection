"use client";

import { AnimatePresence, motion } from "framer-motion";
import { XCircle, FileText } from "lucide-react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";

export default function PdfComparisonDialog({
  open,
  onClose,
  leftPdf,
  rightPdf,
}) {
  const getPreviewUrl = (filePath) => {
    if (!filePath) return "";

    const normalizedPath = filePath
      .replace(/^uploads[\\/]/, "")
      .replaceAll("\\", "/");

    return `${process.env.NEXT_PUBLIC_API_URL_2}/uploads/${normalizedPath}`;
  };

  const leftPdfUrl = getPreviewUrl(leftPdf);
  const rightPdfUrl = getPreviewUrl(rightPdf);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={(e) => e.stopPropagation()}
            className="w-[90vw] max-w-6xl h-[90vh]"
          >
            <Card className="h-full w-full rounded-3xl shadow-2xl flex flex-col">
              <CardHeader className="border-b">
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    Document Comparison
                  </CardTitle>

                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={onClose}
                  >
                    <XCircle className="h-5 w-5" />
                  </Button>
                </div>
              </CardHeader>

              <CardContent className="flex-1 overflow-hidden p-5">
                <div className="grid grid-cols-2 gap-5 h-full">

                  {/* Left */}
                  <div className="rounded-2xl border overflow-hidden shadow-sm flex flex-col">
                    <div className="border-b bg-slate-50 px-4 py-3 font-medium">
                      User Application
                    </div>

                    <iframe
                      src={leftPdfUrl}
                      title="User Document"
                      className="w-full flex-1"
                    />
                  </div>

                  {/* Right */}
                  <div className="rounded-2xl border overflow-hidden shadow-sm flex flex-col">
                    <div className="border-b bg-slate-50 px-4 py-3 font-medium">
                      Supporting Document
                    </div>

                    <iframe
                      src={rightPdfUrl}
                      title="Supporting Document"
                      className="w-full flex-1"
                    />
                  </div>

                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}