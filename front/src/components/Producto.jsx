import { useContext } from "react"
import { useQuery } from "react-query"
import { useParams } from "react-router-dom"
import {useForm} from 'react-hook-form'
import {Context} from '../main'

export function Producto() {
    const params = useParams()
    const {estado, setEstado} = useContext(Context)
    

    const {data, isLoading} = useQuery('product', async () => {
        const r = await fetch(`http://localhost:3000/products/${params.id}`)
        const res = await r.json()
        return res
    })
    const cantidad = estado.cesta.find(i => i.producto.product_id == params.id)?.cantidad

    const {register, handleSubmit} = useForm({
        defaultValues: {cantidad: cantidad}
    })

    function onSubmit(datos){
        setEstado({
            ...estado, cesta:[...estado.cesta.filter(i => i.producto.product_id != data[0].product_id),
            {
                producto: data[0],
                cantidad: datos.cantidad,
                total: datos.cantidad * data[0].unit_price
            }]
        })
    }

    if(isLoading){
        return <div>
            Cargando...
        </div>
    }
    return <div>
        <h3>Producto</h3>
        <table className="table">
            <thead>
                <tr>
                    <th>ID</th>
                    <td> {data[0].product_id} </td>
                </tr>
                <tr>
                    <th>Nombre</th>
                    <td> {data[0].product_name} </td>
                </tr>
                <tr>
                    <th>Precio</th>
                    <td> {data[0].unit_price} </td>
                </tr>
            </thead>
        </table>
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-group">
                <label>Introduzca la cantidad</label>
                <input {...register('cantidad')} type="name" className="form-control"></input>
            </div>
            <button className="btn btn-primary mt-3">Añadir al carrito</button>
        </form>
        <div>
            {JSON.stringify(estado)}
        </div>
    </div>
}