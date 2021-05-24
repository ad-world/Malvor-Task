import React, { useState, useEffect } from 'react'
import axios from 'axios'

export default function Jobs() {
    const [docs, setDocs] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        var handle = setInterval(getJobs, 1000);

        return () => {
            clearInterval(handle);
        }
    });


    function getJobs() {
        axios.get('http://localhost:8080/jobs')
            .then((res) => {
                setDocs(res.data)
                setLoading(false)
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
                    {docs.length === 0 ? <tr><td>Add More Tasks Below</td></tr> : docs.map((doc) => {
                        // console.log(doc)
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
