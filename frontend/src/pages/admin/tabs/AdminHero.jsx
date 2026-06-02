import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { TextInput, TextArea, ImageDropzone } from '../../../components/admin/FormElements';
import { useToast } from '../../../components/ui/ToastProvider';
import { AuthContext } from '../../../context/AuthContext';

const AdminHero = () => {
    const { addToast } = useToast();
    const { admin } = useContext(AuthContext);
    const [bgPreview, setBgPreview] = useState('');
    const [title, setTitle] = useState('');
    const [subtitle, setSubtitle] = useState('');
    const [buttonText, setButtonText] = useState('Book Now');

    useEffect(() => {
        fetchSettings();
    }, []);

    const fetchSettings = async () => {
        try {
            const { data } = await axios.get('http://localhost:5000/api/settings');
            if (data) {
                setTitle(data.heroHeading || '');
                setSubtitle(data.heroSubheading || '');
                setBgPreview(data.heroImage || '');
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
            const { data } = await axios.post('http://localhost:5000/api/upload', formData, config);
            setBgPreview(data.url);
            addToast('Hero image uploaded', 'success');
        } catch (error) {
            setBgPreview(URL.createObjectURL(file));
            addToast('Using local preview', 'success');
        }
    };

    const handleSave = async () => {
        try {
            const config = { headers: { Authorization: `Bearer ${admin?.token || 'fake_token'}` } };
            await axios.put('http://localhost:5000/api/settings', { 
                heroHeading: title, 
                heroSubheading: subtitle, 
                heroImage: bgPreview 
            }, config);
            addToast('Hero section saved successfully!', 'success');
        } catch (error) {
            console.error(error);
            addToast('Failed to save Hero settings', 'error');
        }
    };

    return (
        <div className="space-y-6">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">Hero Section</h3>
            <p className="text-gray-500 dark:text-gray-400">Update the main banner at the top of your homepage.</p>
            
            <div className="space-y-4">
                <ImageDropzone 
                    label="Hero Background Image" 
                    onFileSelect={handleImageUpload}
                    previewUrl={bgPreview}
                    onClear={() => setBgPreview('')}
                />
                <TextInput label="Hero Title" value={title} onChange={setTitle} />
                <TextArea label="Hero Subtitle" value={subtitle} onChange={setSubtitle} rows={3} />
                <TextInput label="Call-to-Action Button Text" value={buttonText} onChange={setButtonText} />
            </div>
            
            <button 
                onClick={handleSave}
                className="mt-6 px-6 py-2.5 bg-[#2B4560] hover:bg-[#1f3246] text-white font-medium rounded-lg shadow-sm transition-colors"
            >
                Save Hero Settings
            </button>
        </div>
    );
};

export default AdminHero;
