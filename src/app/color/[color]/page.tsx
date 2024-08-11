import ResultsPage from '@/pages/color/results';

export async function generateStaticParams() {
  const allowedColors = [];
  const colorsNames = ['black', 'blue', 'brown', 'gray', 'green', 'pink', 'purple', 'red', 'white', 'yellow'];
  for (let i = 1; i <= 10; i += 1) {
    allowedColors.push(
      {
        color: i,
      },
      {
        color: colorsNames[i - 1],
      }
    );
  }
  return [allowedColors];
}

async function getPost(params: { color: string }) {
  try {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon-color/${params.color}`);
    const post = await res.json();
    return {
      results: post,
      error: false,
      lastSearch: params.color,
    };
  } catch (err) {
    return {
      results: {},
      error: true,
      lastSearch: params.color,
    };
  }
}

export default async function Post({ params }: { params: { color: string } }) {
  const post = await getPost(params);
  return <ResultsPage data={post.results} error={post.error} lastSearch={post.lastSearch} />;
}
