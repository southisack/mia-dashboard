'use client'

import { useState } from 'react'
import { useStore } from '@/lib/store'
import { motion, AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/navigation'

export default function TachesPage() {
  const tasks = useStore(s => s.tasks)
  const addTask = useStore(s => s.addTask)
  const updateTask = useStore(s => s.updateTask)
  const deleteTask = useStore(s => s.deleteTask)
  const router = useRouter()

  const [showForm, setShowForm] = useState(false)
  const [name, setName] = useState('')
  const [points, setPoints] = useState('')
  const [emoji, setEmoji] = useState('')

  const handleAdd = () => {
    if (!name.trim() || !points) return
    addTask({ name: name.trim(), points: Number(points), emoji: emoji || undefined, active: true })
    setName('')
    setPoints('')
    setEmoji('')
    setShowForm(false)
  }

  return (
    <main className="px-6 pt-8 pb-8 flex flex-col gap-5">
      {/* Header */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => router.back()}
          className="w-10 h-10 rounded-full bg-white shadow-[0_2px_12px_rgba(213,192,232,0.31)] flex items-center justify-center text-[#9B7DB5]"
        >
          ←
        </button>
        <h1 className="text-2xl font-bold text-[#1A1A1A]">Tâches</h1>
        <button
          onClick={() => setShowForm(s => !s)}
          className="ml-auto w-10 h-10 rounded-full flex items-center justify-center text-white text-2xl font-light"
          style={{ background: 'linear-gradient(135deg, #FFBF8C, #FF6BB5)' }}
        >
          {showForm ? '×' : '+'}
        </button>
      </div>

      {/* Add form */}
      <AnimatePresence>
        {showForm && (
          <motion.div
            className="bg-white rounded-[20px] shadow-[0_4px_20px_rgba(213,192,232,0.40)] p-5 flex flex-col gap-3"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 28 }}
          >
            <p className="font-bold text-[#1A1A1A]">Nouvelle tâche</p>
            <div className="flex gap-2">
              <input
                value={emoji}
                onChange={e => setEmoji(e.target.value)}
                placeholder="🌟"
                className="w-14 h-12 rounded-[12px] border border-[#D5C0E8] text-center text-xl focus:outline-none focus:border-[#FF6BB5]"
                maxLength={2}
              />
              <input
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="Nom de la tâche"
                className="flex-1 h-12 rounded-[12px] border border-[#D5C0E8] px-4 text-sm focus:outline-none focus:border-[#FF6BB5] text-[#1A1A1A]"
              />
            </div>
            <div className="flex items-center gap-3">
              <input
                value={points}
                onChange={e => setPoints(e.target.value.replace(/\D/, ''))}
                placeholder="Points"
                className="w-28 h-12 rounded-[12px] border border-[#D5C0E8] px-4 text-sm focus:outline-none focus:border-[#FF6BB5] text-[#1A1A1A]"
                inputMode="numeric"
              />
              <button
                onClick={handleAdd}
                disabled={!name.trim() || !points}
                className="flex-1 h-12 rounded-full text-sm font-bold text-white disabled:opacity-40"
                style={{ background: 'linear-gradient(90deg, #FFBF8C, #FF6BB5)' }}
              >
                Ajouter
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Task list */}
      <div className="flex flex-col gap-3">
        <AnimatePresence>
          {tasks.map(task => (
            <motion.div
              key={task.id}
              className="bg-white rounded-[16px] shadow-[0_2px_12px_rgba(213,192,232,0.31)] px-4 py-3 flex items-center gap-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, x: 40 }}
              layout
            >
              <span className="text-2xl w-8 text-center">{task.emoji ?? '📋'}</span>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-sm text-[#1A1A1A] truncate">{task.name}</p>
                <p className="text-xs text-[#9B7DB5]">{task.points} pts</p>
              </div>

              {/* Toggle active */}
              <button
                onClick={() => updateTask(task.id, { active: !task.active })}
                className={`w-10 h-6 rounded-full transition-colors relative ${
                  task.active ? 'bg-[#FF6BB5]' : 'bg-[#D5C0E8]'
                }`}
              >
                <span
                  className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${
                    task.active ? 'left-5' : 'left-1'
                  }`}
                />
              </button>

              <button
                onClick={() => deleteTask(task.id)}
                className="text-[#FF6B6B] text-lg w-8 flex items-center justify-center"
              >
                🗑
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {tasks.length === 0 && (
        <p className="text-center text-[#9B7DB5] text-sm py-8">
          Aucune tâche. Appuie sur + pour en ajouter.
        </p>
      )}
    </main>
  )
}
