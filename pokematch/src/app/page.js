'use client';

import styles from "./page.module.css";
import Link from "next/link";
import { useState, useEffect } from "react";
import Logo from "./components/logo";

export default function Home() {
  const [id, setId] = useState(1);
  const [pokemon, setPokemon] = useState(null);

  useEffect(() => {
    async function fetchPokemon() {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);

      if (!response.ok) {
        setPokemon(null);
        return;
      }

      const data = await response.json();
      setPokemon(data);
    }

    fetchPokemon();
  }, [id]);

  function nao_gostei() {
    setId((currentId) => currentId + 1);
  }

  async function gostei(pokemon) {
    if (!pokemon) return;

    const requisicao = await fetch('/api/favoritos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(pokemon),
    });

    const resposta = await requisicao.json();
    console.log(resposta);

    setId((currentId) => currentId + 1);
  }

  return (
    <main className={styles.page}>
      <Logo />
      <p className={styles.tagline}>Encontre seu parceiro de jornada</p>
      <img src={pokemon?.sprites?.front_default} alt={pokemon?.name ?? "Pokémon"} />
      <p className={styles.name}>{pokemon?.name ?? "Pokémon"}</p>

      <button onClick={() => gostei(pokemon)}>Gostei</button>
      <button onClick={nao_gostei}>Não gostei</button>
      <Link href="/pokedex">Minha Pokedex</Link>
    </main>
  );
}
