export interface Testimonial {
  id?: string;
  client_name: string;
  rating: number;
  review: string;
  service?: string;
  date?: string;
  featured?: boolean;
  created_date?: string;
  updated_date?: string;
}

export class Testimonial {
  static async list(orderBy?: string, limit?: number): Promise<Testimonial[]> {
    // This would typically connect to your backend API
    // For now, return empty array as placeholder
    return [];
  }

  static async get(id: string): Promise<Testimonial | null> {
    // This would typically connect to your backend API
    return null;
  }

  static async create(data: Omit<Testimonial, 'id' | 'created_date' | 'updated_date'>): Promise<Testimonial> {
    // This would typically connect to your backend API
    throw new Error('Not implemented');
  }

  static async update(id: string, data: Partial<Testimonial>): Promise<Testimonial> {
    // This would typically connect to your backend API
    throw new Error('Not implemented');
  }

  static async delete(id: string): Promise<void> {
    // This would typically connect to your backend API
    throw new Error('Not implemented');
  }
}