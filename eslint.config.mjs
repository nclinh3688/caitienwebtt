import { dirname } from "path"
import { fileURLToPath } from "url"
import { FlatCompat } from "@eslint/eslintrc"

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: { name: "eslint:recommended" },
  allConfig: { name: "eslint:all" }
})

export default [
  ...compat.extends("next/core-web-vitals"),
  {
    rules: {
      // Add custom rules here
      "@next/next/no-img-element": "off",
      "react/no-unescaped-entities": "off"
    }
  }
]
