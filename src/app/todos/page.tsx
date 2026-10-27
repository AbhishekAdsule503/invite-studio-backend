import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";

export default async function TodosPage() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey =
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) {
    return (
      <div style={{ maxWidth: 600, margin: "40px auto", padding: "20px", fontFamily: "var(--font-sans)" }}>
        <h1 style={{ fontSize: "1.5rem", marginBottom: "16px" }}>Todos List (Demo)</h1>
        <p style={{ color: "#666" }}>
          Supabase environment variables (<code>NEXT_PUBLIC_SUPABASE_URL</code> and <code>NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY</code>) are not configured for this demo page.
        </p>
      </div>
    );
  }

  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const { data: todos } = await supabase.from("todos").select();

  return (
    <div style={{ maxWidth: 600, margin: "40px auto", padding: "20px", fontFamily: "var(--font-sans)" }}>
      <h1 style={{ fontSize: "1.5rem", marginBottom: "16px" }}>Todos List</h1>
      <ul style={{ listStyle: "disc", paddingLeft: "20px" }}>
        {todos && todos.length > 0 ? (
          todos.map((todo: { id: string | number; name?: string; title?: string }) => (
            <li key={todo.id}>{todo.name || todo.title || JSON.stringify(todo)}</li>
          ))
        ) : (
          <p style={{ color: "#666" }}>No todos found or table empty.</p>
        )}
      </ul>
    </div>
  );
}
