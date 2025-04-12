import supabase from '../../lib/supabase';

export default async function handler(req, res) {
  const { method } = req;

  if (method === 'GET') {
    // Fetch weddings
    const { data, error } = await supabase.from('weddings').select('*');
    if (error) return res.status(400).json({ error: error.message });
    return res.status(200).json(data);
  } else if (method === 'POST') {
    // Create a new wedding
    const { name, date, location } = req.body;
    const { data, error } = await supabase.from('weddings').insert([
      { name, date, location },
    ]);
    if (error) return res.status(400).json({ error: error.message });
    return res.status(201).json(data);
  } else if (method === 'PUT') {
    // Edit an existing wedding
    const { id, name, date, location } = req.body;
    const { data, error } = await supabase
      .from('weddings')
      .update({ name, date, location })
      .eq('id', id);
    if (error) return res.status(400).json({ error: error.message });
    return res.status(200).json(data);
  } else if (method === 'DELETE') {
    // Delete a wedding
    const { id } = req.query;
    const { data, error } = await supabase
      .from('weddings')
      .delete()
      .eq('id', id);
    if (error) return res.status(400).json({ error: error.message });
    return res.status(200).json({ message: 'Wedding deleted' });
  }
}
