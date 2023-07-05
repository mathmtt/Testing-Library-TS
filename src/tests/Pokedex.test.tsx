import { screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Teste o componente Pokedex.tsx', () => {
  test('Teste se a página contém um heading h2 com o texto Encountered Pokémon', () => {
    renderWithRouter(<App />);
    expect(screen.getByRole('heading', { name: /Encountered Pokémon/i })).toBeInTheDocument();
  });

  test('Os próximos Pokémon da lista devem ser mostrados, um a um, ao clicar sucessivamente no botão', () => {
    const arrAllPokemons = [
      { name: /pikachu/i },
      { name: /charmander/i },
      { name: /caterpie/i },
      { name: /ekans/i },
      { name: /alakazam/i },
      { name: /mew/i },
      { name: /rapidash/i },
      { name: /snorlax/i },
      { name: /dragonair/i },
    ];
    renderWithRouter(<App />);
    const nextPokemonButton = screen.getByRole('button', { name: /Próximo Pokémon/i });
    expect(nextPokemonButton).toBeInTheDocument();

    arrAllPokemons.forEach((pokemon) => {
      screen.getByText(pokemon.name); // Verifica se o nome do Pokémon está presente na tela antes de clicar no botão
      screen.getByRole('button', { name: /Próximo Pokémon/i }).click();
    });
  });

  test('Teste se é mostrado apenas um pokémon por vez', () => {
    renderWithRouter(<App />);
    expect(screen.getAllByTestId(/pokemon-name/i)).toHaveLength(1);
  });

  test('Após a seleção de um botão de tipo, a Pokédex deve circular somente pelos Pokémon daquele tipo', () => {
    renderWithRouter(<App />);
    expect(screen.getByRole('button', { name: /Próximo Pokémon/i })).toBeInTheDocument();

    const buttons = {
      all: screen.getByRole('button', { name: /all/i }),
      electric: screen.getByRole('button', { name: /electric/i }),
      fire: screen.getByRole('button', { name: /fire/i }),
      bug: screen.getByRole('button', { name: /bug/i }),
      poison: screen.getByRole('button', { name: /poison/i }),
      psychic: screen.getByRole('button', { name: /psychic/i }),
      normal: screen.getByRole('button', { name: /normal/i }),
      dragon: screen.getByRole('button', { name: /dragon/i }),
      nextPokemon: screen.getByRole('button', { name: /próximo pokémon/i }),
    };

    const typePokemonMap = {
      electric: 'Pikachu',
      fire: 'Charmander',
      bug: 'Caterpie',
      poison: 'Ekans',
      psychic: 'Alakazam',
      normal: 'Snorlax',
      dragon: 'Dragonair',
    };

    Object.entries(typePokemonMap).forEach(([type, pokemonName]) => {
      screen.getByRole('button', { name: type }).click();
      expect(screen.getByText(pokemonName)).toBeInTheDocument();
      expect(buttons.nextPokemon).toBeDisabled();
    });

    buttons.all.click();
    expect(buttons.nextPokemon).toBeEnabled();
  });
});
