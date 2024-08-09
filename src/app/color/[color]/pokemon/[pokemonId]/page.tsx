import PokemonPage from '@/pages/color/pokemon/card';

export async function generateStaticParams() {
  const allowedColors = [];
  for (let i = 1; i <= 1025; i += 1) {
    allowedColors.push({
      pokemonId: i,
    });
  }
  return [allowedColors];
}

async function getPost(params: { color: string; pokemonId: string }) {
  try {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${params.pokemonId}`);
    const post = await res.json();
    return {
      results: post,
      error: false,
    };
  } catch (err) {
    return {
      results: false,
      error: true,
    };
  }
}

export default async function Post({ params }: { params: { color: string; pokemonId: string } }) {
  const oldUrl = `/color/${params.color}`;
  const post = await getPost(params);
  return <PokemonPage data={post.results} error={post.error} oldUrl={oldUrl} />;
}
