import fsPromise from "fs/promises";
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import yaml from "js-yaml";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_PATH = path.join(__dirname, "../src/data/items/data.json");
const ITEMS_FOLDER_PATH = path.join(__dirname, "../public/items");

console.log("Data to MD CLI");

const func = async () => {
    const file = await fsPromise.readFile(DATA_PATH, "utf-8");
    const items = JSON.parse(file);

    for (const item of items) { 
        const yamlText = yaml.dump({
            id: item.id,
            name: item.name,
            type: item.type,
            description: item.description,
            thumbnailImage: item.thumbnailImage,
            logoImage: item.logoImage,
            tags: item.tags,
            badges: item.badges,
            url: item.url,
            urls: item.urls,
            period: item.period,
            updatedAt: item.updatedAt,
            curating: item.curating,
            role: item.role,
        }, { noRefs: true, skipInvalid: true });

        const content = `---
${yamlText}---

${item.content || ""}`;
        await fsPromise.writeFile(path.join(ITEMS_FOLDER_PATH, `${item.id}/${item.id}.md`), content);
    }


}

func();