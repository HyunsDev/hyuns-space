import fsPromise from "fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import matter from "gray-matter";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_PATH = path.join(__dirname, "../src/data/items/data.json");
const ITEMS_FOLDER_PATH = path.join(__dirname, "../public/items");

console.log("Data to MD CLI");

const func = async () => {
  const fileNames = (await fsPromise.readdir(ITEMS_FOLDER_PATH)).filter(
    (e) => !e.endsWith(".base")
  );
  const items = [];

  for (const fileName of fileNames) {
    const mdFilePath = path.join(ITEMS_FOLDER_PATH, fileName, `${fileName}.md`);
    const mdFileContent = await fsPromise.readFile(mdFilePath, "utf-8");
    const { data, content } = matter(mdFileContent);

    items.push({
      ...data,
      thumbnailImage: `/${data.thumbnailImage}`,
      logoImage: data.logoImage ? `/${data.logoImage}` : undefined,
      updatedAt: data.updatedAt
        ? new Date(data.updatedAt).toISOString().split("T")[0]
        : undefined,
      order: data.order || 0,
      content: content.trim(),
    });
  }

  items.sort((a, b) => {
    if (a.order > b.order) return -1;
    if (a.order < b.order) return 1;
    return 0;
  });

  await fsPromise.writeFile(DATA_PATH, JSON.stringify(items, null, 2));
};

func();
