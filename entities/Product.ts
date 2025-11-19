export interface Product {
    id: string;
    name: string;
    category: "bodycare" | "healthcare" | "skincare" | "haircare" | "other";
    description: string;
    price: number;
    image_url: string;
    stock: number;
    created_date: string;
    updated_date: string;
}

export class ProductEntity {
    private static STORAGE_KEY = 'serenity_products';

    private static getProducts(): Product[] {
        const data = localStorage.getItem(this.STORAGE_KEY);
        return data ? JSON.parse(data) : [];
    }

    private static saveProducts(products: Product[]): void {
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(products));
    }

    static async list(orderBy?: string, limit?: number): Promise<Product[]> {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 300));
        let products = this.getProducts();

        // Simple sorting implementation
        if (orderBy === '-created_date') {
            products.sort((a, b) => new Date(b.created_date).getTime() - new Date(a.created_date).getTime());
        }

        return products;
    }

    static async get(id: string): Promise<Product | null> {
        await new Promise(resolve => setTimeout(resolve, 200));
        const products = this.getProducts();
        return products.find(p => p.id === id) || null;
    }

    static async create(data: Omit<Product, 'id' | 'created_date' | 'updated_date'>): Promise<Product> {
        await new Promise(resolve => setTimeout(resolve, 400));
        const products = this.getProducts();

        const newProduct: Product = {
            ...data,
            id: crypto.randomUUID(),
            created_date: new Date().toISOString(),
            updated_date: new Date().toISOString()
        };

        products.push(newProduct);
        this.saveProducts(products);

        return newProduct;
    }

    static async update(id: string, data: Partial<Product>): Promise<Product> {
        await new Promise(resolve => setTimeout(resolve, 400));
        const products = this.getProducts();
        const index = products.findIndex(p => p.id === id);

        if (index === -1) throw new Error('Product not found');

        const updatedProduct = {
            ...products[index],
            ...data,
            updated_date: new Date().toISOString()
        };

        products[index] = updatedProduct;
        this.saveProducts(products);

        return updatedProduct;
    }

    static async delete(id: string): Promise<void> {
        await new Promise(resolve => setTimeout(resolve, 400));
        const products = this.getProducts();
        const filteredProducts = products.filter(p => p.id !== id);
        this.saveProducts(filteredProducts);
    }

    // Helper to seed initial data if empty
    static async seedInitialData(): Promise<void> {
        const products = this.getProducts();
        if (products.length === 0) {
            const initialProducts: Omit<Product, 'id' | 'created_date' | 'updated_date'>[] = [
                {
                    name: "Luxury Body Oil",
                    category: "bodycare",
                    description: "Rich, hydrating body oil infused with jasmine and sandalwood.",
                    price: 1200,
                    image_url: "https://images.pexels.com/photos/672451/pexels-photo-672451.jpeg?auto=compress&cs=tinysrgb&w=600",
                    stock: 50
                },
                {
                    name: "Organic Face Serum",
                    category: "skincare",
                    description: "Vitamin C enriched serum for glowing skin.",
                    price: 2500,
                    image_url: "https://images.pexels.com/photos/3685530/pexels-photo-3685530.jpeg?auto=compress&cs=tinysrgb&w=600",
                    stock: 30
                },
                {
                    name: "Herbal Hair Mask",
                    category: "haircare",
                    description: "Deep conditioning mask for damaged hair.",
                    price: 1500,
                    image_url: "https://images.pexels.com/photos/4465124/pexels-photo-4465124.jpeg?auto=compress&cs=tinysrgb&w=600",
                    stock: 45
                },
                {
                    name: "Aromatherapy Candle",
                    category: "healthcare",
                    description: "Soy wax candle with lavender essential oil for stress relief.",
                    price: 800,
                    image_url: "https://images.pexels.com/photos/7260252/pexels-photo-7260252.jpeg?auto=compress&cs=tinysrgb&w=600",
                    stock: 100
                }
            ];

            for (const p of initialProducts) {
                await this.create(p);
            }
        }
    }
}
