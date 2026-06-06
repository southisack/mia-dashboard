'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useStore } from '@/lib/store'
import { motion } from 'framer-motion'

const DOTS = ['', '', '', '']

export default function ParentPinPage() {
  const [input, setInput] = useState('')
  const [error, setError] = useState(false)
  const parentPin = useStore(s => s.parentPin)
  const router = useRouter()

  const handleDigit = (d: string) => {
    if (input.length >= 4) return
    const next = input + d
    setInput(next)
    setError(false)

    if (next.length === 4) {
      if (next === parentPin) {
        router.push('/parent/approbations')
      } else {
        setTimeout(() => {
          setInput('')
          setError(true)
        }, 300)
      }
    }
  }

  const handleDelete = () => {
    setInput(p => p.slice(0, -1))
    setError(false)
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-8 gap-10">
      {/* Header */}
      <div className="text-center">
        <div className="w-16 h-16 rounded-full bg-[#E8D5F5] flex items-center justify-center text-3xl mx-auto mb-4">
          🔒
        </div>
        <h1 className="text-2xl font-bold text-[#1A1A1A]">Espace parents</h1>
        <p className="text-sm text-[#9B7DB5] mt-1">Entrez votre NIP à 4 chiffres</p>
      </div>

      {/* PIN dots */}
      <motion.div
        className="flex gap-4"
        animate={error ? { x: [-8, 8, -6, 6, 0] } : {}}
        transition={{ duration: 0.35 }}
      >
        {DOTS.map((_, i) => (
          <motion.div
            key={i}
            className={`w-4 h-4 rounded-full transition-colors duration-150 ${
              i < input.length
                ? error ? 'bg-[#FF6B6B]' : 'bg-[#FF6BB5]'
                : 'bg-[#D5C0E8]'
            }`}
            animate={{ scale: i < input.length ? 1.2 : 1 }}
            transition={{ type: 'spring', stiffness: 500, damping: 14 }}
          />
        ))}
      </motion.div>

      {error && (
        <p className="text-[#FF6B6B] text-sm font-medium -mt-4">NIP incorrect. Réessayez.</p>
      )}

      {/* Numpad */}
      <div className="grid grid-cols-3 gap-4 w-full max-w-xs">
        {['1','2','3','4','5','6','7','8','9'].map(d => (
          <NumButton key={d} label={d} onPress={() => handleDigit(d)} />
        ))}
        <div /> {/* spacer */}
        <NumButton label="0" onPress={() => handleDigit('0')} />
        <NumButton
          label="⌫"
          onPress={handleDelete}
          className="text-[#9B7DB5]"
        />
      </div>

      {/* Back to kid view */}
      <button
        onClick={() => router.push('/')}
        className="text-sm text-[#9B7DB5] underline"
      >
        ← Retour à l&apos;app de Mia
      </button>
    </main>
  )
}

function NumButton({
  label,
  onPress,
  className = '',
}: {
  label: string
  onPress: () => void
  className?: string
}) {
  return (
    <motion.button
      onClick={onPress}
      className={`h-16 rounded-[16px] bg-white shadow-[0_2px_12px_rgba(213,192,232,0.31)] text-xl font-bold text-[#1A1A1A] ${className}`}
      whileTap={{ scale: 0.92 }}
      transition={{ type: 'spring', stiffness: 500, damping: 20 }}
    >
      {label}
    </motion.button>
  )
}
