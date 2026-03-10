import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Chat from './Chat';
import Admin from './Admin';
import { GlobalStyle } from './Chat';
import { NotFoundPage, ForbiddenPage, ServerErrorPage, TimeoutPage, RateLimitPage, MaintenancePage } from './ErrorPages';

function App() {
  return (
    <>
      <GlobalStyle />
      <Routes>
        <Route path="/" element={<Chat />} />
        <Route path="/join/:token" element={<Chat />} />
        <Route path="/admin" element={<Admin />} />
        {/* Utility error routes — can be navigated to programmatically */}
        <Route path="/error/403" element={<ForbiddenPage />} />
        <Route path="/error/500" element={<ServerErrorPage />} />
        <Route path="/error/408" element={<TimeoutPage />} />
        <Route path="/error/429" element={<RateLimitPage />} />
        <Route path="/error/503" element={<MaintenancePage />} />
        {/* 404 catch-all — must be last */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}

export default App;