import React from "react";
import { useReactTable, getCoreRowModel, flexRender } from "@tanstack/react-table";
import { Pencil, Trash } from "lucide-react";

function UserTable({ data }) {
  const columns = React.useMemo(
    () => [
      { accessorKey: "firstName", header: "First Name" },
      { accessorKey: "lastName", header: "Last Name" },
      { accessorKey: "email", header: "Email Address" },
      { accessorKey: "dob", header: "Date of Birth" },
      { accessorKey: "age", header: "Age" },
      { accessorKey: "salary", header: "Salary" },
      { accessorKey: "department", header: "Department" },
      {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => (
          <div className="flex gap-3">
            <button
              className="text-teal-600 hover:text-teal-800"
              onClick={() => alert(`Edit ${row.original.firstName} ${row.original.lastName}`)}
            >
              <Pencil size={18} />
            </button>
            <button
              className="text-red-700 hover:text-red-900"
              onClick={() => alert(`Delete ${row.original.firstName} ${row.original.lastName}`)}
            >
              <Trash size={18} />
            </button>
          </div>
        ),
      },
    ],
    []
  );

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200 border">
        <thead className="bg-gray-100">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className="px-4 py-2 text-left text-lg font-medium text-gray-700"
                >
                  {flexRender(header.column.columnDef.header, header.getContext())}
                </th>
              ))}
            </tr>
          ))}
        </thead>

        <tbody className="bg-white divide-y divide-gray-200">
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id} className="hover:bg-gray-50">
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className="px-4 py-2 text-md text-gray-700">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UserTable;