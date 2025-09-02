// Shared project data for both Home and Project components
export interface ImageSet {
  name: string
  description: string
  images: string[]
  focalLengths: string[]
}

export interface ProjectData {
  id: string
  title: string
  description: string
  longDescription: string
  folder: string
  image: string
  images: string[]
  imageSets: ImageSet[]
  technologies: string[]
  demoUrl: string
  githubUrl: string
  features: string[]
}

// Helper function to get image URL that works in both dev and production
export const getImageUrl = (folder: string, filename: string): string => {
  // In Vite, assets in public folder are served from root
  return `/images/${folder}/${filename}`
}

export const projectsData: Record<string, ProjectData> = {
  '1': {
    id: '1',
    title: 'Project 0',
    description: 'Becoming Friends with Your Camera',
    longDescription: `This project explores the fundamentals of photography and camera mechanics. 
    We dive deep into concepts like field of view (FOV), perspective distortion, depth of field effects, 
    and camera calibration techniques. Through practical experiments with different focal lengths and 
    camera settings, we learn how to manipulate these parameters to achieve desired visual effects.`,
    folder: 'project1',
    image: '9mm.JPG',
    images: ['9mm.JPG', '24mm.JPG', '28mm.JPG', '50mm.JPG', '70mm.JPG', '135mm.JPG', '800mm.JPG'],
    imageSets: [
      {
        name: 'focalLength',
        description: 'The Wrong Way vs. The Right Way',
        images: ['9mm.JPG', '24mm.JPG', '28mm.JPG', '50mm.JPG', '70mm.JPG', '135mm.JPG', '800mm.JPG'],
        focalLengths: ['9mm', '24mm', '28mm', '50mm', '70mm', '135mm', '800mm']
      },
      {
        name: 'architecture',
        description: 'Architectural Perspective Compression',
        images: ['arch_14mm.jpeg', 'arch_24mm.jpeg', 'arch_48mm.jpeg', 'arch_77mm.jpeg'],
        focalLengths: ['14mm', '24mm', '48mm', '77mm']
      }
    ],
    technologies: ['FOV', 'Perspective', 'Depth of Field', 'Camera Calibration', '3D Reconstruction'],
    demoUrl: 'https://example.com',
    githubUrl: 'https://github.com/yourusername/project1',
    features: [
      'Focal length experimentation',
      'Perspective distortion analysis',
      'Dolly Zoom'
    ]
  }
}

// Export as array for Home component (easier to map over)
export const projectsArray = Object.values(projectsData)
