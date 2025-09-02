import { Component, ErrorInfo, ReactNode } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AlertTriangle, RefreshCw } from 'lucide-react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
  errorInfo?: ErrorInfo;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.setState({ error, errorInfo });
    
    // Log error to console in development
    if (process.env.NODE_ENV === 'development') {
      console.error('ErrorBoundary caught an error:', error, errorInfo);
    }
    
    // In production, you might want to send this to an error reporting service
    if (process.env.NODE_ENV === 'production') {
      // Example: Send to error reporting service
      console.error('Production error:', {
        error: error.message,
        stack: error.stack,
        componentStack: errorInfo.componentStack,
        timestamp: new Date().toISOString(),
      });
    }
  }

  handleReset = () => {
    this.setState({ hasError: false, error: undefined, errorInfo: undefined });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-screen bg-jet-black flex items-center justify-center p-6">
          <Card className="max-w-md w-full bg-onyx border-blood-red">
            <CardContent className="p-6 text-center">
              <div className="mb-4">
                <AlertTriangle className="w-16 h-16 text-blood-red mx-auto mb-4" />
                <h2 className="font-brand text-2xl text-blood-red mb-2">
                  CHAOS ERROR
                </h2>
                <p className="text-dim-gray">
                  Something went wrong in the villain system
                </p>
              </div>
              
              {process.env.NODE_ENV === 'development' && this.state.error && (
                <div className="mb-4 p-3 bg-jet-black rounded text-left text-xs text-ash-white font-mono overflow-auto max-h-40">
                  <div className="text-blood-red font-bold mb-1">Error:</div>
                  <div className="mb-2">{this.state.error.message}</div>
                  {this.state.error.stack && (
                    <>
                      <div className="text-toxic-green font-bold mb-1">Stack:</div>
                      <div className="whitespace-pre-wrap">{this.state.error.stack}</div>
                    </>
                  )}
                </div>
              )}
              
              <div className="space-y-3">
                <Button
                  onClick={this.handleReset}
                  className="cyber-button w-full"
                  data-testid="button-error-retry"
                >
                  <RefreshCw className="w-4 h-4 mr-2" />
                  TRY AGAIN
                </Button>
                
                <Button
                  onClick={() => window.location.reload()}
                  variant="outline"
                  className="w-full border-dim-gray text-dim-gray hover:bg-dim-gray hover:text-jet-black"
                  data-testid="button-error-reload"
                >
                  RELOAD PAGE
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      );
    }

    return this.props.children;
  }
}