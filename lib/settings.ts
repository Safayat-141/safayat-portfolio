// Single source of truth for editable site settings.
export type SettingField = [key: string, label: string, kind: 'input' | 'textarea']

export const SETTING_FIELDS: SettingField[] = [
  ['name', 'Your Name', 'input'],
  ['tagline', 'Tagline', 'input'],
  ['about', 'About', 'textarea'],
  ['location', 'Location', 'input'],
  ['contact_email', 'Contact Email', 'input'],
  ['photo_url', 'Photo URL', 'input'],
  ['linkedin_url', 'LinkedIn URL', 'input'],
]

export const SETTING_KEYS = SETTING_FIELDS.map(([key]) => key)
