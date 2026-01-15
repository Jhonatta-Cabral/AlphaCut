import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { ThemeProvider } from '@/components/theme-provider'
import { Toaster } from '@/components/ui/toaster'
import { AuthProvider } from '@/contexts/AuthContext'
import { SubscriptionProvider } from '@/contexts/SubscriptionContext'

// Pages
import LandingPage from '@/pages/LandingPage'
import Onboarding from '@/pages/Onboarding'
import Dashboard from '@/pages/Dashboard'
import Analysis from '@/pages/Analysis'
import Results from '@/pages/Results'
import HabitTracker from '@/pages/HabitTracker'
import Tips from '@/pages/Tips'
import Profile from '@/pages/Profile'
import Paywall from '@/pages/Paywall'

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="alphacut-theme">
      <AuthProvider>
        <SubscriptionProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/onboarding" element={<Onboarding />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/analysis" element={<Analysis />} />
              <Route path="/results/:id" element={<Results />} />
              <Route path="/habits" element={<HabitTracker />} />
              <Route path="/tips" element={<Tips />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/paywall" element={<Paywall />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </BrowserRouter>
          <Toaster />
        </SubscriptionProvider>
      </AuthProvider>
    </ThemeProvider>
  )
}

export default App
