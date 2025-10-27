"use client"
import queryClient from "@/lib/reactQueryClient";
import {  QueryClientProvider } from "@tanstack/react-query";
const Providers = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  
  return (
    
   
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

export default Providers;
