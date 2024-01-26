import React, { useState } from 'react';

function IntakeForm() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Here you can handle the submission of the form data,
        // for example, sending it to a server or displaying it
        console.log(formData);
        alert("Form submitted! Check the console for details.");
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

            <button type="submit">Submit</button>
        </form>
    );
}

export default IntakeForm;