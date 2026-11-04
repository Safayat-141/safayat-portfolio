import { login } from './action'

export default function Login({ searchParams }: { searchParams: { error?: string } }) {
  return (
    <div className="min-h-[80vh] flex items-center justify-center p-4">
      <form action={login} method="POST" className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md space-y-4">
        <h2 className="text-2xl font-bold text-center text-slate-900">Admin Login</h2>
        {searchParams.error && (
          <p className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-lg px-3 py-2 text-center">
            Incorrect password. Please try again.
          </p>
        )}
        <div className="flex flex-col gap-2">
          <label className="text-xs font-medium text-slate-500 uppercase tracking-wider">Password</label>
          <input name="password" type="password" required autoFocus className="Input" />
        </div>
        <button className="Button w-full">Sign In</button>
      </form>
    </div>
  )
}
