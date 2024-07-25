export default function Card({ children }: any) {
  return (
    <div className="card bg-gray-300 text-primary-content w-96">
    <div className="card-body">
        {children}
    </div>
  </div>
  )
}
