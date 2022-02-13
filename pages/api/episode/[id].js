const titles = [
  {
    episode: "1",
    title: "I Gotta Go Back To Wisconsin",
    publish_date: "06 Mar 2015",
  },
  {
    episode: "2",
    title: "Stuck In The Closet",
    publish_date: "28 Mar 2015",
  },
  {
    episode: "3",
    title: "Third Time's The Charm",
    publish_date: "12 Apr 2015",
  },
  {
    episode: "4",
    title: "It's Not Scarface",
    publish_date: "11 May 2015",
  },
  {
    episode: "5",
    title: "Musical Interludes",
    publish_date: "05 Jun 2015",
  },
  {
    episode: "6",
    title: "What Was That?",
    publish_date: "22 Jun 2015",
  },
  {
    episode: "7",
    title: "Hyuck, Hyuck, Hyuck!",
    publish_date: "04 Jul 2015",
  },
  {
    episode: "8",
    title: "Dane's Real Voice",
    publish_date: "15 Jul 2015",
  },
  {
    episode: "9",
    title: "Take Two",
    publish_date: "07 Aug 2015",
  },
  {
    episode: "10",
    title: "Interpretive Podcasting",
    publish_date: "28 Aug 2015",
  },
  {
    episode: "11",
    title: "The Dane Is Back In Town",
    publish_date: "09 Sep 2015",
  },
  {
    episode: "12",
    title: "Super Ultra Edition",
    publish_date: "26 Sep 2015",
  },
  {
    episode: "13",
    title: "Scary Spooky Haunted Edition",
    publish_date: "13 Oct 2015",
  },
  {
    episode: "14",
    title: "What's In The Box?",
    publish_date: "09 Nov 2015",
  },
  {
    episode: "15",
    title: "Salted Earbuds",
    publish_date: "30 Nov 2015",
  },
  {
    episode: "16",
    title: "VHS...What's a VHS?",
    publish_date: "11 Dec 2015",
  },
  {
    episode: "17",
    title: "End Of The Year Favorites",
    publish_date: "28 Dec 2015",
  },
  {
    episode: "18",
    title: "Star Wars Special",
    publish_date: "08 Jan 2016",
  },
  {
    episode: "19",
    title: "Adios, Rails",
    publish_date: "03 Feb 2016",
  },
  {
    episode: "20",
    title: "Dane In Real Life",
    publish_date: "18 Feb 2016",
  },
  {
    episode: "21",
    title: "One More Year",
    publish_date: "06 Mar 2016",
  },
  {
    episode: "22",
    title: "We're Professionals",
    publish_date: "01 Apr 2016",
  },
  {
    episode: "23",
    title: "The Dane and Tyler Show",
    publish_date: "15 Apr 2016",
  },
  {
    episode: "24",
    title: "Producer In The House",
    publish_date: "25 Apr 2016",
  },
  {
    episode: "25",
    title: "Classed Up",
    publish_date: "12 May 2016",
  },
  {
    episode: "26",
    title: "The Boys Are Back",
    publish_date: "31 May 2016",
  },
  {
    episode: "27",
    title: "Smooth Silky Sounds",
    publish_date: "21 June 2016",
  },
  {
    episode: "28",
    title: "Hold The Dane",
    publish_date: "05 Aug 2016",
  },
  {
    episode: "29",
    title: "Jorsen Gevit Libbet",
    publish_date: "30 Aug 2016",
  },
  {
    episode: "30",
    title: "Sexy Pants Dance Party",
    publish_date: "30 Sep 2016",
  },
  {
    episode: "31",
    title: "Nipples and Drugs",
    publish_date: "20 Jan 2017",
  },
  {
    episode: "32",
    title: "The Episode Where Josh and Tyler Hold Hands",
    publish_date: "24 Feb 2017",
  },
  {
    episode: "33",
    title: "Daneterlude",
    publish_date: "22 Mar 2017",
  },
  {
    episode: "34",
    title: "When The Dane Is Away",
    publish_date: "14 Apr 2017",
  },
  {
    episode: "35",
    title: "Tyler Fails At Podcasting",
    publish_date: "25 May 2017",
  },
  {
    episode: "36",
    title: "Back From the Dead",
    publish_date: "31 Oct 2017",
  },
  {
    episode: "37",
    title: "Merry Relevance",
    publish_date: "05 Dec 2017",
  },
  {
    episode: "38",
    title: "A New Year and Old Friends",
    publish_date: "16 Jan 2018",
  },
  {
    episode: "39",
    title: "Death of the Netflix Boy",
    publish_date: "05 Feb 2018",
  },
  {
    episode: "40",
    title: "Cody & Tyler Bonus Episode",
    publish_date: "19 Feb 2018",
  },
  {
    episode: "41",
    title: "The Missing Father",
    publish_date: "11 Apr 2018",
  },
  {
    episode: "41.2",
    title: "Side Tangents Bonus Episode",
    publish_date: "11 Apr 2018",
  },
  {
    episode: "42",
    title: "Life the Universe and Everything",
    publish_date: "06 Dec 2018",
  },
];

export default ({ query: { id } }, res) => {
  console.log(`${process.env.NEXT_PUBLIC_S3_BUCKET}/${id}.mp3`);
  res.status(200).json({
    audio: {
      url: `${process.env.NEXT_PUBLIC_S3_BUCKET}/${id}.mp3`,
    },
    episode: `${titles[id - 1].episode}`,
    name: `${titles[id - 1].title}`,
  });
};
