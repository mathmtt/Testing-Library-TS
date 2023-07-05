import { screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Testes do componente Pokedex', () => {
  test('Teste 01', () => {
    renderWithRouter(<App />, { route: '/' });
    const titleEncounteredPokemon = screen.getByRole('heading', { name: /Encountered Pokémon/i });
    expect(titleEncounteredPokemon).toBeInTheDocument();
  });

  test('Teste 02', async () => {
    const { user } = renderWithRouter(<App />, { route: '/' });
    const nextPokemonButton = screen.getByRole('button', { name: /Próximo Pokémon/i });
    expect(nextPokemonButton).toBeInTheDocument();
    await user.click(nextPokemonButton);
    const pokemonName = screen.getByText('Charmander');
    expect(pokemonName).toBeInTheDocument();
  });

  test('Teste 03', async () => {
    renderWithRouter(<App />, { route: '/' });
    const pokemonList = screen.getAllByTestId('pokemon-name');
    expect(pokemonList).toHaveLength(1);
  });

  test('Teste 04', async () => {
    renderWithRouter(<App />, { route: '/' });
    const typeButtons = screen.getAllByTestId('pokemon-type-button');
    const types = typeButtons.map((button) => button.innerHTML);
    const allTypes = ['Electric', 'Fire', 'Bug', 'Poison', 'Psychic', 'Normal', 'Dragon'];
    expect(types).toEqual(allTypes);
  });

  test('Teste 05', () => {
    renderWithRouter(<App />, { route: '/' });
    const allButton = screen.getByRole('button', { name: /ALL/i });
    expect(allButton).toBeInTheDocument();
  });
  test('Teste 06', async () => {
    const { user } = renderWithRouter(<App />, { route: '/' });
    const allButton = screen.getByRole('button', { name: /ALL/i });
    const nextPokemonButton = screen.getByRole('button', { name: /Próximo Pokémon/i });
    expect(allButton).toBeInTheDocument();
    await user.click(nextPokemonButton);
    const nextPokemon = screen.getByText('Charmander');
    expect(nextPokemon).toBeInTheDocument();
    await user.click(allButton);
    const firstPokemon = screen.getByText('Pikachu');
    expect(firstPokemon).toBeInTheDocument();
  });
});
test('Teste 07', async () => {
  const { user } = renderWithRouter(<App />, { route: '/' });
  const psychicButton = screen.getByRole('button', { name: /Psychic/i });
  await user.click(psychicButton);
  const pokemonType = screen.getByTestId('pokemon-type');
  expect(pokemonType.innerHTML).toBe('Psychic');
});
