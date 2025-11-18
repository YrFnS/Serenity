export interface Service {
  id?: string;
  name: string;
  category: "hair_dresser" | "foot_massage" | "nail_polish" | "brow_polish" | "cosmetics";
  description?: string;
  price: number;
  duration?: string;
  image_url?: string;
  featured?: boolean;
  created_date?: string;
  updated_date?: string;
}

export class ServiceEntity {
  static async list(orderBy?: string, limit?: number): Promise<Service[]> {
    // This would typically connect to your backend API
    // For now, return empty array as placeholder
    return [];
  }

  static async get(id: string): Promise<Service | null> {
    // This would typically connect to your backend API
    return null;
  }

  static async create(data: Omit<Service, 'id' | 'created_date' | 'updated_date'>): Promise<Service> {
    // This would typically connect to your backend API
    throw new Error('Not implemented');
  }

  static async update(id: string, data: Partial<Service>): Promise<Service> {
    // This would typically connect to your backend API
    throw new Error('Not implemented');
  }

  static async delete(id: string): Promise<void> {
    // This would typically connect to your backend API
    throw new Error('Not implemented');
  }
}