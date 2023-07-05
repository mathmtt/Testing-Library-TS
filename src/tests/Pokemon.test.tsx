import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

test('Se o arquivo-teste Pokemon.test.tsx contempla 100% dos casos de uso criados pelo Stryker:', async () => {
  const { user } = renderWithRouter(<App />);
  const pokemonImage = screen.getByRole('img', { name: /pikachu sprite/i });
  expect(pokemonImage).toBeInTheDocument();
  expect(pokemonImage)
    .toHaveAttribute('src', 'https://archives.bulbagarden.net/media/upload/b/b2/Spr_5b_025_m.png');
  expect(pokemonImage).toHaveAttribute('alt', 'Pikachu sprite');

  const type = screen.getByTestId('pokemon-type');
  expect(type).toBeInTheDocument();
  expect(type).toHaveTextContent(/electric/i);

  const pokemonName = screen.getByTestId('pokemon-name');
  expect(pokemonName).toBeInTheDocument();
  expect(pokemonName).toHaveTextContent(/pikachu/i);

  const weight = screen.getByTestId('pokemon-weight');
  expect(weight).toBeInTheDocument();
  expect(weight).toHaveTextContent(/average weight: 6.0 kg/i);

  const detailsLink = screen.getByRole('link', { name: /More details/i });
  expect(detailsLink).toBeInTheDocument();
  expect(detailsLink).toHaveAttribute('href', '/pokemon/25');

  await user.click(detailsLink);
  const isFavorited = screen.getByText(/pokémon favoritado?/i);
  await user.click(isFavorited);
  const favoriteImage = screen.getByRole('img', { name: /pikachu is marked as favorite/i });
  expect(favoriteImage).toBeInTheDocument();
  expect(favoriteImage).toHaveAttribute('src', '/star-icon.svg');
  expect(favoriteImage).toHaveAttribute('alt', 'Pikachu is marked as favorite');
});
