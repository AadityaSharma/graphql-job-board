const endpointUrl = 'http://localhost:9000/graphql';

export async function loadCompany(id) {
	const response = await fetch(endpointUrl, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({
			query: `query CompanyQuery($id: ID!) {
        company(id: $id) {
          id
          name
          description
        }
      }`,
			variables: { id },
		}),
	});
	const responseBody = await response.json();
	return responseBody.data.company;
}

export async function loadJob(id) {
	const response = await fetch(endpointUrl, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({
			query: `query JobQuery($id: ID!) {
        job(id: $id) {
          id
          title
          company {
            id
            name
          }
          description
        }
      }`,
			variables: { id },
		}),
	});
	const responseBody = await response.json();
	return responseBody.data.job;
}

export async function loadJobs() {
	const response = await fetch(endpointUrl, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({
			query: `{
        jobs {
          id
          title
          company {
            id
            name
          }
        }
      }`,
		}),
	});
	const responseBody = await response.json();
	return responseBody.data.jobs;
}