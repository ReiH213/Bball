import { EyeIcon } from "lucide-react";
import { defineField, defineType } from "sanity";
import { player } from "./player";

export const match = defineType({
  name: "match",
  title: "Match",
  type: "document",
  icon: EyeIcon,
  fields: [
    defineField({
      name: "date",
      type: "datetime",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "firstTeam",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "secondTeam",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "firstTeamPlayers",
      type: "array",
      of: [{ type: "reference", to: { type: "player" } }],
      validation: (Rule) =>
        Rule.min(1).error("First team must have at least one player."),
    }),
    defineField({
      name: "secondTeamPlayers",
      type: "array",
      of: [{ type: "reference", to: { type: "player" } }],
      validation: (Rule) =>
        Rule.min(1).error("First team must have at least one player."),
    }),
    defineField({
      name: "score",
      type: "object",
      fields: [
        {
          name: "firstTeamScore",
          title: "First Team Score",
          type: "number",
          validation: (Rule) => Rule.min(0).error("Score cannot be negative."),
        },
        {
          name: "secondTeamScore",
          title: "Second Team Score",
          type: "number",
          validation: (Rule) => Rule.min(0).error("Score cannot be negative."),
        },
      ],
    }),
    defineField({
      name: "winner",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: "date",
      subtitle: "winner",
    },
    prepare(selection) {
      const { title, subtitle } = selection;
      return {
        title: `Match on ${new Date(title).toLocaleDateString()}`,
        subtitle: `Winner: ${subtitle || "TBD"}`,
      };
    },
  },
});
