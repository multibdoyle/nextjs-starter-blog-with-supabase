import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client (if not already initialized)
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

function IntakeForm() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '', 
        imageURL: '', 
        animalType: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data, error } = await supabase.from('email_forms').upsert([formData]);
            if (error) {
                throw error;
            }
            console.log('Data posted successfully:', data);
            alert("Form submitted successfully!");
        } catch (error) {
            console.error('Error posting data:', error);
            alert("Error submitting form.");
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Name:
                <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                />
            </label>
            <br />

            <label>
                Email:
                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                />
            </label>
            <br />

            <label>
                Message:
                <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                />
            </label>
            <br />
            <label>
                ImageURL:
                <input
                    type="imageURL"
                    name="imageURL"
                    value={formData.imageURL}
                    onChange={handleChange}
                />
            </label>
            <br />
            <label>
               Animal:
                <input
                    type="animalType"
                    name="animalType"
                    value={formData.animalType}
                    onChange={handleChange}
                />
            </label>
            <br />
            <button type="submit">Submit</button>
        </form>
    );
}

export default IntakeForm;