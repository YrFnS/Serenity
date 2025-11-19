import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, Search, Filter, Star, Plus, Minus, X, ShoppingCart } from "lucide-react";
import { Product, ProductEntity } from "@/entities/Product";

export default function Shop() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [activeCategory, setActiveCategory] = useState("all");
    const [searchQuery, setSearchQuery] = useState("");
    const [cart, setCart] = useState<{ product: Product, quantity: number }[]>([]);
    const [isCartOpen, setIsCartOpen] = useState(false);

    useEffect(() => {
        loadProducts();
    }, []);

    const loadProducts = async () => {
        try {
            setLoading(true);
            await ProductEntity.seedInitialData();
            const data = await ProductEntity.list("-created_date");
            setProducts(data);
        } catch (error) {
            console.error("Failed to load products", error);
        } finally {
            setLoading(false);
        }
    };

    const categories = [
        { id: "all", label: "All Products" },
        { id: "bodycare", label: "Body Care" },
        { id: "skincare", label: "Skin Care" },
        { id: "haircare", label: "Hair Care" },
        { id: "healthcare", label: "Health Care" },
        { id: "other", label: "Accessories" }
    ];

    const filteredProducts = useMemo(() => {
        return products.filter(product => {
            const matchesCategory = activeCategory === "all" || product.category === activeCategory;
            const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                product.description.toLowerCase().includes(searchQuery.toLowerCase());
            return matchesCategory && matchesSearch;
        });
    }, [products, activeCategory, searchQuery]);

    const addToCart = (product: Product) => {
        setCart(prev => {
            const existing = prev.find(item => item.product.id === product.id);
            if (existing) {
                return prev.map(item =>
                    item.product.id === product.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            }
            return [...prev, { product, quantity: 1 }];
        });
        setIsCartOpen(true);
    };

    const removeFromCart = (productId: string) => {
        setCart(prev => prev.filter(item => item.product.id !== productId));
    };

    const updateQuantity = (productId: string, delta: number) => {
        setCart(prev => prev.map(item => {
            if (item.product.id === productId) {
                const newQuantity = Math.max(1, item.quantity + delta);
                return { ...item, quantity: newQuantity };
            }
            return item;
        }));
    };

    const cartTotal = cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);

    return (
        <div className="min-h-screen bg-[#F8F2EC] pt-24 pb-12">
            <div className="max-w-7xl mx-auto px-6">
                {/* Header */}
                <div className="text-center mb-12">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-2 bg-[#C8A882]/10 rounded-full px-4 py-2 mb-6"
                    >
                        <ShoppingBag className="w-4 h-4 text-[#C8A882]" />
                        <span className="text-sm font-medium text-[#C8A882]">Serenity Shop</span>
                    </motion.div>

                    <h1 className="font-serif text-4xl md:text-5xl font-bold text-[#0F0F0F] mb-6">
                        Curated Wellness Essentials
                    </h1>
                    <p className="text-gray-600 max-w-2xl mx-auto text-lg">
                        Bring the spa experience home with our premium collection of body care,
                        skincare, and wellness products.
                    </p>
                </div>

                {/* Filters & Search */}
                <div className="flex flex-col md:flex-row gap-6 items-center justify-between mb-12 sticky top-24 z-30 bg-[#F8F2EC]/95 backdrop-blur py-4">
                    <div className="flex overflow-x-auto pb-2 md:pb-0 gap-2 w-full md:w-auto no-scrollbar">
                        {categories.map(cat => (
                            <button
                                key={cat.id}
                                onClick={() => setActiveCategory(cat.id)}
                                className={`px-6 py-2 rounded-full whitespace-nowrap transition-all ${activeCategory === cat.id
                                        ? "bg-[#C8A882] text-white shadow-lg"
                                        : "bg-white text-gray-600 hover:bg-[#C8A882]/10"
                                    }`}
                            >
                                {cat.label}
                            </button>
                        ))}
                    </div>

                    <div className="flex items-center gap-4 w-full md:w-auto">
                        <div className="relative flex-1 md:w-64">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search products..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 rounded-full border-none bg-white shadow-sm focus:ring-2 focus:ring-[#C8A882] outline-none"
                            />
                        </div>

                        <button
                            onClick={() => setIsCartOpen(true)}
                            className="relative p-3 bg-white rounded-full shadow-sm hover:shadow-md transition-all"
                        >
                            <ShoppingCart className="w-5 h-5 text-[#0F0F0F]" />
                            {cart.length > 0 && (
                                <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#C8A882] text-white text-xs font-bold rounded-full flex items-center justify-center">
                                    {cart.reduce((acc, item) => acc + item.quantity, 0)}
                                </span>
                            )}
                        </button>
                    </div>
                </div>

                {/* Product Grid */}
                {loading ? (
                    <div className="flex justify-center py-20">
                        <div className="w-12 h-12 border-4 border-[#C8A882] border-t-transparent rounded-full animate-spin"></div>
                    </div>
                ) : (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                        <AnimatePresence>
                            {filteredProducts.map((product) => (
                                <motion.div
                                    key={product.id}
                                    layout
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300"
                                >
                                    <div className="relative h-64 overflow-hidden bg-gray-100">
                                        <img
                                            src={product.image_url}
                                            alt={product.name}
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                        />
                                        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                                        <button
                                            onClick={() => addToCart(product)}
                                            className="absolute bottom-4 right-4 bg-white text-[#0F0F0F] px-4 py-2 rounded-full font-medium shadow-lg translate-y-12 group-hover:translate-y-0 transition-transform duration-300 flex items-center gap-2"
                                        >
                                            <Plus className="w-4 h-4" />
                                            Add
                                        </button>
                                    </div>

                                    <div className="p-6">
                                        <div className="flex justify-between items-start mb-2">
                                            <h3 className="font-serif text-lg font-bold text-[#0F0F0F] group-hover:text-[#C8A882] transition-colors">
                                                {product.name}
                                            </h3>
                                            <span className="font-bold text-[#C8A882]">₹{product.price}</span>
                                        </div>

                                        <p className="text-gray-500 text-sm mb-4 line-clamp-2">
                                            {product.description}
                                        </p>

                                        <div className="flex items-center gap-1 mb-4">
                                            {[...Array(5)].map((_, i) => (
                                                <Star key={i} className="w-3 h-3 text-[#C8A882] fill-current" />
                                            ))}
                                            <span className="text-xs text-gray-400 ml-2">(New)</span>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>
                )}

                {filteredProducts.length === 0 && !loading && (
                    <div className="text-center py-20">
                        <p className="text-gray-500 text-lg">No products found matching your criteria.</p>
                    </div>
                )}
            </div>

            {/* Cart Sidebar */}
            <AnimatePresence>
                {isCartOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsCartOpen(false)}
                            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
                        />
                        <motion.div
                            initial={{ x: "100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "100%" }}
                            transition={{ type: "spring", damping: 25, stiffness: 200 }}
                            className="fixed top-0 right-0 h-full w-full max-w-md bg-white z-50 shadow-2xl flex flex-col"
                        >
                            <div className="p-6 border-b border-gray-100 flex items-center justify-between">
                                <h2 className="font-serif text-2xl font-bold text-[#0F0F0F]">Your Cart</h2>
                                <button
                                    onClick={() => setIsCartOpen(false)}
                                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                                >
                                    <X className="w-6 h-6 text-gray-500" />
                                </button>
                            </div>

                            <div className="flex-1 overflow-y-auto p-6 space-y-6">
                                {cart.length === 0 ? (
                                    <div className="text-center py-12">
                                        <ShoppingBag className="w-16 h-16 text-gray-200 mx-auto mb-4" />
                                        <p className="text-gray-500">Your cart is empty</p>
                                        <button
                                            onClick={() => setIsCartOpen(false)}
                                            className="mt-4 text-[#C8A882] font-medium hover:underline"
                                        >
                                            Continue Shopping
                                        </button>
                                    </div>
                                ) : (
                                    cart.map((item) => (
                                        <div key={item.product.id} className="flex gap-4">
                                            <div className="w-20 h-20 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                                                <img
                                                    src={item.product.image_url}
                                                    alt={item.product.name}
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                            <div className="flex-1">
                                                <div className="flex justify-between items-start">
                                                    <h3 className="font-medium text-[#0F0F0F]">{item.product.name}</h3>
                                                    <button
                                                        onClick={() => removeFromCart(item.product.id)}
                                                        className="text-gray-400 hover:text-red-500 transition-colors"
                                                    >
                                                        <X className="w-4 h-4" />
                                                    </button>
                                                </div>
                                                <p className="text-[#C8A882] font-medium mt-1">₹{item.product.price}</p>

                                                <div className="flex items-center gap-3 mt-3">
                                                    <button
                                                        onClick={() => updateQuantity(item.product.id, -1)}
                                                        className="p-1 rounded-full border border-gray-200 hover:bg-gray-50"
                                                    >
                                                        <Minus className="w-3 h-3 text-gray-600" />
                                                    </button>
                                                    <span className="text-sm font-medium w-4 text-center">{item.quantity}</span>
                                                    <button
                                                        onClick={() => updateQuantity(item.product.id, 1)}
                                                        className="p-1 rounded-full border border-gray-200 hover:bg-gray-50"
                                                    >
                                                        <Plus className="w-3 h-3 text-gray-600" />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>

                            {cart.length > 0 && (
                                <div className="p-6 border-t border-gray-100 bg-gray-50">
                                    <div className="flex justify-between items-center mb-4">
                                        <span className="text-gray-600">Subtotal</span>
                                        <span className="font-bold text-xl text-[#0F0F0F]">₹{cartTotal.toLocaleString()}</span>
                                    </div>
                                    <button className="w-full bg-[#C8A882] text-white py-4 rounded-xl font-medium hover:bg-[#FF5C8D] transition-colors shadow-lg">
                                        Checkout Now
                                    </button>
                                </div>
                            )}
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
}
