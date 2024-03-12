import { Item } from "../item.type";

const content = `
  # Moyeo 팀  

`;

export const MoyeoItem: Item = {
  id: "moyeo",
  name: "Moyeo 모여!",
  type: "project",
  description: "대학생을 위한 모여!",
  thumbnailImage: "/items/moyeo/thumbnail.png",
  logoImage: "/items/moyeo/logo.png",
  tags: [],
  badges: [],
  url: "https://moyeo.me",
  content,
  updatedAt: "2024-03-13",
  period: "2024.05 ~ 2023.11",
};
