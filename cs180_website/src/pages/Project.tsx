import React from 'react'
import { useParams, Link } from 'react-router-dom'
import { projectsData, getImageUrl } from '../data/projects'
import Navigation from '../components/Navigation'
import { Footer } from '../components/Footer'
import { PageTransition } from '../components/PageTransition'

interface ProjectProps {
  isDark: boolean
  toggleTheme: () => void
}

const Project: React.FC<ProjectProps> = ({ isDark, toggleTheme }) => {
  const { projectId } = useParams<{ projectId: string }>()
  const project = projectId ? projectsData[projectId as keyof typeof projectsData] : null

  if (!project) {
    return (
      <>
        {/* Custom Header for Project Pages */}
        <header className="border-b border-gray-300 dark:border-gray-600 mx-4 md:mx-12 lg:mx-[100px] my-[10px]">
          <div className="flex items-center gap-4 m-2.5">
            <Link
              to="/"
              className="text-[#666] dark:text-[#999] hover:text-[#222] dark:hover:text-[#e5e5e5] transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
              </svg>
            </Link>
            <h1 className="text-4xl font-thin text-[#222] dark:text-[#e5e5e5]">
              Project Not Found
            </h1>
          </div>
        </header>

        <Navigation isDark={isDark} toggleTheme={toggleTheme} />

        <main>
          <PageTransition>
            <div className="mx-4 md:mx-12 lg:mx-[100px] my-10">
              <div className="text-center">
                <h2 className="text-2xl font-medium text-[#222] dark:text-[#e5e5e5] mb-4">
                  Project Not Found
                </h2>
                <p className="text-[#666] dark:text-[#999] mb-6">
                  The project you're looking for doesn't exist.
                </p>
                <Link
                  to="/"
                  className="inline-block px-6 py-3 bg-[#222] dark:bg-[#e5e5e5] text-white dark:text-[#222] rounded-lg hover:bg-[#333] dark:hover:bg-[#d0d0d0] transition-colors"
                >
                  Back to Projects
                </Link>
              </div>
            </div>
          </PageTransition>
        </main>

        <Footer />
      </>
    )
  }

  return (
    <>
      {/* Custom Header for Project Pages */}
      <header className="border-b border-gray-300 dark:border-gray-600 mx-4 md:mx-12 lg:mx-[100px] my-[10px]">
        <div className="flex items-center gap-4 m-2.5">
          <Link
            to="/"
            className="text-[#666] dark:text-[#999] hover:text-[#222] dark:hover:text-[#e5e5e5] transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
            </svg>
          </Link>
          <h1 className="text-4xl font-thin text-[#222] dark:text-[#e5e5e5]">
            {project.title}
          </h1>
        </div>
      </header>

      <Navigation isDark={isDark} toggleTheme={toggleTheme} />

      <main>
        <PageTransition>
          <div className="mx-4 md:mx-12 lg:mx-[100px] my-10">
        <div className="mb-12">
          <p className="text-xl text-[#666] dark:text-[#999] mb-6">
            {project.description}
          </p>
      {/*   
          
        <div className="flex gap-4">
          <a
            href={project.demoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 bg-[#222] dark:bg-[#e5e5e5] text-white dark:text-[#222] rounded-lg hover:bg-[#333] dark:hover:bg-[#d0d0d0] transition-colors"
          >
            Live Demo
          </a>
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 border border-[#222] dark:border-[#e5e5e5] text-[#222] dark:text-[#e5e5e5] rounded-lg hover:bg-[#222] hover:text-white dark:hover:bg-[#e5e5e5] dark:hover:text-[#222] transition-colors"
          >
            View Code
          </a>
        </div> 
        
        */}
      </div>

      {/* Project Images */}
      <div className="mb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {project.images.map((image, index) => (
            <div key={index} className="aspect-video bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden">
                            <img
                src={getImageUrl(project.folder, image)}
                alt={`${project.title} - Image ${index + 1}`}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                onError={(e) => {
                  const target = e.target as HTMLImageElement
                  target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjIyNSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZGRkIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkltYWdlIE5vdCBGb3VuZDwvdGV4dD48L3N2Zz4='
                }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Project Details Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-12">
        {/* Description */}
        <div className="lg:col-span-2">
          <h2 className="text-2xl font-medium text-[#222] dark:text-[#e5e5e5] mb-4">
            About This Project
          </h2>
          <p className="text-[#666] dark:text-[#999] leading-relaxed whitespace-pre-line">
            {project.longDescription}
          </p>
        </div>

        {/* Sidebar */}
        <div className="space-y-8">
          {/* Technologies */}
          <div>
            <h3 className="text-lg font-medium text-[#222] dark:text-[#e5e5e5] mb-3">
              Technologies Used
            </h3>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-[#666] dark:text-[#999] text-sm rounded-md font-['Inter']"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Features */}
          <div>
            <h3 className="text-lg font-medium text-[#222] dark:text-[#e5e5e5] mb-3">
              Key Features
            </h3>
            <ul className="space-y-2">
              {project.features.map((feature, index) => (
                <li key={index} className="text-[#666] dark:text-[#999] text-sm flex items-start">
                  <span className="text-[#222] dark:text-[#e5e5e5] mr-2">•</span>
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

    </div>
        </PageTransition>
      </main>

      <Footer />
    </>
  )
}

export default Project
