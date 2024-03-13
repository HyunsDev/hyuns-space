import { Item } from "../item.type";

const content = `
<iframe class='youtube-embed' src="https://www.youtube.com/embed/t-y4nQxZtdQ" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
<iframe class='youtube-embed' src="https://www.youtube.com/embed/CzRxaxlZpTM" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
<iframe class='youtube-embed' src="https://www.youtube.com/embed/0sDDE0Mnmj0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>


`;

export const AITrashCanItem: Item = {
  id: "ai-trash-can",
  name: "인공지능 쓰레기통",
  type: "project",
  description: "인공지능으로 쓰레기 분리수거하기",
  thumbnailImage: "/items/ai-trash-can/thumbnail.png",
  tags: [],
  badges: [],
  content,
  period: "2021",
  updatedAt: "2024-03-13",
};
