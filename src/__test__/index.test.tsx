// src/__tests__/home.test.tsx

import { expect, test } from 'vitest'
import { render, screen } from '@testing-library/react'
import Home from '../pages/index' // Adjusted import path

test('Home page renders correctly', () => {
  render(<Home />)

  const heading = screen.getByText('Corgi Gallery')
  expect(heading).toBeInTheDocument()

  const loginButton = screen.getByRole('button', { name: 'Login' })
  expect(loginButton).toBeInTheDocument()

  const registerButton = screen.getByRole('button', { name: 'Register' })
  expect(registerButton).toBeInTheDocument()

  const galleryButton = screen.getByRole('button', { name: 'Gallery' })
  expect(galleryButton).toBeInTheDocument()

  const profileButton = screen.getByRole('button', { name: 'Profile' })
  expect(profileButton).toBeInTheDocument()

  const heroImage = screen.getByAltText('Hero Image')
  expect(heroImage).toBeInTheDocument()
})