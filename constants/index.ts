export const sidebarLinks = [
  {
    imgURL: "/icons/home.svg",
    route: "/dashboard",
    label: "Home",
  },
  {
    imgURL: "/icons/basketballIcon.svg",
    route: "/dashboard/start-game",
    label: "Start Game",
  },
  {
    imgURL: "/icons/previous.svg",
    route: "/dashboard/recorded-games",
    label: "Recorded Games",
  },
  {
    imgURL: "/icons/settings.svg",
    route: "/dashboard/settings",
    label: "Settings",
  },
];
export const fieldGoals: string[] = ["1-Point", "2-Points", "3-Points"];
export const rebounds: string[] = ["D-Rebound", "O-Rebound"];
export const assists: string[] = ["Assist"];
export const steals: string[] = ["Steal"];
export const blocks: string[] = ["Block"];

export const nbaTeams: team[] = [
  {
    name: "Atlanta Hawks",
    coachName: "Quin Snyder",
    startingFive: [
      "Trae Young",
      "Dejounte Murray",
      "De'Andre Hunter",
      "John Collins",
      "Clint Capela",
    ],
  },
  {
    name: "Boston Celtics",
    coachName: "Joe Mazzulla",
    startingFive: [
      "Jayson Tatum",
      "Jaylen Brown",
      "Marcus Smart",
      "Al Horford",
      "Robert Williams III",
    ],
  },
  {
    name: "Brooklyn Nets",
    coachName: "Jacque Vaughn",
    startingFive: [
      "Mikal Bridges",
      "Spencer Dinwiddie",
      "Cam Thomas",
      "Nic Claxton",
      "Royce O'Neale",
    ],
  },
  {
    name: "Charlotte Hornets",
    coachName: "Steve Clifford",
    startingFive: [
      "LaMelo Ball",
      "Terry Rozier",
      "Kelly Oubre Jr.",
      "P.J. Washington",
      "Mason Plumlee",
    ],
  },
  {
    name: "Chicago Bulls",
    coachName: "Billy Donovan",
    startingFive: [
      "DeMar DeRozan",
      "Zach LaVine",
      "Patrick Williams",
      "Nikola Vučević",
      "Andre Drummond",
    ],
  },
  {
    name: "Cleveland Cavaliers",
    coachName: "J.B. Bickerstaff",
    startingFive: [
      "Donovan Mitchell",
      "Darius Garland",
      "Caris LeVert",
      "Evan Mobley",
      "Jarrett Allen",
    ],
  },
  {
    name: "Dallas Mavericks",
    coachName: "Jason Kidd",
    startingFive: [
      "Luka Dončić",
      "Kyrie Irving",
      "Josh Green",
      "Maxi Kleber",
      "Dwight Powell",
    ],
  },
  {
    name: "Denver Nuggets",
    coachName: "Michael Malone",
    startingFive: [
      "Nikola Jokić",
      "Jamal Murray",
      "Michael Porter Jr.",
      "Aaron Gordon",
      "Nicolás Brussino",
    ],
  },
  {
    name: "Detroit Pistons",
    coachName: "Monty Williams",
    startingFive: [
      "Cade Cunningham",
      "Jaden Ivey",
      "Bojan Bogdanović",
      "Isaiah Stewart",
      "James Wiseman",
    ],
  },
  {
    name: "Golden State Warriors",
    coachName: "Steve Kerr",
    startingFive: [
      "Stephen Curry",
      "Klay Thompson",
      "Andrew Wiggins",
      "Draymond Green",
      "Kevon Looney",
    ],
  },
  {
    name: "Houston Rockets",
    coachName: "Ime Udoka",
    startingFive: [
      "Jalen Green",
      "Kevin Porter Jr.",
      "Jabari Smith Jr.",
      "Alperen Şengün",
      "Bruno Fernando",
    ],
  },
  {
    name: "Indiana Pacers",
    coachName: "Rick Carlisle",
    startingFive: [
      "Tyrese Haliburton",
      "Bennedict Mathurin",
      "Buddy Hield",
      "Oshae Brissett",
      "Myles Turner",
    ],
  },
  {
    name: "Los Angeles Clippers",
    coachName: "Tyronn Lue",
    startingFive: [
      "Kawhi Leonard",
      "Paul George",
      "Norman Powell",
      "Terance Mann",
      "Ivica Zubac",
    ],
  },
  {
    name: "Los Angeles Lakers",
    coachName: "Darvin Ham",
    startingFive: [
      "LeBron James",
      "D'Angelo Russell",
      "Austin Reaves",
      "Rui Hachimura",
      "Anthony Davis",
    ],
  },
  {
    name: "Memphis Grizzlies",
    coachName: "Taylor Jenkins",
    startingFive: [
      "Ja Morant",
      "Desmond Bane",
      "Dillon Brooks",
      "Jaren Jackson Jr.",
      "Steven Adams",
    ],
  },
  {
    name: "Miami Heat",
    coachName: "Erik Spoelstra",
    startingFive: [
      "Jimmy Butler",
      "Bam Adebayo",
      "Caleb Martin",
      "Gabe Vincent",
      "Kevin Love",
    ],
  },
  {
    name: "Milwaukee Bucks",
    coachName: "Mike Budenholzer",
    startingFive: [
      "Giannis Antetokounmpo",
      "Jrue Holiday",
      "Khris Middleton",
      "Bobby Portis",
      "Brook Lopez",
    ],
  },
  {
    name: "Minnesota Timberwolves",
    coachName: "Chris Finch",
    startingFive: [
      "Anthony Edwards",
      "Rudy Gobert",
      "Karl-Anthony Towns",
      "Jaden McDaniels",
      "Austin Rivers",
    ],
  },
  {
    name: "New Orleans Pelicans",
    coachName: "Willie Green",
    startingFive: [
      "Zion Williamson",
      "Brandon Ingram",
      "CJ McCollum",
      "Herbert Jones",
      "Jonas Valančiūnas",
    ],
  },
  {
    name: "New York Knicks",
    coachName: "Tom Thibodeau",
    startingFive: [
      "Jalen Brunson",
      "RJ Barrett",
      "Quentin Grimes",
      "Julius Randle",
      "Mitchell Robinson",
    ],
  },
  {
    name: "Oklahoma City Thunder",
    coachName: "Mark Daigneault",
    startingFive: [
      "Shai Gilgeous-Alexander",
      "Luguentz Dort",
      "Jalen Williams",
      "Josh Giddey",
      "Chet Holmgren",
    ],
  },
  {
    name: "Orlando Magic",
    coachName: "Jamahl Mosley",
    startingFive: [
      "Paolo Banchero",
      "Franz Wagner",
      "Jalen Suggs",
      "Bol Bol",
      "Wendell Carter Jr.",
    ],
  },
  {
    name: "Philadelphia 76ers",
    coachName: "Doc Rivers",
    startingFive: [
      "James Harden",
      "Tyrese Maxey",
      "Tobias Harris",
      "P.J. Tucker",
      "Joel Embiid",
    ],
  },
  {
    name: "Phoenix Suns",
    coachName: "Frank Vogel",
    startingFive: [
      "Devin Booker",
      "Bradley Beal",
      "Kevin Durant",
      "Deandre Ayton",
      "Josh Okogie",
    ],
  },
  {
    name: "Portland Trail Blazers",
    coachName: "Chauncey Billups",
    startingFive: [
      "Damian Lillard",
      "Anfernee Simons",
      "Jerami Grant",
      "Jusuf Nurkić",
      "Drew Eubanks",
    ],
  },
  {
    name: "Sacramento Kings",
    coachName: "Mike Brown",
    startingFive: [
      "De'Aaron Fox",
      "Kevin Huerter",
      "Keegan Murray",
      "Domantas Sabonis",
      "Alex Len",
    ],
  },
  {
    name: "San Antonio Spurs",
    coachName: "Gregg Popovich",
    startingFive: [
      "Victor Wembanyama",
      "Scoot Henderson",
      "Devin Vassell",
      "Keldon Johnson",
      "Zach Collins",
    ],
  },
  {
    name: "Toronto Raptors",
    coachName: "Darko Rajaković",
    startingFive: [
      "Fred VanVleet",
      "Scottie Barnes",
      "OG Anunoby",
      "Pascal Siakam",
      "Jakob Poeltl",
    ],
  },
  {
    name: "Utah Jazz",
    coachName: "Will Hardy",
    startingFive: [
      "Lauri Markkanen",
      "Collin Sexton",
      "Kris Dunn",
      "Jarred Vanderbilt",
      "Walker Kessler",
    ],
  },
  {
    name: "Washington Wizards",
    coachName: "Wes Unseld Jr.",
    startingFive: [
      "Kyle Kuzma",
      "Corey Kispert",
      "Kristaps Porziņģis",
      "Daniel Gafford",
      "Delon Wright",
    ],
  },
];
