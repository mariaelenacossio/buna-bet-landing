/**
 * Content for the scroll-driven video story. Kept here so copy edits do not
 * mean touching motion code. Video files live in public/videos/ and are
 * referenced by root-relative path; assetPath() adds the basePath at use.
 */

export type StoryAct = {
  id: string;
  numeral: string; // I / II / III, with the label
  label: string;
  tag: string; // 01 / 02 / 03, the large quiet corner number
  video: string; // root-relative, pre-basePath
  headline: string;
  body: string;
};

export const STORY_ACTS: StoryAct[] = [
  {
    id: "highland",
    numeral: "I",
    label: "The Highland",
    tag: "01",
    video: "/videos/cherries.mp4",
    headline: "Cherries ripen above the clouds",
    body: "At two thousand meters, coffee grows the way it has for a thousand years. Shaded, slow, and sweet on the branch.",
  },
  {
    id: "roast",
    numeral: "II",
    label: "The Roast",
    tag: "02",
    video: "/videos/trays.mp4",
    headline: "Green, gold, then ember-dark",
    body: "On woven trays passed between hands, each stage of the roast has its own colour and its own hour. Nothing here is hurried.",
  },
  {
    id: "ceremony",
    numeral: "III",
    label: "The Ceremony",
    tag: "03",
    video: "/videos/ceremony.mp4",
    headline: "A slow pour from the jebena",
    body: "Incense curls through the room. The clay pot tilts. Abol arrives, dark and unhurried, and shared before it is drunk.",
  },
];
