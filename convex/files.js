import { query } from "./_generated/server";
import { v } from "convex/values";

/**
 * Returns the public URL for a given Convex storage ID.
 */
export const getUrl = query({
  args: {
    storageId: v.string(),
  },
  handler: async (ctx, args) => {
    try {
      return await ctx.storage.getUrl(args.storageId);
    } catch (error) {
      console.error("Error retrieving URL for storageId:", args.storageId, error);
      return null;
    }
  },
});
