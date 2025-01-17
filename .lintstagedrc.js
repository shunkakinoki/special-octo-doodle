module.exports = {
  "*": [
    "pnpm run license:cmd add",
    // "pnpm run cspell:fix"
  ],
  "*.{js,ts,cjs,mjs,d.cts,d.mts,jsx,tsx,json,jsonc,css,graphql}": [
    "pnpm run biome:cmd",
  ],
  "*.mdx": ["pnpm run textlint:cmd"],
  "*.rs": [() => "pnpm run clippy:cmd", () => "pnpm run cargo:fmt:cmd"],
  "*.{py,ipynb}": ["make ruff-fmt", "make ruff-lint"],
  "*.sol": [
    "forge fmt",
    "make contracts-bulloak",
    () => "make contracts-snapshot",
    "pnpm run solhint:cmd",
  ],
  "*.toml": ["pnpm run taplo:cmd"],
  "package.json": [
    "pnpm run sherif:cmd",
    "pnpm run npm-package-json:lint",
    "pnpm run sort-package-json:fix",
    "pnpm run biome:fix",
  ],
  "thunder-tests/**/*.json": ["./scripts/check_thunder_url.sh"],
  "project-words.txt": ["./scripts/sort_project_words.sh"],
};
