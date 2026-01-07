declare module "./_generated/api.js" {
  export const api: {
    seed: {
      seedProperties: FunctionReference<"mutation", "public", {}, any>
      clearProperties: FunctionReference<"mutation", "public", {}, any>
      reseedDatabase: FunctionReference<"mutation", "public", {}, any>
    }
  }
}

// Declare the FunctionReference type
type FunctionReference<TYPE extends "mutation" | "query", VISIBILITY extends "public" | "internal", ARGS, RETURN> = {
  type: TYPE
  visibility: VISIBILITY
  args: ARGS
  return: RETURN
}

// ... rest of code here ...
