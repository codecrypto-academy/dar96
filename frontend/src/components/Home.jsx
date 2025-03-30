import { Outlet, useNavigate } from "react-router-dom";
import { useForm } from 'react-hook-form'

export function Home() {
    const { register, handleSubmit } = useForm()
    const navigate = useNavigate()
    const submitForm = (data) => {
        if (data.data.length == 66)
            navigate(`tx/${data.data}`)
        if (data.data.length == 42)
            navigate(`balance/${data.data}`)
        if (/^\d+\.?\d*$/.test(data.data))
            navigate(`bloque/${data.data}`)
    }

    return <div className="container">
        <h3 className="text-center">Explorador de la cadena de bloqques</h3>
        <form className="d-flex justify-content-center gap-1" onSubmit={handleSubmit(submitForm)}>
            <input {...register('data')}></input>
            <button className="btn btn-primary">GO</button>
        </form>
        <div className="border my-3 p-2">
            <Outlet></Outlet>
        </div>

    </div>
}