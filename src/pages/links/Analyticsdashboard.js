import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { serverEndpoint } from "../../config/config";

function Analyticsdashboard() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [analyticsData, setAnalyticsData] = useState([]);
    const [formDate, setFromDate] = useState(null);
    const [toDate, setToDate] = useState(null);


    const fetchAnalytics = async () => {
        try {
            const response = await axios.get(`${serverEndpoint}/links/analytics`, {
                params: {
                    linkId: id,
                    from: null,
                    to: null
                },
                withCredentials: true
            });
            setAnalyticsData(response.data);
            console.log(response.data);

        } catch (error) {
            console.log(error);
            navigate('/error');
        }
    }
    useEffect(() => {
        fetchAnalytics();
    }, []);
    return (
        <div classnName="container py-5">

        </div>
    )
}

export default Analyticsdashboard;