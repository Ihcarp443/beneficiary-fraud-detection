"use client";

import { useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { adminApi } from "@/APIs/adminAPI";
import { Bot, User, Send, Loader2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
export default function Chatbot({
  analysisUuid,
  userId,
  open,
  onOpenChange,
}) {

  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "Hi! Ask me anything about this document analysis. I'll answer based only on the uploaded documents.",
    },
  ]);

  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);

  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);

  const handleSend = async () => {
    if (!prompt.trim() || loading) return;

    const userMessage = {
      role: "user",
      content: prompt,
    };

    setMessages((prev) => [...prev, userMessage]);

    const currentPrompt = prompt;

    setPrompt("");
    setLoading(true);

     try {
      const res = await adminApi.Chat(
        currentPrompt,
        analysisUuid,
        userId
      );
      console.log("Bot",res)
      const answer = res.answer;

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: answer,
        },
      ]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Sorry, something went wrong while generating the response.",
        },
      ]);
    }

    setLoading(false);
  };

return (
  <Dialog open={open} onOpenChange={onOpenChange}>

    <DialogContent className="max-w-4xl p-0 overflow-hidden">
      <DialogHeader className="sr-only">
        <DialogTitle>AI Document-Review Assistant</DialogTitle>
      </DialogHeader>

      <Card className="flex h-[700px] flex-col border-0 rounded-2xl">

        {/* Header */}

        <div className="flex items-center gap-3 border-b bg-muted/40 px-5 py-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground">
            <Bot size={20} />
          </div>

          <div>
            <h3 className="text-lg font-semibold">
              AI Document Assistant
            </h3>

            <p className="text-sm text-muted-foreground">
              Ask questions about this analysis
            </p>
          </div>
        </div>
            <div className="mb-6 flex flex-wrap items-center justify-center  gap-2">
                {[
                    "Summarize this application",
                    "Why was it flagged?",
                    "Explain the risk score",
                    "List fields mismatches",
                ].map((question) => (
                    <Button
                        key={question}
                        variant="outline"
                        size="sm"
                        onClick={() => setPrompt(question)}
                        className="rounded-full"
                    >
                        {question}
                    </Button>
                ))}
            </div>
        {/* Messages */}
        <div className="flex-1 min-h-0 overflow-y-auto px-5 py-6">
        {/* <ScrollArea className="flex-1 px-5 py-6"> */}
        <div className="space-y-6">
          <div className="space-y-6">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${
                  message.role === "user"
                    ? "justify-end"
                    : "justify-start"
                }`}
              >
                <div
                  className={`flex max-w-[85%] gap-3 ${
                    message.role === "user"
                      ? "flex-row-reverse"
                      : ""
                  }`}
                >
                  <div
                    className={`mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${
                      message.role === "assistant"
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted"
                    }`}
                  >
                    {message.role === "assistant" ? (
                      <Bot size={17} />
                    ) : (
                      <User size={17} />
                    )}
                  </div>

                  <div
                    className={`rounded-3xl px-5 py-4 text-[15px] leading-7 ${
                      message.role === "assistant"
                        ? "bg-muted/60 border shadow-sm"
                        : "bg-primary text-primary-foreground shadow-md"
                    }`}
                  >
                    <ReactMarkdown>
                      {message.content}
                    </ReactMarkdown>
                  </div>
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  <Bot size={17} />
                </div>

                <div className="rounded-2xl bg-muted px-4 py-3">
                  <Loader2 className="animate-spin" size={18} />
                </div>
              </div>
            )}

            <div ref={bottomRef} />
          </div>
        {/* </ScrollArea> */}
        </div>
                </div>
        {/* Input */}

        <div className="border-t bg-background px-6 py-5">
          <div className="flex items-end gap-3 rounded-2xl border bg-muted/20 p-3 transition-colors focus-within:border-primary">
            <Textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Ask something about these documents..."
              className="min-h-[50px] max-h-[180px] border-0 bg-transparent shadow-none resize-none focus-visible:ring-0"
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSend();
                }
              }}
            />

           <Button
                className="h-11 w-11 rounded-full shrink-0"
              onClick={handleSend}
              disabled={loading || !prompt.trim()}
              size="icon"
            >
              {loading ? (
                <Loader2 className="animate-spin" size={18} />
              ) : (
                <Send size={18} />
              )}
            </Button>
          </div>

          <p className="mt-2 text-center text-xs text-muted-foreground">
            AI answers are generated only from the uploaded documents.
          </p>
        </div>
      </Card>
    </DialogContent>
  </Dialog>
);
}