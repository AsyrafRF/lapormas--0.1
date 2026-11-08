import type { Role } from '~/types/lapormas'

function homeForRole(role: Role): string {
  const homes: Record<Role, string> = {
    masyarakat: '/app',
    petugas: '/petugas',
    admin: '/admin',
    rt: '/rt'
  }
  return homes[role]
}

export default defineNuxtRouteMiddleware((to) => {
  const { currentUser } = useLaporMas()
  const user = currentUser.value
  if (!user) return navigateTo('/login')

  if (to.path === '/app/laporan/buat' && user.role !== 'masyarakat') {
    return navigateTo(homeForRole(user.role))
  }

  const requiredRole: Role | null = to.path.startsWith('/admin') ? 'admin'
    : to.path.startsWith('/petugas') ? 'petugas'
      : to.path.startsWith('/rt') ? 'rt' : null

  // Administrator boleh membuka seluruh workspace; peran lain dibatasi ke area masing-masing.
  if (requiredRole && user.role !== requiredRole && user.role !== 'admin') {
    return navigateTo(homeForRole(user.role))
  }
})
