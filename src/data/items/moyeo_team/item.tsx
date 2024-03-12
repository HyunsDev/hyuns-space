import { Item } from "../item.type";

const content = `
  # Moyeo 팀  

`;

export const MoyeoTeamItem: Item = {
  id: "moyeo_team",
  name: "Moyeo 팀",
  type: "team",
  description: "모여를 만드는 사람들!",
  thumbnailImage: "/items/moyeo_team/thumbnail.png",
  logoImage: "/items/moyeo_team/logo.png",
  tags: ["React", "TypeScript", "Notion API"],
  badges: ["isHot"],
  url: "https://calendar2notion.com",
  content,
};
