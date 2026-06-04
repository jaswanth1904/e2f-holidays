import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { TextInput } from '../../../components/admin/FormElements';
import { useToast } from '../../../components/ui/ToastProvider';
import { AuthContext } from '../../../context/AuthContext';

const AdminFooter = () => {
    const { addToast } = useToast();
    const { admin } = useContext(AuthContext);
    const [facebook, setFacebook] = useState('');
    const [instagram, setInstagram] = useState('');
    const [twitter, setTwitter] = useState('');
    const [copyright, setCopyright] = useState('');

    useEffect(() => {
        fetchSettings();
    }, []);

    const fetchSettings = async () => {
        try {
            const { data } = await axios.get(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/settings`);
            if (data && data.socialLinks) {
                setFacebook(data.socialLinks.facebook || '');
                setInstagram(data.socialLinks.instagram || '');
                setTwitter(data.socialLinks.twitter || '');
                setCopyright(data.copyright || '© 2026 E2F Holidays. All rights reserved.');
            }
        } catch (error) {
            console.error(error);
        }
    };

    const handleSave = async () => {
        try {
            const config = { headers: { Authorization: `Bearer ${admin?.token || 'fake_token'}` } };
            await axios.put(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/settings`, { 
                socialLinks: { facebook, instagram, twitter },
                copyright 
            }, config);
            addToast('Footer settings saved successfully!', 'success');
        } catch (error) {
            console.error(error);
            addToast('Failed to save Footer settings', 'error');
        }
    };

    return (
        <div className="space-y-6">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">Footer Settings</h3>
            <p className="text-gray-500 dark:text-gray-400">Manage social links and copyright text at the bottom of your site.</p>
            
            <div className="space-y-4">
                <TextInput label="Facebook URL" value={facebook} onChange={setFacebook} placeholder="https://facebook.com/..." />
                <TextInput label="Instagram URL" value={instagram} onChange={setInstagram} placeholder="https://instagram.com/..." />
                <TextInput label="Twitter / X URL" value={twitter} onChange={setTwitter} placeholder="https://twitter.com/..." />
                
                <div className="pt-4 border-t border-gray-100 dark:border-gray-800">
                    <TextInput label="Copyright Text" value={copyright} onChange={setCopyright} />
                </div>
            </div>
            
            <button 
                onClick={handleSave}
                className="mt-6 px-6 py-2.5 bg-[#2B4560] hover:bg-[#1f3246] text-white font-medium rounded-lg shadow-sm transition-colors"
            >
                Save Footer
            </button>
        </div>
    );
};

export default AdminFooter;
