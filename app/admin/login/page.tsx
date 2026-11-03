import { login } from './action'

export default function Login() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100 p-4">
      <form action={login} className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md space-y-4" method="POST">
        <h2 className="text-2xl font-bold text-center text-slate-900">Admin Login</h2>
        <div className="flex flex-col gap-2">
          <label className="text-xs font-medium text-slate-500 uppercase tracking-wider">Password</label>
          <input name="password" type="password" required className="Input" />
        </div>
        <button className="Button w-full">Sign In</button>
      </form>
    </div>
  )
}
