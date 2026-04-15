export default function LoginPage() {
  return (
    <main className="min-h-screen grid place-items-center bg-background">
      <form className="panel w-full max-w-md p-6 space-y-4">
        <h1 className="text-xl font-semibold">Admin Login</h1>
        <input className="input" placeholder="Email" />
        <input className="input" type="password" placeholder="Password" />
        <button type="submit" className="btn w-full justify-center">Sign in</button>
      </form>
    </main>
  );
}
