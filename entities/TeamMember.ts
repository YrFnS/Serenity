export interface TeamMember {
  id?: string;
  name: string;
  title: string;
  bio?: string;
  image_url?: string;
  specialties?: string[];
  years_experience?: number;
  created_date?: string;
  updated_date?: string;
}

export class TeamMember {
  static async list(orderBy?: string, limit?: number): Promise<TeamMember[]> {
    // This would typically connect to your backend API
    // For now, return empty array as placeholder
    return [];
  }

  static async get(id: string): Promise<TeamMember | null> {
    // This would typically connect to your backend API
    return null;
  }

  static async create(data: Omit<TeamMember, 'id' | 'created_date' | 'updated_date'>): Promise<TeamMember> {
    // This would typically connect to your backend API
    throw new Error('Not implemented');
  }

  static async update(id: string, data: Partial<TeamMember>): Promise<TeamMember> {
    // This would typically connect to your backend API
    throw new Error('Not implemented');
  }

  static async delete(id: string): Promise<void> {
    // This would typically connect to your backend API
    throw new Error('Not implemented');
  }
}