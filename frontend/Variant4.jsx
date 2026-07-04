// "use client";

// import React, { useState } from "react";
// import {
//   Menu,
//   X,
//   LayoutDashboard,
//   User,
//   Settings,
//   LogOut,
//   ChevronLeft,
//   Home,
//   Upload,
//   FileText,
//   CheckCircle,
//   XCircle,
//   Clock,
//   AlertTriangle,
//   Eye,
//   ChevronDown,
//   Check,
//   Search,
//   Shield,
//   FileSearch,
//   ArrowRight,
// } from "lucide-react";
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogHeader,
//   DialogTitle,
// } from "@/components/ui/dialog";
// import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { Textarea } from "@/components/ui/textarea";
// import { Badge } from "@/components/ui/badge";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import { Separator } from "@/components/ui/separator";

// // Types
// interface Application {
//   id: string;
//   applicationType: string;
//   applicantName: string;
//   submittedDate: string;
//   status: "pending" | "approved" | "declined";
// }

// interface DocumentField {
//   fieldName: string;
//   documentName: string;
//   status: "verified" | "suspicious" | "missing";
//   severity: "low" | "medium" | "high" | "critical";
//   notes: string;
// }

// interface ApplicationDetail extends Application {
//   aiSummary: string;
//   documents: DocumentField[];
// }

// // File Upload Component
// const FileUploadField = ({
//   label,
//   accept = "*/*",
//   onChange,
// }: {
//   label: string;
//   accept?: string;
//   onChange?: (file: File | null) => void;
// }) => {
//   const [file, setFile] = useState<File | null>(null);
//   const fileInputRef = React.useRef<HTMLInputElement>(null);

//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const selectedFile = e.target.files?.[0] || null;
//     setFile(selectedFile);
//     onChange?.(selectedFile);
//   };

//   return (
//     <div className="space-y-2">
//       <Label htmlFor={label} className="font-medium">
//         {label}
//       </Label>
//       <div
//         onClick={() => fileInputRef.current?.click()}
//         className="border-2 border-dashed rounded-lg p-4 text-center cursor-pointer transition-colors duration-200 border-input hover:border-border hover:bg-muted/20"
//       >
//         <input
//           ref={fileInputRef}
//           type="file"
//           accept={accept}
//           onChange={handleFileChange}
//           className="hidden"
//         />
//         <div className="space-y-2">
//           <Upload className="mx-auto h-8 w-8 text-muted-foreground" />
//           <div className="space-y-1">
//             <p className="text-sm font-medium text-foreground">
//               {file ? file.name : "Click to upload"}
//             </p>
//             <p className="text-xs text-muted-foreground">
//               {file ? `${(file.size / 1024).toFixed(2)} KB` : "Select a file"}
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// // User Application Form
// const UserApplicationForm = ({
//   onSubmit,
// }: {
//   onSubmit: (data: any) => void;
// }) => {
//   const [applicationType, setApplicationType] = useState("");
//   const [formData, setFormData] = useState<Record<string, any>>({});

//   const applicationTypes = {
//     "": [],
//     "pension-scheme": [
//       { label: "Aadhaar Card", accept: "image/*,.pdf" },
//       { label: "Bank Passbook", accept: "image/*,.pdf" },
//       { label: "Age Proof", accept: "image/*,.pdf" },
//     ],
//     "housing-subsidy": [
//       { label: "Income Certificate", accept: "image/*,.pdf" },
//       { label: "Property Documents", accept: "image/*,.pdf" },
//       { label: "Aadhaar Card", accept: "image/*,.pdf" },
//     ],
//     "education-grant": [
//       { label: "Student ID", accept: "image/*,.pdf" },
//       { label: "Income Certificate", accept: "image/*,.pdf" },
//       { label: "Academic Records", accept: "image/*,.pdf" },
//     ],
//   };

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     onSubmit({
//       applicationType,
//       ...formData,
//       submittedDate: new Date().toISOString(),
//     });
//   };

//   return (
//     <form onSubmit={handleSubmit} className="space-y-6">
//       <div>
//         <Label htmlFor="applicationType" className="font-medium">
//           Application Type <span className="text-red-500">*</span>
//         </Label>
//         <Select
//           value={applicationType}
//           onValueChange={(value) => setApplicationType(value)}
//         >
//           <SelectTrigger id="applicationType" className="mt-2">
//             <SelectValue placeholder="Select application type" />
//           </SelectTrigger>
//           <SelectContent>
//             <SelectItem value="pension-scheme">Pension Scheme</SelectItem>
//             <SelectItem value="housing-subsidy">Housing Subsidy</SelectItem>
//             <SelectItem value="education-grant">Education Grant</SelectItem>
//           </SelectContent>
//         </Select>
//       </div>

//       {applicationType && (
//         <>
//           <div>
//             <Label htmlFor="applicantName" className="font-medium">
//               Applicant Name <span className="text-red-500">*</span>
//             </Label>
//             <Input
//               id="applicantName"
//               className="mt-2"
//               onChange={(e) =>
//                 setFormData({ ...formData, applicantName: e.target.value })
//               }
//             />
//           </div>

//           <div className="space-y-4">
//             <h4 className="font-medium text-sm">Required Documents</h4>
//             {applicationTypes[
//               applicationType as keyof typeof applicationTypes
//             ].map((doc) => (
//               <FileUploadField
//                 key={doc.label}
//                 label={doc.label}
//                 accept={doc.accept}
//                 onChange={(file) =>
//                   setFormData({ ...formData, [doc.label]: file })
//                 }
//               />
//             ))}
//           </div>

//           <Button type="submit" className="w-full">
//             Submit Application
//           </Button>
//         </>
//       )}
//     </form>
//   );
// };

// // Admin Application List
// const AdminApplicationList = ({
//   applications,
//   onSelectApplication,
// }: {
//   applications: Application[];
//   onSelectApplication: (id: string) => void;
// }) => {
//   const getStatusBadge = (status: Application["status"]) => {
//     const variants = {
//       pending: { variant: "secondary" as const, icon: Clock },
//       approved: { variant: "default" as const, icon: CheckCircle },
//       declined: { variant: "destructive" as const, icon: XCircle },
//     };
//     const { variant, icon: Icon } = variants[status];
//     return (
//       <Badge variant={variant} className="flex items-center gap-1">
//         <Icon className="h-3 w-3" />
//         {status.charAt(0).toUpperCase() + status.slice(1)}
//       </Badge>
//     );
//   };

//   return (
//     <div className="space-y-4">
//       <h2 className="text-2xl font-bold">Applications</h2>
//       <div className="grid gap-4">
//         {applications.map((app) => (
//           <Card
//             key={app.id}
//             className="cursor-pointer hover:shadow-md transition-shadow"
//             onClick={() => onSelectApplication(app.id)}
//           >
//             <CardHeader>
//               <div className="flex items-center justify-between">
//                 <CardTitle className="text-lg">{app.applicantName}</CardTitle>
//                 {getStatusBadge(app.status)}
//               </div>
//               <CardDescription>
//                 {app.applicationType.replace("-", " ").toUpperCase()} •{" "}
//                 {new Date(app.submittedDate).toLocaleDateString()}
//               </CardDescription>
//             </CardHeader>
//           </Card>
//         ))}
//       </div>
//     </div>
//   );
// };

// // Admin Application Detail
// const AdminApplicationDetail = ({
//   application,
//   onBack,
//   onDecision,
// }: {
//   application: ApplicationDetail;
//   onBack: () => void;
//   onDecision: (decision: "approved" | "declined", comment: string) => void;
// }) => {
//   const [comment, setComment] = useState("");
//   const [showPreview, setShowPreview] = useState(false);

//   const getSeverityColor = (severity: DocumentField["severity"]) => {
//     const colors = {
//       low: "text-green-600 bg-green-50 dark:text-green-400 dark:bg-green-950/30",
//       medium:
//         "text-yellow-600 bg-yellow-50 dark:text-yellow-400 dark:bg-yellow-950/30",
//       high: "text-orange-600 bg-orange-50 dark:text-orange-400 dark:bg-orange-950/30",
//       critical:
//         "text-red-600 bg-red-50 dark:text-red-400 dark:bg-red-950/30",
//     };
//     return colors[severity];
//   };

//   const getStatusIcon = (status: DocumentField["status"]) => {
//     const icons = {
//       verified: <CheckCircle className="h-4 w-4 text-green-600" />,
//       suspicious: <AlertTriangle className="h-4 w-4 text-orange-600" />,
//       missing: <XCircle className="h-4 w-4 text-red-600" />,
//     };
//     return icons[status];
//   };

//   return (
//     <div className="space-y-6">
//       <div className="flex items-center gap-4">
//         <Button variant="ghost" onClick={onBack}>
//           <ChevronLeft className="h-4 w-4 mr-2" />
//           Back
//         </Button>
//         <h2 className="text-2xl font-bold">Application Details</h2>
//       </div>

//       <Card>
//         <CardHeader>
//           <CardTitle>AI Summary</CardTitle>
//         </CardHeader>
//         <CardContent>
//           <p className="text-sm text-muted-foreground">
//             {application.aiSummary}
//           </p>
//         </CardContent>
//       </Card>

//       <Card>
//         <CardHeader>
//           <CardTitle>Document Verification</CardTitle>
//         </CardHeader>
//         <CardContent>
//           <Table>
//             <TableHeader>
//               <TableRow>
//                 <TableHead>Field Name</TableHead>
//                 <TableHead>Document</TableHead>
//                 <TableHead>Status</TableHead>
//                 <TableHead>Severity</TableHead>
//                 <TableHead>Notes</TableHead>
//               </TableRow>
//             </TableHeader>
//             <TableBody>
//               {application.documents.map((doc, idx) => (
//                 <TableRow key={idx}>
//                   <TableCell className="font-medium">{doc.fieldName}</TableCell>
//                   <TableCell>{doc.documentName}</TableCell>
//                   <TableCell>
//                     <div className="flex items-center gap-2">
//                       {getStatusIcon(doc.status)}
//                       <span className="text-sm capitalize">{doc.status}</span>
//                     </div>
//                   </TableCell>
//                   <TableCell>
//                     <Badge
//                       className={getSeverityColor(doc.severity)}
//                       variant="secondary"
//                     >
//                       {doc.severity.toUpperCase()}
//                     </Badge>
//                   </TableCell>
//                   <TableCell className="text-sm text-muted-foreground">
//                     {doc.notes}
//                   </TableCell>
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>
//         </CardContent>
//       </Card>

//       <Card>
//         <CardHeader>
//           <CardTitle>Preview Documents</CardTitle>
//         </CardHeader>
//         <CardContent>
//           <Button
//             variant="outline"
//             onClick={() => setShowPreview(!showPreview)}
//             className="w-full"
//           >
//             <Eye className="h-4 w-4 mr-2" />
//             {showPreview ? "Hide" : "Show"} Document Preview
//           </Button>
//           {showPreview && (
//             <div className="mt-4 p-4 border rounded-lg bg-muted/20">
//               <p className="text-sm text-muted-foreground">
//                 Document preview would be displayed here
//               </p>
//             </div>
//           )}
//         </CardContent>
//       </Card>

//       <Card>
//         <CardHeader>
//           <CardTitle>Make Decision</CardTitle>
//         </CardHeader>
//         <CardContent className="space-y-4">
//           <div>
//             <Label htmlFor="comment">Comment</Label>
//             <Textarea
//               id="comment"
//               value={comment}
//               onChange={(e) => setComment(e.target.value)}
//               placeholder="Add your comments here..."
//               className="mt-2"
//             />
//           </div>
//           <div className="flex gap-3">
//             <Button
//               variant="destructive"
//               onClick={() => onDecision("declined", comment)}
//               className="flex-1"
//             >
//               <XCircle className="h-4 w-4 mr-2" />
//               Decline
//             </Button>
//             <Button
//               variant="secondary"
//               onClick={() => onDecision("approved", comment)}
//               className="flex-1"
//             >
//               <Clock className="h-4 w-4 mr-2" />
//               Pending
//             </Button>
//             <Button
//               onClick={() => onDecision("approved", comment)}
//               className="flex-1"
//             >
//               <CheckCircle className="h-4 w-4 mr-2" />
//               Approve
//             </Button>
//           </div>
//         </CardContent>
//       </Card>
//     </div>
//   );
// };

// // Home Page Component
// const HomePage = ({
//   onNavigate,
// }: {
//   onNavigate: (view: "login" | "signup") => void;
// }) => {
//   const [loginOpen, setLoginOpen] = useState(false);
//   const [signupOpen, setSignupOpen] = useState(false);
//   return (
//     <div className="min-h-screen bg-background">
//       {/* Animated Background */}
//       <div className="fixed inset-0 -z-10 overflow-hidden">
//         <div className="absolute -top-1/2 -right-1/2 w-[1000px] h-[1000px] rounded-full bg-gradient-to-br from-blue-500/10 to-purple-500/10 blur-3xl animate-pulse" />
//         <div className="absolute -bottom-1/2 -left-1/2 w-[1000px] h-[1000px] rounded-full bg-gradient-to-tr from-purple-500/10 to-blue-500/10 blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
//       </div>

//       {/* Header */}
//       <header className="border-b border-border/50 bg-background/80 backdrop-blur-xl sticky top-0 z-50">
//         <div className="container mx-auto px-6 py-4">
//           <div className="flex items-center justify-between">
//             <div className="flex items-center gap-3">
//               <div className="relative">
//                 <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl blur opacity-50" />
//                 <div className="relative w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-xl">
//                   <Shield className="h-7 w-7 text-white" />
//                 </div>
//               </div>
//               <div>
//                 <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">FraudGuard</h1>
//                 <p className="text-xs text-muted-foreground">Government Portal</p>
//               </div>
//             </div>
//             <div className="flex items-center gap-3">
//               <Button variant="ghost" size="lg" onClick={() => setLoginOpen(true)}>
//                 Login
//               </Button>
//               <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700" onClick={() => setSignupOpen(true)}>
//                 Get Started
//                 <ArrowRight className="ml-2 h-4 w-4" />
//               </Button>
//             </div>
//           </div>
//         </div>
//       </header>

//       {/* Hero Section */}
//       <section className="relative container mx-auto px-6 py-24 lg:py-32">
//         <div className="grid lg:grid-cols-2 gap-12 items-center">
//           {/* Left Content */}
//           <div className="space-y-8">
//             <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-full text-sm font-medium backdrop-blur-sm">
//               <div className="w-2 h-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 animate-pulse" />
//               <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">AI-Powered Fraud Detection</span>
//             </div>
            
//             <h1 className="text-5xl lg:text-7xl font-bold leading-tight">
//               Secure Your
//               <br />
//               <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 bg-clip-text text-transparent animate-gradient bg-[length:200%_auto]">
//                 Beneficiary
//               </span>
//               <br />
//               Applications
//             </h1>
            
//             <p className="text-xl text-muted-foreground leading-relaxed max-w-xl">
//               Advanced AI technology protects government schemes from fraudulent applications while ensuring legitimate beneficiaries receive fast, transparent processing.
//             </p>
            
//             <div className="flex flex-wrap items-center gap-4">
//               <Button size="lg" className="text-lg px-8 py-6 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all" onClick={() => setSignupOpen(true)}>
//                 Start Application
//                 <ArrowRight className="ml-2 h-5 w-5" />
//               </Button>
//               <Button size="lg" variant="outline" className="text-lg px-8 py-6 border-2">
//                 Watch Demo
//               </Button>
//             </div>

//             {/* Trust Indicators */}
//             <div className="flex items-center gap-8 pt-4">
//               <div>
//                 <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">10K+</div>
//                 <div className="text-sm text-muted-foreground">Applications</div>
//               </div>
//               <div className="h-12 w-px bg-border" />
//               <div>
//                 <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">98%</div>
//                 <div className="text-sm text-muted-foreground">Detection Rate</div>
//               </div>
//               <div className="h-12 w-px bg-border" />
//               <div>
//                 <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">24hrs</div>
//                 <div className="text-sm text-muted-foreground">Processing</div>
//               </div>
//             </div>
//           </div>

//           {/* Right Visual */}
//           <div className="relative hidden lg:block">
//             <div className="relative z-10">
//               <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-3xl blur-3xl" />
//               <Card className="relative border-2 shadow-2xl">
//                 <CardHeader className="pb-4">
//                   <div className="flex items-center justify-between">
//                     <div className="flex items-center gap-3">
//                       <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
//                         <CheckCircle className="h-5 w-5 text-white" />
//                       </div>
//                       <div>
//                         <div className="font-semibold">Application Verified</div>
//                         <div className="text-xs text-muted-foreground">ID: #APL-2024-001</div>
//                       </div>
//                     </div>
//                     <Badge className="bg-green-500/10 text-green-600 border-green-500/20 hover:bg-green-500/20">Approved</Badge>
//                   </div>
//                 </CardHeader>
//                 <CardContent className="space-y-4">
//                   <div className="space-y-2">
//                     <div className="flex items-center justify-between text-sm">
//                       <span className="text-muted-foreground">Document Scan</span>
//                       <span className="font-medium">100%</span>
//                     </div>
//                     <div className="h-2 bg-muted rounded-full overflow-hidden">
//                       <div className="h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-full" style={{ width: '100%' }} />
//                     </div>
//                   </div>
//                   <div className="space-y-2">
//                     <div className="flex items-center justify-between text-sm">
//                       <span className="text-muted-foreground">AI Verification</span>
//                       <span className="font-medium">100%</span>
//                     </div>
//                     <div className="h-2 bg-muted rounded-full overflow-hidden">
//                       <div className="h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-full" style={{ width: '100%' }} />
//                     </div>
//                   </div>
//                   <Separator />
//                   <div className="grid grid-cols-3 gap-4 text-center">
//                     <div>
//                       <div className="text-2xl font-bold text-green-600">3</div>
//                       <div className="text-xs text-muted-foreground">Verified</div>
//                     </div>
//                     <div>
//                       <div className="text-2xl font-bold text-muted-foreground">0</div>
//                       <div className="text-xs text-muted-foreground">Flagged</div>
//                     </div>
//                     <div>
//                       <div className="text-2xl font-bold text-muted-foreground">0</div>
//                       <div className="text-xs text-muted-foreground">Missing</div>
//                     </div>
//                   </div>
//                 </CardContent>
//               </Card>
//             </div>
            
//             {/* Floating Elements */}
//             <div className="absolute -top-8 -right-8 w-32 h-32 bg-gradient-to-br from-blue-500/20 to-transparent rounded-full blur-2xl animate-pulse" />
//             <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-gradient-to-tr from-purple-500/20 to-transparent rounded-full blur-2xl animate-pulse" style={{ animationDelay: '1s' }} />
//           </div>
//         </div>
//       </section>

//       {/* Features Section */}
//       <section className="container mx-auto px-6 py-20">
//         <div className="text-center mb-16">
//           <h2 className="text-4xl font-bold mb-4">Why Choose FraudGuard?</h2>
//           <p className="text-xl text-muted-foreground max-w-2xl mx-auto">Advanced technology ensuring security, speed, and transparency in every application</p>
//         </div>
//         <div className="grid md:grid-cols-3 gap-8">
//           <Card className="border-2 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 relative overflow-hidden group">
//             <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
//             <CardHeader>
//               <div className="relative">
//                 <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl blur opacity-20" />
//                 <div className="relative w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mb-4 shadow-lg">
//                   <Upload className="h-8 w-8 text-white" />
//                 </div>
//               </div>
//               <CardTitle className="text-2xl">Easy Application</CardTitle>
//               <CardDescription className="text-base">
//                 Intuitive interface guides you through document submission with smart validation and real-time feedback
//               </CardDescription>
//             </CardHeader>
//           </Card>

//           <Card className="border-2 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 relative overflow-hidden group">
//             <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
//             <CardHeader>
//               <div className="relative">
//                 <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl blur opacity-20" />
//                 <div className="relative w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mb-4 shadow-lg">
//                   <FileSearch className="h-8 w-8 text-white" />
//                 </div>
//               </div>
//               <CardTitle className="text-2xl">AI Verification</CardTitle>
//               <CardDescription className="text-base">
//                 Machine learning algorithms detect forgeries, validate authenticity, and flag suspicious patterns instantly
//               </CardDescription>
//             </CardHeader>
//           </Card>

//           <Card className="border-2 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 relative overflow-hidden group">
//             <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
//             <CardHeader>
//               <div className="relative">
//                 <div className="absolute inset-0 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl blur opacity-20" />
//                 <div className="relative w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mb-4 shadow-lg">
//                   <CheckCircle className="h-8 w-8 text-white" />
//                 </div>
//               </div>
//               <CardTitle className="text-2xl">Fast Processing</CardTitle>
//               <CardDescription className="text-base">
//                 Automated verification reduces processing time from weeks to hours with transparent status tracking
//               </CardDescription>
//             </CardHeader>
//           </Card>
//         </div>
//       </section>

//       {/* CTA Section */}
//       <section className="container mx-auto px-6 py-20">
//         <Card className="relative overflow-hidden border-2">
//           <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-purple-600 to-blue-600 opacity-100" />
//           <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNnptLTEyIDBjMy4zMTQgMCA2IDIuNjg2IDYgNnMtMi42ODYgNi02IDYtNi0yLjY4Ni02LTYgMi42ODYtNiA2LTZ6bTEyIDEyYzMuMzE0IDAgNiAyLjY4NiA2IDZzLTIuNjg2IDYtNiA2LTYtMi42ODYtNi02IDIuNjg2LTYgNi02em0tMTIgMGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNnoiIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iLjA1Ii8+PC9nPjwvc3ZnPg==')] opacity-20" />
//           <CardContent className="relative p-12 text-center space-y-6">
//             <h2 className="text-4xl md:text-5xl font-bold text-white">Ready to Get Started?</h2>
//             <p className="text-xl text-blue-100 max-w-2xl mx-auto">
//               Join thousands of beneficiaries who trust FraudGuard for secure, transparent application processing
//             </p>
//             <div className="flex items-center justify-center gap-4 pt-4">
//               <Button size="lg" variant="secondary" className="text-lg px-8 py-6" onClick={() => setSignupOpen(true)}>
//                 Create Account
//                 <ArrowRight className="ml-2 h-5 w-5" />
//               </Button>
//               <Button size="lg" variant="outline" className="text-lg px-8 py-6 bg-white/10 text-white border-white/20 hover:bg-white/20" onClick={() => setLoginOpen(true)}>
//                 Sign In
//               </Button>
//             </div>
//           </CardContent>
//         </Card>
//       </section>

//       {/* Dialogs */}
//       <LoginDialog open={loginOpen} onOpenChange={setLoginOpen} onLogin={(role) => onNavigate(role as any)} />
//       <SignupDialog open={signupOpen} onOpenChange={setSignupOpen} onSignup={() => setLoginOpen(true)} />
//     </div>
//   );
// };

// // Login Dialog Component
// const LoginDialog = ({
//   open,
//   onOpenChange,
//   onLogin,
// }: {
//   open: boolean;
//   onOpenChange: (open: boolean) => void;
//   onLogin: (role: "user" | "admin") => void;
// }) => {
//   const [userType, setUserType] = useState<"user" | "admin">("user");

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     onLogin(userType);
//     onOpenChange(false);
//   };

//   return (
//     <Dialog open={open} onOpenChange={onOpenChange}>
//       <DialogContent className="sm:max-w-md">
//         <DialogHeader>
//           <DialogTitle className="text-2xl">Welcome Back</DialogTitle>
//           <DialogDescription>
//             Select your account type to continue
//           </DialogDescription>
//         </DialogHeader>
//         <form onSubmit={handleSubmit} className="space-y-6 mt-4">
//           <div className="space-y-4">
//             <Label className="text-sm font-medium">Account Type</Label>
//             <RadioGroup value={userType} onValueChange={(value) => setUserType(value as "user" | "admin")} className="space-y-3">
//               <div className="flex items-center space-x-3 border rounded-lg p-4 hover:bg-accent cursor-pointer">
//                 <RadioGroupItem value="user" id="user" />
//                 <Label htmlFor="user" className="flex-1 cursor-pointer">
//                   <div className="font-medium">Beneficiary</div>
//                   <div className="text-sm text-muted-foreground">Submit and track applications</div>
//                 </Label>
//               </div>
//               <div className="flex items-center space-x-3 border rounded-lg p-4 hover:bg-accent cursor-pointer">
//                 <RadioGroupItem value="admin" id="admin" />
//                 <Label htmlFor="admin" className="flex-1 cursor-pointer">
//                   <div className="font-medium">Administrator</div>
//                   <div className="text-sm text-muted-foreground">Review and approve applications</div>
//                 </Label>
//               </div>
//             </RadioGroup>
//           </div>
//           <Button type="submit" className="w-full">
//             Continue
//           </Button>
//         </form>
//       </DialogContent>
//     </Dialog>
//   );
// };

// // Signup Dialog Component
// const SignupDialog = ({
//   open,
//   onOpenChange,
//   onSignup,
// }: {
//   open: boolean;
//   onOpenChange: (open: boolean) => void;
//   onSignup: () => void;
// }) => {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     password: "",
//     confirmPassword: "",
//   });

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     if (formData.password !== formData.confirmPassword) {
//       alert("Passwords don't match!");
//       return;
//     }
//     onSignup();
//     onOpenChange(false);
//   };

//   return (
//     <Dialog open={open} onOpenChange={onOpenChange}>
//       <DialogContent className="sm:max-w-md">
//         <DialogHeader>
//           <DialogTitle className="text-2xl">Create Account</DialogTitle>
//           <DialogDescription>
//             Sign up to access government schemes
//           </DialogDescription>
//         </DialogHeader>
//         <form onSubmit={handleSubmit} className="space-y-4 mt-4">
//           <div className="space-y-2">
//             <Label htmlFor="name">Full Name</Label>
//             <Input
//               id="name"
//               placeholder="John Doe"
//               value={formData.name}
//               onChange={(e) => setFormData({ ...formData, name: e.target.value })}
//               required
//             />
//           </div>
//           <div className="space-y-2">
//             <Label htmlFor="signup-email">Email</Label>
//             <Input
//               id="signup-email"
//               type="email"
//               placeholder="name@example.com"
//               value={formData.email}
//               onChange={(e) => setFormData({ ...formData, email: e.target.value })}
//               required
//             />
//           </div>
//           <div className="space-y-2">
//             <Label htmlFor="signup-password">Password</Label>
//             <Input
//               id="signup-password"
//               type="password"
//               placeholder="Create a password"
//               value={formData.password}
//               onChange={(e) => setFormData({ ...formData, password: e.target.value })}
//               required
//             />
//           </div>
//           <div className="space-y-2">
//             <Label htmlFor="confirm-password">Confirm Password</Label>
//             <Input
//               id="confirm-password"
//               type="password"
//               placeholder="Confirm password"
//               value={formData.confirmPassword}
//               onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
//               required
//             />
//           </div>
//           <Button type="submit" className="w-full">
//             Create Account
//           </Button>
//         </form>
//       </DialogContent>
//     </Dialog>
//   );
// };

// // Track Application Component
// const TrackApplicationPage = ({ applications }: { applications: Application[] }) => {
//   const [searchId, setSearchId] = useState("");
//   const [searchResult, setSearchResult] = useState<Application | null>(null);

//   const handleSearch = () => {
//     const found = applications.find((app) => app.id === searchId);
//     setSearchResult(found || null);
//   };

//   const getStatusBadge = (status: Application["status"]) => {
//     const variants = {
//       pending: { variant: "secondary" as const, icon: Clock },
//       approved: { variant: "default" as const, icon: CheckCircle },
//       declined: { variant: "destructive" as const, icon: XCircle },
//     };
//     const { variant, icon: Icon } = variants[status];
//     return (
//       <Badge variant={variant} className="flex items-center gap-1">
//         <Icon className="h-3 w-3" />
//         {status.charAt(0).toUpperCase() + status.slice(1)}
//       </Badge>
//     );
//   };

//   return (
//     <div className="space-y-6">
//       <div>
//         <h2 className="text-2xl font-bold mb-2">Track Your Application</h2>
//         <p className="text-muted-foreground">Enter your application ID to check status</p>
//       </div>

//       <Card>
//         <CardContent className="pt-6">
//           <div className="flex gap-3">
//             <Input
//               placeholder="Enter Application ID (e.g., 1, 2)"
//               value={searchId}
//               onChange={(e) => setSearchId(e.target.value)}
//               onKeyPress={(e) => e.key === "Enter" && handleSearch()}
//             />
//             <Button onClick={handleSearch}>
//               <Search className="h-4 w-4 mr-2" />
//               Search
//             </Button>
//           </div>
//         </CardContent>
//       </Card>

//       {searchResult && (
//         <Card>
//           <CardHeader>
//             <div className="flex items-center justify-between">
//               <CardTitle>{searchResult.applicantName}</CardTitle>
//               {getStatusBadge(searchResult.status)}
//             </div>
//             <CardDescription>
//               Application ID: {searchResult.id} •{" "}
//               {searchResult.applicationType.replace("-", " ").toUpperCase()}
//             </CardDescription>
//           </CardHeader>
//           <CardContent>
//             <div className="space-y-4">
//               <div>
//                 <Label className="text-sm text-muted-foreground">Submitted Date</Label>
//                 <p className="font-medium">
//                   {new Date(searchResult.submittedDate).toLocaleString()}
//                 </p>
//               </div>
//               <Separator />
//               <div>
//                 <Label className="text-sm text-muted-foreground">Status Information</Label>
//                 <p className="mt-2">
//                   {searchResult.status === "pending" &&
//                     "Your application is under review. We'll notify you once it's processed."}
//                   {searchResult.status === "approved" &&
//                     "Congratulations! Your application has been approved."}
//                   {searchResult.status === "declined" &&
//                     "Your application has been declined. Please contact support for details."}
//                 </p>
//               </div>
//             </div>
//           </CardContent>
//         </Card>
//       )}

//       {searchResult === null && searchId && (
//         <Card>
//           <CardContent className="pt-6 text-center">
//             <XCircle className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
//             <p className="text-muted-foreground">No application found with ID: {searchId}</p>
//           </CardContent>
//         </Card>
//       )}
//     </div>
//   );
// };

// // Main Component
// const FraudDetectionSystem = () => {
//   const [currentPage, setCurrentPage] = useState<"home" | "app">("home");
//   const [userRole, setUserRole] = useState<"user" | "admin" | null>(null);
//   const [isOpen, setIsOpen] = useState(false);
//   const [isCollapsed, setIsCollapsed] = useState(false);
//   const [activeView, setActiveView] = useState<"submit" | "track" | "list" | "detail">("submit");
//   const [selectedApplication, setSelectedApplication] = useState<string | null>(
//     null
//   );
//   const [applications, setApplications] = useState<ApplicationDetail[]>([
//     {
//       id: "1",
//       applicationType: "pension-scheme",
//       applicantName: "John Doe",
//       submittedDate: "2024-01-15T10:30:00Z",
//       status: "pending",
//       aiSummary:
//         "Application for pension scheme submitted by John Doe. Initial verification shows 2 suspicious documents requiring manual review. Aadhaar card verification pending, bank passbook shows inconsistent address information.",
//       documents: [
//         {
//           fieldName: "Aadhaar Card",
//           documentName: "aadhaar_john.pdf",
//           status: "suspicious",
//           severity: "high",
//           notes: "Document quality poor, verification pending",
//         },
//         {
//           fieldName: "Bank Passbook",
//           documentName: "bank_passbook.pdf",
//           status: "suspicious",
//           severity: "medium",
//           notes: "Address mismatch with Aadhaar",
//         },
//         {
//           fieldName: "Age Proof",
//           documentName: "age_proof.pdf",
//           status: "verified",
//           severity: "low",
//           notes: "Document verified successfully",
//         },
//       ],
//     },
//     {
//       id: "2",
//       applicationType: "housing-subsidy",
//       applicantName: "Jane Smith",
//       submittedDate: "2024-01-14T14:20:00Z",
//       status: "approved",
//       aiSummary:
//         "Housing subsidy application approved. All documents verified successfully. Income certificate matches government records, property documents are authentic.",
//       documents: [
//         {
//           fieldName: "Income Certificate",
//           documentName: "income_cert.pdf",
//           status: "verified",
//           severity: "low",
//           notes: "Verified with government database",
//         },
//         {
//           fieldName: "Property Documents",
//           documentName: "property_docs.pdf",
//           status: "verified",
//           severity: "low",
//           notes: "All documents authentic",
//         },
//         {
//           fieldName: "Aadhaar Card",
//           documentName: "aadhaar_jane.pdf",
//           status: "verified",
//           severity: "low",
//           notes: "Verified successfully",
//         },
//       ],
//     },
//   ]);

//   const userMenuItems = [
//     { name: "Submit Application", icon: Upload, view: "submit" as const },
//     { name: "Track Application", icon: Search, view: "track" as const },
//   ];

//   const adminMenuItems = [
//     { name: "Applications", icon: LayoutDashboard, view: "list" as const },
//   ];

//   const menuItems = userRole === "admin" ? adminMenuItems : userMenuItems;

//   const handleApplicationSubmit = (data: any) => {
//     const newApp: ApplicationDetail = {
//       id: Date.now().toString(),
//       applicationType: data.applicationType,
//       applicantName: data.applicantName,
//       submittedDate: data.submittedDate,
//       status: "pending",
//       aiSummary:
//         "Application submitted successfully. AI analysis in progress...",
//       documents: [
//         {
//           fieldName: "Document 1",
//           documentName: "doc1.pdf",
//           status: "verified",
//           severity: "low",
//           notes: "Pending verification",
//         },
//       ],
//     };
//     setApplications([...applications, newApp]);
//     alert("Application submitted successfully!");
//   };

//   const handleDecision = (
//     decision: "approved" | "declined",
//     comment: string
//   ) => {
//     if (selectedApplication) {
//       setApplications(
//         applications.map((app) =>
//           app.id === selectedApplication ? { ...app, status: decision } : app
//         )
//       );
//       setSelectedApplication(null);
//       setActiveView("list");
//       alert(`Application ${decision} with comment: ${comment}`);
//     }
//   };

//   const handleLogin = (role: "user" | "admin") => {
//     setUserRole(role);
//     setCurrentPage("app");
//     setActiveView(role === "admin" ? "list" : "submit");
//   };

//   const handleLogout = () => {
//     setUserRole(null);
//     setCurrentPage("home");
//     setActiveView("submit");
//   };

//   const selectedApp = applications.find((app) => app.id === selectedApplication);

//   if (currentPage === "home") {
//     return <HomePage onNavigate={(view) => {
//       if (view === "login") {
//         // Login dialog handles this
//       } else if (view === "signup") {
//         // Signup dialog handles this
//       } else {
//         handleLogin(view as "user" | "admin");
//       }
//     }} />;
//   }

//   return (
//     <div className="relative min-h-screen bg-background">
//       {/* Mobile Hamburger Button */}
//       <button
//         onClick={() => setIsOpen(!isOpen)}
//         className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-slate-900 text-white hover:bg-slate-800 transition-colors duration-200 shadow-lg"
//       >
//         {isOpen ? <X size={24} /> : <Menu size={24} />}
//       </button>

//       {/* Mobile Overlay */}
//       {isOpen && (
//         <div
//           className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-30 transition-opacity duration-300"
//           onClick={() => setIsOpen(false)}
//         />
//       )}

//       {/* Sidebar */}
//       <div
//         className={`fixed top-0 left-0 h-full bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 border-r border-slate-700 transition-all duration-300 ease-in-out z-40 ${
//           isOpen ? "translate-x-0" : "-translate-x-full"
//         } lg:translate-x-0 ${isCollapsed ? "lg:w-20" : "lg:w-64"} w-64 shadow-2xl`}
//       >
//         {/* Header */}
//         <div className="flex items-center justify-between p-6 border-b border-slate-700">
//           <div className="flex items-center space-x-3">
//             <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
//               <Shield className="text-white h-5 w-5" />
//             </div>
//             {!isCollapsed && (
//               <div>
//                 <h1 className="text-lg font-bold text-white tracking-wide">
//                   FraudGuard
//                 </h1>
//                 <p className="text-xs text-slate-400">
//                   {userRole === "admin" ? "Admin Panel" : "User Portal"}
//                 </p>
//               </div>
//             )}
//           </div>

//           <button
//             onClick={() => setIsCollapsed(!isCollapsed)}
//             className="hidden lg:block p-1.5 rounded-lg hover:bg-slate-700 text-slate-400 hover:text-white transition-colors duration-200"
//           >
//             <ChevronLeft
//               size={20}
//               className={`transition-transform duration-300 ${
//                 isCollapsed ? "rotate-180" : ""
//               }`}
//             />
//           </button>
//         </div>

//         {/* Navigation */}
//         <nav className="flex-1 p-4 space-y-2">
//           {menuItems.map((item) => {
//             const Icon = item.icon;
//             const isActive = activeView === item.view;

//             return (
//               <button
//                 key={item.name}
//                 onClick={() => {
//                   setActiveView(item.view as any);
//                   setSelectedApplication(null);
//                   setIsOpen(false);
//                 }}
//                 className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 group ${
//                   isActive
//                     ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg"
//                     : "text-slate-300 hover:bg-slate-700 hover:text-white"
//                 }`}
//               >
//                 <Icon
//                   size={20}
//                   className={`transition-colors duration-200 ${
//                     isActive
//                       ? "text-white"
//                       : "text-slate-400 group-hover:text-white"
//                   }`}
//                 />
//                 {!isCollapsed && (
//                   <span className="font-medium transition-colors duration-200">
//                     {item.name}
//                   </span>
//                 )}
//               </button>
//             );
//           })}

//           <Separator className="my-4 bg-slate-700" />

//           <button
//             onClick={handleLogout}
//             className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 group text-slate-300 hover:bg-red-600/20 hover:text-red-400"
//           >
//             <LogOut size={20} className="text-slate-400 group-hover:text-red-400" />
//             {!isCollapsed && <span className="font-medium">Logout</span>}
//           </button>
//         </nav>
//       </div>

//       {/* Main Content Area */}
//       <div
//         className={`lg:ml-64 transition-all duration-300 ease-in-out ${
//           isCollapsed ? "lg:ml-20" : "lg:ml-64"
//         }`}
//       >
//         <div className="p-8 ml-16 lg:ml-0">
//           <div className="bg-background rounded-xl shadow-lg p-8 border border-border">
//             {userRole === "user" ? (
//               activeView === "submit" ? (
//                 <div>
//                   <h2 className="text-2xl font-bold mb-6">
//                     Submit Beneficiary Application
//                   </h2>
//                   <UserApplicationForm onSubmit={handleApplicationSubmit} />
//                 </div>
//               ) : (
//                 <TrackApplicationPage applications={applications} />
//               )
//             ) : selectedApp ? (
//               <AdminApplicationDetail
//                 application={selectedApp}
//                 onBack={() => {
//                   setSelectedApplication(null);
//                   setActiveView("list");
//                 }}
//                 onDecision={handleDecision}
//               />
//             ) : (
//               <AdminApplicationList
//                 applications={applications}
//                 onSelectApplication={(id) => {
//                   setSelectedApplication(id);
//                   setActiveView("detail");
//                 }}
//               />
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default FraudDetectionSystem;
