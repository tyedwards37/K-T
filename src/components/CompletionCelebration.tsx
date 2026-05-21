import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from 'react'

const GIF_SRC = '/giphy-downsized.gif'
const AUDIO_SRC = '/myinstants.mp3'
const DISPLAY_MS = 4000

type CelebrationContextValue = () => void

const CelebrationContext = createContext<CelebrationContextValue | null>(null)

export function CompletionCelebrationProvider({ children }: { children: ReactNode }) {
  const [visible, setVisible] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  const celebrate = useCallback(() => {
    setVisible(true)

    if (!audioRef.current) {
      audioRef.current = new Audio(AUDIO_SRC)
    }
    audioRef.current.currentTime = 0
    void audioRef.current.play().catch(() => {
      /* autoplay blocked — checkbox click usually allows playback */
    })
  }, [])

  useEffect(() => {
    if (!visible) return
    const timer = window.setTimeout(() => setVisible(false), DISPLAY_MS)
    return () => clearTimeout(timer)
  }, [visible])

  const dismiss = useCallback(() => setVisible(false), [])

  return (
    <CelebrationContext.Provider value={celebrate}>
      {children}
      {visible && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 animate-fade-in"
          role="presentation"
          onClick={dismiss}
          onKeyDown={(e) => e.key === 'Escape' && dismiss()}
        >
          <div
            className="absolute inset-0 bg-stone-900/50 dark:bg-black/70 backdrop-blur-sm"
            aria-hidden="true"
          />
          <img
            src={GIF_SRC}
            alt=""
            className="relative z-10 max-h-[70vh] max-w-full rounded-2xl shadow-2xl object-contain pointer-events-none"
          />
        </div>
      )}
    </CelebrationContext.Provider>
  )
}

export function useCelebrateCompletion(): CelebrationContextValue {
  const celebrate = useContext(CelebrationContext)
  if (!celebrate) {
    throw new Error('useCelebrateCompletion must be used within CompletionCelebrationProvider')
  }
  return celebrate
}
