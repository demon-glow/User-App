import React from "react";
import { useReactTable, getCoreRowModel, flexRender } from "@tanstack/react-table";
import { Pencil, Trash } from "lucide-react";
import { DELETE_DEPARTMENT } from "../../config/api-constants";
import toast from "react-hot-toast";

function DepartmentTable({ data, onRefresh, onEdit }) {
    const handleDelete = async (code) => {
        if (window.confirm(`Are you sure you want to delete department ${code}?`)) {
            try {
                const response = await fetch(`${DELETE_DEPARTMENT}/${code}`, {
                    method: "DELETE",
                });

                if (response.ok) {
                    toast.success("Department deleted successfully!");
                    onRefresh();
                } else {
                    const error = await response.text();
                    toast.error(error || "Failed to delete department");
                }
            } catch (error) {
                toast.error("Error deleting department");
            }
        }
    };

    const columns = React.useMemo(
        () => [
            {
                accessorKey: "code",
                header: "Department Code",
            },
            {
                accessorKey: "name",
                header: "Department Name",
            },
            {
                id: "actions",
                header: "Actions",
                cell: ({ row }) => (
                    <div className="flex gap-3">
                        <button
                            className="text-teal-600 hover:text-teal-800"
                            onClick={() => onEdit(row.original)}
                        >
                            <Pencil size={18} />
                        </button>
                        <button
                            className="text-red-700 hover:text-red-900"
                            onClick={() => handleDelete(row.original.code)}
                        >
                            <Trash size={18} />
                        </button>
                    </div>
                ),
            },
        ],
        [onEdit]
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

export default DepartmentTable;