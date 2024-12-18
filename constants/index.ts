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
    imgURL: "/icons/player.svg",
    route: "/dashboard/players-stats",
    label: "Players Statistics",
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

export const playerIMgs = [
  {
    name: "Trae Young",
    img: "/players/Trae Young.webp",
  },
  {
    name: "Dejounte Murray",
    img: "/players/Dejounte Murray.webp",
  },
  {
    name: "De'Andre Hunter",
    img: "/players/De'Andre Hunter.avif",
  },
  {
    name: "John Collins",
    img: "/players/John Collins.avif",
  },
  {
    name: "Clint Capela",
    img: "/players/Clint Capela.webp",
  },
  {
    name: "Jayson Tatum",
    img: "/players/Jayson Tatum.avif",
  },
  {
    name: "Jaylen Brown",
    img: "/players/Jaylen Brown.avif",
  },
  {
    name: "Marcus Smart",
    img: "/players/Marcus Smart.avif",
  },
  {
    name: "Al Horford",
    img: "/players/Al Horford.avif",
  },
  {
    name: "Robert Williams III",
    img: "/players/Robert Williams III.png",
  },
  {
    name: "Mikal Bridges",
    img: "/players/Mikal Bridges.avif",
  },
  {
    name: "Spencer Dinwiddie",
    img: "/players/Spencer Dinwiddie.avif",
  },
  {
    name: "Cam Thomas",
    img: "/players/Cam Thomas.avif",
  },
  {
    name: "Nic Claxton",
    img: "/players/Nic Claxton.webp",
  },
  {
    name: "Royce O'Neale",
    img: "/players/Royce O'Neale.webp",
  },
  {
    name: "LaMelo Ball",
    img: "/players/LaMelo Ball.webp",
  },
  {
    name: "Terry Rozier",
    img: "/players/Terry Rozier.webp",
  },
  {
    name: "Kelly Oubre Jr.",
    img: "/players/Kelly Oubre Jr.webp",
  },
  {
    name: "P.J. Washington",
    img: "/players/P.J. Washington.avif",
  },
  {
    name: "Mason Plumlee",
    img: "/players/Mason Plumlee.avif",
  },
  {
    name: "DeMar DeRozan",
    img: "/players/DeMar DeRozan.avif",
  },
  {
    name: "Zach LaVine",
    img: "/players/Zach LaVine.webp",
  },
  {
    name: "Patrick Williams",
    img: "/players/Patrick Williams.webp",
  },
  {
    name: "Nikola Vučević",
    img: "/players/Nikola Vučević.webp",
  },
  {
    name: "Andre Drummond",
    img: "/players/Andre Drummond.avif",
  },
  {
    name: "Donovan Mitchell",
    img: "/players/Donovan Mitchell.avif",
  },
  {
    name: "Darius Garland",
    img: "/players/Darius Garland.avif",
  },
  {
    name: "Caris LeVert",
    img: "/players/Caris LeVert.avif",
  },
  {
    name: "Evan Mobley",
    img: "/players/Evan Mobley.avif",
  },
  {
    name: "Jarrett Allen",
    img: "/players/Jarrett Allen.avif",
  },
  {
    name: "Luka Dončić",
    img: "/players/Luka Dončić.avif",
  },
  {
    name: "Kyrie Irving",
    img: "/players/Kyrie Irving.webp",
  },
  {
    name: "Josh Green",
    img: "/players/Josh Green.webp",
  },
  {
    name: "Maxi Kleber",
    img: "/players/Maxi Kleber.avif",
  },
  {
    name: "Dwight Powell",
    img: "/players/Dwight Powell.avif",
  },
  {
    name: "Nikola Jokić",
    img: "/players/Nikola Jokić.avif",
  },
  {
    name: "Jamal Murray",
    img: "/players/Jamal Murray.avif",
  },
  {
    name: "Michael Porter Jr.",
    img: "/players/Michael Porter Jr.avif",
  },
  {
    name: "Aaron Gordon",
    img: "/players/Aaron Gordon.avif",
  },
  {
    name: "Nicolás Brussino",
    img: "",
  },
  {
    name: "Cade Cunningham",
    img: "/players/Cade Cunningham.avif",
  },
  {
    name: "Jaden Ivey",
    img: "/players/Jaden Ivey.webp",
  },
  {
    name: "Bojan Bogdanović",
    img: "/players/Bojan Bogdanović.avif",
  },
  {
    name: "Isaiah Stewart",
    img: "/players/Isaiah Stewart.avif",
  },
  {
    name: "James Wiseman",
    img: "/players/James Wiseman.webp",
  },
  {
    name: "Stephen Curry",
    img: "/players/Stephen Curry.avif",
  },
  {
    name: "Klay Thompson",
    img: "/players/Klay Thompson.avif",
  },
  {
    name: "Andrew Wiggins",
    img: "/players/Andrew Wiggins.avif",
  },
  {
    name: "Draymond Green",
    img: "/players/Draymond Green.avif",
  },
  {
    name: "Kevon Looney",
    img: "/players/Kevon Looney.avif",
  },
  {
    name: "Jalen Green",
    img: "/players/Jalen Green.webp",
  },
  {
    name: "Kevin Porter Jr.",
    img: "/players/Kevin Porter Jr.png",
  },
  {
    name: "Jabari Smith Jr.",
    img: "/players/Jabari Smith Jr.webp",
  },
  {
    name: "Alperen Şengün",
    img: "/players/Alperen Şengün.webp",
  },
  {
    name: "Bruno Fernando",
    img: "/players/Bruno Fernando.webp",
  },
  {
    name: "Tyrese Haliburton",
    img: "/players/Tyrese Haliburton.webp",
  },
  {
    name: "Bennedict Mathurin",
    img: "/players/Bennedict Mathurin.webp",
  },
  {
    name: "Buddy Hield",
    img: "/players/Buddy Hield.webp",
  },
  {
    name: "Oshae Brissett",
    img: "",
  },
  {
    name: "Myles Turner",
    img: "/players/Myles Turner.webp",
  },
  {
    name: "Kawhi Leonard",
    img: "/players/Kawhi Leonard.png",
  },
  {
    name: "Paul George",
    img: "/players/Paul George.webp",
  },
  {
    name: "Norman Powell",
    img: "/players/Norman Powell.webp",
  },
  {
    name: "Terance Mann",
    img: "/players/Terance Mann.png",
  },
  {
    name: "Ivica Zubac",
    img: "/players/Ivica Zubac.webp",
  },
  {
    name: "LeBron James",
    img: "/players/LeBron James.avif",
  },
  {
    name: "D'Angelo Russell",
    img: "/players/D'Angelo Russell.webp",
  },
  {
    name: "Austin Reaves",
    img: "/players/Austin Reaves.avif",
  },
  {
    name: "Rui Hachimura",
    img: "/players/Rui Hachimura.avif",
  },
  {
    name: "Anthony Davis",
    img: "/players/Anthony Davis.avif",
  },
  {
    name: "Ja Morant",
    img: "/players/Ja Morant.avif",
  },
  {
    name: "Desmond Bane",
    img: "/players/Desmond Bane.avif",
  },
  {
    name: "Dillon Brooks",
    img: "/players/Dillon Brooks.webp",
  },
  {
    name: "Jaren Jackson Jr.",
    img: "/players/Jaren Jackson Jr.avif",
  },
  {
    name: "Steven Adams",
    img: "/players/Steven Adams.png",
  },
  {
    name: "Jimmy Butler",
    img: "/players/Jimmy Butler.webp",
  },
  {
    name: "Bam Adebayo",
    img: "/players/Bam Adebayo.webp",
  },
  {
    name: "Caleb Martin",
    img: "/players/Caleb Martin.webp",
  },
  {
    name: "Gabe Vincent",
    img: "/players/Gabe Vincent.webp",
  },
  {
    name: "Kevin Love",
    img: "/players/Kevin Love.webp",
  },
  {
    name: "Giannis Antetokounmpo",
    img: "/players/Giannis Antetokounmpo.webp",
  },
  {
    name: "Jrue Holiday",
    img: "/players/Jrue Holiday.avif",
  },
  {
    name: "Khris Middleton",
    img: "/players/Khris Middleton.webp",
  },
  {
    name: "Bobby Portis",
    img: "/players/Bobby Portis.avif",
  },
  {
    name: "Brook Lopez",
    img: "/players/Brook Lopez.avif",
  },
  {
    name: "Anthony Edwards",
    img: "/players/Anthony Edwards.avif",
  },
  {
    name: "Rudy Gobert",
    img: "/players/Rudy Gobert.avif",
  },
  {
    name: "Karl-Anthony Towns",
    img: "/players/Karl-Anthony Towns.webp",
  },
  {
    name: "Jaden McDaniels",
    img: "/players/Jaden McDaniels.avif",
  },
  {
    name: "Austin Rivers",
    img: "/players/Austin Rivers.avif",
  },
  {
    name: "Zion Williamson",
    img: "/players/Zion Williamson.avif",
  },
  {
    name: "Brandon Ingram",
    img: "/players/Brandon Ingram.avif",
  },
  {
    name: "CJ McCollum",
    img: "/players/CJ McCollum.webp",
  },
  {
    name: "Herbert Jones",
    img: "/players/Herbert Jones.webp",
  },
  {
    name: "Jonas Valančiūnas",
    img: "/players/Jonas Valančiūnas.webp",
  },
  {
    name: "Jalen Brunson",
    img: "/players/Jalen Brunson.webp",
  },
  {
    name: "RJ Barrett",
    img: "/players/RJ Barrett.webp",
  },
  {
    name: "Quentin Grimes",
    img: "/players/Quentin Grimes.avif",
  },
  {
    name: "Julius Randle",
    img: "/players/Julius Randle.avif",
  },
  {
    name: "Mitchell Robinson",
    img: "/players/Mitchell Robinson.webp",
  },
  {
    name: "Shai Gilgeous-Alexander",
    img: "/players/Shai Gilgeous-Alexander.webp",
  },
  {
    name: "Luguentz Dort",
    img: "/players/Luguentz Dort.webp",
  },
  {
    name: "Jalen Williams",
    img: "/players/Jalen Williams.webp",
  },
  {
    name: "Josh Giddey",
    img: "/players/Josh Giddey.webp",
  },
  {
    name: "Chet Holmgren",
    img: "/players/Chet Holmgren.png",
  },
  {
    name: "Paolo Banchero",
    img: "/players/Paolo Banchero.avif",
  },
  {
    name: "Franz Wagner",
    img: "/players/Franz Wagner.avif",
  },
  {
    name: "Jalen Suggs",
    img: "/players/Jalen Suggs.avif",
  },
  {
    name: "Bol Bol",
    img: "/players/Bol Bol.avif",
  },
  {
    name: "Wendell Carter Jr.",
    img: "/players/Wendell Carter Jr.avif",
  },
  {
    name: "James Harden",
    img: "/players/James Harden.png",
  },
  {
    name: "Tyrese Maxey",
    img: "/players/Tyrese Maxey.avif",
  },
  {
    name: "Tobias Harris",
    img: "/players/Tobias Harris.webp",
  },
  {
    name: "P.J. Tucker",
    img: "/players/P.J. Tucker.avif",
  },
  {
    name: "Joel Embiid",
    img: "/players/Joel Embiid.webp",
  },
  {
    name: "Devin Booker",
    img: "/players/Devin Booker.avif",
  },
  {
    name: "Bradley Beal",
    img: "/players/Bradley Beal.avif",
  },
  {
    name: "Kevin Durant",
    img: "/players/Kevin Durant.avif",
  },
  {
    name: "Deandre Ayton",
    img: "/players/Deandre Ayton.webp",
  },
  {
    name: "Josh Okogie",
    img: "/players/Josh Okogie.avif",
  },
  {
    name: "Damian Lillard",
    img: "/players/Damian Lillard.webp",
  },
  {
    name: "Anfernee Simons",
    img: "/players/Anfernee Simons.webp",
  },
  {
    name: "Jerami Grant",
    img: "/players/Jerami Grant.webp",
  },
  {
    name: "Jusuf Nurkić",
    img: "/players/Jusuf Nurkić.webp",
  },
  {
    name: "Drew Eubanks",
    img: "/players/Drew Eubanks.avif",
  },
  {
    name: "De'Aaron Fox",
    img: "/players/De'Aaron Fox.avif",
  },
  {
    name: "Kevin Huerter",
    img: "/players/Kevin Huerter.avif",
  },
  {
    name: "Keegan Murray",
    img: "/players/Keegan Murray.avif",
  },
  {
    name: "Domantas Sabonis",
    img: "/players/Domantas Sabonis.avif",
  },
  {
    name: "Alex Len",
    img: "/players/Alex Len.avif",
  },
  {
    name: "Victor Wembanyama",
    img: "/plaers/Victor Wembanyama.avif",
  },
  {
    name: "Scoot Henderson",
    img: "/players/Scoot Henderson.webp",
  },
  {
    name: "Devin Vassell",
    img: "/players/Devin Vassell.avif",
  },
  {
    name: "Keldon Johnson",
    img: "/players/Keldon Johnson.avif",
  },
  {
    name: "Zach Collins",
    img: "/players/Zach Collins.avif",
  },
  {
    name: "Fred VanVleet",
    img: "/players/Fred VanVleet.webp",
  },
  {
    name: "Scottie Barnes",
    img: "/players/Scottie Barnes.webp",
  },
  {
    name: "OG Anunoby",
    img: "/players/OG Anunoby.webp",
  },
  {
    name: "Pascal Siakam",
    img: "/players/Pascal Siakam.webp",
  },
  {
    name: "Jakob Poeltl",
    img: "/players/Jakob Poeltl.webp",
  },
  {
    name: "Lauri Markkanen",
    img: "/players/Lauri Markkanen.avif",
  },
  {
    name: "Collin Sexton",
    img: "/players/Collin Sexton.webp",
  },
  {
    name: "Kris Dunn",
    img: "/players/Kris Dunn.png",
  },
  {
    name: "Jarred Vanderbilt",
    img: "/players/Jarred Vanderbilt.avif",
  },
  {
    name: "Walker Kessler",
    img: "/players/Walker Kessler.avif",
  },
  {
    name: "Kyle Kuzma",
    img: "/players/Kyle Kuzma.webp",
  },
  {
    name: "Corey Kispert",
    img: "/players/Corey Kispert.webp",
  },
  {
    name: "Kristaps Porziņģis",
    img: "/players/Kristaps Porziņģis.webp",
  },
  {
    name: "Daniel Gafford",
    img: "/players/Daniel Gafford.avif",
  },
  {
    name: "Delon Wright",
    img: "/players/Delon Wright.webp",
  },
];
