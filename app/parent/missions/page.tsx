'use client'

import { useState } from 'react'
import { useStore } from '@/lib/store'
import { motion, AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/navigation'

export default function MissionsParentPage() {
  const jobs = useStore(s => s.jobs)
  const addJob = useStore(s => s.addJob)
  const updateJob = useStore(s => s.updateJob)
  const deleteJob = useStore(s => s.deleteJob)
  const router = useRouter()

  const [showForm, setShowForm] = useState(false)
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [points, setPoints] = useState('')
  const [reward, setReward] = useState('')

  const handleAdd = () => {
    if (!name.trim() || !points || !reward.trim()) return
    addJob({ name: name.trim(), description: description.trim(), points: Number(points), reward: reward.trim(), active: true })
    setName('')
    setDescription('')
    setPoints('')
    setReward('')
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
        <h1 className="text-2xl font-bold text-[#1A1A1A]">Missions</h1>
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
            <p className="font-bold text-[#1A1A1A]">Nouvelle mission</p>
            <input
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="Nom de la mission"
              className="h-12 rounded-[12px] border border-[#D5C0E8] px-4 text-sm focus:outline-none focus:border-[#FF6BB5] text-[#1A1A1A]"
            />
            <textarea
              value={description}
              onChange={e => setDescription(e.target.value)}
              placeholder="Description (optionnel)"
              className="rounded-[12px] border border-[#D5C0E8] px-4 py-3 text-sm focus:outline-none focus:border-[#FF6BB5] text-[#1A1A1A] resize-none"
              rows={2}
            />
            <div className="flex gap-2">
              <input
                value={points}
                onChange={e => setPoints(e.target.value.replace(/\D/, ''))}
                placeholder="Points"
                className="w-28 h-12 rounded-[12px] border border-[#D5C0E8] px-4 text-sm focus:outline-none focus:border-[#FF6BB5] text-[#1A1A1A]"
                inputMode="numeric"
              />
              <input
                value={reward}
                onChange={e => setReward(e.target.value)}
                placeholder="Récompense spéciale"
                className="flex-1 h-12 rounded-[12px] border border-[#D5C0E8] px-4 text-sm focus:outline-none focus:border-[#FF6BB5] text-[#1A1A1A]"
              />
            </div>
            <button
              onClick={handleAdd}
              disabled={!name.trim() || !points || !reward.trim()}
              className="h-12 rounded-full text-sm font-bold text-white disabled:opacity-40"
              style={{ background: 'linear-gradient(90deg, #FFBF8C, #FF6BB5)' }}
            >
              Ajouter la mission
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Jobs list */}
      <div className="flex flex-col gap-3">
        <AnimatePresence>
          {jobs.map(job => (
            <motion.div
              key={job.id}
              className="bg-white rounded-[16px] shadow-[0_2px_12px_rgba(213,192,232,0.31)] p-4 flex flex-col gap-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, x: 40 }}
              layout
            >
              <div className="flex items-start gap-3">
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-sm text-[#1A1A1A]">{job.name}</p>
                  {job.description && (
                    <p className="text-xs text-[#9B7DB5] mt-0.5 leading-relaxed">{job.description}</p>
                  )}
                  <p className="text-xs text-[#FF6BB5] font-semibold mt-1">{job.points} pts · {job.reward}</p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => updateJob(job.id, { active: !job.active })}
                    className={`w-10 h-6 rounded-full transition-colors relative ${
                      job.active ? 'bg-[#FF6BB5]' : 'bg-[#D5C0E8]'
                    }`}
                  >
                    <span
                      className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${
                        job.active ? 'left-5' : 'left-1'
                      }`}
                    />
                  </button>
                  <button
                    onClick={() => deleteJob(job.id)}
                    className="text-[#FF6B6B] text-lg w-8 text-center"
                  >
                    🗑
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {jobs.length === 0 && (
        <p className="text-center text-[#9B7DB5] text-sm py-8">
          Aucune mission. Appuie sur + pour en ajouter.
        </p>
      )}
    </main>
  )
}
