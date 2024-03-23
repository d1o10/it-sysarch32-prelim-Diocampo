import React, { useState, useEffect } from 'react';
import Pokemon from './Pokemon.jsx';

const Pokedex = () => {
  const [pokemonList, setPokemonList] = useState([]);
  const [language, setLanguage] = useState('english');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchPokemon(currentPage);
  }, [currentPage]);

  const fetchPokemon = (page) => {
    fetch(`https://us-central1-it-sysarch32.cloudfunctions.net/pagination?page=${page}`)
      .then(response => response.json())
      .then(data => {
        setPokemonList(data.data);
        setTotalPages(data.totalPages);
      })
      .catch(error => console.error('Error fetching Pokemon:', error));
  };

  const handleLanguageChange = (lang) => {
    setLanguage(lang);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="pokedex">
      <div className="pagination">
        <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>Back</button>
        {Array.from({ length: totalPages }, (_, i) => (
          <button key={i + 1} onClick={() => handlePageChange(i + 1)}>{i + 1}</button>
        ))}
        <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>Next</button>
      </div>
      <div className="filters">
        <button onClick={() => handleLanguageChange('english')}>English</button>
        <button onClick={() => handleLanguageChange('japanese')}>Japanese</button>
        <button onClick={() => handleLanguageChange('chinese')}>Chinese</button>
        <button onClick={() => handleLanguageChange('french')}>French</button>
      </div>
      {pokemonList.map(pokemon => (
        <Pokemon key={pokemon.id} data={pokemon} language={language} />
      ))}
      <div>Current Page: {currentPage}</div>
      <div>Total Pages: {totalPages}</div>
    </div>
  );
};

export default Pokedex;
