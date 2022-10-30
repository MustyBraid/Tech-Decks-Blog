const submitPost = async (event) => {
  event.preventDefault();

  const title = document.querySelector("#title").value.trim();
  const content = document.querySelector("#content").value.trim();

  if (title && content) {
    const response = await fetch("/api/posts/", {
      method: "POST",
      body: JSON.stringify({ title, content }),
      headers: { "Content-Type": "application/json" },
    });
  } else {
    window.Error("please provide a title and content for each post");
  }
};
document.querySelector("#postButton").addEventListener("click", submitPost);
