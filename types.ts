
export interface Memory {
  id: string;
  url: string;
  caption: string;
  category: 'casual' | 'professional' | 'outdoors' | 'special';
  created_at?: string;
}
