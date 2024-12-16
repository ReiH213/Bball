import { type SchemaTypeDefinition } from "sanity";
import { player } from "./player";
import { match } from "./match";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [player, match],
};
