import { sql } from '@vercel/postgres'

const field = (fd: FormData, key: string) => (fd.get(key) as string | null) ?? null

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
    VALUES (${field(fd, 'institution')}, ${field(fd, 'degree')}, ${field(fd, 'cgpa')}, ${field(fd, 'expected_grad')}, ${field(fd, 'details')})
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
    VALUES (${field(fd, 'role_title')}, ${field(fd, 'organization')}, ${field(fd, 'start_date')}, ${field(fd, 'end_date')}, ${field(fd, 'description')})
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
    VALUES (${field(fd, 'name')}, ${field(fd, 'category')}, ${field(fd, 'level')})
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
  // @vercel/postgres can't bind a JS array directly, so send a Postgres array literal
  const toolsLiteral = '{' + tools.map((t) => '"' + t.replace(/(["\\])/g, '\\$1') + '"').join(',') + '}'
  await sql`
    INSERT INTO projects (title, description, tools, image_url, date, live_link, github_link)
    VALUES (${field(fd, 'title')}, ${field(fd, 'description')}, ${toolsLiteral}::text[], ${field(fd, 'image_url')}, ${field(fd, 'date')}, ${field(fd, 'live_link')}, ${field(fd, 'github_link')})
  `
}

export async function deleteProject(id: string) {
  await sql`DELETE FROM projects WHERE id = ${id}`
}
