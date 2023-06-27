import { screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Testa o link Home na aplicação', () => {
  test('A aplicação contém um conjunto fixo de links de navegação.', () => {
    renderWithRouter(<App />);
    const home = screen.getByRole('link', { name: /home/i });
    const about = screen.getByRole('link', { name: /about/i });
    const favoritePokemon = screen.getByRole('link', {
      name: /Favorite Pokémon/i,
    });
    expect(home).toBeInTheDocument();
    expect(about).toBeInTheDocument();
    expect(favoritePokemon).toBeInTheDocument();
  });
});
