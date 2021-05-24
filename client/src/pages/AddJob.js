import React, { useState, useEffect } from 'react'
import axios from 'axios'


export default function AddJob() {
    const [name, setName] = useState('')
    const [time, setTime] = useState(0)

    useEffect(() => {
        var handle = setInterval(getJobs, 1000);

        return () => {
            clearInterval(handle);
        }
    });


    function getJobs() {
        axios.get('http://localhost:8080/jobs')
            .catch((err) => {
                console.error(err)
            })
    }

    const handleSubmit = () => {

        const data = {
            name,
            time,
        }

        console.log(data)

        axios.post('http://localhost:8080/add-job', data).then(() => console.log('done'))
        window.location.href = '/'
    }
    return (
        <div class="container">
            <h1>Add More Tasks</h1>
            <form>
                <label class="form-label">Task Name</label>
                <input name="name" class="form-control" onChange={(e) => setName(e.target.value)} placeholder="name" />
                <label class="form-label">Task Time</label>
                <input name="time" class="form-control" onChange={(e) => setTime(e.target.value)} placeholder="time" />
                <input type="button" onClick={handleSubmit} value="Submit" className="btn btn-primary mt-4"/>
            </form>
        </div>
    )
}
