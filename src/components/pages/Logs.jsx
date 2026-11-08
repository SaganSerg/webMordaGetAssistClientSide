import { webProtocol, domen, port } from "./../../config.json";
import useContextHook from "./../../hooks/ContextHook";
import { useNavigate, useParams } from "react-router";
import { useState, useEffect, useRef } from "react";
import storage from "./../../utils/storage.js";
import getContent from "./../../utils/getContent.js";
import Spinner from "./Spinner";
import Error from "./Error";
const LogsWithData = ({data}) => {
  const logs = JSON.parse(data.logs)
  return <div>
    <h1>Logs</h1>
    <div>{logs['first']}</div>
    <div>{logs['second']}</div>
    </div>
}
export default function Logs () {
  const { id } = useParams();
      const context = useContextHook();
  const navigate = useNavigate();
  const accessToken = storage.localLoadData("accessToken");
  const [data, setData] = useState();
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  if (accessToken) {
    useEffect(() => {
      setLoading(true);
      const signal = AbortSignal.timeout(1000 * 10); // задержка 10 sec
      fetch(`${webProtocol}://${domen}:${port}/api/web/logs/${id}`, {
        method: "POST",
        body: null,
        headers: new Headers({
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        }),
        signal,
      })
        .then((data) => data.json())
        .then(setData)
        .then(() => setLoading(false))
        .catch((e) => {
          console.log(e);
          setError(e);
        });
    }, []);
    if (loading) return <Spinner />;
    if (error) return <Error />;
    if (!data) return <Error />;
    return <LogsWithData data={data} />;
  }
  const refreshToken = storage.localLoadData("refreshToken");
  if (refreshToken) return <GetNewAccessToken />;
  useEffect(() => {
    navigate("/");
  });
  }