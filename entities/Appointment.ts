export interface Appointment {
  id?: string;
  client_name: string;
  email: string;
  phone: string;
  service: string;
  preferred_date: string;
  preferred_time: string;
  message?: string;
  status: "pending" | "confirmed" | "completed" | "cancelled";
  service_price?: number;
  duration?: string;
  created_date?: string;
  updated_date?: string;
}

export class Appointment {
  static async list(orderBy?: string, limit?: number): Promise<Appointment[]> {
    // This would typically connect to your backend API
    // For now, return empty array as placeholder
    return [];
  }

  static async get(id: string): Promise<Appointment | null> {
    // This would typically connect to your backend API
    return null;
  }

  static async create(data: Omit<Appointment, 'id' | 'created_date' | 'updated_date'>): Promise<Appointment> {
    // This would typically connect to your backend API
    throw new Error('Not implemented');
  }

  static async update(id: string, data: Partial<Appointment>): Promise<Appointment> {
    // This would typically connect to your backend API
    throw new Error('Not implemented');
  }

  static async delete(id: string): Promise<void> {
    // This would typically connect to your backend API
    throw new Error('Not implemented');
  }
}