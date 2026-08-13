import globals from "globals";
import pluginJs from "@eslint/js";
import pluginReactConfig from "eslint-plugin-react/configs/recommended.js";


export default [
  {languageOptions: { globals: globals.browser }},
  pluginJs.configs.recommended,
  pluginReactConfig,
  // astro/scripts/** are plain Node CLI scripts (e.g. the Pagefind dev-mode
  // sync helper), not browser code — they need process/module Node globals,
  // not globals.browser.
  {
    files: ["astro/scripts/**/*.mjs"],
    languageOptions: { globals: globals.node },
  },
];