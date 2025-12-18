// Patch for legacy Jest types expecting NodeJS.Global in old monorepo CI environments

declare namespace NodeJS {
  // This empty interface restores "Global" expected by old Jest+@types/node combos
  interface Global {}
}

