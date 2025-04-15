import { Router } from 'express'

const router = Router()

router.get('/', (_req, res) => {
  res.render('pages/index', {
    currentTime: new Date().toISOString(),
  })
})

router.get('/dashboard', (_req, res) => {
  res.render('pages/dashboard/index', {
    currentTime: new Date().toISOString(),
  })
})

export default router
