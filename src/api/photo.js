const baseUrl = "https://api.unsplash.com";

export async function searchPhoto({ page = 1, per_page = 12 }) {
  const urlSearchParams = new URLSearchParams({
    // query,
    page,
    per_page,
  });
  const res = await fetch(`${baseUrl}/photos?${urlSearchParams}`, {
    method: "GET",
    headers: {
      Authorization: `Client-ID ${import.meta.env.VITE_UNSPLASH_API_KEY}`,
    },
  });
  if (!res.ok) {
    return null;
  }
  return res.json();
}

export async function getPhotoById(id) {
  const res = await fetch(`${baseUrl}/photos/${id}`, {
    method: "GET",
    headers: {
      Authorization: `Client-ID ${import.meta.env.VITE_UNSPLASH_API_KEY}`,
    },
  });
  if (!res.ok) {
    return null;
  }
  return res.json();
}
