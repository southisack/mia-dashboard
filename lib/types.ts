export type Task = {
  id: string
  name: string
  points: number
  emoji?: string
  active: boolean
}

export type Job = {
  id: string
  name: string
  description: string
  points: number
  reward: string
  active: boolean
}

export type Reward = {
  id: string
  name: string
  pointCost: number
  emoji?: string
  gradientIndex: number
  active: boolean
}

export type Goal = {
  id: string
  rewardId: string
  active: boolean
}

export type PendingRequest = {
  id: string
  type: 'task' | 'job' | 'reward'
  refId: string      // taskId, jobId, or rewardId
  name: string       // display name for parent view
  points: number
  requestedAt: string // ISO date string
  status: 'pending' | 'approved' | 'rejected'
}

export type PointsEntry = {
  id: string
  amount: number     // positive = earned, negative = spent
  reason: string
  date: string       // ISO date string
}
