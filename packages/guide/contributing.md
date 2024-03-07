# CONTRIBUTING

Thanks for being interested in contributing to this project!

## Dev

### Evnrioment prepare

Clone this repo to you machine and install dependencies

```bash
pnpm i
```

Actullay, You just need unit test to verify the correctness of the features you have developed. But When writing documents, you may need to start vitepress

```bash
pnpm docs:dev
```

## Exists function

You can choose to enhance existing features, but try not to introduce destructive changes as much as possible

## New function

When adding new function you should follow some notes.

- Before you start working, it's better to open an issue to discuss first.
- If you are not very sure which module the feature you are writing belongs to, it is best to start a new issue or discussion
- Do not modify `packages/index.ts` Because its auto generate.
- If you want create a new module, it is best to start a new issue or discussion, and follow the [Fold Sturct](#fold-Struct)

## Fold Struct

```
packages
  _utils
  .vitepress
  type            // Definition of type
    src
      [name].type.ts
  [...module]
    __tests__     // unit test file
    [...fnNames]
      index.ts    // function implments
      index.md    // function document
    package.json
    index.ts      // module entry (auto-generate)
```

**Thank you again for being interested in this project!**