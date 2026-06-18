import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="min-h-screen bg-mist">
      <div className="container py-20">
        <div className="card p-10 text-center">
          <p className="eyebrow">Not found</p>
          <h1 className="mt-3 text-4xl font-extrabold text-navy">Page not found</h1>
          <p className="mt-4 text-lg">Please return to the public site or contact Creotech staff if you need support.</p>
          <Link className="btn btn-primary mt-8" href="/ja">
            Back to home
          </Link>
        </div>
      </div>
    </main>
  );
}
