"use client"

import { motion, AnimatePresence } from "framer-motion"
import {
  AlertTriangle,
  CheckCircle,
  Clock,
  Eye,
  XCircle,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { useEffect, useState } from "react";
import { adminApi } from "@/APIs/adminAPI";
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"


export default function AnalysisTable({
  selectedApp,
  setSelectedApp,

}) {
const [documents, setDocuments] = useState([]);
const [loading, setLoading] = useState(false);
const [decision, setDecision] = useState("pending");
const [comment, setComment] = useState("");
const [showPreview, setShowPreview] = useState(false);
useEffect(() => {
  if (!selectedApp) {
    setDocuments([]);
  }
}, [selectedApp]);

useEffect(() => {
  if (!selectedApp?.analysis_uuid) return;

  const loadDocuments = async () => {
    try {
      setLoading(true);

      const response = await adminApi.getApplicationDocuments(
        selectedApp.analysis_uuid
      );

      const docs = (response.doc || []).map((doc) => ({
        id: doc[0],
        analysisUuid: doc[1],
        userId: doc[2],
        type: doc[3],
        name: doc[4],
        contentType: doc[5],
        filePath: doc[6],
        status: doc[7].toLowerCase(),
        severity: doc[8].toLowerCase(),
        matchedFields: doc[9],
        mismatchedFields: doc[10],
        missingFields: doc[11],
        comments: doc[12],
        createdAt: doc[13],
      }));

      setDocuments(docs);
    } catch (err) {
      console.error(err);
      setDocuments([]);
    } finally {
      setLoading(false);
    }
  };

  loadDocuments();
}, [selectedApp?.analysis_uuid]);


  const handleDecision = async () => {
  if (!selectedApp) return;

  try {
    if (decision === "approved") {
      await adminApi.approveApplication(
        selectedApp.id,
        comment
      );
    } else if (decision === "declined") {
      await adminApi.declineApplication(
        selectedApp.id,
        comment
      );
    } else {
      await adminApi.updateApplication(selectedApp.id, {
        status: decision,
        comment,
      });
    }
    // Refresh list
    await onApplicationUpdated();
    await loadApplications();
    setSelectedApp(null);
    setComment("");

  } catch (err) {
    console.error(err);
  }
};

  const getSeverityColor = (severity) => {
    switch (severity) {
      case "low":
        return "text-green-600 bg-green-50"

      case "medium":
        return "text-yellow-600 bg-yellow-50"

      case "high":
        return "text-orange-600 bg-orange-50"

      case "critical":
        return "text-red-600 bg-red-50"

      default:
        return "text-gray-600 bg-gray-50"
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case "verified":
        return <CheckCircle className="h-4 w-4 text-green-600" />

      case "rejected":
        return <XCircle className="h-4 w-4 text-red-600" />

      case "pending":
        return <Clock className="h-4 w-4 text-yellow-600" />

      default:
        return null
    }
  }

  return (
    <AnimatePresence>
      {selectedApp && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setSelectedApp(null)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-6xl h-[85vh] overflow-hidden"
          >
            <Card className="flex h-[85vh] flex-col rounded-3xl shadow-2xl">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle>{selectedApp.applicantName}</CardTitle>

                    <CardDescription>
                      {selectedApp.applicationType} - {selectedApp.id}
                    </CardDescription>
                  </div>

                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setSelectedApp(null)}
                  >
                    <XCircle className="h-5 w-5" />
                  </Button>
                </div>
              </CardHeader>

              <div className="flex-1 overflow-y-auto">
                <CardContent className="space-y-6 pb-8">
                  <div className="space-y-2">
                    <h3 className="font-semibold flex items-center gap-2">
                      <AlertTriangle className="h-5 w-5 text-yellow-600" />
                      AI Analysis Summary
                    </h3>

                   <Card className="rounded-2xl border-l-4 border-l-yellow-500 bg-yellow-50/60">
                      <CardContent className="p-4">
                        <p className="text-sm">{selectedApp.llm_summary}</p>
                        {/* <p className="text-sm">{selectedApp.masked_report}</p> */}
                        
                      </CardContent>
                    </Card>
                  </div>

                  <div className="space-y-2">
                    <h3 className="font-semibold">Documents</h3>

                    <div className="overflow-hidden rounded-2xl border shadow-sm">
                      <table className="w-full">
                        <thead className="bg-slate-100">
                          <tr>
                            <th className="p-3 text-left text-sm font-medium">
                              Document
                            </th>
                            <th className="p-3 text-left text-sm font-medium">
                              Type
                            </th>
                            <th className="p-3 text-left text-sm font-medium">
                              Status
                            </th>
                            <th className="p-3 text-left text-sm font-medium">
                              Severity
                            </th>
                            <th className="p-3 text-left text-sm font-medium">
                              Actions
                            </th>
                          </tr>
                        </thead>

                        <tbody className="divide-y">
                          {loading ? (
                              <tr>
                                <td colSpan={5} className="p-6 text-center">
                                  Loading documents...
                                </td>
                              </tr>
                            ) : documents.length === 0 ? (
                              <tr>
                                <td colSpan={5} className="p-6 text-center text-muted-foreground">
                                  No supporting documents found.
                                </td>
                              </tr>
                            ) : (
                              documents.map((doc) => (
                            <tr
                              key={doc.id}
                              className="hover:bg-slate-50 transition-colors"
                            >
                              <td className="p-3 capitalize">
                                {doc.name.replaceAll("_", " ")}
                              </td>

                              <td className="p-3 capitalize">
                                {doc.type}
                              </td>

                              <td className="p-3">
                                <div className="flex items-center gap-2">
                                  {getStatusIcon(doc.status)}
                                  <span className="capitalize">
                                    {doc.status}
                                  </span>
                                </div>
                              </td>

                              <td className="p-3">
                                <Badge
                                  className={cn(
                                    "capitalize",
                                    getSeverityColor(doc.severity)
                                  )}
                                >
                                  {doc.severity}
                                </Badge>
                              </td>

                              <td className="p-3">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="rounded-xl"
                                  onClick={() => {
                                      setShowPreview(doc.filePath);
                                  }}>
                                  <Eye className="mr-2 h-4 w-4" />
                                  Preview
                                </Button>
                              </td>
                            </tr>
                            ))
                          )}

                        </tbody>
                      </table>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-semibold">Make Decision</h3>

                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label>Decision</Label>

                        <div className="flex gap-5">
                          <Button
                            variant="outline"
                            onClick={() => setDecision("approved")}
                            className={`
                              h-10 w-45 flex rounded-xl border-2 transition-all
                              ${
                                decision === "approved"
                                  ? "border-green-500 bg-green-50 text-green-700 shadow-md"
                                  : "hover:border-green-300 hover:bg-green-50"
                              }
                            `}
                          >
                            <CheckCircle className=" h-6 w-6" />
                            Approve
                          </Button>

                          <Button
                             variant="outline"
                             onClick={() => setDecision("pending")}
                             className={`
                               h-10 w-45 flex rounded-xl border-2 transition-all
                               ${
                                 decision === "pending"
                                   ? "border-yellow-500 bg-yellow-50 text-yellow-700 shadow-md"
                                   : "hover:border-yellow-300 hover:bg-yellow-50"
                               }
                             `}
                           >
                             <Clock className=" h-6 w-6" />
                             Pending
                           </Button>

                          <Button
                             variant="outline"
                             onClick={() => setDecision("declined")}
                             className={`
                               h-10 w-45 flex rounded-xl border-2 transition-all
                               ${
                                 decision === "declined"
                                   ? "border-red-500 bg-red-50 text-red-700 shadow-md"
                                   : "hover:border-red-300 hover:bg-red-50"
                               }
                             `}
                           >
                             <XCircle className=" h-6 w-6" />
                             Decline
                           </Button>

                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label className="text-sm font-medium leading-none">
                          Comment
                        </Label>

                        <Textarea
                          rows={5}
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                          placeholder="Add your comments..."
                          className="rounded-xl !text-sm  focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </div>
              <CardFooter className="flex justify-end gap-3 border-t pt-6">
                <Button
                    variant="outline"
                    className="rounded-xl h-11 px-6"
                >
                    Cancel
                </Button>

                <Button
                    className="rounded-xl px-8 h-11 shadow-sm hover:shadow-md"
                >
                    Submit Decision
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}