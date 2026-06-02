import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { TextInput, TextArea, ImageDropzone } from '../../../components/admin/FormElements';
import { useToast } from '../../../components/ui/ToastProvider';
import { ConfirmModal } from '../../../components/ui/ConfirmModal';
import { Plus, Edit2, Trash2, Star } from 'lucide-react';
import { AuthContext } from '../../../context/AuthContext';

const AdminTestimonials = () => {
    const { addToast } = useToast();
    const { admin } = useContext(AuthContext);
    const [testimonials, setTestimonials] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [currentId, setCurrentId] = useState(null);
    const [deleteId, setDeleteId] = useState(null);

    const [formState, setFormState] = useState({ name: '', review: '', rating: '5', image: '' });

    useEffect(() => {
        fetchTestimonials();
    }, []);

    const fetchTestimonials = async () => {
        try {
            const { data } = await axios.get('http://localhost:5000/api/testimonials');
            setTestimonials(data);
        } catch (error) {
            console.error(error);
            addToast('Failed to load testimonials', 'error');
        }
    };

    const openEdit = (t) => {
        setIsEditing(true);
        setCurrentId(t._id);
        setFormState({ name: t.name, review: t.review, rating: t.rating.toString(), image: t.image || '' });
    };

    const openNew = () => {
        setIsEditing(true);
        setCurrentId(null);
        setFormState({ name: '', review: '', rating: '5', image: '' });
    };

    const handleImageUpload = async (file) => {
        const formData = new FormData();
        formData.append('image', file);
        try {
            const config = { headers: { 'Content-Type': 'multipart/form-data', Authorization: `Bearer ${admin?.token || 'fake_token'}` } };
            const { data } = await axios.post('http://localhost:5000/api/upload', formData, config);
            setFormState(prev => ({ ...prev, image: data.url }));
            addToast('Image uploaded', 'success');
        } catch (error) {
            setFormState(prev => ({ ...prev, image: URL.createObjectURL(file) }));
            addToast('Using local preview', 'success');
        }
    };

    const handleSave = async () => {
        if (!formState.name || !formState.review) {
            addToast('Name and review are required', 'error');
            return;
        }

        const payload = { ...formState, rating: parseInt(formState.rating) };
        const config = { headers: { Authorization: `Bearer ${admin?.token || 'fake_token'}` } };

        try {
            if (currentId) {
                await axios.put(`http://localhost:5000/api/testimonials/${currentId}`, payload, config);
                addToast('Testimonial updated!', 'success');
            } else {
                await axios.post('http://localhost:5000/api/testimonials', payload, config);
                addToast('Testimonial added!', 'success');
            }
            setIsEditing(false);
            fetchTestimonials();
        } catch (error) {
            console.error(error);
            addToast('Error saving testimonial', 'error');
        }
    };

    const handleDelete = async () => {
        try {
            const config = { headers: { Authorization: `Bearer ${admin?.token || 'fake_token'}` } };
            await axios.delete(`http://localhost:5000/api/testimonials/${deleteId}`, config);
            addToast('Testimonial deleted!', 'success');
            setDeleteId(null);
            fetchTestimonials();
        } catch (error) {
            console.error(error);
            addToast('Error deleting testimonial', 'error');
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">Client Testimonials</h3>
                    <p className="text-gray-500 dark:text-gray-400">Manage reviews displayed on your site.</p>
                </div>
                {!isEditing && (
                    <button onClick={openNew} className="flex items-center gap-2 px-4 py-2 bg-[#2B4560] text-white rounded-lg hover:bg-[#1f3246] transition-colors">
                        <Plus size={18} /> Add New
                    </button>
                )}
            </div>

            {isEditing ? (
                <div className="bg-gray-50 dark:bg-gray-800/50 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
                    <h4 className="font-semibold mb-4 text-[#2B4560] dark:text-blue-400">{currentId ? 'Edit Testimonial' : 'Add Testimonial'}</h4>
                    <ImageDropzone 
                        label="Client Avatar (Optional)" 
                        onFileSelect={handleImageUpload}
                        previewUrl={formState.image}
                        onClear={() => setFormState(prev => ({ ...prev, image: '' }))}
                    />
                    <TextInput label="Client Name" value={formState.name} onChange={(v) => setFormState(prev => ({ ...prev, name: v }))} required />
                    
                    <div className="mb-4">
                        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Rating</label>
                        <select 
                            value={formState.rating} 
                            onChange={(e) => setFormState(prev => ({ ...prev, rating: e.target.value }))}
                            className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 focus:ring-2 focus:ring-[#2B4560] outline-none"
                        >
                            {[5,4,3,2,1].map(num => <option key={num} value={num}>{num} Stars</option>)}
                        </select>
                    </div>

                    <TextArea label="Review content" value={formState.review} onChange={(v) => setFormState(prev => ({ ...prev, review: v }))} required />
                    
                    <div className="flex gap-3 mt-6">
                        <button onClick={handleSave} className="px-6 py-2 bg-[#2B4560] text-white rounded-lg hover:bg-[#1f3246]">Save</button>
                        <button onClick={() => setIsEditing(false)} className="px-6 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300">Cancel</button>
                    </div>
                </div>
            ) : (
                <div className="space-y-3">
                    {testimonials.map((t) => (
                        <div key={t._id} className="flex items-center justify-between p-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-sm group">
                            <div className="flex items-center gap-4">
                                {t.image ? (
                                    <img src={t.image} alt={t.name} className="w-12 h-12 rounded-full object-cover border border-gray-200" />
                                ) : (
                                    <div className="w-12 h-12 rounded-full bg-[#2B4560] text-white flex items-center justify-center font-bold text-lg">
                                        {t.name.charAt(0)}
                                    </div>
                                )}
                                <div>
                                    <h4 className="font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                                        {t.name}
                                        <span className="flex text-yellow-400">
                                            {[...Array(t.rating)].map((_, i) => <Star key={i} size={14} fill="currentColor" />)}
                                        </span>
                                    </h4>
                                    <p className="text-sm text-gray-500 line-clamp-1 italic">"{t.review}"</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button onClick={() => openEdit(t)} className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-lg"><Edit2 size={18} /></button>
                                <button onClick={() => setDeleteId(t._id)} className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg"><Trash2 size={18} /></button>
                            </div>
                        </div>
                    ))}
                    {testimonials.length === 0 && <p className="text-gray-500 py-8 text-center">No testimonials added yet.</p>}
                </div>
            )}

            <ConfirmModal 
                isOpen={!!deleteId} 
                onClose={() => setDeleteId(null)} 
                onConfirm={handleDelete} 
                title="Delete Testimonial"
            />
        </div>
    );
};

export default AdminTestimonials;
