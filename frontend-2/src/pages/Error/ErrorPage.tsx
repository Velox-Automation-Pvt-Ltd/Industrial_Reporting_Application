'use client';

import type React from 'react';
import { Component, type ReactNode } from 'react';
import { Button } from '@/components/ui/button';
import { AlertTriangle, RefreshCw, Home, Mail, Clock } from 'lucide-react';

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: React.ErrorInfo | null;
}

class AppErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Caught by Error Boundary:', error, errorInfo);
    this.setState({ errorInfo });
  }

  handleReload = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
    window.location.reload();
  };

  handleGoHome = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
    window.location.href = '/';
  };

  handleReportError = () => {
    const errorDetails = {
      message: this.state.error?.message || 'Unknown error',
      stack: this.state.error?.stack || 'No stack trace',
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
      url: window.location.href,
    };

    console.log('Error Report:', errorDetails);
    const body = `
    Error Message: ${errorDetails.message}
    Stack Trace: ${errorDetails.stack}
    Timestamp: ${errorDetails.timestamp}
    User Agent: ${errorDetails.userAgent}
    URL: ${errorDetails.url}
    `.trim();

    const subject = encodeURIComponent('Report Issue');
    const encodedBody = encodeURIComponent(body);

    const mailtoLink = `mailto:iot.support@veloxautomation.com?subject=${subject}&body=${encodedBody}`;

    window.location.href = mailtoLink;
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4">
          <div className="max-w-2xl w-full">
            <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden">
              <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-8 py-6 text-white">
                <div className="flex items-center gap-3 mb-2">
                  <div className="bg-white/20 p-2 rounded-lg">
                    <Clock className="w-6 h-6" />
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold">VELOX Automation</h2>
                    <p className="text-blue-100 text-sm">Employee Schedule Management System</p>
                  </div>
                </div>
              </div>

              {/* Error Content */}
              <div className="px-8 py-8 text-center">
                {/* Error Icon */}
                <div className="bg-red-50 border-4 border-red-100 p-6 rounded-full w-24 h-24 mx-auto mb-6 flex items-center justify-center">
                  <AlertTriangle className="w-12 h-12 text-red-500" />
                </div>

                {/* Error Title */}
                <h1 className="text-3xl font-bold text-slate-800 mb-3">System Error Detected</h1>

                {/* Error Description */}
                <p className="text-slate-600 text-lg mb-6 leading-relaxed">
                  We encountered an unexpected issue while processing your schedule management
                  request. Our automated systems have been notified and our technical team is
                  working to resolve this.
                </p>

                {/* Error Details */}
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-8 text-left">
                  <h3 className="font-semibold text-red-800 mb-2 flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4" />
                    Technical Details
                  </h3>
                  <p className="text-sm text-red-700 font-mono bg-red-100 p-3 rounded border">
                    {this.state.error?.message || 'An unexpected error occurred'}
                  </p>
                  <p className="text-xs text-red-600 mt-2">
                    Error ID: {Date.now().toString(36).toUpperCase()}
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                  <Button
                    onClick={this.handleReload}
                    className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-lg transition-all duration-200 font-semibold"
                  >
                    <RefreshCw className="w-5 h-5" />
                    Reload Application
                  </Button>

                  <Button
                    variant="outline"
                    onClick={this.handleGoHome}
                    className="flex items-center gap-2 px-6 py-3 rounded-lg border-2 border-slate-300 hover:bg-slate-50 transition-all duration-200 font-semibold bg-transparent"
                  >
                    <Home className="w-5 h-5" />
                    Return to Dashboard
                  </Button>

                  <Button
                    variant="ghost"
                    onClick={this.handleReportError}
                    className="flex items-center gap-2 px-6 py-3 text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-all duration-200"
                  >
                    <Mail className="w-5 h-5" />
                    Report Issue
                  </Button>
                </div>
              </div>

              {/* Footer */}
              <div className="bg-slate-50 px-8 py-4 border-t border-slate-200">
                <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-slate-500">
                  <p>
                    Need immediate assistance? Contact IT Support:
                    <span className="font-semibold text-slate-700 ml-1">
                      iot.support@veloxautomation.com
                    </span>
                  </p>
                  <p className="text-xs">
                    System Status: Monitoring • Last Updated: {new Date().toLocaleTimeString()}
                  </p>
                </div>
              </div>
            </div>

            {/* Additional Help Card */}
            <div className="mt-6 bg-white/80 backdrop-blur rounded-xl p-6 border border-slate-200">
              <h3 className="font-semibold text-slate-800 mb-3">
                What can you do while we fix this?
              </h3>
              <div className="grid sm:grid-cols-2 gap-4 text-sm text-slate-600">
                <div className="flex items-start gap-3">
                  <div className="bg-blue-100 p-1 rounded">
                    <Clock className="w-4 h-4 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium text-slate-700">Check Schedule Status</p>
                    <p>View current Scheudle details on dashboard</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="bg-green-100 p-1 rounded">
                    <Mail className="w-4 h-4 text-green-600" />
                  </div>
                  <div>
                    <p className="font-medium text-slate-700">Contact Group Leader</p>
                    <p>Reach out for urgent schedule changes</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default AppErrorBoundary;
