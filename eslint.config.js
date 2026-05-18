import { defineConfig } from "eslint/config";
import eslint from "@eslint/js";
import globals from "globals";
import pluginVue from "eslint-plugin-vue";
import projectGlobals from "./eslintrc-globals.js";
import configPrettier from "eslint-config-prettier";
import pluginPrettier from "eslint-plugin-prettier";
import pluginTypeScript from "@typescript-eslint/eslint-plugin";
import * as parserVue from "vue-eslint-parser";
import * as parserTypeScript from "@typescript-eslint/parser";

export default defineConfig([
  eslint.configs.recommended,
  {
    ignores: [
      "**/.*",
      "**/node_modules/**",
      "**/dist/**",
      "source/.vitepress/cache/**",
      "source/.vitepress/.temp/**",
      "**/*.d.ts",
      "**/static/**",
    ],
  },
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.es6,
        ...globals.node,
        ...projectGlobals,
      },
    },
    plugins: {
      prettier: pluginPrettier,
    },
    rules: {
      ...configPrettier.rules,
      ...pluginPrettier.configs.recommended.rules,
      "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
      "no-unused-vars": [process.env.NODE_ENV === "production" ? "warn" : "warn", { vars: "all", args: "none" }],
      "no-undef": process.env.NODE_ENV === "production" ? "warn" : "warn",
      "no-console": "off",
      "accessor-pairs": "error",
      eqeqeq: ["error", "always", { null: "ignore" }],
      "no-class-assign": "error",
      "no-cond-assign": "error",
      "no-const-assign": "error",
      "no-dupe-keys": "error",
      "no-empty-pattern": "error",
      "no-extra-boolean-cast": "error",
      "no-func-assign": "error",
      "no-irregular-whitespace": "error",
      "no-label-var": "error",
      "no-labels": ["error", { allowLoop: false, allowSwitch: false }],
      "no-lone-blocks": "error",
      "no-multi-str": "error",
      "no-global-assign": "error",
      "no-new-native-nonconstructor": "error",
      "no-new-wrappers": "error",
      "no-obj-calls": "error",
      "no-redeclare": "error",
      "no-return-assign": ["error", "except-parens"],
      "no-self-assign": "error",
      "no-self-compare": "error",
      "no-sequences": "error",
      "func-call-spacing": "error",
      "no-undef-init": "error",
      "no-unmodified-loop-condition": "error",
      "no-unneeded-ternary": ["error", { defaultAssignment: false }],
      "no-unreachable": "error",
      "no-unreachable-loop": "error",
      "prefer-const": "error",
      "no-useless-escape": "off",
      // ESLint 10 新增规则，与 teek 既有代码风格不一致，关闭以保持与主题项目一致
      "no-useless-assignment": "off",
      "preserve-caught-error": "off",
    },
  },
  {
    files: ["**/*.vue"],
    languageOptions: {
      parser: parserVue,
      parserOptions: {
        parser: "@typescript-eslint/parser",
        ecmaVersion: "latest",
        ecmaFeatures: {
          jsx: true,
        },
        extraFileExtensions: [".vue"],
        sourceType: "module",
      },
    },
    plugins: {
      vue: pluginVue,
    },
    processor: pluginVue.processors[".vue"],
    rules: {
      ...pluginVue.configs.base.rules,
      ...pluginVue.configs["essential"].rules,
      ...pluginVue.configs["recommended"].rules,
      "vue/v-slot-style": "error",
      "vue/no-mutating-props": "off",
      "vue/custom-event-name-casing": "off",
      "vue/attributes-order": "off",
      "vue/one-component-per-file": "off",
      "vue/html-closing-bracket-newline": "off",
      "vue/max-attributes-per-line": "off",
      "vue/attribute-hyphenation": "off",
      "vue/require-default-prop": "off",
      "vue/multi-word-component-names": "off",
      "vue/valid-template-root": "off",
      "vue/singleline-html-element-content-newline": "off",
      "vue/multiline-html-element-content-newline": "off",
      "vue/no-v-html": "off",
    },
  },
  {
    files: ["**/*.?([cm])ts", "**/*.?([cm])tsx"],
    languageOptions: {
      parser: parserTypeScript,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        warnOnUnsupportedTypeScriptVersion: false,
      },
    },
    plugins: {
      "@typescript-eslint": pluginTypeScript,
    },
    rules: {
      ...pluginTypeScript.configs.strict.rules,
      "@typescript-eslint/ban-types": "off",
      "@typescript-eslint/no-redeclare": "error",
      "@typescript-eslint/ban-ts-comment": "off",
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/prefer-as-const": "warn",
      "@typescript-eslint/no-empty-function": "off",
      "@typescript-eslint/no-non-null-assertion": "off",
      "@typescript-eslint/no-unused-expressions": "off",
      "@typescript-eslint/no-unsafe-function-type": "off",
      "@typescript-eslint/no-import-type-side-effects": "error",
      "@typescript-eslint/explicit-module-boundary-types": "off",
      "@typescript-eslint/no-wrapper-object-types": "off",
      "@typescript-eslint/no-namespace": "off",
      "@typescript-eslint/consistent-type-imports": [
        "off",
        { disallowTypeAnnotations: false, fixStyle: "inline-type-imports" },
      ],
      "@typescript-eslint/prefer-literal-enum-member": ["error", { allowBitwiseExpressions: true }],
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
        },
      ],
      "@typescript-eslint/no-dynamic-delete": "off",
    },
  },
  {
    files: ["**/*.d.ts"],
    rules: {
      "import/no-duplicates": "off",
    },
  },
  {
    files: ["**/*.?([cm])js"],
    rules: {
      "@typescript-eslint/no-require-imports": "off",
      "@typescript-eslint/no-var-requires": "off",
    },
  },
]);
