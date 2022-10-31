import { render, screen } from '@testing-library/svelte'
import "@testing-library/jest-dom/extend-expect"
import { vi, describe, expect, test } from 'vitest'
import * as data from './data'
import App from './App.svelte'


describe('App', () => {
  test('loads data', () => {
    render(App, { props: {} })

    vi.spyOn(data, 'load')
    expect(screen.getByText(/Erreur/)).toBeInTheDocument()
  });
});


