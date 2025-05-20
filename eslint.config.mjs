//eslint.confirg.mjs

import js from "@eslint/js";
import globals from "globals";
import { defineConfig } from "eslint/config";



export default defineConfig([
  { files: ["**/*.{js,mjs,cjs}"], plugins: { js }, extends: ["js/recommended"] },
  { files: ["**/*.js"], languageOptions: { sourceType: "commonjs" } },
   {
    files: ["public/js/**/*.js"], // Only apply browser globals to your frontend JS
    languageOptions: {
      globals: {
        ...globals.browser,
        document: "readonly",
        window: "readonly",
        localStorage: "readonly",
      },
    },
  },
  { files: ["**/*.{js,mjs,cjs}"], languageOptions: { globals: globals.node } },
]);
