import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/svelte'
import { NAME, ROOM } from './data';
import List from "./List.svelte"

describe('List', () => {
  const item = {
    [NAME]: 'truite',
    'debured': 'truite',
    [ROOM]: 'jaune'
  }

  test('display list', () => {
    render(List, { props: { items: [item] } })

    expect(screen.getByText(item[NAME])).toBeInTheDocument()
  });
});


