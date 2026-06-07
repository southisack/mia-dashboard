'use client'

import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Task, Job, Reward, Goal, PendingRequest, PointsEntry } from './types'

type Store = {
  // Data
  tasks: Task[]
  jobs: Job[]
  rewards: Reward[]
  goals: Goal[]
  requests: PendingRequest[]
  ledger: PointsEntry[]
  parentPin: string

  // Derived
  totalPoints: () => number
  pendingCount: () => number

  // Kid actions
  requestTaskCompletion: (task: Task) => void
  requestJobCompletion: (job: Job) => void
  requestRewardRedemption: (reward: Reward) => void

  // Parent actions
  approveRequest: (requestId: string) => void
  rejectRequest: (requestId: string) => void
  addTask: (task: Omit<Task, 'id'>) => void
  updateTask: (id: string, updates: Partial<Task>) => void
  deleteTask: (id: string) => void
  addJob: (job: Omit<Job, 'id'>) => void
  updateJob: (id: string, updates: Partial<Job>) => void
  deleteJob: (id: string) => void
  addReward: (reward: Omit<Reward, 'id'>) => void
  updateReward: (id: string, updates: Partial<Reward>) => void
  deleteReward: (id: string) => void
  setPin: (pin: string) => void
  setGoal: (rewardId: string) => void
  setPointsTo: (amount: number) => void
}

const uid = () => Math.random().toString(36).slice(2, 10)

const SEED_TASKS: Task[] = [
  { id: uid(), name: 'Lire pendant 20 minutes', points: 10, emoji: '📚', active: true },
  { id: uid(), name: 'Ranger ta chambre', points: 15, emoji: '🧹', active: true },
  { id: uid(), name: 'Vider le lave-vaisselle', points: 15, emoji: '🍽️', active: true },
]

const SEED_JOBS: Job[] = [
  {
    id: uid(),
    name: 'Aider à laver la voiture',
    description: 'Une mission unique — dis à un parent quand tu es prête et il la marquera comme faite.',
    points: 50,
    reward: 'Soirée cinéma — tu choisis ! 🎬',
    active: true,
  },
  {
    id: uid(),
    name: 'Aider aux courses',
    description: 'Viens aider à porter les sacs et choisir des articles sur la liste.',
    points: 30,
    reward: 'Tu choisis le souper ce soir 🍕',
    active: true,
  },
]

const SEED_REWARDS: Reward[] = [
  // Petites gâteries
  { id: uid(), name: 'Bubble tea', pointCost: 40, image: '/rewards/bubble-tea.webp', active: true },
  { id: uid(), name: 'Fondue au chocolat', pointCost: 60, image: '/rewards/fondue-chocolat.webp', active: true },
  { id: uid(), name: 'Peindre des roches', pointCost: 60, image: '/rewards/peindre-roches.webp', active: true },
  { id: uid(), name: 'Construire un fort', pointCost: 60, image: '/rewards/construire-fort.webp', active: true },
  { id: uid(), name: 'Fabriquer du slime', pointCost: 70, image: '/rewards/fabriquer-slime.webp', active: true },
  { id: uid(), name: 'Nouveau squishy', pointCost: 70, image: '/rewards/nouveau-squishy.webp', active: true },
  { id: uid(), name: 'Soirée cinéma', pointCost: 80, image: '/rewards/soiree-cinema.webp', active: true },
  { id: uid(), name: 'Rester debout plus tard', pointCost: 80, image: '/rewards/rester-debout.webp', active: true },
  { id: uid(), name: 'Blind bag mystère', pointCost: 90, image: '/rewards/blind-bag.webp', active: true },
  // Activités & privilèges
  { id: uid(), name: 'Chef de la famille pour une soirée', pointCost: 100, image: '/rewards/chef-famille.webp', active: true },
  { id: uid(), name: 'Kit de dessin', pointCost: 120, image: '/rewards/kit-dessin.webp', active: true },
  { id: uid(), name: 'Kit Slime', pointCost: 150, image: '/rewards/kit-slime.webp', active: true },
  { id: uid(), name: 'Sauter une corvée', pointCost: 150, image: '/rewards/sauter-corvee.webp', active: true },
  { id: uid(), name: 'Lapin en peluche', pointCost: 200, image: '/rewards/lapin-peluche.webp', active: true },
  { id: uid(), name: 'Peluche style japonais', pointCost: 200, image: '/rewards/peluche-japonaise.webp', active: true },
  { id: uid(), name: 'Inviter une amie — soirée pyjama', pointCost: 200, image: '/rewards/soiree-pyjama.webp', active: true },
  // Grandes sorties & cadeaux
  { id: uid(), name: 'Magasiner avec un budget perso', pointCost: 250, image: '/rewards/magasiner.webp', active: true },
  { id: uid(), name: 'Sortie à l\'aquarium', pointCost: 300, image: '/rewards/sortie-aquarium.webp', active: true },
  { id: uid(), name: 'Sortie au zoo', pointCost: 300, image: '/rewards/sortie-zoo.webp', active: true },
  { id: uid(), name: 'Coin cozy dans sa chambre', pointCost: 400, image: '/rewards/coin-cozy.webp', active: true },
  { id: uid(), name: 'Nintendo Switch Lite', pointCost: 1000, image: '/rewards/nintendo-switch.webp', active: true },
  { id: uid(), name: 'Meuble IKEA pour sa chambre', pointCost: 800, image: '/rewards/meuble-ikea.webp', active: true },
]

export const useStore = create<Store>()(
  persist(
    (set, get) => ({
      tasks: SEED_TASKS,
      jobs: SEED_JOBS,
      rewards: SEED_REWARDS,
      goals: [],
      requests: [],
      ledger: [],
      parentPin: '1234',

      totalPoints: () => {
        return get().ledger.reduce((sum, e) => sum + e.amount, 0)
      },

      pendingCount: () => {
        return get().requests.filter(r => r.status === 'pending').length
      },

      requestTaskCompletion: (task) => {
        const existing = get().requests.find(
          r => r.refId === task.id && r.status === 'pending'
        )
        if (existing) return
        set(s => ({
          requests: [...s.requests, {
            id: uid(),
            type: 'task',
            refId: task.id,
            name: task.name,
            points: task.points,
            requestedAt: new Date().toISOString(),
            status: 'pending',
          }],
        }))
      },

      requestJobCompletion: (job) => {
        const existing = get().requests.find(
          r => r.refId === job.id && r.status === 'pending'
        )
        if (existing) return
        set(s => ({
          requests: [...s.requests, {
            id: uid(),
            type: 'job',
            refId: job.id,
            name: job.name,
            points: job.points,
            requestedAt: new Date().toISOString(),
            status: 'pending',
          }],
        }))
      },

      requestRewardRedemption: (reward) => {
        const points = get().totalPoints()
        if (points < reward.pointCost) return
        const existing = get().requests.find(
          r => r.refId === reward.id && r.status === 'pending'
        )
        if (existing) return
        set(s => ({
          requests: [...s.requests, {
            id: uid(),
            type: 'reward',
            refId: reward.id,
            name: reward.name,
            points: -reward.pointCost,
            requestedAt: new Date().toISOString(),
            status: 'pending',
          }],
        }))
      },

      approveRequest: (requestId) => {
        const req = get().requests.find(r => r.id === requestId)
        if (!req || req.status !== 'pending') return
        set(s => ({
          requests: s.requests.map(r =>
            r.id === requestId ? { ...r, status: 'approved' } : r
          ),
          ledger: [...s.ledger, {
            id: uid(),
            amount: req.points,
            reason: req.type === 'reward'
              ? `Récompense: ${req.name}`
              : `${req.type === 'job' ? 'Mission' : 'Tâche'}: ${req.name}`,
            date: new Date().toISOString(),
          }],
        }))
      },

      rejectRequest: (requestId) => {
        set(s => ({
          requests: s.requests.map(r =>
            r.id === requestId ? { ...r, status: 'rejected' } : r
          ),
        }))
      },

      addTask: (task) => set(s => ({ tasks: [...s.tasks, { ...task, id: uid() }] })),
      updateTask: (id, updates) => set(s => ({
        tasks: s.tasks.map(t => t.id === id ? { ...t, ...updates } : t),
      })),
      deleteTask: (id) => set(s => ({ tasks: s.tasks.filter(t => t.id !== id) })),

      addJob: (job) => set(s => ({ jobs: [...s.jobs, { ...job, id: uid() }] })),
      updateJob: (id, updates) => set(s => ({
        jobs: s.jobs.map(j => j.id === id ? { ...j, ...updates } : j),
      })),
      deleteJob: (id) => set(s => ({ jobs: s.jobs.filter(j => j.id !== id) })),

      addReward: (reward) => set(s => ({ rewards: [...s.rewards, { ...reward, id: uid() }] })),
      updateReward: (id, updates) => set(s => ({
        rewards: s.rewards.map(r => r.id === id ? { ...r, ...updates } : r),
      })),
      deleteReward: (id) => set(s => ({ rewards: s.rewards.filter(r => r.id !== id) })),

      setPin: (pin) => set({ parentPin: pin }),

      setGoal: (rewardId) => set(s => ({
        goals: s.goals.some(g => g.rewardId === rewardId && g.active)
          ? s.goals.map(g => g.rewardId === rewardId ? { ...g, active: !g.active } : g)
          : [...s.goals, { id: uid(), rewardId, active: true }],
      })),

      setPointsTo: (amount) => {
        const current = get().totalPoints()
        const diff = amount - current
        if (diff === 0) return
        set(s => ({
          ledger: [...s.ledger, {
            id: uid(),
            amount: diff,
            reason: 'Ajustement par un parent',
            date: new Date().toISOString(),
          }],
        }))
      },
    }),
    { name: 'mia-dashboard' }
  )
)
