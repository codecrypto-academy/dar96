import { useParams } from "react-router-dom"
import { useQuery } from 'react-query'
import { getBalance } from "./api"
export function Balance() {
    const params = useParams()
    const { isLoading, isError, data } = useQuery(['balance', params.address], getBalance)


    if (isLoading)
        return <div>
            Cargando...
        </div>

    if (isError)
        return <h1>Error</h1>


    return <pre>
        Balance {params.balance}
        {JSON.stringify(data, null, 4)}
    </pre>

}