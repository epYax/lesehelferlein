import { renderToStaticMarkup } from "react-dom/server";
import { writeFileSync, mkdirSync } from "node:fs";
import * as icons from "../components/reading-icons";
const directory = "public/icons/lesezeichen";
mkdirSync(directory, { recursive: true });
const items = Object.entries(icons)
  .filter(([, component]) => typeof component === "function")
  .map(([name, Icon]) => {
    const svg = renderToStaticMarkup(<Icon size={32} />);
    const file =
      name.replace(/[A-Z]/g, (c, i) => (i ? "-" : "") + c.toLowerCase()) +
      ".svg";
    writeFileSync(`${directory}/${file}`, svg + "\n");
    return { name, file, svg };
  });
writeFileSync(
  `${directory}/index.html`,
  `<!doctype html><html lang="de"><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>Lesezeichen · LeseHelferlein Icons</title><style>body{font:16px system-ui;background:#fff9e9;color:#304f39;max-width:1100px;margin:40px auto;padding:24px}h1{font-size:40px}main{display:grid;grid-template-columns:repeat(auto-fit,minmax(190px,1fr));gap:18px}article{background:#fffdf7;border:1px solid #dedcc5;border-radius:18px;padding:22px}a{color:inherit}figure{display:flex;align-items:center;gap:20px;margin:16px 0}p{line-height:1.6}.large svg{width:64px;height:64px}.small svg{width:18px;height:18px}.medium svg{width:28px;height:28px}</style><h1>Lesezeichen</h1><p>Das eigene Icon-Set von LeseHelferlein. Blatt, Buchseite und Feenstern – lesbar von 18 bis 64 Pixeln. Die SVGs können einzeln geöffnet und gespeichert werden.</p><main>${items.map(({ name, file, svg }) => `<article><a href="${file}"><strong>${name}</strong></a><figure><span class="small">${svg}</span><span class="medium">${svg}</span><span class="large">${svg}</span></figure></article>`).join("")}</main></html>`,
);
console.log(`${items.length} original icons exported to ${directory}`);
