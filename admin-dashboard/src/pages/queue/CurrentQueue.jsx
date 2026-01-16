import React from "react";

function CurrentQueue() {
  const mockQueue= [
    {
      id: "1",
      ticketNumber: "A001",
      customerName: "Alice Brown",
      service: "Account Opening",
      waitTime: "5 min",
      status: "serving",
      priority: "normal",
    },
    {
      id: "2",
      ticketNumber: "A002",
      customerName: "Bob Wilson",
      service: "Loan Application",
      waitTime: "12 min",
      status: "waiting",
      priority: "high",
    },
    {
      id: "3",
      ticketNumber: "A003",
      customerName: "Carol Martinez",
      service: "Card Services",
      waitTime: "8 min",
      status: "waiting",
      priority: "urgent",
    },
  ];
  return (
    <div className="mt-8 bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700">
      <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-6">
        Current Queue
      </h3>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-200 dark:border-slate-700">
              <th className="text-left py-3 px-4 text-sm font-medium text-slate-500 dark:text-slate-400">
                Ticket
              </th>
              <th className="text-left py-3 px-4 text-sm font-medium text-slate-500 dark:text-slate-400">
                Customer
              </th>
              <th className="text-left py-3 px-4 text-sm font-medium text-slate-500 dark:text-slate-400">
                Service
              </th>
              <th className="text-left py-3 px-4 text-sm font-medium text-slate-500 dark:text-slate-400">
                Wait Time
              </th>
              <th className="text-left py-3 px-4 text-sm font-medium text-slate-500 dark:text-slate-400">
                Status
              </th>
              <th className="text-left py-3 px-4 text-sm font-medium text-slate-500 dark:text-slate-400">
                Priority
              </th>
            </tr>
          </thead>
          <tbody>
            {mockQueue.map((item) => (
              <tr
                key={item.id}
                className="border-b border-slate-100 dark:border-slate-700/50"
              >
                <td className="py-3 px-4 text-sm font-medium text-slate-900 dark:text-white">
                  {item.ticketNumber}
                </td>
                <td className="py-3 px-4 text-sm text-slate-600 dark:text-slate-400">
                  {item.customerName}
                </td>
                <td className="py-3 px-4 text-sm text-slate-600 dark:text-slate-400">
                  {item.service}
                </td>
                <td className="py-3 px-4 text-sm text-slate-600 dark:text-slate-400">
                  {item.waitTime}
                </td>
                <td className="py-3 px-4">
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      item.status === "serving"
                        ? "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400"
                        : item.status === "waiting"
                        ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400"
                        : "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400"
                    }`}
                  >
                    {item.status}
                  </span>
                </td>
                <td className="py-3 px-4">
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      item.priority === "urgent"
                        ? "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400"
                        : item.priority === "high"
                        ? "bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400"
                        : "bg-slate-100 text-slate-800 dark:bg-slate-700 dark:text-slate-400"
                    }`}
                  >
                    {item.priority}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default CurrentQueue;
