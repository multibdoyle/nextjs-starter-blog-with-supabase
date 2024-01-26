import { createClient } from '@supabase/supabase-js';
import { useEffect, useState } from 'react';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);


export default function FirstPost() {
    const [emails, setEmails] = useState([]);
    const [query, setQuery] = useState(""); // Added state for the query

    useEffect(() => {
        const fetchData = async () => {
            const { data, error } = await supabase.from('email_forms').select();
            if (error) {
                console.error('Error fetching data', error);
            } else {
                setEmails(data);
            }
        };
        fetchData();
    }, []);

    const [animalTypes, setAnimalTypes] = useState([]);

    //// Fetch unique AnimalType values
useEffect(() => {
    const fetchAnimalTypes = async () => {
        const { data, error } = await supabase.from('email_forms').select('animalType');

        if (error) {
            console.error('Error fetching animal types', error);
        } else {
            const uniqueTypes = [...new Set(data.map(item => item.animalType))];
            setAnimalTypes(uniqueTypes);
        }
    };

    fetchAnimalTypes();
}, []);

/// Manage state for selected types
const [selectedTypes, setSelectedTypes] = useState(new Set());
const handleCheckboxChange = (type) => {
        setSelectedTypes(prev => {
            const newSet = new Set(prev);
            if (newSet.has(type)) {
                newSet.delete(type);
            }
             else { newSet.add(type);
            }
            return newSet;
        });
}

/// A different animalFilter
    const animalFilter = (array) => {
        return array.filter(
            (el) => el.animalType.toLowerCase().includes(query.toLowerCase()) // Assuming animalType is a string
        );
    };

    const filtered = emails.filter(email => 
        selectedTypes.size === 0 || selectedTypes.has(email.animalType)
    );

    //Handling the input on our search bar
    const handleChange = (e) => {
        setQuery(e.target.value);
    };

    return (
        <div>
            <h1>First Post</h1>
            <div>
    {animalTypes.map(type => (
        <div key={type}>
            <input
                type="checkbox"
                id={type}
                checked={selectedTypes.has(type)}
                onChange={() => handleCheckboxChange(type)}
            />
            <label htmlFor={type}>{type}</label>
        </div>
    ))}
</div>

            <h2>Meet the Pups</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '20px' }}>
                {filtered.map(email => (
                    <div key={email.id} style={{ border: '1px solid #ddd', padding: '10px' }}>
                        <h3>{email.name}</h3>
                        <h3>{email.message}</h3>
                        <h3>{email.animalType}</h3>
                        {email.imageURL && <img src={email.imageURL} alt={email.name} style={{ maxWidth: '100%' }} />}
                        </div>
                ))}
            </div>
        </div>
    );
}
    