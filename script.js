const themeButton = document.querySelector("#theme-toggle");

themeButton.addEventListener("click",()=>{
    document.body.classList.toggle("dark");
})

async function renderPosts(){
    const response = await fetch("posts.json");
    const posts = await response.json();

    const listHtml = [...posts]
        .sort((a,b)=>b.date.localeCompare(a.date))
        .map(post=>`
            <li>
                <a href="${post.slug}.html">${post.title}</a>
                <time datetime="${post.date}">${post.date}</time>
            </li>
        `)
        .join("");
    
    document.querySelector("#post-list").innerHTML = listHtml;
}

renderPosts();
