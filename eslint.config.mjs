import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
  // Portability guard: components built in the playground get transferred into
  // the rategame-web app (Next 14.2.4 / React 18). Block the React-19-only hooks
  // so they can't sneak in. (Lint can't catch the JSX-level 19-isms — ref-as-prop
  // and <Context> as provider — see the note in lib/playground/flows.tsx.)
  {
    files: [
      "components/playground/**/*.{ts,tsx}",
      "lib/playground/**/*.{ts,tsx}",
      "app/playground/**/*.{ts,tsx}",
    ],
    rules: {
      "no-restricted-imports": [
        "error",
        {
          paths: [
            {
              name: "react",
              importNames: ["use", "useActionState", "useOptimistic"],
              message:
                "React 19-only API — rategame-web runs React 18, so this won't transfer. Keep playground components React-18-safe.",
            },
            {
              name: "react-dom",
              importNames: ["useFormStatus", "useFormState"],
              message:
                "React 19 / react-dom 19-only API — rategame-web runs React 18. Keep playground components React-18-safe.",
            },
          ],
        },
      ],
    },
  },
]);

export default eslintConfig;
