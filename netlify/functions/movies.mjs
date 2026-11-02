
export default async (req) =>
{
    const title = new URL(req.url).searchParams.get("s")?.trim();

    if (!title || title.length > 100)
    {
        return Response.json({ error: "Please enter a movie title." }, { status: 400 });
    }

    const omdbUrl = new URL("https://www.omdbapi.com/");
    omdbUrl.searchParams.set("apiKey", process.env.OMDB_API_KEY);
    omdbUrl.searchParams.set("s", title);

    try
    {
        const response = await fetch(omdbUrl);
        const data = await response.json();
        return Response.json(data, { status: response.ok ? 200 : 502 });
    } catch (error)
    {
        console.error("OMDb request failed:", error);
        return Response.json({ error: "Movie search is unavailable." }, { status: 502 });
    }
};
export const config = {
    path: "/api/movies",
};
