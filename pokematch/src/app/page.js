'use client';

import styles from "./page.module.css";
import Logo from "./components/logo";
import { useState, useEffect } from "react";

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

  return (
    <main className={styles.page}>
      <Logo />
      <p className={styles.tagline}>Encontre seu parceiro de jornada</p>
      <img src={pokemon?.sprites?.front_default} alt={pokemon?.name ?? "Pokémon"} />
      <p className={styles.name}>{pokemon?.name ?? "Pokémon"}</p>
    </main>
  );
}
