'use client'

import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface TouristCenter {
    _id: string;
    label: string;
    description: string;
    image: string;
    openingHours: string; // Added openingHours field
}

function DashboardPage() {
    const [touristCenters, setTouristCenters] = useState<TouristCenter[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>('');
    const [modalVisible, setModalVisible] = useState<boolean>(false);
    const [modalData, setModalData] = useState<TouristCenter>({
        _id: '',
        label: '',
        description: '',
        image: '',
        openingHours: '' // Initialize openingHours field
    });

    useEffect(() => {
        fetchTouristCenters();
    }, []);

    const fetchTouristCenters = async () => {
        setError('');
        setLoading(true);

        try {
            const response = await axios.get<TouristCenter[]>('https://dark-blue-dibbler-toga.cyclic.app/touristCenters');
            setTouristCenters(response.data);
        } catch (err) {
            console.error('Error fetching tourist centers:', err);
            setError('Failed to fetch tourist centers.');
        }

        setLoading(false);
    };

    const handleCreateTouristCenter = async () => {
        setError('');
        setLoading(true);

        try {
            const response = await axios.post<TouristCenter>('https://dark-blue-dibbler-toga.cyclic.app/touristCenters', modalData);
            console.log('New tourist center created:', response.data);
            setModalVisible(false);
            fetchTouristCenters();
        } catch (err) {
            console.error('Error creating tourist center:', err);
            setError('Failed to create tourist center.');
        }

        setLoading(false);
    };

    const handleUpdateTouristCenter = async () => {
        setError('');
        setLoading(true);

        try {
            const response = await axios.put<TouristCenter>(`https://dark-blue-dibbler-toga.cyclic.app/touristCenters/${modalData._id}`, modalData);
            console.log('Tourist center updated:', response.data);
            setModalVisible(false);
            fetchTouristCenters();
        } catch (err) {
            console.error('Error updating tourist center:', err);
            setError('Failed to update tourist center.');
        }

        setLoading(false);
    };

    const handleDeleteTouristCenter = async (id: string) => {
        setError('');
        setLoading(true);

        try {
            await axios.delete(`https://dark-blue-dibbler-toga.cyclic.app/touristCenters/${id}`);
            console.log('Tourist center deleted:', id);
            setModalVisible(false);
            fetchTouristCenters();
        } catch (err) {
            console.error('Error deleting tourist center:', err);
            setError('Failed to delete tourist center.');
        }

        setLoading(false);
    };

    const openCreateModal = () => {
        setModalData({
            _id: '',
            label: '',
            description: '',
            image: '',
            openingHours: '' // Initialize openingHours field
        });
        setModalVisible(true);
    };

    const openUpdateModal = (center: TouristCenter) => {
        setModalData(center);
        setModalVisible(true);
    };

    const closeModal = () => {
        setModalVisible(false);
    };

    return (
        <div className="container mx-auto mt-8">
            <h2 className="text-2xl font-bold mb-4">Admin Dashboard</h2>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <button
                className="bg-blue-500 text-white px-4 py-2 rounded-lg mb-4"
                onClick={openCreateModal}
                disabled={loading}
            >
                {loading ? 'Creating...' : 'Create New Tourist Center'}
            </button>
            <div className="grid grid-cols-3 gap-4">
                {touristCenters.map((center) => (
                    <div key={center._id} className="border border-gray-200 rounded-lg p-4">
                        <h3 className="text-lg font-semibold mb-2">{center.label}</h3>
                        <p className="mb-2">{center.description}</p>
                        <p className="mb-2"><strong>Opening Hours:</strong> {center.openingHours}</p>
                        <img src={center.image} alt={center.label} className="w-full h-auto mb-2" />
                        <button
                            className="bg-green-500 text-white px-3 py-1 rounded-lg mr-2"
                            onClick={() => openUpdateModal(center)}
                            disabled={loading}
                        >
                            {loading ? 'Updating...' : 'Update'}
                        </button>
                        <button
                            className="bg-red-500 text-white px-3 py-1 rounded-lg"
                            onClick={() => handleDeleteTouristCenter(center._id)}
                            disabled={loading}
                        >
                            {loading ? 'Deleting...' : 'Delete'}
                        </button>
                    </div>
                ))}
            </div>
            {modalVisible && (
                <div className="fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-8 rounded-lg">
                        <h2 className="text-xl font-bold mb-4">{modalData._id ? 'Update' : 'Create'} Tourist Center</h2>
                        <label className="block mb-4">
                            Label:
                            <input
                                type="text"
                                className="border border-gray-300 rounded-md px-2 py-1 w-full"
                                value={modalData.label}
                                onChange={(e) => setModalData({ ...modalData, label: e.target.value })}
                            />
                        </label>
                        <label className="block mb-4">
                            Description:
                            <textarea
                                className="border border-gray-300 rounded-md px-2 py-1 w-full"
                                value={modalData.description}
                                onChange={(e) => setModalData({ ...modalData, description: e.target.value })}
                            ></textarea>
                        </label>
                        <label className="block mb-4">
                            Image URL:
                            <input
                                type="text"
                                className="border border-gray-300 rounded-md px-2 py-1 w-full"
                                value={modalData.image}
                                onChange={(e) => setModalData({ ...modalData, image: e.target.value })}
                            />
                        </label>
                        <label className="block mb-4">
                            Opening Hours:
                            <input
                                type="text"
                                className="border border-gray-300 rounded-md px-2 py-1 w-full"
                                value={modalData.openingHours}
                                onChange={(e) => setModalData({ ...modalData, openingHours: e.target.value })}
                            />
                        </label>
                        <div className="flex justify-end">
                            <button className="bg-blue-500 text-white px-4 py-2 rounded-lg mr-2" onClick={closeModal}>Cancel</button>
                            <button className="bg-green-500 text-white px-4 py-2 rounded-lg" onClick={modalData._id ? handleUpdateTouristCenter : handleCreateTouristCenter} disabled={loading}>
                                {loading ? 'Saving...' : 'Save'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default DashboardPage;

                           
