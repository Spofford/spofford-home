const fakeData = [
  {"sys":
    {"type":"Array"},
    "total":6,
    "skip":0,
    "limit":1,
    "items":[{
      "sys":
        {"space":
          {"sys":
            {"type":
              "Link",
                "linkType":
                  "Space",
                    "id":
                      "cahjy08ew1qz"
            }
          },
          "id":"wKhyV2HRBeSgK4UcOoiEi",
          "type":"Entry",
          "createdAt":"2018-07-25T20:06:07.691Z",
          "updatedAt":"2018-08-17T14:00:13.354Z",
          "environment":{
            "sys":{
              "id":"master",
              "type":"Link",
              "linkType":"Environment"
            }
          },
          "revision":2,
          "contentType":
            {"sys":
              {
                "type":"Link",
                "linkType":"ContentType",
                "id":"page"
              }
            },
            "locale":"en-US"
        },
        "fields":
          {
            "head":"Radically Rewriting the Book on Home Furnishings",
            "subhead":"We’re going to change damn near everything about the way we furnish our living spaces. ",
            "bodyText":"We’re building a connection between those who need foundational furniture and those that design it. \n\nWe’re growing teams of interconnected regional networks hell-bent on transforming manufacturing with circular strategies. \n\nWe’re tapping into the talented designers committed to regional materials and solutions that are better for people and planet. \n\nWe’re curating collections of human-centered furniture designs that stand the test of time and are built for real life. \n\nWe’re creating whole new design-to-manufacturing systems that focus on reuse, repurpose, or upcycle. \n\nWe’re bucking industry conventions because what we are used to isn’t working. (The earth is fragile enough without adding countless old couches to every landfill.) \n\nWe’re forming a mutual-benefit society that blends innovation and tradition with taste and style. We’d be honored if you’d join us. "
          }
        }
      ]
    }
];

export default async function() {
  return await new Promise(resolve => {
    resolve(fakeData);
  });
};
