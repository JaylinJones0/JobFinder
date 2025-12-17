import React from 'react';
import { useState } from 'react';

import FindJobs from './FindJobs.jsx';

export default function App() {
const [jobResults, setJobResults] = useState([])

    return (
        <FindJobs />
    );
}

