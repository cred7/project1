export const fetchWithCredentials = async (
  url: string,
  options: RequestInit = {}
) => {
  try {
    const response = await fetch(url, {
      ...options,
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        ...(options.headers || {}),
      },
    });

    const data = await response.json();

    if (!response.ok) {
      console.log("halloo");
      throw { status: response.status, data };
    }

    return data;
  } catch (e) {
    console.log("hallo", e);
  }
};
