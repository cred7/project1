"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Match,
  NewsFormData,
  NewsItem,
  Player,
  PlayerFormData,
  Product,
  ProductFormData,
} from "@/lib/types";
import { fetchWithCredentials } from "@/lib/utils/api";
import { useEffect, useState } from "react";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:9000";

const AdminPage = () => {
  const [activeTab, setActiveTab] = useState<
    "news" | "players" | "products" | "matches"
  >("news");
  const [news, setNews] = useState<NewsItem[]>([]);
  const [players, setPlayers] = useState<Player[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [matches, setMatches] = useState<Match[]>([]);
  const [editingNews, setEditingNews] = useState<NewsFormData | null>(null);
  const [editingPlayer, setEditingPlayer] = useState<PlayerFormData | null>(
    null
  );
  const [editingProduct, setEditingProduct] = useState<ProductFormData | null>(
    null
  );

  useEffect(() => {
    // All();
    fetchNews();
    fetchPlayers();
    fetchProducts();
    fetchMatches();
  }, []);

  // const fetchAll = (url: string) => {
  //   return new Promise<NewsItem[]>((res, rej) => {
  //     try {
  //       const data = fetchWithCredentials(`${BASE_URL}/${url}/`);

  //       res(data);
  //     } catch (e) {
  //       console.log("my eror from promies.all", e);
  //       rej(e);
  //     }
  //   });
  // };

  // const All = () =>
  //   Promise.all([
  //     fetchAll("news")
  //       .then((data: any) => {
  //         setNews(data);
  //       })
  //       .catch((e) => console.error("Failed to fetch news:", e)),
  //     fetchAll("shop")
  //       .then((data: any) => {
  //         setProducts(data);
  //       })
  //       .catch((e) => console.error("Failed to fetch shop:", e)),
  //     fetchAll("player")
  //       .then((data: any) => {
  //         setPlayers(data);
  //       })
  //       .catch((e) => console.error("Failed to fetch player:", e)),
  //     fetchAll("ws")
  //       .then((data: any) => {
  //         setMatches(data);
  //       })
  //       .catch((e) => console.error("Failed to fetch match:", e)),
  //     console.log("my product is fetched using promise chaining alot after"),
  //   ]).catch((d) => console.log("frommmmmmmm", d));

  const fetchNews = async () => {
    try {
      const data = await fetchWithCredentials(`${BASE_URL}/news/`);
      setNews(data);
    } catch (e) {
      console.error("Failed to fetch news:", e);
    }
  };

  const fetchPlayers = async () => {
    try {
      const data = await fetchWithCredentials(`${BASE_URL}/player/`);
      setPlayers(data);
    } catch (e) {
      console.error("Failed to fetch players:", e);
    }
  };

  const fetchProducts = async () => {
    try {
      const data = await fetchWithCredentials(`${BASE_URL}/shop/`);
      setProducts(data);
    } catch (e) {
      console.error("Failed to fetch products:", e);
    }
  };

  const fetchMatches = async () => {
    try {
      const data = await fetchWithCredentials(`${BASE_URL}/ws/`);
      setMatches(data);
      //   console.log("Fetched matches:", data);
    } catch (e) {
      console.error("Failed to fetch matches:", e);
    }
  };

  const handleCreateOrUpdateNews = async (data: NewsFormData) => {
    const isUpdate = !!data.id;
    const url = isUpdate
      ? `${BASE_URL}/news/${data.slug}/`
      : `${BASE_URL}/news/`;
    const method = isUpdate ? "PUT" : "POST";

    const formData = new FormData();
    for (const [key, value] of Object.entries(data)) {
      if (key === "thumbnail" && value instanceof File) {
        formData.append(key, value);
      } else if (value !== undefined && value !== null) {
        formData.append(key, String(value));
      }
    }

    try {
      await fetchWithCredentials(url, { method, body: formData });
      fetchNews();
      setEditingNews(null);
    } catch (e) {
      console.error("Failed to save news:", e);
    }
  };

  const handleDeleteNews = async (slug: string) => {
    try {
      await fetchWithCredentials(`${BASE_URL}/news/${slug}/`, {
        method: "DELETE",
      });
      fetchNews();
    } catch (e) {
      console.error("Failed to delete news:", e);
    }
  };

  const handleCreateOrUpdatePlayer = async (data: PlayerFormData) => {
    const isUpdate = !!data.id;
    const url = isUpdate
      ? `${BASE_URL}/player/${data.slug}/`
      : `${BASE_URL}/player/`;
    const method = isUpdate ? "PUT" : "POST";

    const formData = new FormData();
    for (const [key, value] of Object.entries(data)) {
      if (key === "thumbnails" && value instanceof File) {
        formData.append(key, value);
      } else if (value !== undefined && value !== null) {
        formData.append(key, String(value));
      }
    }

    try {
      await fetchWithCredentials(url, { method, body: formData });
      fetchPlayers();
      setEditingPlayer(null);
    } catch (e) {
      console.error("Failed to save player:", e);
    }
  };

  const handleDeletePlayer = async (slug: string) => {
    try {
      await fetchWithCredentials(`${BASE_URL}/player/${slug}/`, {
        method: "DELETE",
      });
      fetchPlayers();
    } catch (e) {
      console.error("Failed to delete player:", e);
    }
  };

  const handleCreateOrUpdateProduct = async (data: ProductFormData) => {
    const isUpdate = !!data.id;
    const url = isUpdate ? `${BASE_URL}/shop/${data.id}/` : `${BASE_URL}/shop/`;
    const method = isUpdate ? "PUT" : "POST";

    const formData = new FormData();
    for (const [key, value] of Object.entries(data)) {
      if (key === "merchImage" && value instanceof File) {
        formData.append(key, value);
      } else if (value !== undefined && value !== null) {
        formData.append(key, String(value));
      }
    }

    try {
      await fetchWithCredentials(url, { method, body: formData });
      fetchProducts();
      setEditingProduct(null);
    } catch (e) {
      console.error("Failed to save product:", e);
    }
  };

  const handleDeleteProduct = async (id: number) => {
    try {
      await fetchWithCredentials(`${BASE_URL}/shop/${id}/`, {
        method: "DELETE",
      });
      fetchProducts();
    } catch (e) {
      console.error("Failed to delete product:", e);
    }
  };

  const handleUpdateMatch = async (
    matchId: number,
    data: {
      teamA_score: number;
      teamB_score: number;
      current_minute: number;
      status: string;
    }
  ) => {
    try {
      await fetchWithCredentials(`${BASE_URL}/ws/update-score/${matchId}/`, {
        method: "POST",
        body: JSON.stringify(data),
      });
      fetchMatches(); // Refresh matches to show updated data
    } catch (e) {
      console.error("Failed to update match:", e);
    }
  };

  const deleteMatch = async (matchId: number) => {
    try {
      await fetchWithCredentials(`${BASE_URL}/ws/${matchId}/`, {
        method: "DELETE",
      });
      fetchMatches(); // Refresh matches to show updated data
    } catch (e) {
      console.error("Failed to delete match:", e);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Admin Panel</h1>
      <div className="flex space-x-4 mb-4">
        <Button
          onClick={() => setActiveTab("news")}
          variant={activeTab === "news" ? "default" : "outline"}
        >
          News
        </Button>
        <Button
          onClick={() => setActiveTab("players")}
          variant={activeTab === "players" ? "default" : "outline"}
        >
          Players
        </Button>
        <Button
          onClick={() => setActiveTab("products")}
          variant={activeTab === "products" ? "default" : "outline"}
        >
          Products
        </Button>
        <Button
          onClick={() => setActiveTab("matches")}
          variant={activeTab === "matches" ? "default" : "outline"}
        >
          Live Matches
        </Button>
      </div>

      {activeTab === "news" && (
        <Card>
          <CardHeader>
            <CardTitle>Manage News</CardTitle>
          </CardHeader>
          <CardContent>
            <Button onClick={() => setEditingNews({})} className="mb-4">
              Create New News
            </Button>
            <ul className="space-y-2">
              {news.map((n) => (
                <li
                  key={n.id}
                  className="flex justify-between items-center p-2 border rounded"
                >
                  <span>{n.title}</span>
                  <div>
                    <Button
                      onClick={() => setEditingNews(n)}
                      size="sm"
                      className="mr-2"
                    >
                      Edit
                    </Button>
                    <Button
                      onClick={() => handleDeleteNews(n.slug)}
                      size="sm"
                      variant="destructive"
                    >
                      Delete
                    </Button>
                  </div>
                </li>
              ))}
            </ul>
            {editingNews && (
              <NewsForm
                onSubmit={handleCreateOrUpdateNews}
                initial={editingNews}
              />
            )}
          </CardContent>
        </Card>
      )}

      {activeTab === "players" && (
        <Card>
          <CardHeader>
            <CardTitle>Manage Players</CardTitle>
          </CardHeader>
          <CardContent>
            <Button onClick={() => setEditingPlayer({})} className="mb-4">
              Create New Player
            </Button>
            <ul className="space-y-2">
              {players.map((p) => (
                <li
                  key={p.id}
                  className="flex justify-between items-center p-2 border rounded"
                >
                  <span>
                    {p.first_name} {p.last_name}
                  </span>
                  <div>
                    <Button
                      onClick={() => setEditingPlayer(p)}
                      size="sm"
                      className="mr-2"
                    >
                      Edit
                    </Button>
                    <Button
                      onClick={() => handleDeletePlayer(p.slug)}
                      size="sm"
                      variant="destructive"
                    >
                      Delete
                    </Button>
                  </div>
                </li>
              ))}
            </ul>
            {editingPlayer && (
              <PlayerForm
                onSubmit={handleCreateOrUpdatePlayer}
                initial={editingPlayer}
              />
            )}
          </CardContent>
        </Card>
      )}

      {activeTab === "products" && (
        <Card>
          <CardHeader>
            <CardTitle>Manage Products</CardTitle>
          </CardHeader>
          <CardContent>
            <Button onClick={() => setEditingProduct({})} className="mb-4">
              Create New Product
            </Button>
            <ul className="space-y-2">
              {products.map((p) => (
                <li
                  key={p.id}
                  className="flex justify-between items-center p-2 border rounded"
                >
                  <span>{p.name}</span>
                  <div>
                    <Button
                      onClick={() => setEditingProduct(p)}
                      size="sm"
                      className="mr-2"
                    >
                      Edit
                    </Button>
                    <Button
                      onClick={() => handleDeleteProduct(p.id)}
                      size="sm"
                      variant="destructive"
                    >
                      Delete
                    </Button>
                  </div>
                </li>
              ))}
            </ul>
            {editingProduct && (
              <ProductForm
                onSubmit={handleCreateOrUpdateProduct}
                initial={editingProduct}
              />
            )}
          </CardContent>
        </Card>
      )}

      {activeTab === "matches" && (
        <Card>
          <CardHeader>
            <CardTitle>Manage Live Matches</CardTitle>
          </CardHeader>
          <CardContent>
            <button className="bg-red-400" onClick={fetchMatches}>
              matchesss
            </button>
            <ul className="space-y-4">
              {matches.map((m) => (
                <li key={m.id} className="border p-4 rounded ">
                  <h3 className="font-bold">
                    {m.teamA} vs {m.teamB}
                  </h3>
                  <div className="grid grid-cols-1 gap-2 md:grid-cols-3">
                    <p>
                      Score: {m.teamA_score} - {m.teamB_score}
                    </p>
                    <p>Minute: {m.current_minute}</p>
                    <p>Status: {m.status}</p>
                  </div>
                  <MatchUpdateForm
                    match={m}
                    onUpdate={handleUpdateMatch}
                    onDelete={deleteMatch}
                  />
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

const NewsForm = ({
  onSubmit,
  initial,
}: {
  onSubmit: (data: NewsFormData) => void;
  initial: NewsFormData;
}) => {
  const [form, setForm] = useState<NewsFormData>(initial);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 mt-4">
      <input
        type="text"
        placeholder="Title"
        value={form.title || ""}
        onChange={(e) => setForm({ ...form, title: e.target.value })}
        className="w-full p-2 border rounded"
        required
      />
      <textarea
        placeholder="Content"
        value={form.content || ""}
        onChange={(e) => setForm({ ...form, content: e.target.value })}
        className="w-full p-2 border rounded"
        required
      />
      <input
        type="text"
        placeholder="Author"
        value={form.author || ""}
        onChange={(e) => setForm({ ...form, author: e.target.value })}
        className="w-full p-2 border rounded"
        required
      />
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setForm({ ...form, thumbnail: e.target.files?.[0] })}
        className="w-full p-2 border rounded"
      />
      <Button type="submit">Submit</Button>
    </form>
  );
};

const PlayerForm = ({
  onSubmit,
  initial,
}: {
  onSubmit: (data: PlayerFormData) => void;
  initial: PlayerFormData;
}) => {
  const [form, setForm] = useState<PlayerFormData>(initial);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 mt-4">
      <input
        type="text"
        placeholder="First Name"
        value={form.first_name || ""}
        onChange={(e) => setForm({ ...form, first_name: e.target.value })}
        className="w-full p-2 border rounded"
        required
      />
      <input
        type="text"
        placeholder="Last Name"
        value={form.last_name || ""}
        onChange={(e) => setForm({ ...form, last_name: e.target.value })}
        className="w-full p-2 border rounded"
      />
      <select
        value={form.position || ""}
        onChange={(e) => setForm({ ...form, position: e.target.value })}
        className="w-full p-2 border rounded"
        required
      >
        <option value="">Select Position</option>
        <option value="forward">Forward</option>
        <option value="midfielder">Midfielder</option>
        <option value="defender">Defender</option>
        <option value="goalkeeper">Goalkeeper</option>
      </select>
      <input
        type="text"
        placeholder="Team"
        value={form.team || ""}
        onChange={(e) => setForm({ ...form, team: e.target.value })}
        className="w-full p-2 border rounded"
        required
      />
      <input
        type="number"
        placeholder="Number"
        value={form.number || ""}
        onChange={(e) => setForm({ ...form, number: parseInt(e.target.value) })}
        className="w-full p-2 border rounded"
        required
      />
      <input
        type="text"
        placeholder="Nationality"
        value={form.nationality || ""}
        onChange={(e) => setForm({ ...form, nationality: e.target.value })}
        className="w-full p-2 border rounded"
      />
      <input
        type="date"
        value={form.dob || ""}
        onChange={(e) => setForm({ ...form, dob: e.target.value })}
        className="w-full p-2 border rounded"
      />
      <input
        type="number"
        step="0.01"
        placeholder="Height (m)"
        value={form.height || ""}
        onChange={(e) =>
          setForm({ ...form, height: parseFloat(e.target.value) })
        }
        className="w-full p-2 border rounded"
      />
      <input
        type="number"
        step="0.01"
        placeholder="Weight (kg)"
        value={form.weight || ""}
        onChange={(e) =>
          setForm({ ...form, weight: parseFloat(e.target.value) })
        }
        className="w-full p-2 border rounded"
      />
      <textarea
        placeholder="Bio"
        value={form.bio || ""}
        onChange={(e) => setForm({ ...form, bio: e.target.value })}
        className="w-full p-2 border rounded"
      />
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setForm({ ...form, thumbnails: e.target.files?.[0] })}
        className="w-full p-2 border rounded"
      />
      <Button type="submit">Submit</Button>
    </form>
  );
};

const ProductForm = ({
  onSubmit,
  initial,
}: {
  onSubmit: (data: ProductFormData) => void;
  initial: ProductFormData;
}) => {
  const [form, setForm] = useState<ProductFormData>(initial);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 mt-4">
      <input
        type="text"
        placeholder="Name"
        value={form.name || ""}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
        className="w-full p-2 border rounded"
        required
      />
      <textarea
        placeholder="Description"
        value={form.description || ""}
        onChange={(e) => setForm({ ...form, description: e.target.value })}
        className="w-full p-2 border rounded"
        required
      />
      <input
        type="number"
        step="0.01"
        placeholder="Price"
        value={form.price || ""}
        onChange={(e) =>
          setForm({ ...form, price: parseFloat(e.target.value) })
        }
        className="w-full p-2 border rounded"
        required
      />
      <input
        type="number"
        placeholder="Stock"
        value={form.stock || ""}
        onChange={(e) => setForm({ ...form, stock: parseInt(e.target.value) })}
        className="w-full p-2 border rounded"
        required
      />
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setForm({ ...form, merchImage: e.target.files?.[0] })}
        className="w-full p-2 border rounded"
      />
      <Button type="submit">Submit</Button>
    </form>
  );
};

const MatchUpdateForm = ({
  match,
  onUpdate,
  onDelete,
}: {
  match: Match;
  onDelete: (matchId: number) => void;
  onUpdate: (
    matchId: number,
    data: {
      teamA_score: number;
      teamB_score: number;
      current_minute: number;
      status: string;
    }
  ) => void;
}) => {
  const [teamA_score, setTeamAScore] = useState(match.teamA_score);
  const [teamB_score, setTeamBScore] = useState(match.teamB_score);
  const [current_minute, setCurrentMinute] = useState(match.current_minute);
  const [status, setStatus] = useState(match.status);
  const deleteMatch = async (e: React.MouseEvent) => {
    e.preventDefault();
    onDelete(match.id);
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdate(match.id, { teamA_score, teamB_score, current_minute, status });
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4 space-y-2">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        <div className="flex flex-row items-center gap-2">
          <label htmlFor={match.teamA}>{match.teamA}</label>
          <input
            id={match.teamA}
            type="number"
            placeholder="Team A Score"
            value={teamA_score}
            onChange={(e) => setTeamAScore(parseInt(e.target.value) || 0)}
            className="p-2 border w-full rounded"
          />
        </div>
        <div className="flex flex-row items-center gap-2">
          <label htmlFor={match.teamB}>{match.teamB}</label>
          <input
            type="number"
            placeholder="Team B Score"
            value={teamB_score}
            onChange={(e) => setTeamBScore(parseInt(e.target.value) || 0)}
            className="p-2 border rounded w-full"
          />
        </div>
        <div className="flex flex-row items-center gap-2">
          <label htmlFor={match.teamB}>Time: </label>
          <input
            type="number"
            placeholder="Current Minute"
            value={current_minute}
            onChange={(e) => setCurrentMinute(parseInt(e.target.value) || 0)}
            className="p-2 border rounded w-full"
          />
        </div>
        <div className="flex flex-row items-center gap-2">
          <label htmlFor={match.status}>Match Status</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="p-2 border rounded w-full"
          >
            <option value="scheduled">Scheduled</option>
            <option value="live">Live</option>
            <option value="finished">Finished</option>
          </select>
        </div>
      </div>{" "}
      <div className="flex justify-between">
        <Button type="submit" className="mt-2">
          Update Match
        </Button>
        <Button
          onClick={deleteMatch}
          variant={"destructive"}
          className="mt-2 flex"
        >
          Delete Match
        </Button>
      </div>
    </form>
  );
};

export default AdminPage;
