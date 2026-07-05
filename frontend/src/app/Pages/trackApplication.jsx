
import { CheckCircle, XCircle, Clock, Search } from "lucide-react";
import {
  FileText,
  Hash,
  Clock3,
  MessageSquareText
} from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import {userApi} from "@/APIs/userAPI";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
export default function TrackApplication() {
  const [searchId, setSearchId] = useState("");
  const [searchResult, setSearchResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const [myApplications, setMyApplications] = useState([]);
  const applicationsToRender =
  searched
    ? (searchResult ? [searchResult] : [])
    : myApplications;
  const getMyApplications = async () => {
  try {
    setLoading(true);

    const response = await userApi.getMyApplications();
    console.log(response)
    if (response.success) {
      // If API returns an array
      setMyApplications(response.applications || []);

    }
  } catch (err) {
    console.error(err);
  } finally {
    setLoading(false);
  }
};

  const handleSearch = async () => {
  if (!searchId.trim()) {
    setSearchResult(null);
    return;
  }

  try {
    setLoading(true);
    setSearched(true);

    const response = await userApi.trackApplication(searchId);

    if (response.success) {
      setSearchResult(response.tracked_applications);
    } else {
      setSearchResult(null);
    }
  } catch (err) {
    console.error(err);
    setSearchResult(null);
  } finally {
    setLoading(false);
  }
};


useEffect(() => {
  getMyApplications();
}, []);


useEffect(() => {
  if (searchId.trim() === "") {
    setSearchResult(null);
    setSearched(false);
  }
}, [searchId]);

  const getStatusBadge = (status) => {
  status = status.toLowerCase();

  const variants = {
    pending: { variant: "secondary", icon: Clock },
    approved: { variant: "default", icon: CheckCircle },
    declined: { variant: "destructive", icon: XCircle },
    completed: { variant: "success", icon: CheckCircle },
  };

  const { variant, icon: Icon } =
    variants[status] || variants.pending;

  return (
    <Badge variant={variant} className="flex items-center gap-1">
      <Icon className="h-3 w-3" />
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </Badge>
  );
};
  return (
    <div className="space-y-8">

  <div>
    <h2 className="text-4xl font-bold">
      Track{" "}
      <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
        Application
      </span>
    </h2>

    <p className="mt-2 text-muted-foreground">
      Enter your application ID to check the current status.
    </p>
  </div>

  {/* Search Card */}
  <Card className="rounded-3xl border border-white/70 bg-white/90 backdrop-blur-xl shadow-2xl">
    <CardContent className="p-8">
      <div className="flex flex-col gap-4 md:flex-row">
        <Input
          placeholder="Enter Application ID"
          value={searchId}
          onChange={(e) => setSearchId(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          className="h-12 rounded-xl border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
        />

        <Button
          disabled={loading}
          onClick={handleSearch}
          className="h-12 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 px-8"
        >
          <Search className="mr-2 h-4 w-4" />

          {loading ? "Searching..." : "Search"}
        </Button>
      </div>
    </CardContent>
  </Card>

  {/* Result */}
{loading ? (
  <div className="space-y-6">
    {[1, 2].map((item) => (
      <Card
        key={item}
        className="rounded-3xl border border-white/70 bg-white/90 shadow-2xl"
      >
        <CardHeader>
          <Skeleton className="h-8 w-56" />
          <Skeleton className="mt-3 h-4 w-40" />
        </CardHeader>

        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {[1, 2, 3, 4].map((card) => (
              <Card key={card} >
                <CardContent className="space-y-3 p-4 border-none">
                  <Skeleton className="h-3 w-24" />
                  <Skeleton className="h-5 w-32" />
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    ))}
  </div>
) : (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="space-y-6">
  {applicationsToRender.map((application) => (
    <Card
      key={application.analysis_uuid}
      className="rounded-3xl border border-white/70 bg-white/90 backdrop-blur-xl shadow-2xl"
    >
      <CardHeader className="border-b pb-6">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-2xl">
              {application.analysis_name}
            </CardTitle>

            <CardDescription className="mt-2">
              Application ID : {application.analysis_number}
            </CardDescription>
          </div>

          {getStatusBadge(application.status)}
        </div>
      </CardHeader>

      <CardContent className="space-y-8 pt-8">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <Card className="rounded-xl border shadow-sm">
            <CardContent className="flex items-center justify-between p-4">
              <div>
                <p className="text-xs uppercase text-muted-foreground">
                  Application
                </p>

                <h3 className="mt-1 font-semibold">
                  {application.analysis_name}
                </h3>
              </div>

              <FileText className="h-5 w-5 text-blue-600" />
            </CardContent>
          </Card>

          <Card className="rounded-xl border shadow-sm">
            <CardContent className="flex items-center justify-between p-4">
              <div>
                <p className="text-xs uppercase text-muted-foreground">
                  Application ID
                </p>

                <h3 className="mt-1 font-semibold">
                  {application.analysis_number}
                </h3>
              </div>

              <Hash className="h-5 w-5 text-purple-600" />
            </CardContent>
          </Card>

          <Card className="rounded-xl border shadow-sm">
            <CardContent className="flex items-center justify-between p-4">
              <div>
                <p className="text-xs uppercase text-muted-foreground">
                  Status
                </p>

                <div className="mt-2">
                  {getStatusBadge(application.status)}
                </div>
              </div>

              <Clock3 className="h-5 w-5 text-yellow-600" />
            </CardContent>
          </Card>

          <Card className="rounded-xl border shadow-sm">
          <CardContent className="flex items-center justify-between p-4">
            <div className="flex-1">
              <p className="text-xs uppercase text-muted-foreground">
                Admin Comment
              </p>

              <p className="mt-1 text-sm break-words">
                {application.comment?.trim()
                  ? application.comment
                  : "No comments available"}
              </p>
            </div>
                
            <MessageSquareText className="h-5 w-5 text-green-600 ml-3 shrink-0" />
          </CardContent>
        </Card>
        </div>
      </CardContent>
    </Card>
  ))}
</div>
    </motion.div>
    )}

    {!loading && !searched &&
      applicationsToRender.length === 0 && (
      <Card className="rounded-3xl border border-dashed">
        <CardContent className="flex flex-col items-center py-12">
          <FileText className="h-12 w-12 text-muted-foreground" />
    
          <h3 className="mt-4 text-lg font-semibold">
            No Applications Found
          </h3>
    
          <p className="mt-2 text-muted-foreground">
            You haven't submitted any applications yet.
          </p>
        </CardContent>
      </Card>
    )}
  {/* Not Found */}
  {searched && !loading && searchResult === null && (
  // {searchResult === null && searchId && (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <Card className="rounded-3xl border border-red-200 bg-red-50 shadow-lg">
        <CardContent className="flex flex-col items-center py-10">

          <div className="rounded-full bg-red-100 p-5">
            <XCircle className="h-10 w-10 text-red-500" />
          </div>

          <h3 className="mt-5 text-xl font-semibold">
            Application Not Found
          </h3>

          <p className="mt-2 text-center text-muted-foreground">
            No application exists with ID <b>{searchId}</b>.
          </p>

        </CardContent>
      </Card>
    </motion.div>
  )}

</div>
  );
};
