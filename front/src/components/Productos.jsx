import { useQuery } from "react-query"
import { Link } from "react-router-dom"

export function Productos() {
    const {data, isLoading} = useQuery('products', async () => {
        return fetch('http://localhost:3000/products').then(res => res.json())
    })
    if(isLoading) {
        return <div>
            Cargando.....
        </div>
    }
    return <div>
        <table className="table">
            <thead>
                <tr>
                    <th>Nombre</th>
                </tr>
            </thead>
            <tbody>
                {data.map(producto => (
                    <tr key={producto.product_id}>
                        <td>
                            <Link to={`products/${producto.product_id}`}> {producto.product_name} </Link>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
}