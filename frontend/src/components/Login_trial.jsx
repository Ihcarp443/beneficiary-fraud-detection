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
//               {/* <XCircle className="h-4 w-4 mr-2" /> */}
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
//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
//       {/* Header */}
//       <header className="border-b border-border/50 bg-background/80 backdrop-blur-sm sticky top-0 z-50">
//         <div className="container mx-auto px-6 py-4 flex items-center justify-between">
//           <div className="flex items-center gap-3">
//             <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
//               <Shield className="h-6 w-6 text-white" />
//             </div>
//             <div>
//               <h1 className="text-xl font-bold text-foreground">FraudGuard</h1>
//               <p className="text-xs text-muted-foreground">Government Beneficiary Portal</p>
//             </div>
//           </div>
//           <div className="flex items-center gap-3">
//             <Button variant="ghost" onClick={() => onNavigate("login")}>
//               Login
//             </Button>
//             <Button onClick={() => onNavigate("signup")}>
//               Sign Up
//             </Button>
//           </div>
//         </div>
//       </header>

//       {/* Hero Section */}
//       <section className="container mx-auto px-6 py-20">
//         <div className="max-w-4xl mx-auto text-center space-y-6">
//           <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 rounded-full text-sm font-medium">
//             <Shield className="h-4 w-4" />
//             AI-Powered Fraud Detection
//           </div>
//           <h1 className="text-5xl md:text-6xl font-bold text-foreground leading-tight">
//             Secure & Transparent
//             <br />
//             <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
//               Beneficiary Management
//             </span>
//           </h1>
//           <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
//             Submit applications with confidence. Our AI-powered system ensures fast, 
//             accurate verification while protecting against fraud.
//           </p>
//           <div className="flex items-center justify-center gap-4 pt-4">
//             <Button size="lg" className="text-lg" onClick={() => onNavigate("signup")}>
//               Get Started
//               <ArrowRight className="ml-2 h-5 w-5" />
//             </Button>
//             <Button size="lg" variant="outline" className="text-lg">
//               Learn More
//             </Button>
//           </div>
//         </div>
//       </section>

//       {/* Features Section */}
//       <section className="container mx-auto px-6 py-20">
//         <div className="grid md:grid-cols-3 gap-8">
//           <Card className="border-2 hover:shadow-lg transition-shadow">
//             <CardHeader>
//               <div className="w-12 h-12 bg-blue-100 dark:bg-blue-950 rounded-lg flex items-center justify-center mb-4">
//                 <Upload className="h-6 w-6 text-blue-600 dark:text-blue-400" />
//               </div>
//               <CardTitle>Easy Application</CardTitle>
//               <CardDescription>
//                 Simple document upload process with guided steps for various government schemes
//               </CardDescription>
//             </CardHeader>
//           </Card>

//           <Card className="border-2 hover:shadow-lg transition-shadow">
//             <CardHeader>
//               <div className="w-12 h-12 bg-purple-100 dark:bg-purple-950 rounded-lg flex items-center justify-center mb-4">
//                 <FileSearch className="h-6 w-6 text-purple-600 dark:text-purple-400" />
//               </div>
//               <CardTitle>AI Verification</CardTitle>
//               <CardDescription>
//                 Advanced AI analyzes documents for authenticity and flags potential fraud
//               </CardDescription>
//             </CardHeader>
//           </Card>

//           <Card className="border-2 hover:shadow-lg transition-shadow">
//             <CardHeader>
//               <div className="w-12 h-12 bg-green-100 dark:bg-green-950 rounded-lg flex items-center justify-center mb-4">
//                 <CheckCircle className="h-6 w-6 text-green-600 dark:text-green-400" />
//               </div>
//               <CardTitle>Fast Processing</CardTitle>
//               <CardDescription>
//                 Real-time status updates and quick approval process for legitimate applications
//               </CardDescription>
//             </CardHeader>
//           </Card>
//         </div>
//       </section>

//       {/* Stats Section */}
//       <section className="container mx-auto px-6 py-20">
//         <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-3xl p-12 text-white">
//           <div className="grid md:grid-cols-3 gap-8 text-center">
//             <div>
//               <div className="text-4xl font-bold mb-2">10,000+</div>
//               <div className="text-blue-100">Applications Processed</div>
//             </div>
//             <div>
//               <div className="text-4xl font-bold mb-2">98%</div>
//               <div className="text-blue-100">Fraud Detection Rate</div>
//             </div>
//             <div>
//               <div className="text-4xl font-bold mb-2">24hrs</div>
//               <div className="text-blue-100">Average Processing Time</div>
//             </div>
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// };

// // Login Page Component
// const LoginPage = ({
//   onBack,
//   onLogin,
// }: {
//   onBack: () => void;
//   onLogin: (role: "user" | "admin") => void;
// }) => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     // Simple role detection based on email
//     const role = email.includes("admin") ? "admin" : "user";
//     onLogin(role);
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 flex items-center justify-center p-6">
//       <Card className="w-full max-w-md">
//         <CardHeader className="space-y-1">
//           <div className="flex items-center justify-center mb-4">
//             <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
//               <Shield className="h-7 w-7 text-white" />
//             </div>
//           </div>
//           <CardTitle className="text-2xl text-center">Welcome Back</CardTitle>
//           <CardDescription className="text-center">
//             Login to access your account
//           </CardDescription>
//         </CardHeader>
//         <CardContent>
//           <form onSubmit={handleSubmit} className="space-y-4">
//             <div className="space-y-2">
//               <Label htmlFor="email">Email</Label>
//               <Input
//                 id="email"
//                 type="email"
//                 placeholder="name@example.com"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 required
//               />
//             </div>
//             <div className="space-y-2">
//               <Label htmlFor="password">Password</Label>
//               <Input
//                 id="password"
//                 type="password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 required
//               />
//             </div>
//             <Button type="submit" className="w-full">
//               Login
//             </Button>
//           </form>
//           <div className="mt-4 text-center text-sm">
//             <button
//               onClick={onBack}
//               className="text-muted-foreground hover:text-foreground"
//             >
//               ← Back to Home
//             </button>
//           </div>
//         </CardContent>
//       </Card>
//     </div>
//   );
// };

// // Signup Page Component
// const SignupPage = ({
//   onBack,
//   onSignup,
// }: {
//   onBack: () => void;
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
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 flex items-center justify-center p-6">
//       <Card className="w-full max-w-md">
//         <CardHeader className="space-y-1">
//           <div className="flex items-center justify-center mb-4">
//             <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
//               <Shield className="h-7 w-7 text-white" />
//             </div>
//           </div>
//           <CardTitle className="text-2xl text-center">Create Account</CardTitle>
//           <CardDescription className="text-center">
//             Sign up to get started with FraudGuard
//           </CardDescription>
//         </CardHeader>
//         <CardContent>
//           <form onSubmit={handleSubmit} className="space-y-4">
//             <div className="space-y-2">
//               <Label htmlFor="name">Full Name</Label>
//               <Input
//                 id="name"
//                 placeholder="John Doe"
//                 value={formData.name}
//                 onChange={(e) => setFormData({ ...formData, name: e.target.value })}
//                 required
//               />
//             </div>
//             <div className="space-y-2">
//               <Label htmlFor="signup-email">Email</Label>
//               <Input
//                 id="signup-email"
//                 type="email"
//                 placeholder="name@example.com"
//                 value={formData.email}
//                 onChange={(e) => setFormData({ ...formData, email: e.target.value })}
//                 required
//               />
//             </div>
//             <div className="space-y-2">
//               <Label htmlFor="signup-password">Password</Label>
//               <Input
//                 id="signup-password"
//                 type="password"
//                 value={formData.password}
//                 onChange={(e) => setFormData({ ...formData, password: e.target.value })}
//                 required
//               />
//             </div>
//             <div className="space-y-2">
//               <Label htmlFor="confirm-password">Confirm Password</Label>
//               <Input
//                 id="confirm-password"
//                 type="password"
//                 value={formData.confirmPassword}
//                 onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
//                 required
//               />
//             </div>
//             <Button type="submit" className="w-full">
//               Sign Up
//             </Button>
//           </form>
//           <div className="mt-4 text-center text-sm">
//             <button
//               onClick={onBack}
//               className="text-muted-foreground hover:text-foreground"
//             >
//               ← Back to Home
//             </button>
//           </div>
//         </CardContent>
//       </Card>
//     </div>
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
//   const [currentPage, setCurrentPage] = useState<"home" | "login" | "signup" | "app">("home");
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
//     return <HomePage onNavigate={(view) => setCurrentPage(view)} />;
//   }

//   if (currentPage === "login") {
//     return (
//       <LoginPage
//         onBack={() => setCurrentPage("home")}
//         onLogin={handleLogin}
//       />
//     );
//   }

//   if (currentPage === "signup") {
//     return (
//       <SignupPage
//         onBack={() => setCurrentPage("home")}
//         onSignup={() => setCurrentPage("login")}
//       />
//     );
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
