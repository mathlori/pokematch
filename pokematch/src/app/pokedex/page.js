"use client";

import styles from "../page.module.css";
import { useState, useEffect } from "react";

export default function Pokedex() {
  const [favoritos, setFavoritos] = useState([]);

  useEffect(() => {
    async function carregarFavoritos() {
      const resposta = await fetch("/api/favoritos");
      const dados = await resposta.json();
      setFavoritos(dados);
    }

    carregarFavoritos();
  }, []);

  return (
    <section>
      {favoritos.length === 0 ? (
        <p>Nenhum Pokémon capturado ainda.</p>
      ) : (
        favoritos.map((favorito, index) => (
          <article key={favorito?.id ?? index} className={styles.card}>
            <img
              src={favorito?.sprites?.front_default}
              alt={favorito?.name || "Pokémon"}
            />
            <p>{favorito?.name}</p>
          </article>
        ))
      )}
    </section>
  );
}
