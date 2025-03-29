import { Outlet, Link } from "react-router-dom"

export function Home() {
    return <div className="container">
        <div className="text-end border p-2">
            <Link className="mx-2" to='/cesta'>Cesta</Link>
            <Link to='/productos'>Productos</Link>
        </div>
        <div>
            <Outlet></Outlet>
        </div>
    </div>
}