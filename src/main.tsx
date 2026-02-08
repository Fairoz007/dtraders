import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ClerkProvider, useAuth } from '@clerk/clerk-react'
import { ConvexProviderWithClerk } from 'convex/react-clerk'
import { ConvexReactClient } from 'convex/react'
import './index.css'
import App from './App.tsx'

const convexUrl = import.meta.env.VITE_CONVEX_URL as string
const publishableKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY as string

if (!convexUrl || !publishableKey) {
  const missingVars = []
  if (!convexUrl) missingVars.push('VITE_CONVEX_URL')
  if (!publishableKey) missingVars.push('VITE_CLERK_PUBLISHABLE_KEY')

  createRoot(document.getElementById('root')!).render(
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
      fontFamily: 'system-ui, sans-serif',
      padding: '2rem',
      textAlign: 'center'
    }}>
      <h1 style={{ color: '#ef4444', marginBottom: '1rem' }}>Configuration Error</h1>
      <p>The application cannot start because some environment variables are missing.</p>
      <div style={{
        background: '#f3f4f6',
        padding: '1rem',
        borderRadius: '0.5rem',
        margin: '1rem 0',
        fontFamily: 'monospace'
      }}>
        {missingVars.map(v => <div key={v}>{v}</div>)}
      </div>
      <p style={{ color: '#6b7280', fontSize: '0.875rem' }}>
        Please add these variables to your deployment settings (e.g., Vercel) or .env file.
      </p>
    </div>
  )
} else {
  const convex = new ConvexReactClient(convexUrl)

  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <ClerkProvider publishableKey={publishableKey}>
        <ConvexProviderWithClerk client={convex} useAuth={useAuth}>
          <App />
        </ConvexProviderWithClerk>
      </ClerkProvider>
    </StrictMode>,
  )
}
