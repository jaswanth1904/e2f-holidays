import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { TextInput, ImageDropzone } from '../../../components/admin/FormElements';
import { useToast } from '../../../components/ui/ToastProvider';
import { AuthContext } from '../../../context/AuthContext';

const AdminHeader = () => {
    const { addToast } = useToast();
    const { admin } = useContext(AuthContext);
    const [logoPreview, setLogoPreview] = useState('');
    const [contactPhone, setContactPhone] = useState('');
    const [contactEmail, setContactEmail] = useState('');

    useEffect(() => {
        fetchSettings();
    }, []);

    const fetchSettings = async () => {
        try {
            const { data } = await axios.get(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/settings`);
            if (data) {
                setContactPhone(data.contactPhone || '');
                setContactEmail(data.contactEmail || '');
                setLogoPreview(data.logo || '');
            }
        } catch (error) {
            console.error(error);
        }
    };

    const handleImageUpload = async (file) => {
        const formData = new FormData();
        formData.append('image', file);
        try {
            const config = { headers: { 'Content-Type': 'multipart/form-data', Authorization: `Bearer ${admin?.token || 'fake_token'}` } };
            const { data } = await axios.post(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/upload`, formData, config);
            setLogoPreview(data.url);
            addToast('Logo uploaded', 'success');
        } catch (error) {
            setLogoPreview(URL.createObjectURL(file));
            addToast('Using local preview', 'success');
        }
    };

    const handleSave = async () => {
        try {
            const config = { headers: { Authorization: `Bearer ${admin?.token || 'fake_token'}` } };
            await axios.put(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/settings`, { contactPhone, contactEmail, logo: logoPreview }, config);
            addToast('Header settings saved successfully!', 'success');
        } catch (error) {
            console.error(error);
            addToast('Failed to save header settings', 'error');
        }
    };

    return (
        <div className="space-y-6">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">Header & Navigation</h3>
            <p className="text-gray-500 dark:text-gray-400">Manage your site logo and top-bar contact information.</p>
            
            <div className="space-y-4">
                <ImageDropzone 
                    label="Website Logo" 
                    onFileSelect={handleImageUpload}
                    previewUrl={logoPreview}
                    onClear={() => setLogoPreview('')}
                />
                <TextInput 
                    label="Contact Phone" 
                    value={contactPhone} 
                    onChange={setContactPhone} 
                    placeholder="e.g. +91 12345 67890" 
                />
                <TextInput 
                    label="Contact Email" 
                    value={contactEmail} 
                    onChange={setContactEmail} 
                    type="email" 
                    placeholder="e.g. info@yoursite.com" 
                />
            </div>
            
            <button 
                onClick={handleSave}
                className="mt-6 px-6 py-2.5 bg-[#2B4560] hover:bg-[#1f3246] text-white font-medium rounded-lg shadow-sm transition-colors"
            >
                Save Header Settings
            </button>
        </div>
    );
};

export default AdminHeader;
