// "use client"

// import * as React from "react"
// import { motion, AnimatePresence } from "framer-motion"
// import { 
//   FileText, 
//   Upload, 
//   Eye, 
//   CheckCircle, 
//   XCircle, 
//   Clock, 
//   AlertTriangle,
//   ChevronDown,
//   Search,
//   Filter,
//   Download,
//   MessageSquare,
//   User,
//   Calendar,
//   FileCheck
// } from "lucide-react"
// import { cn } from "@/lib/utils"
// import { Button } from "@/components/ui/button"
// import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import { Badge } from "@/components/ui/badge"
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
// import { Textarea } from "@/components/ui/textarea"
// import { Progress } from "@/components/ui/progress"
// import { ScrollArea } from "@/components/ui/scroll-area"

// // Types
// interface Document {
//   id: string
//   name: string
//   type: string
//   status: "pending" | "verified" | "rejected"
//   severity?: "low" | "medium" | "high" | "critical"
//   uploadedAt: string
//   file?: File
// }

// interface Application {
//   id: string
//   applicationType: string
//   applicantName: string
//   submittedAt: string
//   status: "pending" | "approved" | "declined"
//   documents: Document[]
//   aiSummary?: string
// }

// // Sample Data
// const sampleApplications: Application[] = [
//   {
//     id: "APP-001",
//     applicationType: "Housing Assistance",
//     applicantName: "John Doe",
//     submittedAt: "2024-01-15T10:30:00Z",
//     status: "pending",
//     documents: [
//       {
//         id: "DOC-001",
//         name: "Income Certificate",
//         type: "Income Proof",
//         status: "verified",
//         severity: "low",
//         uploadedAt: "2024-01-15T10:30:00Z"
//       },
//       {
//         id: "DOC-002",
//         name: "ID Proof",
//         type: "Identity",
//         status: "verified",
//         severity: "low",
//         uploadedAt: "2024-01-15T10:31:00Z"
//       },
//       {
//         id: "DOC-003",
//         name: "Address Proof",
//         type: "Address",
//         status: "pending",
//         severity: "medium",
//         uploadedAt: "2024-01-15T10:32:00Z"
//       }
//     ],
//     aiSummary: "Application appears legitimate. All required documents submitted. Income verification matches government records. Minor discrepancy in address proof requires manual review."
//   },
//   {
//     id: "APP-002",
//     applicationType: "Healthcare Benefits",
//     applicantName: "Jane Smith",
//     submittedAt: "2024-01-14T14:20:00Z",
//     status: "pending",
//     documents: [
//       {
//         id: "DOC-004",
//         name: "Medical Records",
//         type: "Medical",
//         status: "verified",
//         severity: "low",
//         uploadedAt: "2024-01-14T14:20:00Z"
//       },
//       {
//         id: "DOC-005",
//         name: "Income Statement",
//         type: "Income Proof",
//         status: "rejected",
//         severity: "high",
//         uploadedAt: "2024-01-14T14:21:00Z"
//       }
//     ],
//     aiSummary: "Potential fraud detected. Income statement shows inconsistencies with tax records. Medical records appear authentic but income documentation requires immediate attention."
//   }
// ]

// const applicationTypes = [
//   "Housing Assistance",
//   "Healthcare Benefits",
//   "Food Assistance",
//   "Education Grant",
//   "Disability Support",
//   "Unemployment Benefits"
// ]

// const documentTypes: Record<string, string[]> = {
//   "Housing Assistance": ["Income Proof", "Identity", "Address", "Employment Letter"],
//   "Healthcare Benefits": ["Medical Records", "Income Proof", "Identity", "Insurance"],
//   "Food Assistance": ["Income Proof", "Identity", "Family Size Proof"],
//   "Education Grant": ["Academic Records", "Income Proof", "Identity", "Admission Letter"],
//   "Disability Support": ["Medical Certificate", "Income Proof", "Identity", "Disability Proof"],
//   "Unemployment Benefits": ["Termination Letter", "Income Proof", "Identity", "Bank Statement"]
// }

// // User Side Component
// function UserApplicationForm() {
//   const [selectedType, setSelectedType] = React.useState("")
//   const [documents, setDocuments] = React.useState<Document[]>([])
//   const [uploading, setUploading] = React.useState(false)

//   const handleFileUpload = (docType: string, files: FileList | null) => {
//     if (!files || files.length === 0) return
    
//     setUploading(true)
//     const file = files[0]
    
//     setTimeout(() => {
//       const newDoc: Document = {
//         id: `DOC-${Date.now()}`,
//         name: file.name,
//         type: docType,
//         status: "pending",
//         uploadedAt: new Date().toISOString(),
//         file
//       }
//       setDocuments([...documents, newDoc])
//       setUploading(false)
//     }, 1000)
//   }

//   const handleSubmit = () => {
//     alert("Application submitted successfully!")
//   }

//   return (
//     <div className="min-h-screen bg-background p-4 md:p-8">
//       <div className="mx-auto max-w-4xl">
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5 }}
//         >
//           <Card>
//             <CardHeader>
//               <CardTitle className="text-2xl">Submit Benefit Application</CardTitle>
//               <CardDescription>
//                 Select your application type and upload required documents
//               </CardDescription>
//             </CardHeader>
//             <CardContent className="space-y-6">
//               <div className="space-y-2">
//                 <Label htmlFor="app-type">Application Type</Label>
//                 <Select value={selectedType} onValueChange={setSelectedType}>
//                   <SelectTrigger id="app-type">
//                     <SelectValue placeholder="Select application type" />
//                   </SelectTrigger>
//                   <SelectContent>
//                     {applicationTypes.map((type) => (
//                       <SelectItem key={type} value={type}>
//                         {type}
//                       </SelectItem>
//                     ))}
//                   </SelectContent>
//                 </Select>
//               </div>

//               {selectedType && (
//                 <motion.div
//                   initial={{ opacity: 0, height: 0 }}
//                   animate={{ opacity: 1, height: "auto" }}
//                   className="space-y-4"
//                 >
//                   <div className="space-y-2">
//                     <Label>Applicant Name</Label>
//                     <Input placeholder="Enter your full name" />
//                   </div>

//                   <div className="space-y-4">
//                     <Label className="text-base font-semibold">Required Documents</Label>
//                     {documentTypes[selectedType]?.map((docType) => (
//                       <Card key={docType} className="border-dashed">
//                         <CardContent className="p-4">
//                           <div className="flex items-center justify-between">
//                             <div className="flex items-center gap-3">
//                               <FileText className="h-5 w-5 text-muted-foreground" />
//                               <div>
//                                 <p className="font-medium">{docType}</p>
//                                 <p className="text-sm text-muted-foreground">
//                                   {documents.find(d => d.type === docType) 
//                                     ? documents.find(d => d.type === docType)?.name
//                                     : "No file uploaded"}
//                                 </p>
//                               </div>
//                             </div>
//                             <div>
//                               <Input
//                                 type="file"
//                                 className="hidden"
//                                 id={`file-${docType}`}
//                                 onChange={(e) => handleFileUpload(docType, e.target.files)}
//                               />
//                               <Button
//                                 variant="outline"
//                                 size="sm"
//                                 onClick={() => document.getElementById(`file-${docType}`)?.click()}
//                               >
//                                 <Upload className="mr-2 h-4 w-4" />
//                                 Upload
//                               </Button>
//                             </div>
//                           </div>
//                         </CardContent>
//                       </Card>
//                     ))}
//                   </div>

//                   {uploading && (
//                     <div className="space-y-2">
//                       <p className="text-sm text-muted-foreground">Uploading...</p>
//                       <Progress value={66} />
//                     </div>
//                   )}
//                 </motion.div>
//               )}
//             </CardContent>
//             <CardFooter>
//               <Button 
//                 className="w-full" 
//                 disabled={!selectedType || documents.length === 0}
//                 onClick={handleSubmit}
//               >
//                 Submit Application
//               </Button>
//             </CardFooter>
//           </Card>
//         </motion.div>
//       </div>
//     </div>
//   )
// }

// // Admin Side Component
// function AdminDashboard() {
//   const [applications, setApplications] = React.useState<Application[]>(sampleApplications)
//   const [selectedApp, setSelectedApp] = React.useState<Application | null>(null)
//   const [searchQuery, setSearchQuery] = React.useState("")
//   const [statusFilter, setStatusFilter] = React.useState<string>("all")
//   const [showPreview, setShowPreview] = React.useState(false)
//   const [decision, setDecision] = React.useState<"approved" | "pending" | "declined">("pending")
//   const [comment, setComment] = React.useState("")

//   const filteredApplications = applications.filter(app => {
//     const matchesSearch = app.applicantName.toLowerCase().includes(searchQuery.toLowerCase()) ||
//                          app.id.toLowerCase().includes(searchQuery.toLowerCase())
//     const matchesStatus = statusFilter === "all" || app.status === statusFilter
//     return matchesSearch && matchesStatus
//   })

//   const handleDecision = () => {
//     if (!selectedApp) return
    
//     setApplications(applications.map(app => 
//       app.id === selectedApp.id 
//         ? { ...app, status: decision }
//         : app
//     ))
    
//     alert(`Application ${decision} with comment: ${comment}`)
//     setSelectedApp(null)
//     setComment("")
//   }

//   const getSeverityColor = (severity?: string) => {
//     switch (severity) {
//       case "low": return "text-green-600 bg-green-50"
//       case "medium": return "text-yellow-600 bg-yellow-50"
//       case "high": return "text-orange-600 bg-orange-50"
//       case "critical": return "text-red-600 bg-red-50"
//       default: return "text-gray-600 bg-gray-50"
//     }
//   }

//   const getStatusIcon = (status: string) => {
//     switch (status) {
//       case "verified": return <CheckCircle className="h-4 w-4 text-green-600" />
//       case "rejected": return <XCircle className="h-4 w-4 text-red-600" />
//       case "pending": return <Clock className="h-4 w-4 text-yellow-600" />
//       default: return null
//     }
//   }

//   return (
//     <div className="min-h-screen bg-background">
//       <div className="border-b">
//         <div className="container mx-auto p-4">
//           <h1 className="text-2xl font-bold">Fraud Detection Dashboard</h1>
//           <p className="text-muted-foreground">Review and manage benefit applications</p>
//         </div>
//       </div>

//       <div className="container mx-auto p-4">
//         <Tabs defaultValue="applications" className="space-y-4">
//           <TabsList>
//             <TabsTrigger value="applications">Applications</TabsTrigger>
//             <TabsTrigger value="analytics">Analytics</TabsTrigger>
//           </TabsList>

//           <TabsContent value="applications" className="space-y-4">
//             <div className="flex gap-4">
//               <div className="relative flex-1">
//                 <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
//                 <Input
//                   placeholder="Search applications..."
//                   value={searchQuery}
//                   onChange={(e) => setSearchQuery(e.target.value)}
//                   className="pl-9"
//                 />
//               </div>
//               <Select value={statusFilter} onValueChange={setStatusFilter}>
//                 <SelectTrigger className="w-[180px]">
//                   <Filter className="mr-2 h-4 w-4" />
//                   <SelectValue />
//                 </SelectTrigger>
//                 <SelectContent>
//                   <SelectItem value="all">All Status</SelectItem>
//                   <SelectItem value="pending">Pending</SelectItem>
//                   <SelectItem value="approved">Approved</SelectItem>
//                   <SelectItem value="declined">Declined</SelectItem>
//                 </SelectContent>
//               </Select>
//             </div>

//             <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
//               <AnimatePresence mode="popLayout">
//                 {filteredApplications.map((app) => (
//                   <motion.div
//                     key={app.id}
//                     initial={{ opacity: 0, scale: 0.9 }}
//                     animate={{ opacity: 1, scale: 1 }}
//                     exit={{ opacity: 0, scale: 0.9 }}
//                     whileHover={{ scale: 1.02 }}
//                     transition={{ duration: 0.2 }}
//                   >
//                     <Card 
//                       className="cursor-pointer hover:shadow-lg transition-shadow"
//                       onClick={() => setSelectedApp(app)}
//                     >
//                       <CardHeader>
//                         <div className="flex items-start justify-between">
//                           <div>
//                             <CardTitle className="text-lg">{app.applicantName}</CardTitle>
//                             <CardDescription>{app.applicationType}</CardDescription>
//                           </div>
//                           <Badge variant={
//                             app.status === "approved" ? "default" :
//                             app.status === "declined" ? "destructive" :
//                             "secondary"
//                           }>
//                             {app.status}
//                           </Badge>
//                         </div>
//                       </CardHeader>
//                       <CardContent>
//                         <div className="space-y-2 text-sm">
//                           <div className="flex items-center gap-2">
//                             <Calendar className="h-4 w-4 text-muted-foreground" />
//                             <span className="text-muted-foreground">
//                               {new Date(app.submittedAt).toLocaleDateString()}
//                             </span>
//                           </div>
//                           <div className="flex items-center gap-2">
//                             <FileCheck className="h-4 w-4 text-muted-foreground" />
//                             <span className="text-muted-foreground">
//                               {app.documents.length} documents
//                             </span>
//                           </div>
//                         </div>
//                       </CardContent>
//                     </Card>
//                   </motion.div>
//                 ))}
//               </AnimatePresence>
//             </div>
//           </TabsContent>

//           <TabsContent value="analytics">
//             <Card>
//               <CardHeader>
//                 <CardTitle>Analytics Dashboard</CardTitle>
//                 <CardDescription>Overview of application statistics</CardDescription>
//               </CardHeader>
//               <CardContent>
//                 <div className="grid gap-4 md:grid-cols-3">
//                   <Card>
//                     <CardHeader className="pb-2">
//                       <CardDescription>Total Applications</CardDescription>
//                       <CardTitle className="text-3xl">{applications.length}</CardTitle>
//                     </CardHeader>
//                   </Card>
//                   <Card>
//                     <CardHeader className="pb-2">
//                       <CardDescription>Pending Review</CardDescription>
//                       <CardTitle className="text-3xl">
//                         {applications.filter(a => a.status === "pending").length}
//                       </CardTitle>
//                     </CardHeader>
//                   </Card>
//                   <Card>
//                     <CardHeader className="pb-2">
//                       <CardDescription>Fraud Detected</CardDescription>
//                       <CardTitle className="text-3xl text-red-600">
//                         {applications.filter(a => 
//                           a.documents.some(d => d.severity === "high" || d.severity === "critical")
//                         ).length}
//                       </CardTitle>
//                     </CardHeader>
//                   </Card>
//                 </div>
//               </CardContent>
//             </Card>
//           </TabsContent>
//         </Tabs>
//       </div>

//       {/* Application Detail Modal */}
//       <AnimatePresence>
//         {selectedApp && (
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4"
//             onClick={() => setSelectedApp(null)}
//           >
//             <motion.div
//               initial={{ scale: 0.9, opacity: 0 }}
//               animate={{ scale: 1, opacity: 1 }}
//               exit={{ scale: 0.9, opacity: 0 }}
//               onClick={(e) => e.stopPropagation()}
//               className="w-full max-w-4xl max-h-[90vh] overflow-hidden"
//             >
//               <Card>
//                 <CardHeader>
//                   <div className="flex items-start justify-between">
//                     <div>
//                       <CardTitle>{selectedApp.applicantName}</CardTitle>
//                       <CardDescription>
//                         {selectedApp.applicationType} - {selectedApp.id}
//                       </CardDescription>
//                     </div>
//                     <Button variant="ghost" size="icon" onClick={() => setSelectedApp(null)}>
//                       <XCircle className="h-5 w-5" />
//                     </Button>
//                   </div>
//                 </CardHeader>
//                 <ScrollArea className="max-h-[60vh]">
//                   <CardContent className="space-y-6">
//                     {/* AI Summary */}
//                     <div className="space-y-2">
//                       <h3 className="font-semibold flex items-center gap-2">
//                         <AlertTriangle className="h-5 w-5 text-yellow-600" />
//                         AI Analysis Summary
//                       </h3>
//                       <Card className="bg-muted/50">
//                         <CardContent className="p-4">
//                           <p className="text-sm">{selectedApp.aiSummary}</p>
//                         </CardContent>
//                       </Card>
//                     </div>

//                     {/* Documents Table */}
//                     <div className="space-y-2">
//                       <h3 className="font-semibold">Documents</h3>
//                       <div className="border rounded-lg overflow-hidden">
//                         <table className="w-full">
//                           <thead className="bg-muted">
//                             <tr>
//                               <th className="text-left p-3 text-sm font-medium">Document</th>
//                               <th className="text-left p-3 text-sm font-medium">Type</th>
//                               <th className="text-left p-3 text-sm font-medium">Status</th>
//                               <th className="text-left p-3 text-sm font-medium">Severity</th>
//                               <th className="text-left p-3 text-sm font-medium">Actions</th>
//                             </tr>
//                           </thead>
//                           <tbody className="divide-y">
//                             {selectedApp.documents.map((doc) => (
//                               <tr key={doc.id} className="hover:bg-muted/50">
//                                 <td className="p-3 text-sm">{doc.name}</td>
//                                 <td className="p-3 text-sm">{doc.type}</td>
//                                 <td className="p-3">
//                                   <div className="flex items-center gap-2">
//                                     {getStatusIcon(doc.status)}
//                                     <span className="text-sm capitalize">{doc.status}</span>
//                                   </div>
//                                 </td>
//                                 <td className="p-3">
//                                   <Badge className={cn("capitalize", getSeverityColor(doc.severity))}>
//                                     {doc.severity || "N/A"}
//                                   </Badge>
//                                 </td>
//                                 <td className="p-3">
//                                   <Button 
//                                     variant="ghost" 
//                                     size="sm"
//                                     onClick={() => setShowPreview(true)}
//                                   >
//                                     <Eye className="h-4 w-4 mr-2" />
//                                     Preview
//                                   </Button>
//                                 </td>
//                               </tr>
//                             ))}
//                           </tbody>
//                         </table>
//                       </div>
//                     </div>

//                     {/* Decision Section */}
//                     <div className="space-y-4">
//                       <h3 className="font-semibold">Make Decision</h3>
//                       <div className="space-y-4">
//                         <div className="space-y-2">
//                           <Label>Decision</Label>
//                           <Select value={decision} onValueChange={(v: any) => setDecision(v)}>
//                             <SelectTrigger>
//                               <SelectValue />
//                             </SelectTrigger>
//                             <SelectContent>
//                               <SelectItem value="approved">Approve</SelectItem>
//                               <SelectItem value="pending">Pending</SelectItem>
//                               <SelectItem value="declined">Decline</SelectItem>
//                             </SelectContent>
//                           </Select>
//                         </div>
//                         <div className="space-y-2">
//                           <Label>Comment</Label>
//                           <Textarea
//                             placeholder="Add your comments here..."
//                             value={comment}
//                             onChange={(e) => setComment(e.target.value)}
//                             rows={4}
//                           />
//                         </div>
//                       </div>
//                     </div>
//                   </CardContent>
//                 </ScrollArea>
//                 <CardFooter className="flex gap-2">
//                   <Button variant="outline" onClick={() => setSelectedApp(null)}>
//                     Cancel
//                   </Button>
//                   <Button onClick={handleDecision}>
//                     Submit Decision
//                   </Button>
//                 </CardFooter>
//               </Card>
//             </motion.div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </div>
//   )
// }

// // Main Component
// export default function FraudDetectionSystem() {
//   const [view, setView] = React.useState<"user" | "admin">("user")

//   return (
//     <div className="min-h-screen">
//       <div className="border-b bg-card">
//         <div className="container mx-auto p-4 flex items-center justify-between">
//           <h1 className="text-xl font-bold">Government Beneficiary System</h1>
//           <div className="flex gap-2">
//             <Button
//               variant={view === "user" ? "default" : "outline"}
//               onClick={() => setView("user")}
//             >
//               <User className="mr-2 h-4 w-4" />
//               User View
//             </Button>
//             <Button
//               variant={view === "admin" ? "default" : "outline"}
//               onClick={() => setView("admin")}
//             >
//               <FileCheck className="mr-2 h-4 w-4" />
//               Admin View
//             </Button>
//           </div>
//         </div>
//       </div>

//       <AnimatePresence mode="wait">
//         {view === "user" ? (
//           <motion.div
//             key="user"
//             initial={{ opacity: 0, x: -20 }}
//             animate={{ opacity: 1, x: 0 }}
//             exit={{ opacity: 0, x: 20 }}
//           >
//             <UserApplicationForm />
//           </motion.div>
//         ) : (
//           <motion.div
//             key="admin"
//             initial={{ opacity: 0, x: 20 }}
//             animate={{ opacity: 1, x: 0 }}
//             exit={{ opacity: 0, x: -20 }}
//           >
//             <AdminDashboard />
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </div>
//   )
// }
