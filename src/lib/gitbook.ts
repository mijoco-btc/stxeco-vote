export async function readGithubPage(page: string): Promise<any> {
	const REPO_OWNER = 'BigMarketDao';
	const REPO_NAME = 'bigmarket-dao';
	const path = `https://raw.githubusercontent.com/${REPO_OWNER}/${REPO_NAME}/refs/heads/main/docs/${page}`;
	const response = await fetch(path);
	if (response.status === 404) return [];
	const res = await response.text();
	return res;
}
// https://raw.githubusercontent.com/BigMarketDao/bigmarket-dao/refs/heads/main/docs/getting-started/publish-your-docs.md
export async function readGitbookPage(): Promise<any> {
	const GITBOOK_API_KEY = ''; // Store this securely
	const GITBOOK_SPACE_ID = 'i6l1fyv4OTVrOHVVOC9n'; // Find in GitBook API settings
	const path = `https://api.gitbook.com/v1/spaces/${GITBOOK_SPACE_ID}/content`;
	const response = await fetch(path, {
		headers: {
			Authorization: `Bearer ${GITBOOK_API_KEY}`,
			'Content-Type': 'application/json'
		}
	});
	if (response.status === 404) return [];
	const data = await response.json();
	return data;
}
