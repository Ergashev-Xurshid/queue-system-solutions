export default function OperatorTable({ data }) {
  return (
    <table className="w-full bg-white shadow rounded">
      <thead className="bg-gray-100">
        <tr>
          <th className="p-3 text-left">Name</th>
          <th className="p-3 text-left">Direction</th>
          <th className="p-3 text-left">Served</th>
          <th className="p-3 text-left">Status</th>
        </tr>
      </thead>

      <tbody>
        {data.map((op) => (
          <tr key={op.id} className="border-b">
            <td className="p-3">{op.name}</td>
            <td className="p-3">{op.direction}</td>
            <td className="p-3">{op.served}</td>
            <td className="p-3">{op.status}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
