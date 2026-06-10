import { FunctionReference } from "convex/server";

export declare const api: {
  files: {
    getUrl: FunctionReference<"query", "public", { storageId: string }, string | null>;
  };
};
