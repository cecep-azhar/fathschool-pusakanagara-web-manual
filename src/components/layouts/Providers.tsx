import { NextUIProvider } from "@nextui-org/react";
import { QueryClient, QueryClientProvider } from "react-query";
import { Toaster } from "sonner";

/**
 * Providers component that wraps its children with multiple context providers.
 *
 * It includes:
 * - QueryClientProvider for managing React Query state.
 * - NextUIProvider for NextUI component theming and styling.
 * - Toaster for displaying toast notifications at the top-right corner.
 *
 * @param {Object} props
 * @param {React.ReactNode} props.children - The content to be wrapped by the providers.
 */

const Providers: React.FC<{ children: React.ReactNode }> = ({ children }): React.ReactElement => {
  return (
    <QueryClientProvider client={new QueryClient()}>
      <NextUIProvider>
        {children}
        <Toaster position="top-right" />
      </NextUIProvider>
    </QueryClientProvider>
  );
};

export default Providers;
