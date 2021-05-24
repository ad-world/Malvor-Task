import React, { useState, useEffect } from 'react'
import axios from 'axios'

export default function Jobs() {
    const [docs, setDocs] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(()=>{
        var handle=setInterval(getJobs,1000);    
    
        return ()=>{
          clearInterval(handle);
        }
      });


    function getJobs() {
        axios.get('/jobs')
            .then((res) => {
                setDocs(res.data)
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
            <tr>
                <th>
                    Task Name
                </th>
                <th>
                    Time Remaining (s)
                </th>
            </tr>
            {!loading && docs.length === 0 ? <p>Add More Tasks Below</p> : <></>}
            {loading ? <p>Loading</p> : docs.map((doc) => {
                return (
                    <tr>
                        <td>{doc.name}</td>
                        <td>{doc.time}</td>
                    </tr>
                )
            })}
            </table>
            <a href="/add">Add More Tasks</a>
        </div>
    )
}
