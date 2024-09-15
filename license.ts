import { request, gql } from 'graphql-request';

const GITHUB_API = 'https://api.github.com/graphql';
const TOKEN = 'YOUR_GITHUB_TOKEN';

export class license {
    private owner: string;
    private repoName: string;

    constructor(owner: string, repoName: string) {
        this.owner = owner;
        this.repoName = repoName;
    }

    async getLicenseType() : Promise<string> {
        // graphql query to get license
        const query = gql`
            query($owner: String!, $repoName: String!) {
                repository(owner: $owner, name: $repoName) {
                    licenseInfo {
                        name
                    }
                }
            }
        `;

        const variables = {
            owner: this.owner,
            repoName: this.repoName
        };

        try {
            const response = await request(GITHUB_API, query, variables, {
                Authorization: `Bearer ${TOKEN}`
            }) as { repository: { licenseInfo: { name: string } } };

            return response.repository.licenseInfo.name;
        } catch (error) {
            console.error('Error fetching license:', error);
            throw new Error('Failed to fetch license');
        }
    }

    async hasLGPLLicense() : Promise<number> {
        const licenseType = await this.getLicenseType();
        if(licenseType === 'LGPLv2.1') {
            return 1;
        }
        return 0;
    }
}