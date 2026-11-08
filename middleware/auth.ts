export default defineNuxtRouteMiddleware((to) => {
  const { currentUser } = useLaporMas()
  const user = currentUser.value
  if (!user) return navigateTo('/login')

  if (to.path === '/app/laporan/buat' && user.role !== 'masyarakat') {
    const home = user.role === 'admin' ? '/admin' : user.role === 'petugas' ? '/petugas' : '/rt'
    return navigateTo(home)
  }

  const requiredRole = to.path.startsWith('/admin') ? 'admin'
    : to.path.startsWith('/petugas') ? 'petugas'
      : to.path.startsWith('/rt') ? 'rt' : null
  if (requiredRole && user.role !== requiredRole && user.role !== 'admin') {
    const home = user.role === 'admin' ? '/admin' : user.role === 'petugas' ? '/petugas' : user.role === 'rt' ? '/rt' : '/app'
    return navigateTo(home)
  }
})
