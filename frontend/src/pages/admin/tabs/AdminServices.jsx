import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { TextInput, TextArea, ImageDropzone } from '../../../components/admin/FormElements';
import { useToast } from '../../../components/ui/ToastProvider';
import { ConfirmModal } from '../../../components/ui/ConfirmModal';
import { Plus, Edit2, Trash2 } from 'lucide-react';
import { AuthContext } from '../../../context/AuthContext';

const AdminServices = () => {
    const { addToast } = useToast();
    const { admin } = useContext(AuthContext);
    const [services, setServices] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [currentService, setCurrentService] = useState(null);
    const [deleteId, setDeleteId] = useState(null);

    const [formTitle, setFormTitle] = useState('');
    const [formDesc, setFormDesc] = useState('');
    const [formImagePreview, setFormImagePreview] = useState('');

    useEffect(() => {
        fetchServices();
    }, []);

    const fetchServices = async () => {
        try {
            const { data } = await axios.get('http://localhost:5000/api/features');
            setServices(data);
        } catch (error) {
            console.error(error);
            addToast('Failed to load services', 'error');
        }
    };

    const openEdit = (service) => {
        setIsEditing(true);
        setCurrentService(service._id);
        setFormTitle(service.title);
        setFormDesc(service.description);
        setFormImagePreview(service.icon || '');
    };

    const openNew = () => {
        setIsEditing(true);
        setCurrentService(null);
        setFormTitle('');
        setFormDesc('');
        setFormImagePreview('');
    };

    const handleImageUpload = async (file) => {
        const formData = new FormData();
        formData.append('image', file);
        try {
            const config = { headers: { 'Content-Type': 'multipart/form-data', Authorization: `Bearer ${admin?.token || 'fake_token'}` } };
            const { data } = await axios.post('http://localhost:5000/api/upload', formData, config);
            setFormImagePreview(data.url);
            addToast('Image uploaded', 'success');
        } catch (error) {
            setFormImagePreview(URL.createObjectURL(file));
            addToast('Using local preview', 'success');
        }
    };

    const handleSave = async () => {
        if (!formTitle) {
            addToast('Title is required', 'error');
            return;
        }

        const payload = { title: formTitle, description: formDesc, icon: formImagePreview };
        const config = { headers: { Authorization: `Bearer ${admin?.token || 'fake_token'}` } };

        try {
            if (currentService) {
                await axios.put(`http://localhost:5000/api/features/${currentService}`, payload, config);
                addToast('Service updated successfully!', 'success');
            } else {
                await axios.post('http://localhost:5000/api/features', payload, config);
                addToast('Service added successfully!', 'success');
            }
            setIsEditing(false);
            fetchServices();
        } catch (error) {
            console.error(error);
            addToast('Error saving service', 'error');
        }
    };

    const handleDelete = async () => {
        try {
            const config = { headers: { Authorization: `Bearer ${admin?.token || 'fake_token'}` } };
            await axios.delete(`http://localhost:5000/api/features/${deleteId}`, config);
            addToast('Service deleted!', 'success');
            setDeleteId(null);
            fetchServices();
        } catch (error) {
            console.error(error);
            addToast('Error deleting service', 'error');
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">Services & Experience</h3>
                    <p className="text-gray-500 dark:text-gray-400">Manage your offered services.</p>
                </div>
                {!isEditing && (
                    <button onClick={openNew} className="flex items-center gap-2 px-4 py-2 bg-[#2B4560] text-white rounded-lg hover:bg-[#1f3246] transition-colors">
                        <Plus size={18} /> Add New
                    </button>
                )}
            </div>

            {isEditing ? (
                <div className="bg-gray-50 dark:bg-gray-800/50 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
                    <h4 className="font-semibold mb-4 text-[#2B4560] dark:text-blue-400">{currentService ? 'Edit Service' : 'Add New Service'}</h4>
                    <ImageDropzone 
                        label="Service Icon/Image" 
                        onFileSelect={handleImageUpload}
                        previewUrl={formImagePreview}
                        onClear={() => setFormImagePreview('')}
                    />
                    <TextInput label="Service Title" value={formTitle} onChange={setFormTitle} required />
                    <TextArea label="Description" value={formDesc} onChange={setFormDesc} required />
                    <div className="flex gap-3 mt-6">
                        <button onClick={handleSave} className="px-6 py-2 bg-[#2B4560] text-white rounded-lg hover:bg-[#1f3246]">Save</button>
                        <button onClick={() => setIsEditing(false)} className="px-6 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300">Cancel</button>
                    </div>
                </div>
            ) : (
                <div className="space-y-3">
                    {services.map((service) => (
                        <div key={service._id} className="flex items-center justify-between p-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-sm group">
                            <div className="flex items-center gap-4">
                                {service.icon ? (
                                    <img src={service.icon} alt={service.title} className="w-10 h-10 object-contain rounded" />
                                ) : (
                                    <div className="w-10 h-10 bg-[#2B4560]/10 text-[#2B4560] rounded flex items-center justify-center font-bold">S</div>
                                )}
                                <div>
                                    <h4 className="font-semibold text-gray-900 dark:text-white">{service.title}</h4>
                                    <p className="text-sm text-gray-500 line-clamp-1">{service.description}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button onClick={() => openEdit(service)} className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-lg"><Edit2 size={18} /></button>
                                <button onClick={() => setDeleteId(service._id)} className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg"><Trash2 size={18} /></button>
                            </div>
                        </div>
                    ))}
                    {services.length === 0 && <p className="text-gray-500 py-8 text-center">No services added yet.</p>}
                </div>
            )}

            <ConfirmModal 
                isOpen={!!deleteId} 
                onClose={() => setDeleteId(null)} 
                onConfirm={handleDelete} 
                title="Delete Service"
                message="Are you sure you want to delete this service? It will be removed from the frontend immediately."
            />
        </div>
    );
};

export default AdminServices;
