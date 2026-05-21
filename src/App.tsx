import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { CompletionCelebrationProvider } from './components/CompletionCelebration'
import { HomePage } from './pages/HomePage'
import { CategoryPage } from './pages/CategoryPage'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 30,
      retry: 2,
    },
  },
})

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <CompletionCelebrationProvider>
        <BrowserRouter>
          <div className="min-h-dvh bg-cream-50 dark:bg-stone-950 transition-colors duration-300">
            <main className="mx-auto max-w-5xl px-4 py-6 sm:px-6 sm:py-10">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/category/:categoryId" element={<CategoryPage />} />
              </Routes>
            </main>
          </div>
        </BrowserRouter>
      </CompletionCelebrationProvider>
    </QueryClientProvider>
  )
}
