// Shared by the landing page, the support page and the FAQPage structured data,
// so what search engines and AI assistants read is exactly what visitors see.

export type QA = { q: string; a: string };

export const FAQ: QA[] = [
  {
    q: "What is ConvoTrack?",
    a: "ConvoTrack is a group ride tracking app. Everyone in your ride shows up on one live map, with turn-by-turn voice navigation to the destination, one-tap regroup calls, emergency alerts and a ride summary at the end. It is built for motorcycle group rides, road trips and vehicle convoys.",
  },
  {
    q: "How do I track my friends on a group motorcycle ride?",
    a: "The ride leader creates a ride in ConvoTrack, picks the destination and shares the invite link or 6-character code. Each rider opens the link, joins the lobby and marks ready. Once the ride starts, every rider sees the whole group live on the map, along with how far ahead or behind each person is.",
  },
  {
    q: "Is ConvoTrack free?",
    a: "ConvoTrack is free to download. ConvoTrack Pro is an optional upgrade for bigger groups and keeping your full ride history.",
  },
  {
    q: "Does ConvoTrack work on iPhone and Android?",
    a: "ConvoTrack is available now on the App Store for iPhone. The Android app is coming to Google Play.",
  },
  {
    q: "Is my location shared all the time?",
    a: "No. Your location is shared only while you are in a live ride, and only with the riders in that same ride. When the ride ends, or the moment you leave it, sharing stops. ConvoTrack does not sell location data or use it for advertising.",
  },
  {
    q: "What happens if someone falls behind or takes a wrong turn?",
    a: "Every rider can see the distance to each member of the group, and riders who drift off screen stay visible at the edge of the map. The group gets an alert when the pack splits too far apart, and anyone can call a regroup to a fuel, food or scenic stop in one tap.",
  },
  {
    q: "What does the emergency button do?",
    a: "It broadcasts an urgent alert to everyone in the ride with your position on the map, so the group knows who needs help and where to go.",
  },
  {
    q: "Do riders need to create an account?",
    a: "Riders sign in with Apple or Google, which takes a few seconds. There are no usernames or passwords to set up, and joining a ride only needs the invite link or code.",
  },
];
