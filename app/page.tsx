import { getSettings, getEducation, getExperience, getSkills, getProjects } from '@/lib/db'
import Nav from '@/components/nav'
import Hero from '@/components/hero'
import Section from '@/components/section'
import SectionTitle from '@/components/section-title'
import EducationCard from '@/components/education-card'
import ExperienceCard from '@/components/experience-card'
import SkillBadge from '@/components/skill-badge'
import ProjectCard from '@/components/project-card'
import { Card } from '@/components/ui'

export const revalidate = 60

export default async function Home() {
  let settings: any = {}
  let education: any[] = []
  let experience: any[] = []
  let skills: any[] = []
  let projects: any[] = []

  try {
    settings = await getSettings()
    education = await getEducation()
    experience = await getExperience()
    skills = await getSkills()
    projects = await getProjects()
  } catch (err) {
    console.log('Database not ready yet.')
  }

  return (
    <main className="min-h-screen">
      <Nav />
      <Hero settings={settings} />

      <Section id="about">
        <SectionTitle title="About Me" />
        <p className="text-slate-600 leading-relaxed max-w-2xl mx-auto">{settings.about || 'I am a Mathematics undergraduate passionate about structured problem-solving and data-driven decisions.'}</p>
      </Section>

      <Section id="education">
        <SectionTitle title="Education" />
        <div className="space-y-4">
          {education.length > 0 ? (
            education.map((e: any) => <EducationCard key={e.id} item={e} />)
          ) : (
            <p className="text-slate-400 text-center py-8">No education entries yet.</p>
          )}
        </div>
      </Section>

      <Section id="experience">
        <SectionTitle title="Experience" />
        <div className="space-y-4">
          {experience.length > 0 ? (
            experience.map((e: any) => <ExperienceCard key={e.id} item={e} />)
          ) : (
            <p className="text-slate-400 text-center py-8">No experience entries yet.</p>
          )}
        </div>
      </Section>

      <Section id="skills" className="bg-white/50 border-y border-slate-200">
        <SectionTitle title="Skills" />
        <div className="flex flex-wrap gap-3 justify-center">
          {skills.length > 0 ? (
            skills.map((s: any) => <SkillBadge key={s.id} item={s} />)
          ) : (
            <span className="text-slate-400">No skills added yet.</span>
          )}
        </div>
      </Section>

      <Section id="projects">
        <SectionTitle title="Projects" />
        <div className="grid md:grid-cols-2 gap-6">
          {projects.length > 0 ? (
            projects.map((p: any) => <ProjectCard key={p.id} item={p} />)
          ) : (
            <p className="text-slate-400 text-center py-8 col-span-full">No projects added yet.</p>
          )}
        </div>
      </Section>

      <Section id="contact" className="text-center">
        <SectionTitle title="Contact" />
        <Card className="max-w-md mx-auto p-8">
          <p className="text-slate-600 mb-4">{settings.contact_email || 'you@example.com'}</p>
          <p className="text-slate-500 text-sm">{settings.location || 'Dhaka, Bangladesh'}</p>
        </Card>
      </Section>

      <footer className="py-10 text-center text-slate-400 text-sm border-t border-slate-200">
        &copy; {new Date().getFullYear()} Your Name. Built with Next.js & Vercel.
      </footer>
    </main>
  )
}
