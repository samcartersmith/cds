import { Component, type ReactNode } from 'react';

interface AppErrorBoundaryProps {
  children: ReactNode;
}

interface AppErrorBoundaryState {
  hasError: boolean;
}

export default class AppErrorBoundary extends Component<
  AppErrorBoundaryProps,
  AppErrorBoundaryState
> {
  state: AppErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError(): AppErrorBoundaryState {
    return { hasError: true };
  }

  override componentDidCatch(error: Error) {
    // Keep this lightweight; plugin UIs need a clear fallback instead of crashing blank.
    console.error('Plugin UI crashed', error);
  }

  private handleReload = () => {
    window.location.reload();
  };

  override render() {
    if (!this.state.hasError) {
      return this.props.children;
    }

    return (
      <div className="h-screen w-screen bg-figma-bg text-figma-text flex items-center justify-center px-6">
        <div className="max-w-xs w-full rounded-xl border border-figma-border bg-figma-surface p-4 space-y-3">
          <h1 className="text-sm font-semibold">Something went wrong</h1>
          <p className="text-[11px] text-figma-muted leading-relaxed">
            The plugin UI hit an unexpected error. Reload to recover your session.
          </p>
          <button
            type="button"
            onClick={this.handleReload}
            className="w-full text-[11px] font-medium rounded-md bg-figma-purple text-white py-2 hover:opacity-90 transition-opacity"
          >
            Reload plugin
          </button>
        </div>
      </div>
    );
  }
}
