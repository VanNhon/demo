// import React from "react";
// import { Typography } from "@material-ui/core";
const itemPerkU = [
  "1 Urgent Care Visit",
  "Access to Telemedicine Providers",
  "Access to Teltherapy Providers",
  "Full Shot",
  "Care Concierge"
];

// const listItemPU = itemPerkU.map((item, index) => {
//   return <Typography key={index}>{item}</Typography>
// });
const itemPerkPrime = [
  "3 Urgent Care Visits",
  "Access to Telemedicine Providers",
  "Access to Teltherapy Providers",
  "Full Shot",
  "Care Concierge"
];
// const listItemPP = itemPerkPrime.map((item, index) => {
//   return {item}
// });
const itemPerkFamily = [
  "10 Urgent Care Visits",
  "Access to Telemedicine Providers",
  "Access to Teltherapy Providers",
  "Full Shot",
  "Care Concierge",
  "Access to Teltherapy Providers"
];
// const listItemPF = itemPerkFamily.map((item, index) => {
//   return {item}
// });
export const cardValues = [
  {
    header: "images/PerkU.PNG",
    title: "Students Only",
    subTitle: "(Must have valid school email address)",
    content: itemPerkU,
    button: {
      name: "$9.99/month",
      link: "/signup_perku"
    }
  },
  {
    header: "images/PerkPrime.PNG",
    title: "For Individuals",
    subTitle: " ",
    content: itemPerkPrime,
    button: {
      name: "$19.99/month",
      link: "/signup_perkprime"
    }
  },
  {
    header: "images/PerkFamily.PNG",
    title: "For Families of 3+",
    subTitle: "(Urgent Care visits transferrable amongst family members)",
    content: itemPerkFamily,
    button: {
      name: "$49.99/month",
      link: "/signup_perkfamily_subscriber"
    }
  }
];
