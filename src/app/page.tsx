import Link from "next/link";

export default function Home() {
  return (
    <div>
      <main>
        <p>Hola Mundo</p>

        <Link href='/users'>Ver Usuarios</Link>
      </main>
    </div>
  );
}
