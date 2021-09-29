import React from 'react';
import { AuthenticatedContent } from './pages/Authenticated/AuthenticatedContent';
import { UnAuthenticatedContent } from './pages/UnAuthenticated/UnAuthenticatedContent';
import './app.css'

const Routes: React.FC<{ token?: string | null, citizenId: string | null }> = ({ token, citizenId }) => {

  return (
    <div>
      <main className='main-content'>
        {(token && citizenId) ? (
          <>
            <AuthenticatedContent />
          </>
        ) : (
          <>
            <UnAuthenticatedContent />
          </>
        )}
      </main>
    </div>
  )
}

export {
  Routes
}
