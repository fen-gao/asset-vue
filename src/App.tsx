import React, { Suspense, ReactNode, ErrorInfo } from "react";
import CompanyContent from "./components/company/company-content";
import Header from "./components/common/header";
import Logo from "../public/assets/images/logo.png";
import { FallBackLoading } from "./components/loading";

// Interface for ErrorBoundary props
interface ErrorBoundaryProps {
  children: ReactNode;
}

// Interface for ErrorBoundary state
interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

/**
 * ErrorBoundary class component
 * Catches JavaScript errors anywhere in their child component tree,
 * logs those errors, and displays a fallback UI
 */
class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  /**
   * Update state so the next render will show the fallback UI
   * @param error The error that was caught
   */
  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  /**
   * Log the error to an error reporting service
   * @param error The error that was caught
   * @param errorInfo Additional information about the error
   */
  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error("Caught an error:", error, errorInfo);
  }

  render(): ReactNode {
    if (this.state.hasError) {
      // Render fallback UI
      return <h1>Something went wrong. Error: {this.state.error?.message}</h1>;
    }

    // Render children if there's no error
    return this.props.children;
  }
}

/**
 * Main App component
 * Wraps the entire application with ErrorBoundary and Suspense
 */
function App() {
  return (
    <ErrorBoundary>
      <Suspense fallback={<FallBackLoading />}>
        <main className="h-screen w-full flex flex-col">
          <Header logoSrc={Logo} logoAlt="Logo" />
          <section className="flex-1 p-2 h-full">
            <CompanyContent />
          </section>
        </main>
      </Suspense>
    </ErrorBoundary>
  );
}

export default App;
