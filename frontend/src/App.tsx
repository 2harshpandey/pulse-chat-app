import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Chat from './Chat';
import Admin from './Admin';
import { GlobalStyle } from './Chat';
import { NotFoundPage, ForbiddenPage, ServerErrorPage, TimeoutPage, RateLimitPage, MaintenancePage } from './ErrorPages';

// ─── Error Boundary ────────────────────────────────────────────────────────
// Catches any runtime crash inside a route so the page never goes fully blank.
// Keyed by pathname in AppRoutes so it resets automatically on navigation.
class RouteErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { crashed: boolean }
> {
  state = { crashed: false };

  static getDerivedStateFromError(): { crashed: boolean } {
    return { crashed: true };
  }

  componentDidCatch(err: Error, info: React.ErrorInfo): void {
    console.error('[RouteErrorBoundary]', err, info);
  }

  render() {
    if (this.state.crashed) {
      return (
        <div style={{
          display: 'flex', flexDirection: 'column', alignItems: 'center',
          justifyContent: 'center', height: '100vh', gap: '1.25rem',
          fontFamily: 'inherit', background: 'var(--bg-primary)',
          color: 'var(--text-primary)',
        }}>
          <div style={{ fontSize: '7rem', fontWeight: 900, color: '#3B82F6', lineHeight: 1 }}>404</div>
          <p style={{ color: '#64748b', fontSize: '1.05rem', margin: 0 }}>Page not found</p>
          <a href="/" style={{ color: '#3B82F6', fontWeight: 600, fontSize: '1rem', textDecoration: 'none' }}>
            ← Back to Chat
          </a>
        </div>
      );
    }
    return this.props.children;
  }
}

// Wrapper so the boundary resets every time the pathname changes.
function AppRoutes() {
  const location = useLocation();
  return (
    <RouteErrorBoundary key={location.pathname}>
      <Routes>
        <Route path="/" element={<Chat />} />
        <Route path="/join/:token" element={<Chat />} />
        <Route path="/admin" element={<Admin />} />
        {/* Explicit error pages */}
        <Route path="/error/403" element={<ForbiddenPage />} />
        <Route path="/error/404" element={<NotFoundPage />} />
        <Route path="/error/500" element={<ServerErrorPage />} />
        <Route path="/error/408" element={<TimeoutPage />} />
        <Route path="/error/429" element={<RateLimitPage />} />
        <Route path="/error/503" element={<MaintenancePage />} />
        {/* Catch-all — must be last */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </RouteErrorBoundary>
  );
}

function App() {
  return (
    <>
      <GlobalStyle />
      <AppRoutes />
    </>
  );
}

export default App;
