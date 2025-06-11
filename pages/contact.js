import React, { useState } from 'react';
import { db } from '../utils/firebase';
import { doc, setDoc } from 'firebase/firestore';
import { useActiveAccount } from "thirdweb/react";

const Contact = () => {
    const wallet = useActiveAccount();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [status, setStatus] = useState({ type: '', message: '' });

    const isValidEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            // Generate a unique ID for the contact
            const contactId = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
            
            // Structure the data similar to [slug].js
            const contactData = {
                timestamp: new Date(),
                user: {
                    name: formData.name,
                    email: formData.email,
                    walletAddress: wallet?.address || null // Include wallet address if connected
                },
                message: {
                    subject: formData.subject,
                    content: formData.message,
                },
                status: 'unread',
                metadata: {
                    submittedAt: new Date().toISOString(),
                    userAgent: window.navigator.userAgent,
                }
            };

            await setDoc(doc(db, "contacts", contactId), contactData);

            setFormData({
                name: '',
                email: '',
                subject: '',
                message: ''
            });

            setStatus({
                type: 'success',
                message: 'Message sent successfully! We will get back to you soon.'
            });

        } catch (error) {
            console.error("Error submitting form:", error);
            setStatus({
                type: 'error',
                message: 'There was an error sending your message. Please try again.'
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
                <div className="bg-white shadow-xl rounded-lg p-8">
                    <h1 className="text-3xl font-bold text-center text-[#1d2951] mb-8">
                        Contact Us
                    </h1>

                    {status.message && (
                        <div className={`p-4 rounded-lg mb-6 ${
                            status.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                        }`}>
                            {status.message}
                        </div>
                    )}

                   
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                Name
                            </label>
                            <input
                                type="text"
                                name="name"
                                id="name"
                                required
                                value={formData.name}
                                onChange={handleChange}
                                className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:border-[#1d2951]"
                            />
                        </div>

                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                Email
                            </label>
                            <input
                                type="email"
                                name="email"
                                id="email"
                                required
                                value={formData.email}
                                onChange={handleChange}
                                className={`mt-1 block w-full rounded-lg border px-4 py-2 focus:outline-none focus:border-[#1d2951] ${
                                    formData.email && !isValidEmail(formData.email)
                                        ? 'border-danger text-danger'
                                        : 'border-gray-300'
                                }`}
                            />
                        </div>

                        <div>
                            <label htmlFor="subject" className="block text-sm font-medium text-gray-700">
                                Subject
                            </label>
                            <input
                                type="text"
                                name="subject"
                                id="subject"
                                required
                                value={formData.subject}
                                onChange={handleChange}
                                className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:border-[#1d2951]"
                            />
                        </div>

                        <div>
                            <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                                Message
                            </label>
                            <textarea
                                name="message"
                                id="message"
                                required
                                rows={4}
                                value={formData.message}
                                onChange={handleChange}
                                className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:border-[#1d2951]"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={isSubmitting || (formData.email && !isValidEmail(formData.email))}
                            className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-[#1d2951] hover:bg-[#2a3c70] focus:outline-none ${
                                (isSubmitting || (formData.email && !isValidEmail(formData.email))) 
                                    ? 'opacity-50 cursor-not-allowed' 
                                    : ''
                            }`}
                        >
                            {isSubmitting ? 'Sending...' : 'Send Message'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Contact;
