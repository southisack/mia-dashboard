'use client'

import { useState } from 'react'
import { useStore } from '@/lib/store'
import { motion, AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { ILLUSTRATION_GRADIENTS } from '@/lib/illustrationGradients'
import type { Reward } from '@/lib/types'

function GradientPicker({ value, onChange }: { value: number; onChange: (index: number) => void }) {
  return (
    <div className="flex gap-2">
      {ILLUSTRATION_GRADIENTS.map((gradient, i) => (
        <button
          key={i}
          type="button"
          onClick={() => onChange(i)}
          aria-label={`Dégradé ${i + 1}`}
          className={`w-8 h-8 rounded-full transition-transform ${
            value === i ? 'ring-2 ring-offset-2 ring-[#FF6BB5] scale-105' : ''
          }`}
          style={{ background: gradient }}
        />
      ))}
    </div>
  )
}

export default function CadeauxParentPage() {
  const rewards = useStore(s => s.rewards)
  const addReward = useStore(s => s.addReward)
  const updateReward = useStore(s => s.updateReward)
  const deleteReward = useStore(s => s.deleteReward)
  const router = useRouter()

  const [showForm, setShowForm] = useState(false)
  const [name, setName] = useState('')
  const [pointCost, setPointCost] = useState('')
  const [emoji, setEmoji] = useState('')
  const [gradientIndex, setGradientIndex] = useState(0)

  const [editingId, setEditingId] = useState<string | null>(null)
  const [editName, setEditName] = useState('')
  const [editPointCost, setEditPointCost] = useState('')
  const [editEmoji, setEditEmoji] = useState('')
  const [editGradientIndex, setEditGradientIndex] = useState(0)

  const handleAdd = () => {
    if (!name.trim() || !pointCost) return
    addReward({ name: name.trim(), pointCost: Number(pointCost), emoji: emoji || undefined, gradientIndex, active: true })
    setName('')
    setPointCost('')
    setEmoji('')
    setGradientIndex(0)
    setShowForm(false)
  }

  const startEdit = (reward: Reward) => {
    if (editingId === reward.id) {
      setEditingId(null)
      return
    }
    setEditingId(reward.id)
    setEditName(reward.name)
    setEditPointCost(String(reward.pointCost))
    setEditEmoji(reward.emoji ?? '')
    setEditGradientIndex(reward.gradientIndex)
  }

  const handleSaveEdit = (id: string) => {
    if (!editName.trim() || !editPointCost) return
    updateReward(id, {
      name: editName.trim(),
      pointCost: Number(editPointCost),
      emoji: editEmoji || undefined,
      gradientIndex: editGradientIndex,
    })
    setEditingId(null)
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
        <h1 className="text-2xl font-bold text-[#1A1A1A]">Cadeaux</h1>
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
            <p className="font-bold text-[#1A1A1A]">Nouveau cadeau</p>
            <div className="flex gap-2">
              <input
                value={emoji}
                onChange={e => setEmoji(e.target.value)}
                placeholder="🎁"
                className="w-14 h-12 rounded-[12px] border border-[#D5C0E8] text-center text-xl focus:outline-none focus:border-[#FF6BB5]"
                maxLength={2}
              />
              <input
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="Nom du cadeau"
                className="flex-1 h-12 rounded-[12px] border border-[#D5C0E8] px-4 text-sm focus:outline-none focus:border-[#FF6BB5] text-[#1A1A1A]"
              />
            </div>
            <div className="flex items-center gap-3">
              <input
                value={pointCost}
                onChange={e => setPointCost(e.target.value.replace(/\D/, ''))}
                placeholder="Coût en points"
                className="w-36 h-12 rounded-[12px] border border-[#D5C0E8] px-4 text-sm focus:outline-none focus:border-[#FF6BB5] text-[#1A1A1A]"
                inputMode="numeric"
              />
              <GradientPicker value={gradientIndex} onChange={setGradientIndex} />
            </div>
            <button
              onClick={handleAdd}
              disabled={!name.trim() || !pointCost}
              className="h-12 rounded-full text-sm font-bold text-white disabled:opacity-40"
              style={{ background: 'linear-gradient(90deg, #FFBF8C, #FF6BB5)' }}
            >
              Ajouter
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Rewards list */}
      <div className="flex flex-col gap-3">
        <AnimatePresence>
          {rewards.map(reward => (
            <motion.div
              key={reward.id}
              className="bg-white rounded-[16px] shadow-[0_2px_12px_rgba(213,192,232,0.31)] overflow-hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, x: 40 }}
              layout
            >
              <div className="px-4 py-3 flex items-center gap-3">
                <span className="text-2xl w-8 text-center">{reward.emoji ?? '🎁'}</span>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-sm text-[#1A1A1A] truncate">{reward.name}</p>
                  <p className="text-xs text-[#9B7DB5]">{reward.pointCost} pts</p>
                </div>
                <button
                  onClick={() => startEdit(reward)}
                  className="text-[#9B7DB5] text-lg w-8 flex items-center justify-center"
                  aria-label="Modifier"
                >
                  ✏️
                </button>
                <button
                  onClick={() => updateReward(reward.id, { active: !reward.active })}
                  className={`w-10 h-6 rounded-full transition-colors relative ${
                    reward.active ? 'bg-[#FF6BB5]' : 'bg-[#D5C0E8]'
                  }`}
                >
                  <span
                    className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${
                      reward.active ? 'left-5' : 'left-1'
                    }`}
                  />
                </button>
                <button
                  onClick={() => deleteReward(reward.id)}
                  className="text-[#FF6B6B] text-lg w-8 flex items-center justify-center"
                >
                  🗑
                </button>
              </div>

              <AnimatePresence>
                {editingId === reward.id && (
                  <motion.div
                    className="px-4 pb-4 flex flex-col gap-3 border-t border-[#F5E0FF] pt-3"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 28 }}
                  >
                    <div className="flex gap-2">
                      <input
                        value={editEmoji}
                        onChange={e => setEditEmoji(e.target.value)}
                        placeholder="🎁"
                        className="w-14 h-12 rounded-[12px] border border-[#D5C0E8] text-center text-xl focus:outline-none focus:border-[#FF6BB5]"
                        maxLength={2}
                      />
                      <input
                        value={editName}
                        onChange={e => setEditName(e.target.value)}
                        placeholder="Nom du cadeau"
                        className="flex-1 h-12 rounded-[12px] border border-[#D5C0E8] px-4 text-sm focus:outline-none focus:border-[#FF6BB5] text-[#1A1A1A]"
                      />
                    </div>
                    <div className="flex items-center gap-3">
                      <input
                        value={editPointCost}
                        onChange={e => setEditPointCost(e.target.value.replace(/\D/, ''))}
                        placeholder="Coût en points"
                        className="w-36 h-12 rounded-[12px] border border-[#D5C0E8] px-4 text-sm focus:outline-none focus:border-[#FF6BB5] text-[#1A1A1A]"
                        inputMode="numeric"
                      />
                      <GradientPicker value={editGradientIndex} onChange={setEditGradientIndex} />
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => setEditingId(null)}
                        className="flex-1 h-11 rounded-full text-sm font-bold bg-[#F5E0FF] text-[#9B7DB5]"
                      >
                        Annuler
                      </button>
                      <button
                        onClick={() => handleSaveEdit(reward.id)}
                        disabled={!editName.trim() || !editPointCost}
                        className="flex-1 h-11 rounded-full text-sm font-bold text-white disabled:opacity-40"
                        style={{ background: 'linear-gradient(90deg, #FFBF8C, #FF6BB5)' }}
                      >
                        Enregistrer
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {rewards.length === 0 && (
        <p className="text-center text-[#9B7DB5] text-sm py-8">
          Aucun cadeau. Appuie sur + pour en ajouter.
        </p>
      )}
    </main>
  )
}
