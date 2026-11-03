'use server'

import {
  setSetting,
  addEducation, deleteEducation,
  addExperience, deleteExperience,
  addSkill, deleteSkill,
  addProject, deleteProject,
} from '@/lib/db'
import { redirect } from 'next/navigation'

export async function updateSetting(formData: FormData) {
  'use server'
  await setSetting(formData.get('key') as string, formData.get('value') as string)
  redirect('/admin?tab=settings')
}

export async function handleAddEducation(formData: FormData) {
  'use server'
  await addEducation(formData)
  redirect('/admin?tab=education')
}

export async function handleDeleteEducation(formData: FormData) {
  'use server'
  const id = formData.get('id') as string
  await deleteEducation(id)
  redirect('/admin?tab=education')
}

export async function handleAddExperience(formData: FormData) {
  'use server'
  await addExperience(formData)
  redirect('/admin?tab=experience')
}

export async function handleDeleteExperience(formData: FormData) {
  'use server'
  const id = formData.get('id') as string
  await deleteExperience(id)
  redirect('/admin?tab=experience')
}

export async function handleAddSkill(formData: FormData) {
  'use server'
  await addSkill(formData)
  redirect('/admin?tab=skills')
}

export async function handleDeleteSkill(formData: FormData) {
  'use server'
  const id = formData.get('id') as string
  await deleteSkill(id)
  redirect('/admin?tab=skills')
}

export async function handleAddProject(formData: FormData) {
  'use server'
  await addProject(formData)
  redirect('/admin?tab=projects')
}

export async function handleDeleteProject(formData: FormData) {
  'use server'
  const id = formData.get('id') as string
  await deleteProject(id)
  redirect('/admin?tab=projects')
}
