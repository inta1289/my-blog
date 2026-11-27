const fs = require("fs");

const md = fs.readFileSync("posts/hello.md","utf8");
console.log(md);

const lines = md.split("\n");
console.log("줄 수: ",lines.length);
console.log("첫 줄: ",lines[0]);

fs.mkdirSync("dist",{ recursive: true});

const html = `<!DOCTYPE html>
<html lang="ko">
<head><meta charset="UTF-8"><title>hello</title></head>
<body><pre>${md}</pre></body>
</html>`;

fs.writeFileSync("dist/hello.html",html);
console.log("dist/hello.html 을 만들었어요!");

console.log(fs.readdirSync("posts"));