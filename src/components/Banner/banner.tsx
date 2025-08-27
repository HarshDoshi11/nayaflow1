import { X } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

export default function Banner({
  message = "🚀 Welcome to your NayaFlow dashboard!",
  variant = "info", // "info" | "success" | "warning" | "error"
}: {
  message?: string;
  variant?: "info" | "success" | "warning" | "error";
}) {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  const styles: Record<string, string> = {
    info: "bg-blue-100 text-blue-800 border-blue-300",
    success: "bg-green-100 text-green-800 border-green-300",
    warning: "bg-yellow-100 text-yellow-800 border-yellow-300",
    error: "bg-red-100 text-red-800 border-red-300",
  };

  return (
    <div
      className={cn(
        "flex items-center justify-between px-4 py-3 border rounded-xl shadow-sm mb-4",
        styles[variant]
      )}
    >
      <span className="text-sm font-medium">{message}</span>
      <button
        onClick={() => setVisible(false)}
        className="ml-3 text-sm hover:opacity-70"
      >
        <X size={16} />
      </button>
    </div>
  );
}
