import { screen, fireEvent } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Teste do componente <FavoritePokemon.tsx />', () => {
  it('Ao favoritar a partir da página de detalhes, é exibida na tela a mensagem "No favorite pokemon found" caso a pessoa não tenha Pokémon favorito.', async () => {
    renderWithRouter(<App />, { route: '/favorites' });
    const notFavorite = screen.getByText(/no favorite pokémon found/i);
    expect(notFavorite).toBeInTheDocument();
    const homeLink = screen.getByRole('link', { name: /home/i });
    fireEvent.click(homeLink);
    const detailsLink = screen.getByRole('link', { name: /more details/i });
    expect(detailsLink).toBeInTheDocument();
    fireEvent.click(detailsLink);

    const favoriteCheckBox = screen.getByRole('checkbox', { name: /pokémon favoritado\?/i });
    expect(favoriteCheckBox).toBeInTheDocument();
    fireEvent.click(favoriteCheckBox);

    const favoriteLink = screen.getByRole('link', { name: /favorite pokémon/i });
    fireEvent.click(favoriteLink);
    const favoriteHeading = screen.getByRole('heading', { name: /favorite pokémon/i });
    const pokemonWeight = screen.getByText(/average weight: 6\.0 kg/i);
    const pokemonName = screen.getByText(/pikachu/i);
    const pokemonImage = screen.getByRole('img', { name: /pikachu sprite/i });
    const pokemonType = screen.getByText(/electric/i);

    expect(notFavorite).not.toBeInTheDocument();
    expect(favoriteHeading).toBeInTheDocument();
    expect(pokemonWeight).toBeInTheDocument();
    expect(pokemonName).toBeInTheDocument();
    expect(pokemonImage).toBeInTheDocument();
    expect(pokemonType).toBeInTheDocument();
  });
});
