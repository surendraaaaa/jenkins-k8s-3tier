import React, { useEffect, useState } from 'react'
import axios from 'axios'


export default function ItemList() {
const [items, setItems] = useState([])
const [loading, setLoading] = useState(false)
const [error, setError] = useState(null)
const [form, setForm] = useState({ name: '', description: '' })


const fetchItems = async () => {
setLoading(true)
setError(null)
try {
const res = await axios.get('/api/items')
setItems(res.data)
} catch (e) {
setError('Could not fetch items')
} finally {
setLoading(false)
}
}


useEffect(() => {
fetchItems()
}, [])


const handleSubmit = async (e) => {
e.preventDefault()
try {
await axios.post('/api/items', form)
setForm({ name: '', description: '' })
fetchItems()
} catch (e) {
alert('Could not create item')
}
}


return (
<div>
<form onSubmit={handleSubmit} style={{ marginBottom: 20 }}>
<input
placeholder="Name"
value={form.name}
onChange={(e) => setForm({ ...form, name: e.target.value })}
required
/>
<input
placeholder="Description"
value={form.description}
onChange={(e) => setForm({ ...form, description: e.target.value })}
/>
<button type="submit">Create</button>
</form>


{loading && <div>Loading...</div>}
{error && <div style={{ color: 'red' }}>{error}</div>}


<ul>
{items.map((it) => (
<li key={it._id} style={{ marginBottom: 8 }}>
<strong>{it.name}</strong>
<div>{it.description}</div>
<small>{new Date(it.createdAt).toLocaleString()}</small>
</li>
))}
</ul>
</div>
)
}
