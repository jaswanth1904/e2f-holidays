import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { TextInput, ToggleSwitch } from '../../../components/admin/FormElements';
import { useToast } from '../../../components/ui/ToastProvider';
import { AuthContext } from '../../../context/AuthContext';

const AdminSettings = () => {
    const { addToast } = useToast();
    const { admin } = useContext(AuthContext);
    const [siteTitle, setSiteTitle] = useState('E2F Holidays');
    const [maintenanceMode, setMaintenanceMode] = useState(false);
    const [enableDarkMode, setEnableDarkMode] = useState(true);

    useEffect(() => {
        fetchSettings();
    }, []);

    const fetchSettings = async () => {
        try {
            const { data } = await axios.get('http://localhost:5000/api/settings');
            if (data) {
                setSiteTitle(data.siteTitle || 'E2F Holidays');
            }
        } catch (error) {
            console.error(error);
        }
    };

    const handleSave = async () => {
        try {
            const config = { headers: { Authorization: `Bearer ${admin?.token || 'fake_token'}` } };
            await axios.put('http://localhost:5000/api/settings', { siteTitle }, config);
            addToast('Global settings saved successfully!', 'success');
        } catch (error) {
            console.error(error);
            addToast('Failed to save settings', 'error');
        }
    };

    return (
        <div className="space-y-6">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">Global Settings</h3>
            <p className="text-gray-500 dark:text-gray-400">Manage overall site behavior and general preferences.</p>
            
            <div className="space-y-6">
                <TextInput 
                    label="Website Title (SEO)" 
                    value={siteTitle} 
                    onChange={setSiteTitle} 
                    placeholder="e.g. E2F Holidays - Travel Agency" 
                />
                
                <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
                    <ToggleSwitch 
                        label="Maintenance Mode" 
                        description="Hide the website from the public while you make changes."
                        checked={maintenanceMode}
                        onChange={setMaintenanceMode}
                    />
                    <ToggleSwitch 
                        label="Enable Dark Mode Toggle" 
                        description="Allow users to switch between light and dark themes on the frontend."
                        checked={enableDarkMode}
                        onChange={setEnableDarkMode}
                    />
                </div>
            </div>
            
            <button 
                onClick={handleSave}
                className="mt-6 px-6 py-2.5 bg-[#2B4560] hover:bg-[#1f3246] text-white font-medium rounded-lg shadow-sm transition-colors"
            >
                Save Settings
            </button>
        </div>
    );
};

export default AdminSettings;
