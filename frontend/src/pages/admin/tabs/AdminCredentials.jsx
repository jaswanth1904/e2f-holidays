import React, { useState, useContext } from 'react';
import { TextInput } from '../../../components/admin/FormElements';
import { useToast } from '../../../components/ui/ToastProvider';
import { AuthContext } from '../../../context/AuthContext';

const AdminCredentials = () => {
    const { admin, updateCredentials } = useContext(AuthContext);
    const { addToast } = useToast();
    const [username, setUsername] = useState(admin?.username || 'admin');
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSave = async () => {
        if (!currentPassword) {
            addToast('Please enter your current password.', 'error');
            return;
        }

        if (newPassword && newPassword !== confirmPassword) {
            addToast('New passwords do not match!', 'error');
            return;
        }

        setIsSubmitting(true);
        const result = await updateCredentials(username, currentPassword, newPassword);
        setIsSubmitting(false);

        if (result.success) {
            addToast('Credentials updated successfully!', 'success');
            setCurrentPassword('');
            setNewPassword('');
            setConfirmPassword('');
        } else {
            addToast(result.message || 'Failed to update credentials.', 'error');
        }
    };

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">Admin Credentials</h3>
            <p className="text-gray-500 dark:text-gray-400">Update your login username and password for this portal.</p>
            
            <div className="space-y-4 max-w-md">
                <TextInput label="Username" value={username} onChange={setUsername} />
                <div className="pt-4 border-t border-gray-100 dark:border-gray-800">
                    <TextInput label="Current Password" type="password" value={currentPassword} onChange={setCurrentPassword} placeholder="••••••••" />
                    <TextInput label="New Password (optional)" type="password" value={newPassword} onChange={setNewPassword} placeholder="••••••••" />
                    <TextInput label="Confirm New Password" type="password" value={confirmPassword} onChange={setConfirmPassword} placeholder="••••••••" />
                </div>
            </div>
            
            <button 
                onClick={handleSave}
                disabled={isSubmitting}
                className="mt-6 px-6 py-2.5 bg-[#2B4560] hover:bg-[#1f3246] text-white font-medium rounded-lg shadow-sm transition-colors disabled:opacity-50"
            >
                {isSubmitting ? 'Updating...' : 'Update Credentials'}
            </button>
        </div>
    );
};

export default AdminCredentials;
