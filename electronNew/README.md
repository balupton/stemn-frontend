## Development

### Install

First, clone the repo via git and install dependencies:

```bash
$ npm install
```

### Run

Run this two commands __simultaneously__ in different console tabs.

```bash
$ npm run start:electron  - This will start the electron build server
$ npm run start:renderer  - This will start the renderer build server
```

Then
```bash
$ npm run electron
```

### Release
Releasing depends on 3 repos: 2 public GitHub repos and this private repo. Releases are compile in the cloud by AppVeyor and TravisCI.

1. Bump the version in the `package.json` AND `app/package.json`
2. Build the app using `npm run build` - make sure it works using `npm run electron`
3. Create a new tag on [GitHub](https://github.com/Stemn/Stemn-Desktop/releases)
4. Run the `release.sh/bat`. This will build the dist, copy into the release repo and push it up to the CI servers.
5. Monitor CI status at [AppVeyor](https://ci.appveyor.com/project/MrBlenny/stemn-desktop) and [Travis](https://travis-ci.org/Stemn/Stemn-Desktop)
6. Releases will appear on [GitHub](https://github.com/Stemn/Stemn-Desktop/releases). Test these releases.
7. Publish the releases on GitHub.
8. Finally, run `update.sh/bat` in the [Stemn-Updates](https://github.com/Stemn/Stemn-Desktop) repo. This will bump the numbers in `updates.json`