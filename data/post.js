import { USERS } from "./user";

export const POST = [
  {
    imageUrl:
      "https://globalgrasshopper.com/wp-content/uploads/2012/01/10-of-the-most-beautiful-places-to-visit-in-Laos.jpg",
    user: USERS[0].user,
    likes: "7,870",
    caption:
      ".Look deep into nature🌵🌿, And then you will understand #react #firebase #hale. ",
    profilepicture: USERS[0].image,
    comments: [
      {
        user: "tony stark",
        comment: "Wow! This build looks fire. thhis is going to be fun build <3!!!!",
      },
      {
        user: "Johnny Depp ",
        comment: "Once wake up, I'll finally be ready to code woooooooooow",
      },
    ],
  },
  {
    imageUrl:
      "https://images.adsttc.com/media/images/60b6/09d7/f91c/8199/fb00/00cd/newsletter/shutterstock_1196821240.jpg?1622542766",
    user: USERS[1].user,
    likes: "9,850",
    caption: "Train Ride to Hogwarts.Look at the building wooow!!@, ",
    profilepicture: USERS[1].image,
    comments: [
      {
        user: "Rock",
        comment: "Wow! This build looks fire.",
      },
      {
        user: "tom cruise ",
        comment: "Once wake up, I'll finally be ready to code woooooooooow",
      },
    ],
  },
];
