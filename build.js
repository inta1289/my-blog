const fs = require("fs");
const {marked} = require("marked");


const md = fs.readFileSync("posts/hello.md","utf8");
const body = marked(md);

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