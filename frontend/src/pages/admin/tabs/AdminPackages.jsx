import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { TextInput, TextArea, ImageDropzone } from '../../../components/admin/FormElements';
import { useToast } from '../../../components/ui/ToastProvider';
import { ConfirmModal } from '../../../components/ui/ConfirmModal';
import { Plus, Edit2, Trash2, MapPin, Clock, DollarSign } from 'lucide-react';
import { AuthContext } from '../../../context/AuthContext';

const AdminPackages = () => {
    const { addToast } = useToast();
    const { admin } = useContext(AuthContext);
    const [packages, setPackages] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [currentId, setCurrentId] = useState(null);
    const [deleteId, setDeleteId] = useState(null);

    const [formState, setFormState] = useState({
        id: '', title: '', price: '', duration: '', destination: '', inclusions: '', shows: '', description: '', image: '', category: 'tour'
    });

    useEffect(() => {
        fetchPackages();
    }, []);

    const fetchPackages = async () => {
        try {
            const { data } = await axios.get(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/packages`);
            setPackages(data);
        } catch (error) {
            console.error('Failed to fetch packages:', error);
            addToast('Failed to load packages', 'error');
        }
    };

    const openEdit = (pkg) => {
        setIsEditing(true);
        setCurrentId(pkg.id); // Package model uses 'id' instead of _id for routing
        setFormState({ 
            id: pkg.id || '',
            title: pkg.title || '', 
            price: pkg.price || '', 
            duration: pkg.duration || '', 
            destination: pkg.destination || '', 
            inclusions: pkg.inclusions?.join(', ') || '', 
            shows: pkg.shows?.join(', ') || '', 
            description: pkg.description || '', 
            image: pkg.image || '',
            category: pkg.category || 'tour'
        });
    };

    const openNew = () => {
        setIsEditing(true);
        setCurrentId(null);
        setFormState({
            id: `pkg-${Date.now()}`, title: '', price: '', duration: '', destination: '', inclusions: '', shows: '', description: '', image: '', category: 'tour'
        });
    };

    const handleChange = (field, value) => {
        setFormState(prev => ({ ...prev, [field]: value }));
    };

    const handleImageUpload = async (file) => {
        const formData = new FormData();
        formData.append('image', file);
        try {
            const config = { headers: { 'Content-Type': 'multipart/form-data', Authorization: `Bearer ${admin?.token || 'fake_token'}` } };
            const { data } = await axios.post(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/upload`, formData, config);
            handleChange('image', data.url);
            addToast('Image uploaded', 'success');
        } catch (error) {
            console.error(error);
            // Fallback for demo if backend auth blocks it (the user has a fake token fallback)
            handleChange('image', URL.createObjectURL(file));
            addToast('Using local preview (backend auth failed)', 'success');
        }
    };

    const handleSave = async () => {
        if (!formState.title || !formState.price || !formState.destination) {
            addToast('Title, Price, and Location are required', 'error');
            return;
        }

        const payload = {
            ...formState,
            inclusions: formState.inclusions.split(',').map(s => s.trim()).filter(Boolean),
            shows: formState.shows.split(',').map(s => s.trim()).filter(Boolean),
        };

        try {
            const config = { headers: { Authorization: `Bearer ${admin?.token || 'fake_token'}` } };
            if (currentId) {
                await axios.put(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/packages/${currentId}`, payload, config);
                addToast('Package updated successfully!', 'success');
            } else {
                await axios.post(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/packages`, payload, config);
                addToast('Package added successfully!', 'success');
            }
            setIsEditing(false);
            fetchPackages();
        } catch (error) {
            console.error(error);
            addToast('Error saving package', 'error');
        }
    };

    const handleDelete = async () => {
        try {
            const config = { headers: { Authorization: `Bearer ${admin?.token || 'fake_token'}` } };
            await axios.delete(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/packages/${deleteId}`, config);
            addToast('Package deleted!', 'success');
            setDeleteId(null);
            fetchPackages();
        } catch (error) {
            console.error(error);
            addToast('Error deleting package', 'error');
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">Holiday Packages</h3>
                    <p className="text-gray-500 dark:text-gray-400">Manage all your travel packages, pricing, and details.</p>
                </div>
                {!isEditing && (
                    <button onClick={openNew} className="flex items-center gap-2 px-4 py-2 bg-[#2B4560] text-white rounded-lg hover:bg-[#1f3246] transition-colors shadow-sm font-medium">
                        <Plus size={18} /> Add New Package
                    </button>
                )}
            </div>

            {isEditing ? (
                <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-300">
                    <div className="p-6 border-b border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
                        <h4 className="font-bold text-lg text-[#2B4560] dark:text-blue-400">
                            {currentId ? 'Edit Package Details' : 'Create New Package'}
                        </h4>
                    </div>
                    
                    <div className="p-6 space-y-6">
                        <ImageDropzone 
                            label="Cover Image" 
                            onFileSelect={handleImageUpload}
                            previewUrl={formState.image}
                            onClear={() => handleChange('image', '')}
                        />

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <TextInput label="Package Title" value={formState.title} onChange={(val) => handleChange('title', val)} required placeholder="e.g. Majestic Maldives" />
                            <TextInput label="Location (Pin-point)" value={formState.destination} onChange={(val) => handleChange('destination', val)} required placeholder="e.g. Male, Maldives" />
                            <TextInput label="Price (USD)" value={formState.price} onChange={(val) => handleChange('price', val)} required placeholder="e.g. 1299" type="number" />
                            <TextInput label="Duration" value={formState.duration} onChange={(val) => handleChange('duration', val)} placeholder="e.g. 3 Days, 2 Nights" />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <TextArea label="What's Included" value={formState.inclusions} onChange={(val) => handleChange('inclusions', val)} placeholder="Comma separated items (e.g. Flight, Hotel, Breakfast)" rows={3} />
                            <TextArea label="What's Excluded (Shows/Other)" value={formState.shows} onChange={(val) => handleChange('shows', val)} placeholder="Comma separated items" rows={3} />
                        </div>

                        <TextArea label="Full Description" value={formState.description} onChange={(val) => handleChange('description', val)} placeholder="Detailed overview of the package..." rows={5} />
                        
                        <div className="flex gap-4 pt-4 border-t border-gray-100 dark:border-gray-700">
                            <button onClick={handleSave} className="px-8 py-2.5 bg-[#2B4560] text-white font-medium rounded-lg hover:bg-[#1f3246] transition-colors shadow-sm">
                                Save Package
                            </button>
                            <button onClick={() => setIsEditing(false)} className="px-8 py-2.5 bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300 font-medium rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {packages.map((pkg) => (
                        <div key={pkg._id} className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden group hover:shadow-md transition-all flex flex-col">
                            <div className="h-48 bg-gray-200 dark:bg-gray-700 relative overflow-hidden">
                                {pkg.image ? (
                                    <img src={pkg.image} alt={pkg.title} className="w-full h-full object-cover" />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                                        No Image Provided
                                    </div>
                                )}
                                <div className="absolute top-4 right-4 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-bold text-[#2B4560] dark:text-blue-400 shadow-sm">
                                    ${pkg.price}
                                </div>
                            </div>
                            
                            <div className="p-5 flex-1 flex flex-col">
                                <h4 className="font-bold text-lg text-gray-900 dark:text-white mb-2 line-clamp-1">{pkg.title}</h4>
                                <div className="space-y-2 mb-4">
                                    <p className="text-sm text-gray-600 dark:text-gray-400 flex items-center gap-2">
                                        <MapPin size={16} className="text-[#2B4560] dark:text-blue-400" /> <span className="line-clamp-1">{pkg.destination}</span>
                                    </p>
                                    <p className="text-sm text-gray-600 dark:text-gray-400 flex items-center gap-2">
                                        <Clock size={16} className="text-[#2B4560] dark:text-blue-400" /> {pkg.duration}
                                    </p>
                                </div>
                                <p className="text-sm text-gray-500 line-clamp-2 flex-1 mb-4">
                                    {pkg.description}
                                </p>
                                
                                <div className="grid grid-cols-2 gap-2 mt-auto pt-4 border-t border-gray-100 dark:border-gray-700">
                                    <button onClick={() => openEdit(pkg)} className="flex items-center justify-center gap-2 py-2 bg-blue-50 text-blue-700 hover:bg-blue-100 dark:bg-blue-900/30 dark:text-blue-400 dark:hover:bg-blue-900/50 rounded-lg font-medium transition-colors">
                                        <Edit2 size={16} /> Edit
                                    </button>
                                    <button onClick={() => setDeleteId(pkg.id)} className="flex items-center justify-center gap-2 py-2 bg-red-50 text-red-700 hover:bg-red-100 dark:bg-red-900/30 dark:text-red-400 dark:hover:bg-red-900/50 rounded-lg font-medium transition-colors">
                                        <Trash2 size={16} /> Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                    {packages.length === 0 && (
                        <div className="col-span-full py-12 text-center border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-2xl">
                            <p className="text-gray-500 text-lg">No holiday packages created yet.</p>
                            <button onClick={openNew} className="mt-4 text-[#2B4560] dark:text-blue-400 font-semibold hover:underline">Create your first package</button>
                        </div>
                    )}
                </div>
            )}

            <ConfirmModal 
                isOpen={!!deleteId} 
                onClose={() => setDeleteId(null)} 
                onConfirm={handleDelete} 
                title="Delete Package"
                message="Are you sure you want to completely remove this package? It will instantly disappear from the frontend."
            />
        </div>
    );
};

export default AdminPackages;
