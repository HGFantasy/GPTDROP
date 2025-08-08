const fs = require('fs');
const core = require('@actions/core');
const github = require('@actions/github');
const semver = require('semver');

(async () => {
  try {
    const token = process.env.GITHUB_TOKEN || process.env.GH_TOKEN;
    if (!token) throw new Error("No GitHub token found in environment variables.");

    const octokit = github.getOctokit(token);
    const { owner, repo } = github.context.repo;

    // Get latest release to determine starting version
    let latestTag = 'v1.2.0';
    try {
      const latestRelease = await octokit.rest.repos.getLatestRelease({ owner, repo });
      latestTag = latestRelease.tag_name;
    } catch (e) {
      console.log("No existing releases found, starting from v1.2.0");
    }

    // Get changed files in the push
    const commitSha = github.context.sha;
    const commitData = await octokit.rest.repos.getCommit({ owner, repo, ref: commitSha });
    const changedFiles = commitData.data.files.map(f => f.filename);
    console.log("Changed files:", changedFiles);

    // File classification rules
    const finalFiles = [
      '00_Core_Macros.md',
      '01_Repair_Kit.md',
      'Suno_Songmaker_Pro_Tiny_Instructions_v1.5.md',
      'github_action_openapi.json'
    ];

    const contentFiles = [
      '02_Starters_and_Examples.md',
      '03_Examples_Library.md',
      '04_Lyric_Toolkit.md',
      '05_Test_Suite_Prompts.md',
      '06_Language_Packs_7.md',
      '07_Formats_Templates.md',
      '09_Genre_Mix_Targets.md',
      '11_Originality_Safety_and_Preferences.md'
    ];

    let isFinal = changedFiles.some(f => finalFiles.includes(f));
    let isContentOnly = changedFiles.every(f => contentFiles.includes(f) || finalFiles.includes(f) || f === 'CHANGELOG.md');

    // Version bump rules
    let newVersion;
    if (semver.valid(latestTag)) {
      newVersion = semver.inc(latestTag, 'patch');
    } else {
      newVersion = semver.inc(latestTag.replace(/^v/, ''), 'patch');
    }

    // Add beta suffix if content-only change
    if (!isFinal && isContentOnly) {
      newVersion += '-beta1';
    }

    const tagName = `v${newVersion}`;
    console.log(`Bumping version to ${tagName}`);

    // Update CHANGELOG.md
    const changelogEntry = `## ${new Date().toISOString().split('T')[0]}
- Files changed: ${changedFiles.join(', ')}
- Summary: Auto-generated changelog entry
`;

    fs.appendFileSync('CHANGELOG.md', changelogEntry);

    // Commit the changelog update
    await octokit.rest.repos.createOrUpdateFileContents({
      owner,
      repo,
      path: 'CHANGELOG.md',
      message: `${tagName} — auto-generated changelog`,
      content: Buffer.from(fs.readFileSync('CHANGELOG.md')).toString('base64'),
      sha: (await octokit.rest.repos.getContent({ owner, repo, path: 'CHANGELOG.md' })).data.sha,
      branch: 'main'
    });

    // Create a new tag
    await octokit.rest.git.createRef({
      owner,
      repo,
      ref: `refs/tags/${tagName}`,
      sha: commitSha
    });

    // Create a GitHub release
    await octokit.rest.repos.createRelease({
      owner,
      repo,
      tag_name: tagName,
      name: tagName,
      body: changelogEntry,
      prerelease: tagName.includes('-beta')
    });

    console.log(`Release ${tagName} created successfully.`);
  } catch (error) {
    core.setFailed(error.message);
  }
})();
