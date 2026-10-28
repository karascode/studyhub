import type { Subject } from '../types'

export const subjects: Subject[] = [
  {
    id: 'physics',
    code: '0625',
    title: 'IGCSE Physics',
    short: 'Physics',
    color: '#2563eb',
    blurb: 'Cambridge IGCSE Physics (0625) — motion, forces, energy, waves, electricity and more.',
    topics: [
      { id: 'motion-forces-energy', title: 'Motion, forces and energy', blurb: 'Speed, acceleration, density, forces, energy, work and power.' },
      { id: 'thermal', title: 'Thermal physics', blurb: 'States of matter, thermal energy transfer.' },
      { id: 'waves', title: 'Waves', blurb: 'Wave properties, light, sound.' },
      { id: 'electricity', title: 'Electricity and magnetism', blurb: 'Circuits, electromagnetism.' },
      { id: 'nuclear', title: 'Nuclear physics', blurb: 'Atoms, radioactivity.' },
      { id: 'space', title: 'Space physics', blurb: 'The Earth, solar system, stars and the universe.' },
    ],
  },
  {
    id: 'maths',
    code: '0607',
    title: 'International Mathematics',
    short: 'Maths',
    color: '#0f766e',
    blurb: 'Cambridge IGCSE International Mathematics (0607) — core and extended, graphic calculator skills.',
    topics: [
      { id: 'number', title: 'Number', blurb: 'Fractions, percentages, ratio, powers and standard form.' },
      { id: 'algebra', title: 'Algebra and graphs', blurb: 'Equations, quadratics, sequences, functions and graphs.' },
      { id: 'coordinate', title: 'Coordinate geometry', blurb: 'Gradients, lines and midpoints.' },
      { id: 'geometry', title: 'Geometry', blurb: 'Angles, polygons, circle theorems, similarity.' },
      { id: 'mensuration', title: 'Mensuration', blurb: 'Perimeter, area and volume.' },
      { id: 'trigonometry', title: 'Trigonometry', blurb: 'Right-angled triangles, sine and cosine rules.' },
      { id: 'transformations', title: 'Transformations and vectors', blurb: 'Reflection, rotation, translation, enlargement, vectors.' },
      { id: 'probability', title: 'Probability', blurb: 'Single and combined events.' },
      { id: 'statistics', title: 'Statistics', blurb: 'Averages, charts and cumulative frequency.' },
    ],
  },
]

export const subjectById = (id: string) => subjects.find((s) => s.id === id)
