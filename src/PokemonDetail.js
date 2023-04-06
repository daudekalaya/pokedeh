import { useEffect, useState } from "react";
import { Badge, Tr, Td, HStack, Heading, Box } from "@chakra-ui/react";

import { Image } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { Table } from "@chakra-ui/react";
import { Tbody, Thead } from "@chakra-ui/react";

const Detail = ({ pokemon }) => {
  return (
    <Box marginBottom={"10"}>
      {pokemon && (
        <Box role="pokemon-detail">
          {/* TODO: display pokemon name here */}
          <Heading as="h2" size="xl" mb={"4"}>
            {pokemon.name}
          </Heading>
          {/* TODO: answer here */}
          {/* TODO: display pokemon type here */}
          <HStack>
            {pokemon.types.map((type) => {
              return <Badge marginRight={"2"}>{type.type.name}</Badge>;
            })}
          </HStack>
          {/* TODO: answer here */}
          <Table variant="striped">
            <Thead>
              <HStack>
                <Image src={pokemon.sprites.front_default} />
                <Image src={pokemon.sprites.back_default} />
                <Image src={pokemon.sprites.front_shiny} />
                <Image src={pokemon.sprites.back_shiny} />
              </HStack>
            </Thead>
            {/* TODO: render pokemon height, weight, base_experience, abilities, and stats here */}
            <Tbody>
              <Tr>
                <Td>Height</Td>
                <Td>{pokemon.height}</Td>
              </Tr>
              <Tr>
                <Td>Weight</Td>
                <Td>{pokemon.weight}</Td>
              </Tr>
              <Tr>
                <Td>Base Experience</Td>
                <Td>{pokemon.base_experience}</Td>
              </Tr>
              <Tr>
                <Td>Abilities</Td>
                {pokemon.abilities.map((abilitie) => {
                  return <Tr>{abilitie.ability.name}</Tr>;
                })}
              </Tr>
              <Tr>
                <Td>Stats</Td>
                {pokemon.stats.map((stat) => {
                  return (
                    <Tr>
                      <Td>{stat.stat.name}</Td>
                      <Td>:</Td>
                      <Td>{stat.base_stat}</Td>
                    </Tr>
                  );
                })}
              </Tr>
            </Tbody>
          </Table>
          {/* TODO: answer here */}
        </Box>
      )}
    </Box>
  );
};
const Page = () => {
  //TODO: read pokemonId from parameter
  const { pokemonId } = useParams(); //{ pokemonId: 100 }; // TODO: replace this
  const [pokemon, setPokemon] = useState(null);

  const fetchPokemon = async (id) => {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`);
    const data = await response.json();
    setPokemon(data);
  };

  useEffect(() => {
    // TODO: answer here
    fetchPokemon(pokemonId);
    //
  }, [pokemonId]);

  return <Detail pokemon={pokemon} />;
};

export default Page;
