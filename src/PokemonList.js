import { useEffect, useState } from "react";
import {
  Card,
  HStack,
  CardHeader,
  CardFooter,
  Heading,
  Box,
  Badge,
  Button,
} from "@chakra-ui/react";
import { Image } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useSearchParams } from "react-router-dom";

const Pagination = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  // TODO: replace this
  const currentPage = parseInt(searchParams.get("page") || 1);

  const handleNextPage = () => {
   setSearchParams({page : parseInt(currentPage) + 1})
  }

  const handlePrevPage = () => {
    setSearchParams({page : parseInt(currentPage) - 1})
  }

  return (
    <HStack mt={"4"} mb={"4"}>
      <Button disabled={currentPage <= 1} onClick={() => handlePrevPage()}>{"< Prev"}</Button>
      <Button onClick={() => handleNextPage()}>{"Next >"}</Button>
      {/* TODO: render Prev and Next button */}
      {/* TODO: answer here */}
    </HStack>
  );
};

const PokemonList = ({ pokemons }) => {
  return (
    pokemons &&
    pokemons.length > 0 && (
      <Box role="pokemon-list">
        {pokemons.map((pokemon) => (
          <Link key={pokemon.id} to={`/pokemon/${pokemon.id}`}>
            <Card mt={"4"} mb={"4"}>
              <CardHeader>
                <Heading as="h3" size="md">
                  {pokemon.name}
                </Heading>
              </CardHeader>
                {/* TODO: render pokemon images & type here */}
              <HStack>
                <Image src={pokemon.sprites.front_default} alt="Front Default" />
                <Image src={pokemon.sprites.back_default} alt="Back Default" />
                <Image src={pokemon.sprites.front_shiny} alt="Front Shiny" />
                <Image src={pokemon.sprites.back_shiny} alt="Back Shiny" />
              </HStack>
              <CardFooter>
                {pokemon.types.map(type => {
                  return <Badge marginRight={"2"}>{type.type.name}</Badge>
                })}
              </CardFooter>
              {/* TODO: answer here */}
            </Card>
          </Link>
        ))}
      </Box>
    )
  );
};
const Home = () => {
  //get list
  const fetchPokemons = async (page) => {
    //get pokemon list with image
    const displayPerPage = 20;
    const offset = (page - 1) * 20;
    const url = `https://pokeapi.co/api/v2/pokemon?limit=${displayPerPage}&offset=${offset}`;

    const response = await fetch(url);
    const data = await response.json();
    const pokemonList = data.results.map(async (pokemon) => {
      const pokemonResponse = await fetch(pokemon.url);
      const pokemonData = await pokemonResponse.json();
      return pokemonData;
    });

    //set pokemonList to state
    setPokemons(await Promise.all(pokemonList));
  };

  const [pokemons, setPokemons] = useState([]);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const page = parseInt(searchParams.get("page") || 1);
    fetchPokemons(page);
  }, [searchParams]);

  return (
    <>
      <Heading as="h2" size="lg">
        Pokemon List
      </Heading>
      <Pagination />
      <PokemonList pokemons={pokemons} />
    </>
  );
};

export default Home;
