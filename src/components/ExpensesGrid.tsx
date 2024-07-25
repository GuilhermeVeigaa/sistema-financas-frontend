import axios from "axios"
import { FaTrash, FaEdit } from "react-icons/fa"
export default function ExpensesGrid({ expenses, setExpenses, setOnEdit }: any) {

    const handleEdit = (item: any) => {
        setOnEdit(item)
    }    

  const handleDelete = async (id: any) => {
    await axios.delete("http://localhost:8800/expenses" + id)
    .then(({ data }) => {
        const newArray = expenses.filter((expenses: any) => expenses.id !== id)

        setExpenses(newArray)
    })
    .catch(({ data }) => {throw new Error(data)})

    setOnEdit(null)
  }

  return (
    <>
    <table className="w-full bg-zinc-100 p-5 shadow-md rounded-md max-w-4xl my-5 mx-auto break-all">
      <thead>
        <tr>
          <th className="text-start pb-1 border-b-2 border-zinc-500">Descrição</th>
          <th className="text-start pb-1 border-b-2 border-zinc-500">Valor</th>
         
          <th className="text-start pb-1 border-b-2 border-zinc-500"></th>
          <th className="text-start pb-1 border-b-2 border-zinc-500"></th>
        </tr>
      </thead>
      <tbody>
        {expenses.map((item: any, i: any) => (
          <tr key={i}>
            <td className="pt-4 text-start" width="20%">{item.desc}</td>
            <td className="pt-4 me-3 text-start text-wrap" width="30%">{item.value}</td>

            <td className=" pt-4 text-start" align="center" width="5%">
              <FaEdit onClick={() => handleEdit(item)} />
            </td>

            <td className="pt-4 text-start" align="center" width="5%">
              <FaTrash onClick={() => handleDelete(item.id)} />
              </td>
          </tr>
        ))}
      </tbody>
    </table>
    </>
  )
}
