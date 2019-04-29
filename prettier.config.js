module.exports = {
  printWidth: 80,
  tabWidth: 2,
  useTabs: false,
  semi: false,
  singleQuote: false,
  jsxSingleQuote: false,
  trailingComma: "none",
  bracketSpacing: true,
  jsxBracketSameLine: false,
  arrowParens: "avoid",
  requirePragma: false,
  insertPragma: false,
  rangeEnd: null,
  rangeStart: 0,
  proseWrap: "preserve",
  htmlWhitespaceSensitivity: "css",
  endOfLine: "auto",
  overrides: [
    {
      files: ".prettierrc",
      options: {
        parser: "json"
      }
    }
  ]
}
