import supabase from '../../lib/supabaseClient';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { user, error } = await supabase.auth.signIn({
      email: req.body.email,
      password: req.body.password,
    });
    
    if (error) return res.status(400).json({ error: error.message });
    res.status(200).json(user);
  } else if (req.method === 'DELETE') {
    const { error } = await supabase.auth.signOut();
    if (error) return res.status(400).json({ error: error.message });
    res.status(200).json({ message: 'Signed out successfully' });
  }
}
