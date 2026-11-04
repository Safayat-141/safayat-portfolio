'use server'

import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'
import { revalidatePath } from 'next/cache'
import {
  setSetting,
  addEducation, deleteEducation,
  addExperience, deleteExperience,
  addSkill, deleteSkill,
  addProject, deleteProject,
} from '@/lib/db'
import { requireAdmin } from '@/lib/auth'
import { COOKIE_NAME } from '@/lib/session'
import { SETTING_KEYS } from '@/lib/settings'

// Refresh the public page right away, then go back to the admin tab.
function done(tab: string): never {
  revalidatePath('/')
  redirect(`/admin?tab=${tab}`)
}

export async function handleLogout() {
  const c = await cookies()
  c.delete(COOKIE_NAME)
  redirect('/admin/login')
}

export async function updateSetting(formData: FormData) {
  await requireAdmin()
  const key = String(formData.get('key') ?? '')
  const value = String(formData.get('value') ?? '')
  if (SETTING_KEYS.includes(key)) await setSetting(key, value)
  done('settings')
}

export async function handleAddEducation(formData: FormData) {
  await requireAdmin()
  await addEducation(formData)
  done('education')
}

export async function handleDeleteEducation(formData: FormData) {
  await requireAdmin()
  await deleteEducation(String(formData.get('id')))
  done('education')
}

export async function handleAddExperience(formData: FormData) {
  await requireAdmin()
  await addExperience(formData)
  done('experience')
}

export async function handleDeleteExperience(formData: FormData) {
  await requireAdmin()
  await deleteExperience(String(formData.get('id')))
  done('experience')
}

export async function handleAddSkill(formData: FormData) {
  await requireAdmin()
  await addSkill(formData)
  done('skills')
}

export async function handleDeleteSkill(formData: FormData) {
  await requireAdmin()
  await deleteSkill(String(formData.get('id')))
  done('skills')
}

export async function handleAddProject(formData: FormData) {
  await requireAdmin()
  await addProject(formData)
  done('projects')
}

export async function handleDeleteProject(formData: FormData) {
  await requireAdmin()
  await deleteProject(String(formData.get('id')))
  done('projects')
}
