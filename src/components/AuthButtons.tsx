import { supabase } from '@/lib/supabase';

export default function AuthButtons() {
  async function onSignIn(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const email = String(fd.get('email'));
    const password = String(fd.get('password'));
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) alert(error.message);
  }
  async function onSignUp(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const email = String(fd.get('email'));
    const password = String(fd.get('password'));
    const { error } = await supabase.auth.signUp({ email, password });
    alert(error ? error.message : 'Controlla la mail per confermare.');
  }
  async function onGoogle() {
    await supabase.auth.signInWithOAuth({ provider: 'google', options: { redirectTo: window.location.origin } });
  }
  async function onSignOut() { await supabase.auth.signOut(); }

  return (
    <div style={{ display:'grid', gap:10 }}>
      <form onSubmit={onSignIn}>
        <input name="email" type="email" placeholder="Email" required />
        <input name="password" type="password" placeholder="Password" required />
        <button type="submit">Entra</button>
      </form>

      <form onSubmit={onSignUp}>
        <input name="email" type="email" placeholder="Email" required />
        <input name="password" type="password" placeholder="Password (min 6)" required />
        <button type="submit">Registrati</button>
      </form>

      <button onClick={onGoogle}>Entra con Google</button>
      <button onClick={onSignOut}>Esci</button>
    </div>
  );
}
