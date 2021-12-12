import { isLoggedIn, getAccessToken } from './auth';

const endpointUrl = 'http://localhost:9000/graphql';

export async function graphqlRequest(query, variables = {}) {
	const request = {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({
			query,
			variables,
		}),
	};
	if (isLoggedIn()) {
		request.headers['Authorization'] = `Bearer ${getAccessToken()}`;
	}

	const response = await fetch(endpointUrl, request);
	const responseBody = await response.json();
	if (responseBody.errors) {
		const message = responseBody.errors.map((err) => err.message).join('\n');
		throw new Error('GraphQL Error!\n' + message);
	}
	return responseBody.data;
}

export async function loadJob(id) {
	const query = `query JobQuery($id: ID!) {
    job(id: $id) {
      id
      title
      company {
        id
        name
      }
      description
    }
  }`;
	const { job } = await graphqlRequest(query, { id });
	return job;
}

export async function createJob(input) {
	const mutation = `
    mutation($input: CreateJobInput) {
      job: createJob(input:$input) {
        id
        title
        company {
          id
          name
        }
      }
    }
  `;

	const { job } = await graphqlRequest(mutation, { input });
	return job;
}

export async function loadCompany(id) {
	const query = `query CompanyQuery($id: ID!) {
    company(id: $id) {
      id
      name
      description
      jobs {
        id
        title
      }
    }
  }`;
	const { company } = await graphqlRequest(query, { id });
	return company;
}

export async function loadJobs() {
	const query = `{
        jobs {
          id
          title
          company {
            id
            name
          }
        }
      }`;
	const { jobs } = await await graphqlRequest(query);
	return jobs;
}
