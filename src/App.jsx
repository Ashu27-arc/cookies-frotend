import { useState } from "react";
import axios from "axios";

const API_URL = "http://localhost:5000";

function App() {
    const [message, setMessage] = useState("");
    const [statusCode, setStatusCode] = useState(null);
    const [cookieData, setCookieData] = useState(null);

    const handleSetCookie = async () => {
        try {
            const response = await axios.get(`${API_URL}/set-cookie`, { withCredentials: true });
            setMessage(response.data.message);
        } catch (error) {
            console.error("Error setting cookie:", error);
        }
    };

    const handleGetCookie = async () => {
        try {
            const response = await axios.get(`${API_URL}/get-cookie`, { withCredentials: true });
            setCookieData(response.data);
        } catch (error) {
            setCookieData({ message: "No cookie found" });
        }
    };

    const handleFetchResponse = async (endpoint) => {
        try {
            const response = await axios.get(`${API_URL}/${endpoint}`);
            setMessage(response.data.message);
            setStatusCode(response.status);
        } catch (error) {
            if (error.response) {
                setMessage(error.response.data.message);
                setStatusCode(error.response.status);
            } else {
                setMessage("Network error");
                setStatusCode(null);
            }
        }
    };

    return (
        <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
            <h1>Cookie & API Response Handler</h1>

            <div>
                <button onClick={handleSetCookie}>Set Cookie</button>
                <button onClick={handleGetCookie}>Get Cookie</button>
            </div>

            {cookieData && <p>Cookie Response: {JSON.stringify(cookieData)}</p>}

            <hr />

            <h2>API Responses</h2>
            <div>
                <button onClick={() => handleFetchResponse("success")}>200 - Success</button>
                <button onClick={() => handleFetchResponse("created")}>201 - Created</button>
                <button onClick={() => handleFetchResponse("bad-request")}>400 - Bad Request</button>
                <button onClick={() => handleFetchResponse("not-found")}>404 - Not Found</button>
                <button onClick={() => handleFetchResponse("server-error")}>500 - Server Error</button>
            </div>

            {message && (
                <div>
                    <h3>Response:</h3>
                    <p>Status Code: {statusCode}</p>
                    <p>Message: {message}</p>
                </div>
            )}
        </div>
    );
}

export default App;
