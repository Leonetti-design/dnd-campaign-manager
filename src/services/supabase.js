import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseKey = process.env.REACT_APP_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseKey);

// Service pour gérer les campagnes
export const campaignService = {
  async getAll() {
    const { data, error } = await supabase
      .from('campaigns')
      .select('*')
      .order('created_at', { ascending: false });
    if (error) throw error;
    return data;
  },

  async create(name) {
    const { data, error } = await supabase
      .from('campaigns')
      .insert([{ name, created_at: new Date().toISOString() }])
      .select()
      .single();
    if (error) throw error;
    return data;
  },

  async update(id, name) {
    const { data, error } = await supabase
      .from('campaigns')
      .update({ name })
      .eq('id', id)
      .select()
      .single();
    if (error) throw error;
    return data;
  },

  async delete(id) {
    const { error } = await supabase
      .from('campaigns')
      .delete()
      .eq('id', id);
    if (error) throw error;
  }
};

// Service pour gérer les personnages
export const characterService = {
  async getAll(campaignId, isNPC) {
    const { data, error } = await supabase
      .from('characters')
      .select('*')
      .eq('campaign_id', campaignId)
      .eq('is_npc', isNPC);
    if (error) throw error;
    return data;
  },

  async create(character) {
    const { data, error } = await supabase
      .from('characters')
      .insert([character])
      .select()
      .single();
    if (error) throw error;
    return data;
  },

  async update(id, character) {
    const { data, error } = await supabase
      .from('characters')
      .update(character)
      .eq('id', id)
      .select()
      .single();
    if (error) throw error;
    return data;
  },

  async delete(id) {
    const { error } = await supabase
      .from('characters')
      .delete()
      .eq('id', id);
    if (error) throw error;
  }
};

// Service pour l'équipement
export const equipmentService = {
  async getAll(campaignId) {
    const { data, error } = await supabase
      .from('equipment')
      .select('*')
      .eq('campaign_id', campaignId);
    if (error) throw error;
    return data;
  },

  async create(item) {
    const { data, error } = await supabase
      .from('equipment')
      .insert([item])
      .select()
      .single();
    if (error) throw error;
    return data;
  },

  async update(id, item) {
    const { data, error } = await supabase
      .from('equipment')
      .update(item)
      .eq('id', id)
      .select()
      .single();
    if (error) throw error;
    return data;
  },

  async delete(id) {
    const { error } = await supabase
      .from('equipment')
      .delete()
      .eq('id', id);
    if (error) throw error;
  }
};

// Service pour les sessions
export const sessionService = {
  async getAll(campaignId) {
    const { data, error } = await supabase
      .from('sessions')
      .select('*')
      .eq('campaign_id', campaignId)
      .order('date', { ascending: false });
    if (error) throw error;
    return data;
  },

  async create(session) {
    const { data, error } = await supabase
      .from('sessions')
      .insert([session])
      .select()
      .single();
    if (error) throw error;
    return data;
  },

  async update(id, session) {
    const { data, error } = await supabase
      .from('sessions')
      .update(session)
      .eq('id', id)
      .select()
      .single();
    if (error) throw error;
    return data;
  },

  async delete(id) {
    const { error } = await supabase
      .from('sessions')
      .delete()
      .eq('id', id);
    if (error) throw error;
  }
};

// Service pour l'or
export const goldService = {
  async get(campaignId) {
    const { data, error } = await supabase
      .from('campaigns')
      .select('gold')
      .eq('id', campaignId)
      .single();
    if (error) throw error;
    return data.gold || 0;
  },

  async update(campaignId, gold) {
    const { error } = await supabase
      .from('campaigns')
      .update({ gold })
      .eq('id', campaignId);
    if (error) throw error;
  }
};