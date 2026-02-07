import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HomePage } from "@/pages/home";
import { ErrorBoundary } from "@/app/providers/ErrorBoundary";
import { Toaster } from "@/shared/ui/Sonner";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 3,
      refetchOnWindowFocus: false,
    },
  },
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <HomePage />
        <Toaster />
      </QueryClientProvider>
    </ErrorBoundary>
  </StrictMode>,
);
