'use client'

import Link from 'next/link'
import { useMemo } from 'react'
import { useStore } from '@/lib/store'
import { motion, AnimatePresence } from 'framer-motion'
import type { Task } from '@/lib/types'

export default function AccueilPage() {
  const allTasks = useStore(s => s.tasks)
  const ledger = useStore(s => s.ledger)
  const requests = useStore(s => s.requests)
  const requestTaskCompletion = useStore(s => s.requestTaskCompletion)

  const tasks = useMemo(() => allTasks.filter(t => t.active), [allTasks])
  const totalPoints = useMemo(() => ledger.reduce((sum, e) => sum + e.amount, 0), [ledger])

  const isPending = (taskId: string) =>
    requests.some(r => r.refId === taskId && r.status === 'pending')

  const isApproved = (taskId: string) =>
    requests.some(r => r.refId === taskId && r.status === 'approved' &&
      new Date(r.requestedAt).toDateString() === new Date().toDateString()
    )

  return (
    <main className="px-8 pt-8 pb-4 flex flex-col gap-6">
      {/* Greeting */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-[#9B7DB5]">Bonjour ☀️</p>
          <h1 className="text-3xl font-bold text-[#1A1A1A]">Salut, Mia !</h1>
        </div>
        <div className="flex items-center gap-2">
          <Link
            href="/parent"
            className="w-9 h-9 rounded-full bg-[#F5E0FF] flex items-center justify-center text-base select-none"
            title="Espace parents"
          >
            🔒
          </Link>
          <div className="w-12 h-12 rounded-full bg-[#FF6BB5] flex items-center justify-center text-white font-bold text-xl select-none">
            M
          </div>
        </div>
      </div>

      {/* Points widget */}
      <motion.div
        className="rounded-[24px] p-7 flex flex-col gap-2"
        style={{ background: 'linear-gradient(135deg, #FFBF8C 0%, #FF6BB5 100%)' }}
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      >
        <div className="flex items-center justify-between">
          <span className="text-white/90 text-xs font-medium">Ton solde</span>
          <span className="text-lg">✨</span>
        </div>
        <div className="flex flex-col items-center gap-1 py-2">
          <motion.span
            key={totalPoints}
            className="text-7xl font-bold text-white leading-none"
            initial={{ scale: 1.2, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 400, damping: 15 }}
          >
            {totalPoints}
          </motion.span>
          <span className="text-white/85 text-base font-medium">points</span>
        </div>
        <p className="text-white/85 text-xs text-center">
          Continue comme ça — tu es sur la bonne voie ! 🌟
        </p>
      </motion.div>

      {/* Tasks section */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-[#1A1A1A]">À faire</h2>
          <span className="text-sm font-medium text-[#FF6BB5]">
            {tasks.filter(t => isApproved(t.id)).length}/{tasks.length} faites
          </span>
        </div>

        <div className="flex flex-col gap-3">
          {tasks.map(task => (
            <TaskItem
              key={task.id}
              task={task}
              pending={isPending(task.id)}
              done={isApproved(task.id)}
              onTap={() => requestTaskCompletion(task)}
            />
          ))}
        </div>
      </div>
    </main>
  )
}

function TaskItem({ task, pending, done, onTap }: {
  task: Task
  pending: boolean
  done: boolean
  onTap: () => void
}) {
  return (
    <motion.button
      onClick={done || pending ? undefined : onTap}
      className={`w-full flex items-center gap-4 rounded-[16px] p-4 text-left shadow-[0_2px_12px_rgba(213,192,232,0.31)] transition-colors ${
        done ? 'bg-[#F6FFF6]' : 'bg-white'
      }`}
      whileTap={done || pending ? {} : { scale: 0.98 }}
      transition={{ type: 'spring', stiffness: 400, damping: 20 }}
    >
      {/* Checkbox */}
      <motion.div
        className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
          done
            ? 'bg-[#6BC96B]'
            : pending
            ? 'bg-[#FFB347]'
            : 'border-2 border-[#D5C0E8]'
        }`}
        animate={{ scale: done ? 1 : 1 }}
        transition={{ type: 'spring', stiffness: 400, damping: 12 }}
      >
        {done && <CheckIcon className="w-4 h-4 text-white" />}
        {pending && <span className="text-white text-xs font-bold">?</span>}
      </motion.div>

      {/* Text */}
      <div className="flex-1 min-w-0">
        <p className={`font-semibold text-base truncate ${done || pending ? 'text-[#9B7DB5]' : 'text-[#1A1A1A]'}`}>
          {task.emoji} {task.name}
        </p>
        <p className="text-xs text-[#9B7DB5] mt-0.5">
          {done ? `Bravo ! +${task.points} points gagnés ✨` :
           pending ? 'En attente d\'approbation...' :
           `Gagne ${task.points} points`}
        </p>
      </div>

      {/* Badge */}
      <span
        className={`shrink-0 h-7 px-3 rounded-full text-xs font-bold flex items-center ${
          done
            ? 'bg-[#E8F8E8] text-[#6BC96B]'
            : pending
            ? 'bg-[#FFF3E0] text-[#FFB347]'
            : 'text-white'
        }`}
        style={!done && !pending ? { background: 'linear-gradient(90deg, #FFBF8C, #FF6BB5)' } : {}}
      >
        +{task.points}
      </span>
    </motion.button>
  )
}

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  )
}
