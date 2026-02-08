import { useState } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { Plus, Search, Filter, Edit2, Trash2, X, Upload, Loader2, Image as ImageIcon } from "lucide-react";
import { toast } from "sonner";
import type { Id } from "../../../convex/_generated/dataModel";

export function AdminProducts() {
    const products = useQuery(api.products.list, { onlyActive: false });
    const removeProduct = useMutation(api.products.remove);
    const updateProduct = useMutation(api.products.update);
    const [searchTerm, setSearchTerm] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingProduct, setEditingProduct] = useState<any>(null);

    const filteredProducts = products?.filter(p =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (p.code && p.code.toLowerCase().includes(searchTerm.toLowerCase())) ||
        p.category.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleDelete = async (id: Id<"products">) => {
        if (confirm("Are you sure you want to delete this product?")) {
            try {
                await removeProduct({ id });
                toast.success("Product deleted successfully");
            } catch (error) {
                toast.error("Failed to delete product");
            }
        }
    };

    return (
        <div className="space-y-8">
            <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="font-serif text-4xl text-foreground mb-2">Products</h1>
                    <p className="text-foreground/40">Manage your furniture collection and inventory.</p>
                </div>
                <button
                    onClick={() => {
                        setEditingProduct(null);
                        setIsModalOpen(true);
                    }}
                    className="btn-primary flex items-center gap-2 self-start"
                >
                    <Plus className="w-5 h-5" />
                    Add Product
                </button>
            </header>

            {/* Toolbar */}
            <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <input
                        type="text"
                        placeholder="Search products..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full bg-white border border-border shadow-sm rounded-xl pl-12 pr-4 py-3 text-foreground focus:outline-none focus:border-gold/50 transition-colors"
                    />
                </div>
                <button className="flex items-center gap-2 px-6 py-3 bg-white border border-border shadow-sm rounded-xl text-muted-foreground hover:text-foreground hover:bg-muted transition-colors">
                    <Filter className="w-5 h-5" />
                    Filter
                </button>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {!products ? (
                    Array.from({ length: 6 }).map((_, i) => (
                        <div key={i} className="h-96 bg-muted rounded-2xl animate-pulse" />
                    ))
                ) : filteredProducts?.length === 0 ? (
                    <div className="col-span-full py-20 text-center">
                        <p className="text-foreground/40 italic">No products found matching your search.</p>
                    </div>
                ) : (
                    filteredProducts?.map((product) => (
                        <div key={product._id} className="group bg-white border border-border shadow-sm rounded-2xl overflow-hidden hover:border-gold/30 hover:shadow-md transition-all duration-500">
                            <div className="aspect-[4/3] relative overflow-hidden bg-muted">
                                {product.imageUrl ? (
                                    <img
                                        src={product.imageUrl}
                                        alt={product.name}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                    />
                                ) : (
                                    <div className="w-full h-full flex flex-col items-center justify-center text-foreground/20">
                                        <ImageIcon className="w-12 h-12 mb-2" />
                                        <span className="text-xs uppercase tracking-widest font-medium">No Image</span>
                                    </div>
                                )}
                                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                                    <button
                                        onClick={() => {
                                            setEditingProduct(product);
                                            setIsModalOpen(true);
                                        }}
                                        className="w-12 h-12 rounded-full bg-white text-foreground flex items-center justify-center hover:bg-gold transition-colors"
                                    >
                                        <Edit2 className="w-5 h-5" />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(product._id)}
                                        className="w-12 h-12 rounded-full bg-red-400 text-white flex items-center justify-center hover:bg-red-500 transition-colors"
                                        title="Delete Product"
                                    >
                                        <Trash2 className="w-5 h-5" />
                                    </button>
                                    <button
                                        onClick={async () => {
                                            try {
                                                await updateProduct({
                                                    id: product._id,
                                                    name: product.name,
                                                    code: product.code,
                                                    description: product.description,
                                                    price: product.price,
                                                    category: product.category,
                                                    featured: product.featured,
                                                    active: product.active === false, // Toggle logic: if false -> true, if undefined/true -> false
                                                    finishes: product.finishes,
                                                    imageStorageId: product.imageStorageId
                                                });
                                                toast.success(`Product ${product.active === false ? 'enabled' : 'disabled'}`);
                                            } catch (e) {
                                                toast.error("Failed to toggle status");
                                            }
                                        }}
                                        className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors ${product.active === false ? 'bg-green-500 text-white hover:bg-green-600' : 'bg-gray-400 text-white hover:bg-gray-500'
                                            }`}
                                        title={product.active === false ? "Enable Product" : "Disable Product"}
                                    >
                                        {product.active === false ? <Plus className="w-5 h-5" /> : <X className="w-5 h-5" />}
                                    </button>
                                </div>
                            </div>
                            <div className="p-6">
                                <div className="flex items-start justify-between mb-4">
                                    <div>
                                        <div className="flex items-center gap-2">
                                            <h3 className="font-serif text-xl text-foreground">{product.name}</h3>
                                            <span className="text-[10px] bg-muted px-1.5 py-0.5 rounded text-muted-foreground font-mono">{product.code}</span>
                                            {product.featured && (
                                                <span className="text-[10px] bg-gold/10 text-gold px-1.5 py-0.5 rounded font-medium uppercase tracking-tight">Featured</span>
                                            )}
                                            {product.active === false && (
                                                <span className="text-[10px] bg-red-100 text-red-600 px-1.5 py-0.5 rounded font-medium uppercase tracking-tight">Disabled</span>
                                            )}
                                        </div>
                                        <p className="text-xs text-gold uppercase tracking-widest mt-1">{product.category}</p>
                                    </div>
                                    <p className="font-medium text-foreground text-lg">₹ {product.price.toLocaleString()}</p>
                                </div>
                                <p className="text-foreground/40 text-sm line-clamp-2">{product.description}</p>
                            </div>
                        </div>
                    ))
                )}
            </div>

            {isModalOpen && (
                <ProductModal
                    onClose={() => setIsModalOpen(false)}
                    product={editingProduct}
                />
            )}
        </div>
    );
}

function ProductModal({ onClose, product }: any) {
    const generateUploadUrl = useMutation(api.products.generateUploadUrl);
    const createProduct = useMutation(api.products.create);
    const updateProduct = useMutation(api.products.update);

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(product?.imageUrl || null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setSelectedFile(file);
            setPreviewUrl(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const formData = new FormData(e.currentTarget);
            let imageStorageId = product?.imageStorageId;

            if (selectedFile) {
                const postUrl = await generateUploadUrl();
                const result = await fetch(postUrl, {
                    method: "POST",
                    headers: { "Content-Type": selectedFile.type },
                    body: selectedFile,
                });
                const { storageId } = await result.json();
                imageStorageId = storageId;
            }

            const productData: any = {
                name: formData.get("name") as string,
                description: formData.get("description") as string,
                price: Number(formData.get("price")),
                category: formData.get("category") as string,
                featured: formData.get("featured") === "on",
                active: formData.get("active") === "on",
                finishes: (formData.get("finishes") as string || "").split(",").map(f => f.trim()).filter(Boolean),
            };

            if (imageStorageId) {
                productData.imageStorageId = imageStorageId;
            }

            if (product) {
                productData.code = product.code; // preserve code on update
            }

            if (product) {
                await updateProduct({ id: product._id, ...productData });
                toast.success("Product updated successfully");
            } else {
                await createProduct(productData);
                toast.success("Product created successfully");
            }
            onClose();
        } catch (error: any) {
            console.error(error);
            const errorMessage = error.data?.message || error.message || "An error occurred";
            toast.error(errorMessage);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 lg:p-12 overflow-y-auto">
            <div className="bg-white border border-border rounded-3xl w-full max-w-4xl shadow-2xl relative">
                <button
                    onClick={onClose}
                    className="absolute right-6 top-6 w-10 h-10 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors z-10"
                >
                    <X className="w-5 h-5" />
                </button>

                <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-2">
                    {/* Image Upload Area */}
                    <div className="p-8 lg:p-12 border-b lg:border-b-0 lg:border-r border-border">
                        <h2 className="font-serif text-3xl text-foreground mb-8">
                            {product ? "Edit Product" : "New Product"}
                        </h2>

                        <div className="group relative aspect-square rounded-2xl bg-muted border-2 border-dashed border-border hover:border-gold/30 overflow-hidden transition-all shadow-inner">
                            {previewUrl ? (
                                <>
                                    <img src={previewUrl} alt="Preview" className="w-full h-full object-cover" />
                                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2">
                                        <Upload className="w-8 h-8 text-gold" />
                                        <span className="text-xs font-medium uppercase tracking-widest text-gold text-white">Replace Image</span>
                                    </div>
                                </>
                            ) : (
                                <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 text-muted-foreground">
                                    <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center">
                                        <Upload className="w-8 h-8" />
                                    </div>
                                    <p className="text-sm font-medium">Click to upload image</p>
                                </div>
                            )}
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleFileChange}
                                className="absolute inset-0 opacity-0 cursor-pointer"
                            />
                        </div>
                        <p className="mt-4 text-xs text-foreground/30 italic text-center">Recommended size: 1200 x 900px</p>
                    </div>

                    {/* Form Fields */}
                    <div className="p-8 lg:p-12 space-y-6">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground px-1">Product Name</label>
                                <input
                                    name="name"
                                    defaultValue={product?.name}
                                    required
                                    className="w-full bg-white border border-border rounded-xl px-4 py-3 text-foreground focus:outline-none focus:border-gold/50 shadow-sm"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground px-1">Product Code</label>
                                <input
                                    name="code"
                                    value={product?.code || "Auto-generated"}
                                    disabled
                                    className="w-full bg-muted border border-border rounded-xl px-4 py-3 text-muted-foreground cursor-not-allowed shadow-sm"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground px-1">Category</label>
                                <select
                                    name="category"
                                    defaultValue={product?.category || "sofas"}
                                    className="w-full bg-white border border-border rounded-xl px-4 py-3 text-foreground focus:outline-none focus:border-gold/50 appearance-none shadow-sm"
                                >
                                    <option value="sofas">Sofas</option>
                                    <option value="beds">Beds</option>
                                    <option value="chairs">Chairs</option>
                                    <option value="tables">Tables</option>
                                    <option value="sectionals">Sectionals</option>
                                    <option value="mattresses">Mattresses</option>
                                </select>
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground px-1">Price (₹)</label>
                                <input
                                    name="price"
                                    type="number"
                                    defaultValue={product?.price}
                                    required
                                    className="w-full bg-white border border-border rounded-xl px-4 py-3 text-foreground focus:outline-none focus:border-gold/50 shadow-sm"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground px-1">Description</label>
                            <textarea
                                name="description"
                                defaultValue={product?.description}
                                rows={4}
                                className="w-full bg-white border border-border rounded-xl px-4 py-3 text-foreground focus:outline-none focus:border-gold/50 resize-none shadow-sm"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground px-1">Finishes (separated by comma)</label>
                            <input
                                name="finishes"
                                defaultValue={product?.finishes?.join(", ")}
                                placeholder="Beige, Grey, Black"
                                className="w-full bg-white border border-border rounded-xl px-4 py-3 text-foreground focus:outline-none focus:border-gold/50 shadow-sm"
                            />
                        </div>

                        <div className="flex flex-col gap-4 py-2 px-1">
                            <div className="flex items-center gap-3">
                                <input
                                    type="checkbox"
                                    name="featured"
                                    id="featured"
                                    defaultChecked={product?.featured}
                                    className="w-5 h-5 rounded bg-white border-border text-gold focus:ring-gold"
                                />
                                <label htmlFor="featured" className="text-sm text-muted-foreground">Mark as Featured Product</label>
                            </div>
                            <div className="flex items-center gap-3">
                                <input
                                    type="checkbox"
                                    name="active"
                                    id="active"
                                    defaultChecked={product ? product.active !== false : true}
                                    className="w-5 h-5 rounded bg-white border-border text-gold focus:ring-gold"
                                />
                                <label htmlFor="active" className="text-sm text-muted-foreground">Product Enabled (Visible to customers)</label>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full btn-primary h-14 flex items-center justify-center gap-2 mt-4"
                        >
                            {isSubmitting ? (
                                <>
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                    Processing...
                                </>
                            ) : (
                                product ? "Update Product" : "Create Product"
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
