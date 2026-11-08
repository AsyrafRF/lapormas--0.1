export type Role = 'masyarakat' | 'petugas' | 'admin' | 'rt'
export type ReportStatus = 'Menunggu verifikasi' | 'Terverifikasi' | 'Ditangani' | 'Selesai' | 'Ditolak'
export type Priority = 'Rendah' | 'Sedang' | 'Tinggi' | 'Darurat'

export interface AppUser {
  id: string
  username: string
  password: string
  name: string
  role: Role
  address: string
  phone?: string
  active: boolean
  notificationsEnabled: boolean
  createdAt: string
}

export interface ReportEvent {
  id: string
  label: string
  description: string
  createdAt: string
  actorName: string
}

export interface Resolution {
  id: string
  summary: string
  createdAt: string
  officerId: string
  officerName: string
}

export interface Report {
  id: string
  ticket: string
  ownerId: string
  ownerName: string
  title: string
  category: string
  description: string
  location: string
  occurredAt: string
  createdAt: string
  updatedAt: string
  priority: Priority
  status: ReportStatus
  attachments: string[]
  adminNote?: string
  resolution?: Resolution
  events: ReportEvent[]
}

export interface NotificationItem {
  id: string
  userId: string
  title: string
  message: string
  createdAt: string
  read: boolean
  link: string
  kind: 'report' | 'resolution' | 'account' | 'system'
}

export interface Recap {
  id: string
  title: string
  period: string
  summary: string
  totalReports: number
  completedReports: number
  publishedAt: string
  publishedBy: string
}

export interface StoreState {
  users: AppUser[]
  reports: Report[]
  notifications: NotificationItem[]
  recaps: Recap[]
  currentUser: AppUser | null
}
