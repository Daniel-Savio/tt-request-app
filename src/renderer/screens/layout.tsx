import { Link, Outlet } from 'react-router-dom'

export function Layout() {
  return (
    <div className="bg-radial-[at_25%_25%] from-slate-950 to-slate- to-75">
      {/* <nav className="bg-background p-4">
        <ul className="flex space-x-4">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/docs">Docs</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
        </ul>
      </nav> */}
      <main className="mx-auto overflow-y-hidden ">
        <Outlet />
      </main>
    </div>
  )
}
