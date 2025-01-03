import { render, screen, waitFor } from '@redwoodjs/testing/web'

import ProjectCard from './ProjectCard'

describe('ProjectCard', () => {
  it('renders successfully', () => {
    const project = { id: 1 }
    expect(async () => {
      await waitFor(() => {
        render(<ProjectCard project={project} />)
      })
    }).not.toThrow()

    expect(screen.getByText('Test')).toBeInTheDocument()
  })
})
