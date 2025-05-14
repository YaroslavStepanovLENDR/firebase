import { useState } from "react";
import { db, auth } from "../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export default function AddListing() {
  const [form, setForm] = useState({
    title: "",
    brand: "",
    description: "",
    condition: "Used - good",
    category: "tools",
    tags: "",
    pricePerDay: 0,
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const user = auth.currentUser;

    try {
      await addDoc(collection(db, "listings"), {
        ...form,
        tags: form.tags.split(",").map((t) => t.trim()),
        pricePerDay: Number(form.pricePerDay),
        available: true,
        createdAt: serverTimestamp(),
        ownerId: user?.uid || "guest"
      });
      alert("Listing added!");
      setForm({ title: "", brand: "", description: "", condition: "Used - good", category: "tools", tags: "", pricePerDay: 0 });
    } catch (err) {
      console.error("Error adding listing: ", err);
      alert("Error saving listing.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 space-y-4 max-w-md mx-auto">
      <input name="title" value={form.title} onChange={handleChange} placeholder="Title" required />
      <input name="brand" value={form.brand} onChange={handleChange} placeholder="Brand" />
      <textarea name="description" value={form.description} onChange={handleChange} placeholder="Description" />
      <input name="tags" value={form.tags} onChange={handleChange} placeholder="Tags (comma separated)" />
      <input name="pricePerDay" type="number" value={form.pricePerDay} onChange={handleChange} placeholder="Price per day" />
      <button type="submit">Add Listing</button>
    </form>
  );
}
