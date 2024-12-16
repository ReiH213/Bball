import { UserIcon } from "lucide-react";
import { defineField, defineType } from "sanity";

export const player = defineType({
  name: "player",
  title: "Player",
  type: "document",
  icon: UserIcon,
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
    }),
    defineField({
      name: "matchDays",
      title: "Match Days",
      type: "array",
      of: [
        {
          type: "object",
          title: "Match Day",
          validation: (Rule) => Rule.required(),
          fields: [
            {
              name: "date",
              title: "Date",
              type: "string",
              validation: (Rule) => Rule.required(),
            },
            {
              name: "fieldGoals",
              title: "Field Goals",
              type: "object",
              fields: [
                {
                  name: "points_2",
                  title: "2-Point Field Goals",
                  type: "array",
                  of: [
                    {
                      type: "object",
                      fields: [
                        { name: "value", title: "Value", type: "number" },
                        {
                          name: "dot",
                          title: "Dot",
                          type: "object",
                          fields: [
                            {
                              name: "x",
                              title: "X Coordinate",
                              type: "number",
                            },
                            {
                              name: "y",
                              title: "Y Coordinate",
                              type: "number",
                            },
                            { name: "made", title: "Made", type: "boolean" },
                          ],
                        },
                      ],
                    },
                  ],
                },
                {
                  name: "points_3",
                  title: "3-Point Field Goals",
                  type: "array",
                  of: [
                    {
                      type: "object",
                      fields: [
                        { name: "value", title: "Value", type: "number" },
                        {
                          name: "dot",
                          title: "Dot",
                          type: "object",
                          fields: [
                            {
                              name: "x",
                              title: "X Coordinate",
                              type: "number",
                            },
                            {
                              name: "y",
                              title: "Y Coordinate",
                              type: "number",
                            },
                            { name: "made", title: "Made", type: "boolean" },
                          ],
                        },
                      ],
                    },
                  ],
                },
                {
                  name: "points_1",
                  title: "1-Point Field Goals",
                  type: "array",
                  of: [
                    {
                      type: "object",
                      fields: [
                        { name: "value", title: "Value", type: "number" },
                        {
                          name: "dot",
                          title: "Dot",
                          type: "object",
                          fields: [
                            {
                              name: "x",
                              title: "X Coordinate",
                              type: "number",
                            },
                            {
                              name: "y",
                              title: "Y Coordinate",
                              type: "number",
                            },
                            { name: "made", title: "Made", type: "boolean" },
                          ],
                        },
                      ],
                    },
                  ],
                },
              ],
            },
            {
              name: "fouls",
              title: "Fouls",
              type: "array",
              of: [
                {
                  type: "object",
                  fields: [
                    { name: "value", title: "Foul Count", type: "number" },
                    {
                      name: "dot",
                      title: "Dot",
                      type: "object",
                      fields: [
                        { name: "x", title: "X Coordinate", type: "number" },
                        { name: "y", title: "Y Coordinate", type: "number" },
                        { name: "made", title: "Made", type: "boolean" },
                      ],
                    },
                  ],
                },
              ],
            },
            {
              name: "oRebounds",
              title: "Offensive Rebounds",
              type: "array",
              of: [
                {
                  type: "object",
                  fields: [
                    { name: "value", title: "Rebound Count", type: "number" },
                    {
                      name: "dot",
                      title: "Dot",
                      type: "object",
                      fields: [
                        { name: "x", title: "X Coordinate", type: "number" },
                        { name: "y", title: "Y Coordinate", type: "number" },
                        { name: "made", title: "Made", type: "boolean" },
                      ],
                    },
                  ],
                },
              ],
            },
            {
              name: "dRebounds",
              title: "Defensive Rebounds",
              type: "array",
              of: [
                {
                  type: "object",
                  fields: [
                    { name: "value", title: "Rebound Count", type: "number" },
                    {
                      name: "dot",
                      title: "Dot",
                      type: "object",
                      fields: [
                        { name: "x", title: "X Coordinate", type: "number" },
                        { name: "y", title: "Y Coordinate", type: "number" },
                        { name: "made", title: "Made", type: "boolean" },
                      ],
                    },
                  ],
                },
              ],
            },
            {
              name: "steals",
              title: "Steals",
              type: "array",
              of: [
                {
                  type: "object",
                  fields: [
                    { name: "value", title: "Steal Count", type: "number" },
                    {
                      name: "dot",
                      title: "Dot",
                      type: "object",
                      fields: [
                        { name: "x", title: "X Coordinate", type: "number" },
                        { name: "y", title: "Y Coordinate", type: "number" },
                      ],
                    },
                  ],
                },
              ],
            },
            {
              name: "assists",
              title: "Assists",
              type: "array",
              of: [
                {
                  type: "object",
                  fields: [
                    { name: "value", title: "Assist Count", type: "number" },
                    {
                      name: "dot",
                      title: "Dot",
                      type: "object",
                      fields: [
                        { name: "x", title: "X Coordinate", type: "number" },
                        { name: "y", title: "Y Coordinate", type: "number" },
                      ],
                    },
                  ],
                },
              ],
            },
            {
              name: "blocks",
              title: "Blocks",
              type: "array",
              of: [
                {
                  type: "object",
                  fields: [
                    { name: "value", title: "Block Count", type: "number" },
                    {
                      name: "dot",
                      title: "Dot",
                      type: "object",
                      fields: [
                        { name: "x", title: "X Coordinate", type: "number" },
                        { name: "y", title: "Y Coordinate", type: "number" },
                      ],
                    },
                  ],
                },
              ],
            },
            {
              name: "missedShots",
              title: "Missed Shots",
              type: "array",
              of: [
                {
                  type: "object",
                  fields: [
                    {
                      name: "value",
                      title: "Missed Shot Count",
                      type: "number",
                    },
                    {
                      name: "dot",
                      title: "Dot",
                      type: "object",
                      fields: [
                        { name: "x", title: "X Coordinate", type: "number" },
                        { name: "y", title: "Y Coordinate", type: "number" },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: "name",
    },
  },
});
