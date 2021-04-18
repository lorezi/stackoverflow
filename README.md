# TypeScript Boilerplate for 2021

[![Build and test status](https://github.com/metachris/typescript-boilerplate/workflows/Lint%20and%20test/badge.svg)](https://github.com/metachris/micropython-ctl/actions?query=workflow%3A%22Build+and+test%22)

TypeScript project boilerplate with modern tooling, for Node.js and browser. Get started quickly and right-footed 🚀

* [TypeScript 4](https://www.typescriptlang.org/)
* Optionally [esbuild](https://esbuild.github.io/) - to bundle for browsers and Node.js
* Linting with [typescript-eslint](https://github.com/typescript-eslint/typescript-eslint) ([tslint](https://palantir.github.io/tslint/) is deprecated)
* Testing with [Jest](https://jestjs.io/docs/getting-started) (and [ts-jest](https://www.npmjs.com/package/ts-jest))
* Publishing to npm
* Continuous integration ([GitHub Actions](https://docs.github.com/en/actions) / [GitLab CI](https://docs.gitlab.com/ee/ci/))
* Automatic API documentation with [TypeDoc](https://typedoc.org/guides/doccomments/)

See also the introduction blog post: **[Starting a TypeScript Project in 2021](https://www.metachris.com/2021/03/bootstrapping-a-typescript-node.js-project/)**.


## Getting Started

```bash
# Clone the repository (you can also click "Use this template")
git clone https://github.com/metachris/typescript-boilerplate.git

# Edit `package.json` and `tsconfig.json` to your liking
...

# Install dependencies
yarn install

# Now you can run various yarn commands:
yarn cli
yarn lint
yarn test
yarn build-all
yarn ts-node <filename>
yarn esbuild-browser
...
```

* Take a look at all the scripts in [`package.json`](https://github.com/metachris/typescript-boilerplate/blob/master/package.json)
* For publishing to npm, use `yarn publish` (or `npm publish`)

## esbuild

[esbuild](https://esbuild.github.io/) is an extremely fast bundler that supports a [large part of the TypeScript syntax](https://esbuild.github.io/content-types/#typescript). This project uses it to bundle for browsers (and Node.js if you want).

```bash
# Build the cli for node
yarn esbuild-node:dev
yarn esbuild-node:watch

# Build for browsers
yarn esbuild-browser:dev
yarn esbuild-browser:watch
```

You can build everything with `yarn build-all`. Read more about the esbuild setup [here](https://www.metachris.com/2021/04/starting-a-typescript-project-in-2021/#esbuild).

This `package.json` includes `scripts` for various esbuild commands: [see here](https://github.com/metachris/typescript-boilerplate/blob/master/package.json#L23)

## Documentation, published to GitHub or GitLab pages

You can auto-generate API documentation from the TyoeScript source files using [typedoc](https://typedoc.org/guides/doccomments/). The generated documentation can be published to GitHub / GitLab pages through the CI:

* Install [typedoc](https://typedoc.org/guides/doccomments/): `yarn add -D typedoc`
* Add `docs` script to `package.json`: `"docs": "typedoc --entryPoints src/main.ts"`
* You can now generate the documentation with `yarn docs`. The resulting HTML is saved in `docs/`.
* Publish to pages through CI:
  * [GitHub pages](https://pages.github.com/): uncomment content of `.github/workflows/deploy-gh-pages.yml` and enable pages in GitHub repo settings
  * [GitLab pages](https://docs.gitlab.com/ee/user/project/pages/): uncomment deploy task in `.gitlab-ci.yml`

For example the documentation for this project: https://metachris.github.io/typescript-boilerplate/

## References

* **[Blog post: Starting a TypeScript Project in 2021](https://www.metachris.com/2021/03/bootstrapping-a-typescript-node.js-project/)**
* [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)
* [tsconfig docs](https://www.typescriptlang.org/tsconfig)
* [esbuild docs](https://esbuild.github.io/)
* [typescript-eslint docs](https://github.com/typescript-eslint/typescript-eslint/blob/master/docs/getting-started/linting/README.md)
* [Jest docs](https://jestjs.io/docs/getting-started)
* [GitHub Actions](https://docs.github.com/en/actions), [GitLab CI](https://docs.gitlab.com/ee/ci/)


## Feedback

Reach out with feedback and ideas:

* [twitter.com/metachris](https://twitter.com/metachris)
* [Create a new issue](https://github.com/metachris/typescript-boilerplate/issues)
