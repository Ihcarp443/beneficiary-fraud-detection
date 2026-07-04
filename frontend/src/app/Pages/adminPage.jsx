"use client"

// import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { adminApi } from "@/APIs/adminAPI"
import {useState,useEffect} from "react"
import { 
  FileText, 
  CheckCircle, 
  XCircle, 
  Clock, 
  AlertTriangle,
  Search,
  Filter,
  CheckCircle2,
  Clock3,
  ArrowRight,
  Shield,
  ChevronLeft,
  LogOut
} from "lucide-react"
import { BarChart3 } from "lucide-react"


import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import AnalysisTable from "./analysisTable"
import { Separator } from "@/components/ui/separator"

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



const menuItems = [
  {
    name: "Applications",
    icon: FileText,
    view: "applications",
  }
]


export default function AdminDashboard() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedApp, setSelectedApp] = useState(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [showPreview, setShowPreview] = useState(false)
  const [decision, setDecision] = useState("pending")
  const [comment, setComment] = useState("")
  const [isOpen, setIsOpen] = useState(false)
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [activeView, setActiveView] = useState("applications")
  
//   const loadApplications = async () => {
//   try {
//     setLoading(true);

//     const response = await adminApi.getApplications();

//     const applications = response.docs.map((doc) => ({
//       id: doc.analysis_number,
//       analysisUuid: doc.analysis_uuid,

//       applicantName: `User ${doc.user_id}`, // Replace later when backend returns name
//       applicationType: "Unknown", // Replace later when backend returns application type

//       submittedAt: doc.created_at,

//       status: doc.status.toLowerCase(),

//       riskScore: doc.risk_score,
//       riskLevel: doc.risk_level,

//       aiSummary: doc.llm_summary,

//       verificationResult: JSON.parse(doc.verification_result || "[]"),

//       documents: Array.from({
//         length: doc.doc_count.supporting_documents,
//       }).map((_, index) => ({
//         id: `${doc.analysis_uuid}-${index}`,
//         name: `Supporting Document ${index + 1}`,
//         type: "Supporting Document",
//         status: "pending",
//         severity: doc.risk_level.toLowerCase(),
//       })),

//       documentCount: doc.doc_count.total_documents,
//     }));

//     const applications = (data.docs || []).map((app) => ({
//         ...app,

//         // TODO: Replace with app.applicant_name when backend starts returning it
//         applicantName: "John Doe",

//         // TODO: Replace with app.application_type when backend starts returning it
//         applicationType: "Housing Assistance",

//         // Keep compatibility with existing UI
//         id: app.analysis_number,
//         submittedAt: app.created_at,
//       }));

//       setApplications(applications);
//   } catch (err) {
//     console.error(err);
//     setError(err.message);
//     setApplications([]);
//   } finally {
//     setLoading(false);
//   }
// };

const loadApplications = async () => {
  try {
    setLoading(true);

    const response = await adminApi.getApplications();
    console.log(response);
    console.log(response.docs);
    const applications = (response.docs || []).map((app) => ({
      ...app,

      // TODO: Replace with app.applicant_name when backend starts returning it
      applicantName: "John Doe",

      // TODO: Replace with app.application_type when backend starts returning it
      applicationType: "Housing Assistance",

      // Keep compatibility with the existing UI
      id: app.analysis_number,
      submittedAt: app.created_at,
      status: app.status.toLowerCase(),

      // Parse verification result if present
      verificationResult: JSON.parse(app.verification_result || "[]"),
    }));

    setApplications(applications);
  } catch (err) {
    console.error(err);
    setError(err.message);
    setApplications([]);
  } finally {
    setLoading(false);
  }
};



  useEffect(() => {
  loadApplications();
    }, []);



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
    title: "Suspicious Activities",
    value: applications.filter(
    app => app.risk_level === "HIGH" || app.risk_level === "CRITICAL").length,
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
  const matchesSearch = app.applicantName.toLowerCase().includes(searchQuery.toLowerCase()) || app.id.toLowerCase().includes(searchQuery.toLowerCase())
  const matchesStatus = statusFilter === "all" || app.status === statusFilter
  return matchesSearch && matchesStatus
})



  const getStatusIcon = (status) => {
    switch (status) {
      case "verified": return <CheckCircle className="h-4 w-4 text-green-600" />
      case "rejected": return <XCircle className="h-4 w-4 text-red-600" />
      case "pending": return <Clock className="h-4 w-4 text-yellow-600" />
      default: return null
    }
  }


  const getStatusBadge = (status) => {
  switch (status) {
    case "approved":
      return (
        <Badge className="flex items-center gap-2 rounded-full bg-green-100 px-4 py-2 text-green-700 hover:bg-green-100">
          <CheckCircle2 className="h-4 w-4" />
          Approved
        </Badge>
      )

    case "declined":
      return (
        <Badge className="flex items-center gap-2 rounded-full bg-red-100 px-4 py-2 text-red-700 hover:bg-red-100">
          <XCircle className="h-4 w-4" />
          Declined
        </Badge>
      )

    default:
      return (
        <Badge className="flex items-center gap-2 rounded-full bg-yellow-100 px-4 py-2 text-yellow-700 hover:bg-yellow-100">
          <Clock3 className="h-4 w-4" />
          Pending
        </Badge>
      )
  }
}

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-background to-slate-100 flex">
        <div className={`fixed top-0 left-0 h-full bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 border-r border-slate-700 transition-all duration-300 ease-in-out z-40 ${
                isOpen ? "translate-x-0" : "-translate-x-full"
              } lg:translate-x-0 ${
                isCollapsed ? "lg:w-20" : "lg:w-64"
              } w-64 shadow-2xl flex flex-col`}
            >
              {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-700 p-6">
          <div className="flex items-center space-x-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-r from-blue-500 to-purple-600">
              <Shield className="h-5 w-5 text-white" />
            </div>
            
            {!isCollapsed && (
              <div>
                <h1 className="text-lg font-bold tracking-wide text-white">
                  FraudGuard
                </h1>
                <p className="text-xs text-slate-400">
                  Admin Portal
                </p>
              </div>
            )}
          </div>
        
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="hidden rounded-lg p-1 text-slate-400 transition-colors duration-200 hover:bg-slate-700 hover:text-white lg:block"
          >
            <ChevronLeft
              size={20}
              className={`transition-transform duration-300 ${
                isCollapsed ? "rotate-180" : ""
              }`}
            />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-2 p-4">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeView === item.view;

            return (
              <button
                key={item.name}
                onClick={() => {
                  setActiveView(item.view);
                  setIsOpen(false);
                }}
                className={`group flex w-full items-center space-x-3 rounded-lg px-4 py-3 transition-all duration-200 ${
                  isActive
                    ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg"
                    : "text-slate-300 hover:bg-slate-700 hover:text-white"
                }`}
              >
                <Icon
                  size={20}
                  className={`transition-colors duration-200 ${
                    isActive
                      ? "text-white"
                      : "text-slate-400 group-hover:text-white"
                  }`}
                />

                {!isCollapsed && (
                  <span className="font-medium">{item.name}</span>
                )}
              </button>
            );
          })}

          <Separator className="my-4 bg-slate-700" />
      
          <button
          //   onClick={handleLogout}
            className="group flex w-full items-center space-x-3 rounded-lg px-4 py-3 text-slate-300 transition-all duration-200 hover:bg-red-600/20 hover:text-red-400"
          >
            <LogOut
              size={20}
              className="text-slate-400 group-hover:text-red-400"
            />

            {!isCollapsed && <span className="font-medium">Logout</span>}
          </button>
          </nav>
        </div>
        <main className={`flex-1 transition-all duration-300 ${isCollapsed ? "lg:ml-20" : "lg:ml-64" }`}>
          <div className="sticky top-0 z-30 border-b bg-background/80 backdrop-blur-xl">
            <div className="mx-auto flex max-w-7xl items-center justify-between px-8 py-5">
              <h1 className="text-3xl font-bold tracking-tight">Beneficiary Application Review</h1>
              <p className="mt-1 text-base text-muted-foreground">Review and manage benefit applications</p>
            </div>
          </div>
          
          <div className="mx-auto max-w-7xl px-8 py-8">
            <Tabs defaultValue="applications" className="space-y-4">
                {/* Dashboard Stats */}
               <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                  {dashboardStats.map((stat) => {
                    const Icon = stat.icon
                
                return (
                  <Card
                    key={stat.title}
                    className="border rounded-xl shadow-sm hover:shadow-md transition-all duration-300"
                  >
                    <CardContent className="flex items-center justify-between px-3 py-2">
                
                      <div className="space-y-1">
                        <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                          {stat.title}
                        </p>
                
                        <h2 className={`text-2xl font-bold ${stat.valueColor}`}>
                          {stat.value}
                        </h2>
                      </div>
                
                      <div
                        className={`flex h-11 w-11 items-center justify-center rounded-xl ${stat.iconBg}`}
                      >
                        <Icon className={`h-5 w-5 ${stat.iconColor}`} />
                      </div>
                
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          <TabsList className="h-12 rounded-2xl bg-slate-100 p-1">

            <TabsTrigger
                value="applications"
                className="
                rounded-xl px-6 font-medium transition-all duration-300
                data-[state=active]:bg-blue-600
                data-[state=active]:text-white
                data-[state=active]:shadow-lg
                data-[state=active]:shadow-blue-200
                hover:bg-slate-200
                "
            >
                <FileText className="mr-2 h-4 w-4" />
                Applications
            </TabsTrigger>

            <TabsTrigger
                value="analytics"
                className="
                rounded-xl px-6 font-medium transition-all duration-300
                data-[state=active]:bg-blue-600
                data-[state=active]:text-white
                data-[state=active]:shadow-lg
                data-[state=active]:shadow-blue-200
                hover:bg-slate-200
                "
            >
                <BarChart3 className="mr-2 h-4 w-4" />
                Analytics
            </TabsTrigger>

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

           <div className="flex flex-col gap-4">
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
                    <Card className="cursor-pointer rounded-2xl border transition-all duration-300 hover:-translate-y-1 hover:shadow-xl" 
                    onClick={() => setSelectedApp(app)} >
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                                    
                        {/* Left Section */}
                        <div className="flex items-center gap-6">
                          <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-blue-100">
                            <FileText className="h-7 w-7 text-blue-600" />
                          </div>
                                    
                          <div className="space-y-1">
                            <h3 className="text-lg font-semibold">
                              {app.applicantName}
                            </h3>
                                    
                            <p className="text-sm text-muted-foreground">
                              {app.applicationType}
                            </p>
                                    
                            <p className="text-xs text-muted-foreground">
                              Analysis: {app.analysis_number}
                            </p>
                          </div>
                        </div>
                                    
                        {/* Center Section */}
                        <div className="hidden md:flex justify-between w-[45%] gap-10">
                                    
                          <div className="text-center">
                            <p className="text-xs text-muted-foreground">
                              Submitted
                            </p>
                                    
                            <p className="font-medium">
                              {new Date(app.submittedAt).toLocaleDateString()}
                            </p>
                          </div>
                                    
                          <div className="text-center">
                            <p className="text-xs text-muted-foreground">
                              Documents
                            </p>
                                    
                            <p className="font-medium">
                              {app.doc_count.supporting_documents}
                            </p>
                          </div>
                                    
                          <div className="text-center">
                            <p className="text-xs text-muted-foreground">
                              Risk
                            </p>
                                <Badge
                                  variant={
                                    app.risk_level === "HIGH" || app.risk_level === "CRITICAL"
                                      ? "destructive"
                                      : "secondary"
                                  }
                                >
                                  {app.risk_level}
                                </Badge>    
                            {/* <Badge
                              variant={
                                app.documents.some(
                                  d => d.severity === "high" || d.severity === "critical"
                                )
                                  ? "destructive"
                                  : "secondary"
                              }
                            >
                              {app.documents.some(
                                d => d.severity === "high" || d.severity === "critical"
                              )
                                ? "High"
                                : "Low"}
                            </Badge> */}
                          </div>
                            {getStatusBadge(app.status)}
                        </div>
                            
                        {/* Right Section */}
                       <div className="flex flex-col items-end gap-3">
                            {/* {getStatusBadge(app.status)} */}
                          <Button
                            size="sm"
                            className="h-10 rounded-xl px-5 font-medium shadow-sm transition-all hover:shadow-md"
                            onClick={(e) => {
                              e.stopPropagation()
                              setSelectedApp(app)
                            }}
                          >
                            Review
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </Button>
                        
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
                      <CardDescription>Suspicious</CardDescription>
                      <CardTitle className="text-text-5xl font-bold text-red-600">
                        {applications.filter(
                            app => app.risk_level === "HIGH" || app.risk_level === "CRITICAL"
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
      <AnalysisTable
          selectedApp={selectedApp}
          setSelectedApp={setSelectedApp}
          onApplicationUpdated={loadApplications}
        />
        </main>
    </div>
  )
}
