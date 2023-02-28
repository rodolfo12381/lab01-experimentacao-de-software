const fetch = require('node-fetch');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;

const query = `
  query($queryString: String!, $cursor: String) {
    search(query: $queryString, type: REPOSITORY, first: 100, after: $cursor) {
      pageInfo {
        endCursor
        hasNextPage
      }
      nodes {
        ... on Repository {
          nameWithOwner
          url
        }
      }
    }
  }
`;

async function listaRepositorios(queryString) {
  const csvWriter = createCsvWriter({
    path: 'repositorios.csv',
    header: [
      { id: 'nameWithOwner', title: 'Nome do proprietário/repositório' },
      { id: 'url', title: 'URL do repositório' },
    ],
  });

  let hasNextPage = true;
  let endCursor = null;
  let repositorios = [];

  while (hasNextPage && repositorios.length < 1000) {
    const variables = { queryString, cursor: endCursor };
    const resposta = await fetch('https://api.github.com/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer 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`,
      },
      body: JSON.stringify({ query, variables }),
    });

    const data = await resposta.json();
    const { search } = data.data;
    repositorios.push(...search.nodes);
    hasNextPage = search.pageInfo.hasNextPage;
    endCursor = search.pageInfo.endCursor;
    console.log(repositorios)
    console.log(repositorios.length)
  }

  const repositorioInfo = repositorios.map((repo) => ({
    nameWithOwner: repo.nameWithOwner,
    url: repo.url,
    }));

  await csvWriter.writeRecords(repositorioInfo);

  return repositorios.slice(0, 1000);
}

listaRepositorios('stars:>10000 sort:stars-desc').then((repositorios) => {
  console.log(`${repositorios.length} repositórios encontrados.`);
});
