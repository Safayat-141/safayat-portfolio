import { sql } from '@vercel/postgres'

export async function getSettings() {
  const res = await sql`SELECT key, value FROM settings`
  const obj: Record<string, string> = {}
  for (const row of res.rows) obj[row.key] = row.value
  return obj
}

export async function setSetting(key: string, value: string) {
  await sql`
    INSERT INTO settings (key, value) VALUES (${key}, ${value})
    ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value
  `
}

export async function getEducation() {
  const res = await sql`SELECT * FROM education ORDER BY id DESC`
  return res.rows
}

export async function addEducation(fd: FormData) {
  await sql`
    INSERT INTO education (institution, degree, cgpa, expected_grad, details)
    VALUES (${fd.get('institution')}, ${fd.get('degree')}, ${fd.get('cgpa')}, ${fd.get('expected_grad')}, ${fd.get('details')})
  `
}

export async function deleteEducation(id: string) {
  await sql`DELETE FROM education WHERE id = ${id}`
}

export async function getExperience() {
  const res = await sql`SELECT * FROM experience ORDER BY id DESC`
  return res.rows
}

export async function addExperience(fd: FormData) {
  await sql`
    INSERT INTO experience (role_title, organization, start_date, end_date, description)
    VALUES (${fd.get('role_title')}, ${fd.get('organization')}, ${fd.get('start_date')}, ${fd.get('end_date')}, ${fd.get('description')})
  `
}

export async function deleteExperience(id: string) {
  await sql`DELETE FROM experience WHERE id = ${id}`
}

export async function getSkills() {
  const res = await sql`SELECT * FROM skills ORDER BY id DESC`
  return res.rows
}

export async function addSkill(fd: FormData) {
  await sql`
    INSERT INTO skills (name, category, level)
    VALUES (${fd.get('name')}, ${fd.get('category')}, ${fd.get('level')})
  `
}

export async function deleteSkill(id: string) {
  await sql`DELETE FROM skills WHERE id = ${id}`
}

export async function getProjects() {
  const res = await sql`SELECT * FROM projects ORDER BY id DESC`
  return res.rows
}

export async function addProject(fd: FormData) {
  const toolsRaw = fd.get('tools') as string
  const tools = toolsRaw ? toolsRaw.split(',').map((t) => t.trim()).filter(Boolean) : []
  await sql`
    INSERT INTO projects (title, description, tools, image_url, date, live_link, github_link)
    VALUES (${fd.get('title')}, ${fd.get('description')}, ${tools}, ${fd.get('image_url')}, ${fd.get('date')}, ${fd.get('live_link')}, ${fd.get('github_link')})
  `
}

export async function deleteProject(id: string) {
  await sql`DELETE FROM projects WHERE id = ${id}`
}
