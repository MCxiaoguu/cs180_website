import React from 'react'
import { Link } from 'react-router-dom'
import { projectsArray, getImageUrl } from '../data/projects'
import Navigation from '../components/Navigation'
import { Footer } from '../components/Footer'
import { PageTransition } from '../components/PageTransition'

interface HomeProps {
  isDark: boolean
  toggleTheme: () => void
}

const Home: React.FC<HomeProps> = ({ isDark, toggleTheme }) => {
  return (
    <>
      <header className="border-b border-gray-300 dark:border-gray-600 mx-4 md:mx-12 lg:mx-[100px] my-[10px]">
        <h1 className="text-4xl font-thin text-[#222] dark:text-[#e5e5e5] m-2.5">
          Hanyang Gu's CS180 Portfolio.
        </h1>
      </header>

      <Navigation isDark={isDark} toggleTheme={toggleTheme} />

      <main>
        <PageTransition>
          <div className="mx-4 md:mx-12 lg:mx-[100px] my-10">
      <ul className="homepage_img flex flex-col md:flex-row justify-between gap-[2px] md:gap-[50px] mb-8">
        {projectsArray.map((project) => (
          <li key={project.id} className="list-none text-center flex-1">
            <Link to={`/${project.id}`} className="block group">
              <div className="relative overflow-hidden">
                <img
                  src={getImageUrl(project.folder, project.image)}
                  alt={`${project.title} preview`}
                  className="h-[400px] md:h-[400px] w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  onError={(e) => {
                    // Fallback placeholder image if the actual image doesn't exist
                    const target = e.target as HTMLImageElement
                    target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjNmM2YzIi8+PHRleHQgeD0iNTAlIiB5PSI0NSUiIGZvbnQtZmFtaWx5PSJJbnRlciIgZm9udC1zaXplPSIxOCIgZmlsbD0iIzY2NiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPnt7UFJPSKBDVF9OQU1FfX08L3RleHQ+PHRleHQgeD0iNTAlIiB5PSI1NSUiIGZvbnQtZmFtaWx5PSJJbnRlciIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkNsaWNrIHRvIHZpZXcgZGV0YWlsczwvdGV4dD48L3N2Zz4='.replace('{{PROJECT_NAME}}', project.title)
                  }}
                />
                
                {/* Overlay with project info */}
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-70 transition-all duration-300 flex items-end">
                  <div className="w-full p-4 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <h3 className="font-medium text-lg mb-2">{project.title}</h3>
                    <p className="text-sm opacity-90 mb-3">{project.description}</p>
                    <div className="flex flex-wrap gap-1">
                      {project.technologies.slice(0, 3).map((tech: string) => (
                        <span
                          key={tech}
                          className="px-2 py-1 bg-white bg-opacity-20 text-xs rounded"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.technologies.length > 3 && (
                        <span className="px-2 py-1 bg-white bg-opacity-20 text-xs rounded">
                          +{project.technologies.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>

      {/* Description text - mimicking your homepage_img_description */}
      <div className="homepage_img_description my-[10px] font-thin text-[#222] dark:text-[#e5e5e5]">
        Welcome to my 
        <a 
        href="https://cal-cs180.github.io/fa25/" 
            target="_blank"
            rel="noopener noreferrer"
            className="underline text-[#222] dark:text-[#e5e5e5] mx-1"
        >
          Berkeley CS180 
        </a>
        portfolio. Here you can explore my course projects.
         {/* including 
        <Link to="/1" className="underline text-[#222] dark:text-[#e5e5e5] mx-1">web applications</Link>,
        <Link to="/2" className="underline text-[#222] dark:text-[#e5e5e5] mx-1">mobile apps</Link>, and
        <Link to="/3" className="underline text-[#222] dark:text-[#e5e5e5] mx-1">machine learning projects</Link>.*/}
        Each project showcases different topics and approaches to what I've learned to solve real-world problems.
      </div>
    </div>
        </PageTransition>
      </main>

      <Footer />
    </>
  )
}

export default Home
