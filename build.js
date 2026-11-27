const fs = require("fs");

function inline(text){
    return text
        .replace(/\*\*(.+?)\*\*/g,"<strong>$1</strong>")
        .replace(/`([^`]+)`/g,"<code>$1</code>");
}

function lineToHtml(line) {
    if(line.startsWith("### ")) return `<h3>${line.slice(4)}</h3>`;
    if(line.startsWith("## ")) return `<h2>${line.slice(3)}</h2>`;
    if(line.startsWith("# ")) return `<h1>${line.slice(2)}</h1>`;
    if(line.trim() === "")  return "";
    return `<p>${inline(line)}</p>`;
}

function escapeHtml(text) {
    return text
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");
}

function mdToHtml(md) {
    const lines = md.split("\n");
    const out = [];
    let inList = false;
    let inCode = false;
    let codeLines = [];
    for(const line of lines) {
        if(line.startsWith("```")){
            if(inCode){
                out.push(`<pre><code>${codeLines.join("\n")}</code></pre>`);
                codeLines = [];
            }
            inCode = !inCode;
            continue;
        }

        if(inCode) {
            codeLines.push(escapeHtml(line));
            continue;
        }

        if(line.startsWith("- ")) {
            if(!inList) {
                out.push("<ul>");
                inList = true;
            }
            out.push(`<li>${inline(line.slice(2))}</li>`);
            continue;
        }

        if(inList) {
            out.push("</ul>");
            inList = false;
        }

        const html = lineToHtml(line);
        if(html !=="") out.push(html);
    }

    if(inList) out.push("</ul>");
    return out.join("\n");
}

const md = fs.readFileSync("posts/hello.md","utf8");
const body = mdToHtml(md);

const html = `<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>hello</title>
    <link rel="stylesheet" href="../style.css">
</head>
<body>
    <main>
        <article>
${body}
        </article>
    </main>
</body>
</html>`;

fs.mkdirSync("dist",{recursive: true});
fs.writeFileSync("dist/hello.html",html);
console.log("dist/hello.html 을 만들었어요.");