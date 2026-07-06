"use client"

import * as React from "react"
import { motion } from "framer-motion"
import {useState} from "react"
import {FileText, Upload, Search,Shield,ChevronLeft,LogOut} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import TrackApplication from "./trackApplication"
import DocumentTypes from "./helper"
import { userApi } from "@/APIs/userAPI"
import ProcessingOverlay from "@/components/processingOverlay"
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";
import { useRouter } from "next/navigation"
export default function UserDashboard() {

  const menuItems = [
  {
    name: "Submit Application",
    view: "submit",
    icon: FileText,
  },
  {
    name: "Track Application",
    view: "track",
    icon: Search,
  },
];
const [isOpen, setIsOpen] = useState(true);
const [isCollapsed, setIsCollapsed] = useState(false);
const [activeView, setActiveView] = useState("submit");
const applicationTypes = [
  "Housing Assistance",
  "Healthcare Benefits",
  "Food Assistance",
  "Education Grant",
  "Disability Support",
  "Unemployment Benefits"
]

const documentTypes=DocumentTypes
const [selectedType, setSelectedType] = useState("")
const [documents, setDocuments] = useState([])
const [uploading, setUploading] = useState(false)

const [applicationFile, setApplicationFile] = useState(null);
const [selectedDocuments, setSelectedDocuments] = useState({});



const getStandardFileName = (docValue, file) => {
  const extension = file.name.split(".").pop();

  return `${docValue}.${extension}`;
};

const getApplicationFileName = (applicationType, file) => {
  const extension = file.name.split(".").pop();

  const standardizedName = applicationType
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "_");

  return `${standardizedName}.${extension}`;
};


const handleFileUpload = (category, selectedDocument, files) => {
  if (!files?.length) return;
  console.log("handleFileUpload called");
  const file = files[0];

  const renamedFile = new File(
    [file],
    getStandardFileName(selectedDocument, file),
    { type: file.type }
  );

  const newDocument = {
    category,
    selectedDocument,
    originalName: file.name,
    fileName: renamedFile.name,
    file: renamedFile,
  };

  setDocuments((prev) => [
    ...prev.filter((doc) => doc.category !== category),
    newDocument,
  ]);
};
const router=useRouter()
  const handleLogout = () => {
  // Remove stored auth data
  // localStorage.removeItem("token");
  localStorage.removeItem("user");

  // If you use sessionStorage as well
  sessionStorage.clear();

  // Redirect to login page
  router.push("/");
};

const handleApplicationUpload = (files) => {
  if (!files?.length || !selectedType) return;

  const file = files[0];

  const renamedFile = new File(
    [file],
    getApplicationFileName(selectedType, file),
    {
      type: file.type,
    }
  );

  setApplicationFile(renamedFile);
};

const handleSubmit = async () => {
  try {
    if (!applicationFile) {
      throw new Error("Application file is required.");
    }

    // Remove duplicates based on standardized filename
    const supportingDocuments = Array.from(
      new Map(
        documents.map((doc) => [doc.fileName, doc.file])
      ).values()
    );

    if (supportingDocuments.length === 0) {
      throw new Error("Please upload supporting documents.");
    }
    setUploading(true)
    const result = await userApi.submitApplication(
      applicationFile,
      supportingDocuments
    );

    console.log(result);
    setUploading(false)
    setSelectedType("")
    setDocuments([])
    setApplicationFile(null);
    setSelectedDocuments({});
    toast.success("Application submitted successfully!");
  } catch (err) {
    setUploading(false)
    console.error(err);
    toast.error(err.message || "Submission failed");
  }
};

 return (    
    <div className="min-h-screen bg-gradient-to-br from-white via-blue-50/30 to-purple-50/30 px-6 py-10 relative  overflow-hidden">
      <Toaster richColors position="top-center" />
      <div className="absolute top-20 -left-24 h-72 w-72 rounded-full bg-blue-500/10 blur-3xl" />
      <div className="absolute bottom-10 -right-20 h-72 w-72 rounded-full bg-purple-500/10 blur-3xl" />

      <div
          className={`fixed top-0 left-0 h-full bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 border-r border-slate-700 transition-all duration-300 ease-in-out z-40 ${
            isOpen ? "translate-x-0" : "-translate-x-full"
          } lg:translate-x-0 ${isCollapsed ? "lg:w-20" : "lg:w-64"} w-64 shadow-2xl`}
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
                  User Portal
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
            onClick={handleLogout}
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
        <div
          className={`transition-all duration-300 ${
            isCollapsed ? "lg:ml-20" : "lg:ml-64"
          }`}>
        {activeView === "submit" ? (
            // MAIN PAGE
        <div className="mx-auto w-full max-w-5xl">
        <motion.div
            // key={docType}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            // transition={{ delay: index * 0.08 }}
        >
          <Card className="relative rounded-3xl border border-white/70 bg-white/90 backdrop-blur-xl shadow-2xl p-3">
            <CardHeader className="space-y-2 border-b pb-6">
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
              <div className="mx-auto max-w-2xl flex flex-col items-center justify-center rounded-3xl border bg-slate-50/70 p-8 shadow-sm">
                  <div className="mb-6 text-center">

                    <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600">
                      <FileText className="h-7 w-7 text-white" />
                    </div>

                    <h3 className="text-2xl font-bold">
                      Select Application Type
                    </h3>

                    <p className="mt-2 text-muted-foreground">
                      Choose the benefit program you are applying for.
                    </p>

                  </div>

                  <Select value={selectedType} onValueChange={(value) => {
                        setSelectedType(value);
                        setDocuments([]);
                        setSelectedDocuments({});
                      }}>
                    <SelectTrigger className="h-14 rounded-2xl text-base">
                      <SelectValue placeholder="Choose an application type" />
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
                  className="space-y-4">
                  <div className="space-y-4">
                      <Label className="text-xl font-bold text-blue-600">
                        Application Form
                      </Label>

                      <Card className="rounded-2xl border-2 border-dashed border-blue-300 bg-blue-50/40">

                        <CardContent className="flex items-center justify-between p-6">

                          <div className="flex items-center gap-4">

                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100">
                              <FileText className="h-6 w-6 text-blue-600" />
                            </div>

                            <div>

                              <h3 className="font-semibold">
                                Application Document
                              </h3>

                              {/* <p className="text-sm text-muted-foreground">
                                Upload the completed application form.
                              </p> */}
                                <p className="text-sm text-muted-foreground">
                                    {applicationFile
                                        ? applicationFile.name
                                        : "Upload the completed application form."}
                                </p>
                            </div>             
                          </div>
                                    
                          <div>    
                            <Input
                                id="application-file"
                                 accept=".pdf,application/pdf"
                                type="file"
                                className="hidden"
                                onChange={(e) => handleApplicationUpload(e.target.files)}
                            />
                            <Button
                              variant="outline"
                              className="rounded-xl"
                              onClick={() => document.getElementById("application-file")?.click()}>
                              <Upload className="mr-2 h-4 w-4" />
                              Upload
                            </Button>
                          </div>
 
                        </CardContent>
                      </Card>
                    </div>
              <div className="space-y-4">
                <Label className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Required Documents</Label>
                { documentTypes[selectedType]?.map((group) => {
                    const key = `${selectedType}::${group.title}`;
                    const uploaded = documents.find(
                      (d) => d.category === key
                    );
                  
                    return (
                      <Card key={group.title}
                        className="rounded-2xl border border-slate-200 bg-white transition-all duration-300 hover:border-blue-300 hover:shadow-xl hover:-translate-y-1"
                      >
                        <CardContent className="flex items-center justify-between p-6">
                          <div className="flex justify-between gap-4 w-full">
                            {/* Left */}
                            <div className="flex items-start flex-1 gap-2">
                              <div className="relative">
                                <FileText className="h-7 w-7 text-black" />
                              </div>
                    
                              <div className="flex gap-20 w-[90%]">
                                <p className="text-base font-semibold">
                                  {group.title}
                                </p>
                                <div className="flex justify-between gap-10">
                                <Select
                                  value={selectedDocuments[group.title] || ""}
                                  onValueChange={(value) =>
                                    setSelectedDocuments((prev) => ({
                                      ...prev,
                                      [group.title]: value, // value like "aadhaar_card"
                                    }))
                                  }
                                >
                                  <SelectTrigger className=" w-50">
                                    <SelectValue placeholder="Select document" />
                                  </SelectTrigger>
                                
                                  <SelectContent className="mt-10">
                                    {group.documents.map((doc) => (
                                      <SelectItem key={doc.value} value={doc.value}>
                                        {doc.label}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                                  <p className="mt-2 text-sm text-muted-foreground truncate max-w-xs">
                                  {uploaded
                                    ? uploaded.originalName
                                    : "No file uploaded"}
                                </p>
                                </div>
                                  
                                  
                              </div>
                            </div>
                                  
                            {/* Right */}
                            <div className="flex items-end">
                              <Input
                               accept=".pdf,application/pdf"
                                type="file"
                                className="hidden"
                                id={`file-${group.title}`}
                                onChange={(e) =>{
                                  handleFileUpload(
                                    `${selectedType}::${group.title}`,
                                    selectedDocuments[group.title],
                                    e.target.files
                                  );
                                  e.target.value = "";
                                }}
                              />

                              {uploaded ? (
                                <Button
                                  variant="outline"
                                  className="rounded-lg border-red-200 text-red-600 hover:bg-red-50 cursor-pointer"
                                  onClick={() =>
                                    setDocuments((prev) =>
                                      prev.filter(
                                        (d) => d.category !== key
                                      )
                                    )
                                  }
                                >
                                  Remove
                                </Button>
                              ) : (
                                <Button
                                  disabled={!selectedDocuments[group.title]}
                                  variant="outline"
                                  className="rounded-lg border-blue-200 text-blue-600 cursor-pointer"
                                  onClick={() =>
                                    document
                                      .getElementById(`file-${group.title}`)
                                      ?.click()
                                  }
                                >
                                  <Upload className="mr-2 h-4 w-4" />
                                  Upload
                                </Button>
                                  )}
                              </div>
                            </div>
                          </CardContent>
                          </Card>
                        );})}
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
                  className=" h-12 w-full rounded-xl text-base font-semibold bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all duration-300"
                // disabled={
                //     !selectedType ||
                //     !applicationFile ||
                //     supportingDocuments.length === 0
                // }
                onClick={handleSubmit}
              >
                Submit Application
              </Button>
            </CardFooter>
          </Card>
        </motion.div>
      </div>
      ) : (
    <div className="mx-auto w-full max-w-4xl">
      <TrackApplication />
    </div>
  )}
</div>
  <ProcessingOverlay open={uploading} />
    </div>
  )
}