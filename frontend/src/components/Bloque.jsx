import { Link, useParams } from "react-router-dom"
import { useQuery } from 'react-query'
import { getBlock } from "./api"


export function Bloque() {
    const params = useParams()
    const { isLoading, isError, data } = useQuery(['bloque', params.bloque], getBlock)


    if (isLoading)
        return <div>
            Cargando...
        </div>

    if (isError)
        return <h1>Error</h1>


    return <div>
        <table>
            <thead>
                <tr>
                    <th>Lista de transacciones</th>
                </tr>
            </thead>
            <tbody>
                {
                    data.transactions.map((item, index) => (
                        <tr key={index}>
                            <Link to={`/tx/${item}`}>
                                <td> {item} </td>
                            </Link>
                        </tr>
                    ))
                }
            </tbody>
        </table>
        <pre>
            {JSON.stringify(data, null, 4)}
        </pre>
    </div>

}