import { readFile, readdir, stat } from "node:fs/promises";import { join,relative } from "node:path";
const root=new URL("../",import.meta.url).pathname,dist=join(root,"dist"),errors=[];
async function files(dir){return (await Promise.all((await readdir(dir)).map(async n=>{const p=join(dir,n);return (await stat(p)).isDirectory()?files(p):[p]}))).flat()}
const all=await files(dist),html=all.filter(x=>x.endsWith(".html"));
for(const file of html){const text=await readFile(file,"utf8");for(const required of ["<title>","meta name=\"description\"","rel=\"canonical\"","application/ld+json","ANALYTICS: START"]){if(!text.includes(required))errors.push(`${relative(dist,file)} missing ${required}`)}for(const match of text.matchAll(/href="(\/[^"]*)"/g)){const pathname=match[1].split(/[?#]/)[0];if(!pathname||pathname.startsWith("//")||pathname.includes("."))continue;const target=pathname==="/"?join(dist,"index.html"):join(dist,pathname,"index.html");try{await stat(target)}catch{errors.push(`${relative(dist,file)} broken internal link ${pathname}`)}}}
for(const required of ["CNAME","robots.txt","sitemap.xml",".nojekyll","404.html"]){try{await stat(join(dist,required))}catch{errors.push(`Missing ${required}`)}}
if(errors.length){console.error(errors.join("\n"));process.exit(1)}console.log(`Validated ${html.length} HTML pages and required GitHub Pages files.`);
