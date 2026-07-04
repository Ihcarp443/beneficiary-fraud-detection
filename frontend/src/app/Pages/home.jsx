"use client"

import * as React from "react"
import { 
 
  CheckCircle, 
    ArrowRight
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card} from "@/components/ui/card"
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge"

// Sample Data

export default function HeroSection({ onStartApplication }) {
  return (
    <section className="relative overflow-hidden bg-slate-50">
      <div className="mx-auto max-w-7xl px-6 py-24 lg:py-32">
        <div className="grid items-center gap-16 lg:grid-cols-2">

          {/* Left */}
          <div className="space-y-8">

            <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-gradient-to-r from-blue-500/10 to-purple-500/10 px-4 py-2 backdrop-blur-sm">
              <div className="h-2 w-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 animate-pulse" />

              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-sm font-semibold text-transparent">
                AI Powered Fraud Detection
              </span>
            </div>

            <div>
              <h1 className="text-5xl font-extrabold leading-tight lg:text-7xl">
                Secure Your
                <br />

                <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 bg-clip-text text-transparent">
                  Beneficiary
                </span>

                <br />
                Applications
              </h1>

              <p className="mt-8 max-w-xl text-xl leading-relaxed text-slate-600">
                Advanced AI technology protects government schemes from
                fraudulent applications while ensuring legitimate beneficiaries
                receive fast, transparent processing.
              </p>
            </div>

            <div className="flex flex-wrap gap-4">
              <Button
                size="lg"
                onClick={onStartApplication}
                className="rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-6 text-lg shadow-lg hover:shadow-xl"
              >
                Start Application
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>

              <Button
                size="lg"
                variant="outline"
                className="rounded-xl border-2 px-8 py-6 text-lg"
              >
                Watch Demo
              </Button>
            </div>

            <div className="flex gap-10 pt-4">
              {[
                ["10K+", "Applications"],
                ["98%", "Detection Rate"],
                ["24hrs", "Processing"],
              ].map(([value, label]) => (
                <div key={label}>
                  <h3 className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-3xl font-bold text-transparent">
                    {value}
                  </h3>

                  <p className="text-sm text-slate-500">{label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right */}
          <div className="relative hidden lg:block">

            <div className="absolute inset-0 rounded-[40px] bg-gradient-to-br from-blue-500/20 to-purple-500/20 blur-3xl" />

            <Card className="relative rounded-3xl border bg-white shadow-2xl">
              <div className="p-8">

                <div className="mb-8 flex items-center justify-between">

                  <div className="flex items-center gap-4">

                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-600">
                      <CheckCircle className="h-6 w-6 text-white" />
                    </div>

                    <div>
                      <h3 className="font-semibold">
                        Application Verified
                      </h3>

                      <p className="text-xs text-slate-500">
                        ID: APP-2026-001
                      </p>
                    </div>
                  </div>

                  <Badge className="border-green-500/20 bg-green-500/10 text-green-600">
                    Approved
                  </Badge>
                </div>

                {["Document Scan", "AI Verification"].map((item) => (
                  <div key={item} className="mb-6">

                    <div className="mb-2 flex justify-between text-sm">
                      <span className="text-slate-500">
                        {item}
                      </span>

                      <span className="font-semibold">
                        100%
                      </span>
                    </div>

                    <div className="h-2 overflow-hidden rounded-full bg-slate-200">

                      <div className="h-full w-full rounded-full bg-gradient-to-r from-blue-500 to-purple-600" />

                    </div>
                  </div>
                ))}

                <Separator className="my-8" />

                <div className="grid grid-cols-3 text-center">

                  <div>
                    <div className="text-3xl font-bold text-green-600">
                      3
                    </div>

                    <p className="text-sm text-slate-500">
                      Verified
                    </p>
                  </div>

                  <div>
                    <div className="text-3xl font-bold">
                      0
                    </div>

                    <p className="text-sm text-slate-500">
                      Flagged
                    </p>
                  </div>

                  <div>
                    <div className="text-3xl font-bold">
                      0
                    </div>

                    <p className="text-sm text-slate-500">
                      Missing
                    </p>
                  </div>

                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}