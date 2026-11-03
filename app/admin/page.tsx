import { getSettings, getEducation, getExperience, getSkills, getProjects } from '@/lib/db'
import {
  updateSetting,
  handleAddEducation, handleDeleteEducation,
  handleAddExperience, handleDeleteExperience,
  handleAddSkill, handleDeleteSkill,
  handleAddProject, handleDeleteProject,
} from '@/app/admin/actions'

export default async function AdminPage({ searchParams }: { searchParams: { tab?: string } }) {
  const tab = searchParams.tab || 'settings'
  const [settings, education, experience, skills, projects] = await Promise.all([
    getSettings().catch(() => ({} as any)),
    getEducation().catch(() => []),
    getExperience().catch(() => []),
    getSkills().catch(() => []),
    getProjects().catch(() => []),
  ])

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold text-slate-900">Admin Dashboard</h1>
      <p className="text-slate-500 text-sm">Update your portfolio content. Changes publish immediately.</p>

      {/* SETTINGS */}
      {tab === 'settings' && (
        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-4">Site Settings</h2>
          <form action={updateSetting} className="grid grid-cols-1 md:grid-cols-2 gap-4" method="POST">
            {([['tagline', 'Tagline'], ['about', 'About'], ['location', 'Location'],
              ['contact_email', 'Contact Email'], ['photo_url', 'Photo URL'], ['linkedin_url', 'LinkedIn URL']] as [string, string][]).map(([key, label]) => (
              <div key={key} className="flex flex-col">
                <label className="text-xs font-medium text-slate-500 mb-1">{label}</label>
                <input name="key" type="hidden" defaultValue={key} />
                <input name="value" defaultValue={settings[key] || ''} className="Input" />
              </div>
            ))}
            <button className="md:col-span-2 Button">Save Settings</button>
          </form>
        </Card>
      )}

      {/* EDUCATION */}
      {tab === 'education' && (
        <Card className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-semibold">Education</h2>
            <form action={handleAddEducation} className="grid grid-cols-1 md:grid-cols-4 gap-3" method="POST">
              <input name="institution" placeholder="Institution" className="Input" required />
              <input name="degree" placeholder="Degree" className="Input" required />
              <input name="cgpa" placeholder="CGPA" className="Input" />
              <input name="expected_grad" placeholder="Grad Year" className="Input" />
              <input name="details" placeholder="Details" className="Input" />
              <button className="md:col-span-2 Button">Add</button>
            </form>
          </div>
          <ul className="space-y-3">
            {education.length > 0 ? (
              education.map((e: any) => (
                <li key={e.id} className="flex items-center justify-between p-3 rounded-lg border border-slate-200 bg-slate-50">
                  <span className="text-sm text-slate-700">{e.institution} — {e.degree} (CGPA: {e.cgpa})</span>
                  <form action={handleDeleteEducation} method="POST" onSubmit="return confirm('Delete this education entry?')" style={{ display: 'inline' }}>
                    <input type="hidden" name="id" value={e.id} />
                    <button type="submit" className="text-xs text-red-500 hover:underline">Delete</button>
                  </form>
                </li>
              ))
            ) : (
              <p className="text-slate-400 text-center py-6">No education entries.</p>
            )}
          </ul>
        </Card>
      )}

      {/* EXPERIENCE */}
      {tab === 'experience' && (
        <Card className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-semibold">Experience</h2>
            <form action={handleAddExperience} className="space-y-3" method="POST">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <input name="role_title" placeholder="Role Title" className="Input" required />
                <input name="organization" placeholder="Organization" className="Input" required />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <input name="start_date" placeholder="Start Date" className="Input" required />
                <input name="end_date" placeholder="End Date" className="Input" />
              </div>
              <textarea name="description" rows="2" placeholder="What did you do?" className="Input" required />
              <button className="Button w-full">Add Experience</button>
            </form>
          </div>
          <ul className="space-y-3">
            {experience.length > 0 ? (
              experience.map((e: any) => (
                <li key={e.id} className="p-3 rounded-lg border border-slate-200 bg-white">
                  <div className="flex justify-between mb-1">
                    <h4 className="font-bold text-sm">{e.role_title}</h4>
                    <span className="text-xs text-slate-400">{e.start_date} — {e.end_date || 'Present'}</span>
                  </div>
                  <p className="text-sm text-slate-600 mb-1">{e.organization}</p>
                  <p className="text-xs text-slate-500">{e.description}</p>
                  <form action={handleDeleteExperience} method="POST" onSubmit="return confirm('Delete this experience entry?')" style={{ display: 'inline', marginTop: '4px' }}>
                    <input type="hidden" name="id" value={e.id} />
                    <button type="submit" className="text-xs text-red-500 hover:underline">Delete</button>
                  </form>
                </li>
              ))
            ) : (
              <p className="text-slate-400 text-center py-6">No experience entries.</p>
            )}
          </ul>
        </Card>
      )}

      {/* SKILLS */}
      {tab === 'skills' && (
        <Card className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-semibold">Skills</h2>
            <form action={handleAddSkill} className="grid grid-cols-1 md:grid-cols-3 gap-3" method="POST">
              <input name="name" placeholder="Skill Name" className="Input" required />
              <input name="category" placeholder="Category" className="Input" />
              <input name="level" placeholder="Level" className="Input" />
              <button className="md:col-span-2 Button">Add Skill</button>
            </form>
          </div>
          <ul className="space-y-3">
            {skills.length > 0 ? (
              skills.map((s: any) => (
                <li key={s.id} className="flex items-center justify-between p-3 rounded-lg border border-slate-200 bg-white">
                  <span className="text-sm text-slate-700">{s.name}</span>
                  <form action={handleDeleteSkill} method="POST" onSubmit="return confirm('Delete this skill?')" style={{ display: 'inline' }}>
                    <input type="hidden" name="id" value={s.id} />
                    <button type="submit" className="text-xs text-red-500 hover:underline">Delete</button>
                  </form>
                </li>
              ))
            ) : (
              <p className="text-slate-400 text-center py-6">No skills added.</p>
            )}
          </ul>
        </Card>
      )}

      {/* PROJECTS */}
      {tab === 'projects' && (
        <Card className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-semibold">Projects</h2>
            <form action={handleAddProject} className="space-y-4" method="POST">
              <input name="title" placeholder="Project Title" className="Input" required />
              <input name="image_url" placeholder="Image URL" className="Input" />
              <textarea name="description" rows="2" placeholder="Short description" className="Input" required />
              <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                <input name="tools" placeholder="Tools (comma separated)" className="Input" />
                <input name="date" placeholder="Date" className="Input" />
                <input name="live_link" placeholder="Live Link" className="Input" />
                <input name="github_link" placeholder="GitHub Link" className="Input" />
              </div>
              <button className="Button w-full">Add Project</button>
            </form>
          </div>
          <ul className="space-y-4">
            {projects.length > 0 ? (
              projects.map((p: any) => (
                <li key={p.id} className="p-4 rounded-lg border border-slate-200 bg-white">
                  <h4 className="font-bold text-sm">{p.title}</h4>
                  {p.description && <p className="text-xs text-slate-500 mb-2">{p.description}</p>}
                  {(p.tools || []).length > 0 && (
                    <div className="flex flex-wrap gap-1 mb-3">
                      {(p.tools || []).map((t: string) => (
                        <span key={t} className="text-[10px] bg-blue-50 text-blue-700 px-2 py-0.5 rounded border border-blue-100">{t}</span>
                      ))}
                    </div>
                  )}
                  <form action={handleDeleteProject} method="POST" onSubmit="return confirm('Delete this project?')" style={{ display: 'inline' }}>
                    <input type="hidden" name="id" value={p.id} />
                    <button type="submit" className="text-xs text-red-500 hover:underline">Delete</button>
                  </form>
                </li>
              ))
            ) : (
              <p className="text-slate-400 text-center py-6">No projects added.</p>
            )}
          </ul>
        </Card>
      )}
    </div>
  )
}

import { Card } from '@/components/ui'
