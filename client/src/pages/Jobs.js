import React, { useState, useEffect } from 'react'
import axios from 'axios'

export default function Jobs() {
    const [docs, setDocs] = useState([], 0)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        var handle = setInterval(getJobs, 1000);

        return () => {
            clearInterval(handle);
        }
    });


    function getJobs() {
        axios.get('/api/jobs')
            .then((res) => {
                if(res.data.length > 0){
                    setDocs(res.data, [1])
                }
                setLoading(false)
            })
            .catch((err) => {
                console.error(err)
            })
    }
    return (
        <div className="container">
            <h1>Queue List</h1>
            <table className="table mx-auto">
                <thead>
                    <tr>
                        <th>
                            Task Name
                        </th>
                        <th>
                            Time Remaining (s)
                        </th>
                    </tr>
                </thead>
                <tbody>
                    
                    {loading ? <tr><td>Loading</td></tr> : <></>}
                    {docs && docs.map((doc) => {
                        return (
                            <tr key={doc.name}>
                                <td>{doc.name}</td>
                                <td>{doc.time}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            <a href="/add">Add More Tasks</a>
        </div>
    )
}
