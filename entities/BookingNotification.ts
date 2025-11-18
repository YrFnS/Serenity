export interface BookingNotification {
  id?: string;
  booking_id: string;
  client_name: string;
  client_email: string;
  client_phone: string;
  service_name: string;
  service_price?: number;
  service_duration?: string;
  appointment_date: string;
  appointment_time: string;
  special_requests?: string;
  notification_status: "pending" | "viewed" | "contacted";
  priority: "normal" | "high" | "urgent";
  created_date?: string;
  updated_date?: string;
}

export class BookingNotification {
  static async list(orderBy?: string, limit?: number): Promise<BookingNotification[]> {
    // This would typically connect to your backend API
    // For now, return empty array as placeholder
    return [];
  }

  static async get(id: string): Promise<BookingNotification | null> {
    // This would typically connect to your backend API
    return null;
  }

  static async create(data: Omit<BookingNotification, 'id' | 'created_date' | 'updated_date'>): Promise<BookingNotification> {
    // This would typically connect to your backend API
    throw new Error('Not implemented');
  }

  static async update(id: string, data: Partial<BookingNotification>): Promise<BookingNotification> {
    // This would typically connect to your backend API
    throw new Error('Not implemented');
  }

  static async delete(id: string): Promise<void> {
    // This would typically connect to your backend API
    throw new Error('Not implemented');
  }
}