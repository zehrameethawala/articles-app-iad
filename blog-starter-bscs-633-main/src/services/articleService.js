export async function createArticle({ title, body }) {
  const token = localStorage.getItem("token");
  const article = {
    _id: Math.random().toString(),
    date: new Date(),
    title,
    body,
  };

  const response = await fetch("http://localhost:3000/articles/create-article", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify(article),
  });

  if (!response.ok) {
    throw new Error("Failed to create article");
  }

  const data = await response.json();
  return data;
}

export async function fetchArticles() {
  const token = localStorage.getItem("token");
  const response = await fetch("http://localhost:3000/articles", {
    headers: {
      "Authorization": `Bearer ${token}`
    }
  });

  if (!response.ok) {
    throw new Error("Failed to fetch articles");
  }

  const articles = await response.json();
  return articles;
}