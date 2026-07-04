"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Shield,
  Brain,
  ScanSearch,
  FileCheck,
  Database,
  Lock,
} from "lucide-react";
const facts = [
  {
    icon: ScanSearch,
    title: "Reviewing your application",
    description:
      "We're securely reviewing the documents you've submitted to begin the verification process.",
  },
  {
    icon: FileCheck,
    title: "Verifying your documents",
    description:
      "Information from your supporting documents is being checked for completeness and consistency.",
  },
  {
      icon: Lock,
      title: "Protecting your information",
      description:
        "Your uploaded documents are transmitted securely and handled with strict privacy and security measures.",
    },
  {
    icon: Shield,
    title: "Performing security checks",
    description:
      "Additional verification helps identify inconsistencies and protects the integrity of the application process.",
  },
  {
    icon: Brain,
    title: "Analyzing application details",
    description:
      "Our verification system is comparing information across your submitted documents to improve review accuracy.",
  },
  {
    icon: Database,
    title: "Preparing your verification report",
    description:
      "We're organizing the verification results to support a faster review of your application.",
  },
  {
    icon: Lock,
    title: "Protecting your information",
    description:
      "Your uploaded documents are processed securely and handled with strict privacy and security standards.",
  },
];

export default function ProcessingOverlay({ open }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!open) return;

    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % facts.length);
    }, 3500);

    return () => clearInterval(interval);
  }, [open]);

  const CurrentIcon = facts[index].icon;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[9999] bg-black/40 backdrop-blur-md flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="flex flex-col items-center text-center px-6 max-w-xl">

            {/* Animated Ring */}
            <div className="relative mb-10">
              <motion.div
                className="absolute inset-0 rounded-full border-4 border-blue-500"
                animate={{ scale: [1, 1.4], opacity: [0.5, 0] }}
                transition={{
                  repeat: Infinity,
                  duration: 2,
                }}
              />

              <motion.div
                className="absolute inset-0 rounded-full border-4 border-purple-500"
                animate={{ scale: [1, 1.8], opacity: [0.4, 0] }}
                transition={{
                  repeat: Infinity,
                  duration: 2,
                  delay: 0.8,
                }}
              />

              <div className="relative flex h-28 w-28 items-center justify-center rounded-full bg-gradient-to-r from-blue-600 to-purple-600 shadow-2xl">
                <CurrentIcon className="h-12 w-12 text-white" />
              </div>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.35 }}
              >
                <h2 className="text-3xl font-bold text-white">
                  {facts[index].title}
                </h2>

                <p className="mt-4 text-lg text-slate-200 leading-relaxed">
                  {facts[index].description}
                </p>
              </motion.div>
            </AnimatePresence>

            <motion.div
              className="mt-10 flex gap-2"
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{
                repeat: Infinity,
                duration: 1.2,
              }}
            >
              <div className="h-3 w-3 rounded-full bg-white" />
              <div className="h-3 w-3 rounded-full bg-white" />
              <div className="h-3 w-3 rounded-full bg-white" />
            </motion.div>

            <p className="mt-8 text-sm text-slate-300">
              This usually takes <strong>40–60 seconds</strong> depending on the
              number of uploaded documents.
            </p>

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}