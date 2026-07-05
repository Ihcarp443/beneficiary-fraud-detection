// "use client";

// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import Link from "next/link";

// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { Label } from "@/components/ui/label";

// const API_BASE = "http://localhost:8000/api/auth";

// export default function SignupPage() {

//   const router = useRouter();

//   const [form, setForm] = useState({
//     email: "",
//     password: ""
//   });

//   const [loading, setLoading] = useState(false);

//   async function handleSubmit(e) {

//     e.preventDefault();

//     setLoading(true);

//     try {

//       const res = await fetch(`${API_BASE}/signup`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json"
//         },
//         body: JSON.stringify(form)
//       });

//       const data = await res.json();

//       if (!res.ok)
//         throw new Error(data.detail);

//       alert("Signup Successful");

//       router.push("/login");

//     } catch (err) {
//       alert(err.message);
//     }

//     setLoading(false);
//   }

//   return (
//     <div className="flex min-h-screen items-center justify-center bg-slate-50">

//       <Card className="w-full max-w-md shadow-xl">

//         <CardHeader>

//           <CardTitle className="text-center text-3xl">
//             Create Account
//           </CardTitle>

//         </CardHeader>

//         <CardContent>

//           <form
//             onSubmit={handleSubmit}
//             className="space-y-5"
//           >

//             <div>

//               <Label>Email</Label>

//               <Input
//                 type="email"
//                 value={form.email}
//                 onChange={(e) =>
//                   setForm({
//                     ...form,
//                     email: e.target.value
//                   })
//                 }
//               />

//             </div>

//             <div>

//               <Label>Password</Label>

//               <Input
//                 type="password"
//                 value={form.password}
//                 onChange={(e) =>
//                   setForm({
//                     ...form,
//                     password: e.target.value
//                   })
//                 }
//               />

//             </div>

//             <Button
//               className="w-full"
//               disabled={loading}
//             >
//               {loading ? "Creating..." : "Sign Up"}
//             </Button>

//           </form>

//           <p className="mt-5 text-center text-sm">

//             Already have an account?{" "}

//             <Link
//               href="/login"
//               className="font-semibold text-blue-600"
//             >
//               Login
//             </Link>

//           </p>

//         </CardContent>

//       </Card>

//     </div>
//   );
// }

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  ShieldCheck,
  Eye,
  EyeOff,
  ArrowRight,
  CheckCircle2,
  Lock,
} from "lucide-react";

import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

const API_BASE = "http://localhost:8000/auth";

// Rough client-side signal only — the backend remains the source of truth.
function passwordStrength(password) {
  if (!password) return { label: "", width: "0%", color: "" };
  let score = 0;
  if (password.length >= 8) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;

  const levels = [
    { label: "Weak", width: "25%", color: "bg-red-500" },
    { label: "Fair", width: "50%", color: "bg-amber-500" },
    { label: "Good", width: "75%", color: "bg-blue-500" },
    { label: "Strong", width: "100%", color: "bg-green-600" },
  ];

  return levels[Math.max(0, score - 1)] ?? levels[0];
}

export default function SignupPage() {
  const router = useRouter();

  const [form, setForm] = useState({ email: "", password: "" });
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const strength = passwordStrength(form.password);
  const passwordsMismatch =
    confirmPassword.length > 0 && confirmPassword !== form.password;

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (passwordsMismatch) {
      setError("Passwords don't match.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(`${API_BASE}/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.detail || "Signup failed.");

      router.push("/login?created=1");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      {/* Left — brand / trust panel, echoes the homepage hero card */}
      <div className="relative hidden overflow-hidden bg-gradient-to-br from-blue-700 via-blue-600 to-purple-700 lg:flex lg:flex-col lg:justify-between lg:p-12">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(255,255,255,0.15),_transparent_55%)]" />

        <Link href="/" className="relative z-10 flex items-center gap-2 text-white">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/15">
            <ShieldCheck className="h-5 w-5" />
          </div>
          <span className="text-lg font-semibold">BeneficiaryShield</span>
        </Link>

        <div className="relative z-10 max-w-md">
          <h2 className="text-3xl font-bold leading-tight text-white">
            Join the platform protecting genuine applicants.
          </h2>
          <p className="mt-4 text-blue-100">
            Every account is backed by the same AI verification that keeps
            fraudulent applications out of government schemes — so yours moves
            faster.
          </p>

          <div className="mt-10 space-y-4">
            {[
              "Bank-grade document encryption",
              "AI-verified in under 24 hours",
              "98% fraud detection accuracy",
            ].map((line) => (
              <div key={line} className="flex items-center gap-3 text-white">
                <CheckCircle2 className="h-5 w-5 flex-shrink-0 text-green-300" />
                <span className="text-sm">{line}</span>
              </div>
            ))}
          </div>
        </div>

        <p className="relative z-10 text-xs text-blue-200">
          © {new Date().getFullYear()} BeneficiaryShield. All rights reserved.
        </p>
      </div>

      {/* Right — form */}
      <div className="flex items-center justify-center bg-slate-50 px-6 py-16">
        <div className="w-full max-w-md">
          <div className="mb-8 lg:hidden">
            <Link href="/" className="inline-flex items-center gap-2 text-slate-900">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-600">
                <ShieldCheck className="h-5 w-5 text-white" />
              </div>
              <span className="text-lg font-semibold">BeneficiaryShield</span>
            </Link>
          </div>

          <Card className="rounded-3xl border bg-white p-8 shadow-2xl sm:p-10">
            <div className="mb-8">
              <h1 className="text-3xl font-extrabold text-slate-900">
                Create your account
              </h1>
              <p className="mt-2 text-sm text-slate-500">
                Start an application and track verification in real time.
              </p>
            </div>

            {error && (
              <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  autoComplete="email"
                  required
                  placeholder="you@example.com"
                  className="h-12 rounded-xl"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="new-password"
                    required
                    minLength={8}
                    placeholder="At least 8 characters"
                    className="h-12 rounded-xl pr-11"
                    value={form.password}
                    onChange={(e) =>
                      setForm({ ...form, password: e.target.value })
                    }
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((s) => !s)}
                    className="absolute inset-y-0 right-0 flex items-center px-3 text-slate-400 hover:text-slate-600"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>

                {form.password && (
                  <div className="pt-1">
                    <div className="h-1.5 overflow-hidden rounded-full bg-slate-200">
                      <div
                        className={`h-full rounded-full transition-all ${strength.color}`}
                        style={{ width: strength.width }}
                      />
                    </div>
                    <p className="mt-1 text-xs text-slate-500">
                      {strength.label} password
                    </p>
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm password</Label>
                <Input
                  id="confirmPassword"
                  type={showPassword ? "text" : "password"}
                  autoComplete="new-password"
                  required
                  placeholder="Re-enter your password"
                  className="h-12 rounded-xl"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                {passwordsMismatch && (
                  <p className="text-xs text-red-600">Passwords don't match.</p>
                )}
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="h-12 w-full rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-base shadow-lg hover:shadow-xl"
              >
                {loading ? "Creating account..." : "Create account"}
                {!loading && <ArrowRight className="ml-2 h-4 w-4" />}
              </Button>
            </form>

            <div className="mt-6 flex items-center justify-center gap-2 text-xs text-slate-400">
              <Lock className="h-3.5 w-3.5" />
              Your data is encrypted and never shared without consent.
            </div>

            <p className="mt-8 text-center text-sm text-slate-600">
              Already have an account?{" "}
              <Link href="/login" className="font-semibold text-blue-600 hover:text-blue-700">
                Log in
              </Link>
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
}