"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import {useState} from "react"
import { 
  FileText, 
  Upload, 
  Eye, 
  CheckCircle, 
  XCircle, 
  Clock, 
  AlertTriangle,
  ChevronDown,
  Search,
  Filter,
  Download,
  MessageSquare,
  User,
  Calendar,
  FileCheck
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Progress } from "@/components/ui/progress"
import { ScrollArea } from "@/components/ui/scroll-area"


// Sample Data
const sampleApplications = [
  {
    id: "APP-001",
    applicationType: "Housing Assistance",
    applicantName: "John Doe",
    submittedAt: "2024-01-15T10:30:00Z",
    status: "pending",
    documents: [
      {
        id: "DOC-001",
        name: "Income Certificate",
        type: "Income Proof",
        status: "verified",
        severity: "low",
        uploadedAt: "2024-01-15T10:30:00Z"
      },
      {
        id: "DOC-002",
        name: "ID Proof",
        type: "Identity",
        status: "verified",
        severity: "low",
        uploadedAt: "2024-01-15T10:31:00Z"
      },
      {
        id: "DOC-003",
        name: "Address Proof",
        type: "Address",
        status: "pending",
        severity: "medium",
        uploadedAt: "2024-01-15T10:32:00Z"
      }
    ],
    aiSummary: "Application appears legitimate. All required documents submitted. Income verification matches government records. Minor discrepancy in address proof requires manual review."
  },
  {
    id: "APP-002",
    applicationType: "Healthcare Benefits",
    applicantName: "Jane Smith",
    submittedAt: "2024-01-14T14:20:00Z",
    status: "pending",
    documents: [
      {
        id: "DOC-004",
        name: "Medical Records",
        type: "Medical",
        status: "verified",
        severity: "low",
        uploadedAt: "2024-01-14T14:20:00Z"
      },
      {
        id: "DOC-005",
        name: "Income Statement",
        type: "Income Proof",
        status: "rejected",
        severity: "high",
        uploadedAt: "2024-01-14T14:21:00Z"
      }
    ],
    aiSummary: "Potential fraud detected. Income statement shows inconsistencies with tax records. Medical records appear authentic but income documentation requires immediate attention."
  }
]

const applicationTypes = [
  "Housing Assistance",
  "Healthcare Benefits",
  "Food Assistance",
  "Education Grant",
  "Disability Support",
  "Unemployment Benefits"
]

const documentTypes= {
  "Housing Assistance": ["Income Proof", "Identity", "Address", "Employment Letter"],
  "Healthcare Benefits": ["Medical Records", "Income Proof", "Identity", "Insurance"],
  "Food Assistance": ["Income Proof", "Identity", "Family Size Proof"],
  "Education Grant": ["Academic Records", "Income Proof", "Identity", "Admission Letter"],
  "Disability Support": ["Medical Certificate", "Income Proof", "Identity", "Disability Proof"],
  "Unemployment Benefits": ["Termination Letter", "Income Proof", "Identity", "Bank Statement"]
}


// User Side Component
function UserApplicationForm() {
  const [selectedType, setSelectedType] = React.useState("")
  const [documents, setDocuments] = React.useState([])
  const [uploading, setUploading] = React.useState(false)

  const handleFileUpload = (docType, files) => {
    if (!files || files.length === 0) return
    
    setUploading(true)
    const file = files[0]
    
    setTimeout(() => {
      const newDoc = {
        id: `DOC-${Date.now()}`,
        name: file.name,
        type: docType,
        status: "pending",
        uploadedAt: new Date().toISOString(),
        file
      }
      setDocuments([...documents, newDoc])
      setUploading(false)
    }, 1000)
  }

  const handleSubmit = () => {
    alert("Application submitted successfully!")
  }

  return (
    // <div className="min-h-screen bg-gradient-to-br from-slate-50 via-background to-slate-100 px-6 py-8 lg:px-10">
    <div className="min-h-screen bg-gradient-to-br from-white via-blue-50/30 to-purple-50/30 px-6 py-10 relative overflow-hidden">
      <div className="absolute top-20 -left-24 h-72 w-72 rounded-full bg-blue-500/10 blur-3xl" />
      <div className="absolute bottom-10 -right-20 h-72 w-72 rounded-full bg-purple-500/10 blur-3xl" />
      <div className="mx-auto w-full max-w-7xl">
        <motion.div
            // key={docType}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            // transition={{ delay: index * 0.08 }}
        >
          {/* <Card className="rounded-3xl border bg-background/80 backdrop-blur shadow-lg"> */}
          <Card className="relative rounded-3xl border border-white/70 bg-white/90 backdrop-blur-xl shadow-2xl">
            <CardHeader className="space-y-2 border-b pb-6">
              {/* <CardTitle className="text-3xl font-bold tracking-tight">Submit Benefit Application</CardTitle> */}
              <CardTitle className="text-4xl font-bold">
                  Submit
                  <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                      {" "}Benefit Application
                  </span>
              </CardTitle>
              <CardDescription className="text-base">
                Select your application type and upload required documents
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-8 pt-8">
              <div className="space-y-2">
                <Label htmlFor="app-type">Application Type</Label>
                <Select value={selectedType} onValueChange={setSelectedType}>
                  <SelectTrigger
                        id="app-type"
                        className="h-12 rounded-xl border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                    >
                    <SelectValue placeholder="Select application type" />
                  </SelectTrigger>
                  <SelectContent>
                    {applicationTypes.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {selectedType && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className="space-y-4"
                >
                  <div className="grid gap-2">
                    <Label className="font-semibold text-slate-700">
                        Applicant Name
                    </Label>
                    <Input placeholder="Enter your full name"className="h-11 rounded-xl"/>
                  </div>

                  <div className="space-y-4">
                    <Label className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Required Documents</Label>
                    {documentTypes[selectedType]?.map((docType) => (
                      <Card
                          key={docType}
                          // className="rounded-xl border-2  border-slate-200 hover:border-primary transition-all hover:shadow-md"
                          className="rounded-2xl border border-slate-200 bg-white transition-all duration-300 hover:border-blue-300 hover:shadow-xl hover:-translate-y-1">
                        <CardContent className="flex items-center justify-between p-6">
                          <div className="flex items-center gap-4">
                            <div className="flex items-center gap-4">
                              {/* <div className="rounded-lg bg-primary/10 p-2">
                                  <FileText className="h-5 w-5 text-primary" />
                              </div> */}
                                <div className="relative">
                                  <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 blur opacity-25"/>
                                  <div className="relative rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 p-3">
                                      <FileText className="h-5 w-5 text-white"/>
                                  </div>
                              </div>
                              <div>
                               <p className="text-base font-semibold">{docType}</p>
                                <p className="mt-1 text-sm text-muted-foreground truncate max-w-xs">
                                  {documents.find(d => d.type === docType) 
                                    ? documents.find(d => d.type === docType)?.name
                                    : "No file uploaded"}
                                </p>
                              </div>
                            </div>
                            <div>
                              <Input
                                type="file"
                                className="hidden"
                                id={`file-${docType}`}
                                onChange={(e) => handleFileUpload(docType, e.target.files)}
                              />
                              <Button
                                variant="outline"
                                // className="rounded-xl px-5 hover:bg-primary hover:text-white transition-colors"
                                className=" rounded-xlborder-blue-200text-blue-600hover:text-white hover:border-transparent hover:bg-gradient-to-r hover:from-blue-600 hover:to-purple-600 transition-all"
                                onClick={() => document.getElementById(`file-${docType}`)?.click()}>
                                <Upload className="mr-2 h-4 w-4" />
                                Upload
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>

                  {uploading && (
                    <div className="space-y-2">
                      <p className="text-sm text-muted-foreground">Uploading...</p>
                      <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                              <span className="text-muted-foreground">
                                  Uploading...
                              </span>

                              <span className="font-medium">
                                  66%
                              </span>
                          </div>

                          <Progress value={66} className="h-2 rounded-full"/>
                      </div>
                    </div>
                  )}
                </motion.div>
              )}
            </CardContent>
            <CardFooter className="border-t pt-6">
              <Button 
                // className="h-11 w-full rounded-xl text-base font-semibold shadow-sm" 
                  className=" h-12 w-full rounded-xl text-base font-semibold bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all duration-300"
                disabled={!selectedType || documents.length === 0}
                onClick={handleSubmit}
              >
                Submit Application
              </Button>
            </CardFooter>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}

// Admin Side Component
function AdminDashboard() {
  const [applications, setApplications] = React.useState(sampleApplications)
  const [selectedApp, setSelectedApp] = React.useState(null)
  const [searchQuery, setSearchQuery] = React.useState("")
  const [statusFilter, setStatusFilter] = React.useState("all")
  const [showPreview, setShowPreview] = React.useState(false)
  const [decision, setDecision] = React.useState("pending")
  const [comment, setComment] = React.useState("")

  
const dashboardStats = [
  {
    title: "Applications",
    value: applications.length,
    icon: FileText,
    iconBg: "bg-blue-100",
    iconColor: "text-blue-600",
    valueColor: "text-foreground",
  },
  {
    title: "Pending",
    value: applications.filter(app => app.status === "pending").length,
    icon: Clock,
    iconBg: "bg-yellow-100",
    iconColor: "text-yellow-600",
    valueColor: "text-yellow-600",
  },
  {
    title: "Fraud Alerts",
    value: applications.filter(app =>
      app.documents.some(
        doc => doc.severity === "high" || doc.severity === "critical"
      )
    ).length,
    icon: AlertTriangle,
    iconBg: "bg-red-100",
    iconColor: "text-red-600",
    valueColor: "text-red-600",
  },
  {
    title: "Approved",
    value: applications.filter(app => app.status === "approved").length,
    icon: CheckCircle,
    iconBg: "bg-green-100",
    iconColor: "text-green-600",
    valueColor: "text-green-600",
  },
];

  const filteredApplications = applications.filter(app => {
    const matchesSearch = app.applicantName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         app.id.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === "all" || app.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const handleDecision = () => {
    if (!selectedApp) return
    
    setApplications(applications.map(app => 
      app.id === selectedApp.id 
        ? { ...app, status: decision }
        : app
    ))
    
    alert(`Application ${decision} with comment: ${comment}`)
    setSelectedApp(null)
    setComment("")
  }

  const getSeverityColor = (severity) => {
    switch (severity) {
      case "low": return "text-green-600 bg-green-50"
      case "medium": return "text-yellow-600 bg-yellow-50"
      case "high": return "text-orange-600 bg-orange-50"
      case "critical": return "text-red-600 bg-red-50"
      default: return "text-gray-600 bg-gray-50"
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case "verified": return <CheckCircle className="h-4 w-4 text-green-600" />
      case "rejected": return <XCircle className="h-4 w-4 text-red-600" />
      case "pending": return <Clock className="h-4 w-4 text-yellow-600" />
      default: return null
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-background to-slate-100">
      <div className="sticky top-0 z-30 border-b bg-background/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-8 py-5">
          <h1 className="text-3xl font-bold tracking-tight">Fraud Detection Dashboard</h1>
          <p className="mt-1 text-base text-muted-foreground">Review and manage benefit applications</p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-8 py-8">
        <Tabs defaultValue="applications" className="space-y-4">
                                      {/* Dashboard Stats */}
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
  {dashboardStats.map((stat) => {
    const Icon = stat.icon;

    return (
      <Card
        key={stat.title}
        className="rounded-2xl border shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
      >
        <CardContent className="flex items-center justify-between p-6">
          <div>
            <p className="text-sm font-medium text-muted-foreground">
              {stat.title}
            </p>

            <h2 className={`mt-2 text-4xl font-bold ${stat.valueColor}`}>
              {stat.value}
            </h2>
          </div>

          <div className={`rounded-2xl p-3 ${stat.iconBg}`}>
            <Icon className={`h-7 w-7 ${stat.iconColor}`} />
          </div>
        </CardContent>
      </Card>
    );
  })}
</div>
          <TabsList className="rounded-xl p-1">
            <TabsTrigger className="rounded-lg px-6">Applications</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="applications" className="space-y-4">
            <div className="flex flex-col gap-4 md:flex-row md:items-center">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search applications..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="h-11 rounded-xl pl-10"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="h-12 rounded-xl border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 w-[220px] rounded-xl">
                  <Filter className="mr-2 h-4 w-4" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="approved">Approved</SelectItem>
                  <SelectItem value="declined">Declined</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <AnimatePresence mode="popLayout">
                {filteredApplications.map((app) => (
                  <motion.div
                    key={app.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Card
                    className="cursor-pointer rounded-2xl border bg-background transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                    onClick={() => setSelectedApp(app)}
                    >
                      <CardHeader className="space-y-3">
                        <div className="flex items-start justify-between">
                          <div>
                            <CardTitle className="text-xl font-semibold">{app.applicantName}</CardTitle>
                            <CardDescription>{app.applicationType}</CardDescription>
                          </div>
                          <Badge  variant={
                            app.status === "approved" ? "default" :
                            app.status === "declined" ? "destructive" :
                            "secondary" 
                          } className="rounded-full px-3">
                            {app.status}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3 text-sm">
                          <div className="flex items-center gap-3 rounded-lg bg-muted/40 p-2">
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                            <span className="text-muted-foreground">
                              {new Date(app.submittedAt).toLocaleDateString()}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <FileCheck className="h-4 w-4 text-muted-foreground" />
                            <span className="text-muted-foreground">
                              {app.documents.length} documents
                            </span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </TabsContent>

          <TabsContent value="analytics">
            <Card className="rounded-3xl shadow-lg">
              <CardHeader>
                <CardTitle>Analytics Dashboard</CardTitle>
                <CardDescription>Overview of application statistics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-3">
                  <Card className="rounded-2xl border shadow-sm hover:shadow-lg transition-all">
                    <CardHeader className="pb-2">
                      <CardDescription>Total Applications</CardDescription>
                      <CardTitle className="text-text-5xl font-bold">{applications.length}</CardTitle>
                    </CardHeader>
                  </Card>
                  <Card className="rounded-2xl border shadow-sm hover:shadow-lg transition-all">
                    <CardHeader className="pb-2">
                      <CardDescription>Pending Review</CardDescription>
                      <CardTitle className="text-text-5xl font-bold">
                        {applications.filter(a => a.status === "pending").length}
                      </CardTitle>
                    </CardHeader>
                  </Card>
                  <Card className="rounded-2xl border shadow-sm hover:shadow-lg transition-all">
                    <CardHeader className="pb-2">
                      <CardDescription>Fraud Detected</CardDescription>
                      <CardTitle className="text-text-5xl font-bold text-red-600">
                        {applications.filter(a => 
                          a.documents.some(d => d.severity === "high" || d.severity === "critical")
                        ).length}
                      </CardTitle>
                    </CardHeader>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Application Detail Modal */}
      <AnimatePresence>
        {selectedApp && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm items-center justify-center p-4"
            onClick={() => setSelectedApp(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-6xl max-h-[90vh] overflow-hidden"
            >
              <Card className="rounded-3xl shadow-2xl">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle>{selectedApp.applicantName}</CardTitle>
                      <CardDescription>
                        {selectedApp.applicationType} - {selectedApp.id}
                      </CardDescription>
                    </div>
                    <Button variant="ghost" size="icon" onClick={() => setSelectedApp(null)}>
                      <XCircle className="h-5 w-5" />
                    </Button>
                  </div>
                </CardHeader>
                <ScrollArea className="max-h-[60vh]">
                  <CardContent className="space-y-6">
                    {/* AI Summary */}
                    <div className="space-y-2">
                      <h3 className="font-semibold flex items-center gap-2">
                        <AlertTriangle className="h-5 w-5 text-yellow-600" />
                        AI Analysis Summary
                      </h3>
                      <Card className="rounded-xl border bg-yellow-50/50">
                        <CardContent className="p-4">
                          <p className="text-sm">{selectedApp.aiSummary}</p>
                        </CardContent>
                      </Card>
                    </div>

                    {/* Documents Table */}
                    <div className="space-y-2">
                      <h3 className="font-semibold">Documents</h3>
                      <div className="overflow-hidden rounded-2xl border shadow-sm">
                        <table className="w-full">
                          <thead className="bg-slate-100">
                            <tr>
                              <th className="text-left p-3 text-sm font-medium">Document</th>
                              <th className="text-left p-3 text-sm font-medium">Type</th>
                              <th className="text-left p-3 text-sm font-medium">Status</th>
                              <th className="text-left p-3 text-sm font-medium">Severity</th>
                              <th className="text-left p-3 text-sm font-medium">Actions</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y">
                            {selectedApp.documents.map((doc) => (
                              <tr key={doc.id} className="hover:bg-slate-50 transition-colors">
                                <td className="p-3 text-sm">{doc.name}</td>
                                <td className="p-3 text-sm">{doc.type}</td>
                                <td className="p-3">
                                  <div className="flex items-center gap-2">
                                    {getStatusIcon(doc.status)}
                                    <span className="text-sm capitalize">{doc.status}</span>
                                  </div>
                                </td>
                                <td className="p-3">
                                  <Badge className={cn("capitalize", getSeverityColor(doc.severity))}>
                                    {doc.severity || "N/A"}
                                  </Badge>
                                </td>
                                <td className="p-3">
                                  <Button
                                    variant="outline"
                                    className="rounded-xl"
                                    size="sm"
                                    onClick={() => setShowPreview(true)}
                                  >
                                    <Eye className="h-4 w-4 mr-2" />
                                    Preview
                                  </Button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>

                    {/* Decision Section */}
                    <div className="space-y-4">
                      <h3 className="font-semibold">Make Decision</h3>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label>Decision</Label>
                          <Select value={decision} onValueChange={(v) => setDecision(v)}>
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="approved">Approve</SelectItem>
                              <SelectItem value="pending">Pending</SelectItem>
                              <SelectItem value="declined">Decline</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label>Comment</Label>
                          <Textarea
                            className="rounded-xl"
                            placeholder="Add your comments here..."
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            rows={4}
                          />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </ScrollArea>
                <CardFooter className="flex justify-end gap-3 border-t pt-6">
                  <Button
                    variant="outline"
                    className="rounded-xl"
                     onClick={() => setSelectedApp(null)}>
                    Cancel
                  </Button>
                  <Button className="rounded-xl px-6 shadow-md"onClick={handleDecision}>
                    Submit Decision
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function FraudDetectionSystem() {
  const [view, setView] = React.useState("admin"); // default to admin while developing

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Temporary Switch */}
      <div className="border-b bg-background">
        <div className="container mx-auto flex items-center justify-between py-4">
          <div>
            <h1 className="text-2xl font-bold">
              Government Beneficiary System
            </h1>
            <p className="text-sm text-muted-foreground">
              Temporary page switch (will be removed later)
            </p>
          </div>

          <div className="flex rounded-lg border p-1">
            <Button
              size="sm"
              variant={view === "user" ? "default" : "ghost"}
              onClick={() => setView("user")}
            >
              <User className="mr-2 h-4 w-4" />
              User
            </Button>

            <Button
              size="sm"
              variant={view === "admin" ? "default" : "ghost"}
              onClick={() => setView("admin")}
            >
              <FileCheck className="mr-2 h-4 w-4" />
              Admin
            </Button>
          </div>
        </div>
      </div>

      {view === "user" ? <UserApplicationForm /> : <AdminDashboard />}
    </div>
  );
}