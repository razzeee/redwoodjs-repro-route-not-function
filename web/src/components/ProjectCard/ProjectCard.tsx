import { Link, routes } from '@redwoodjs/router'

const ProjectCard = ({ project }: { project: { id: number } }) => {
  return <Link to={routes.project({ id: project.id })}>Test</Link>
}

export default ProjectCard
