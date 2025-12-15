import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import Button from "../components/button";
import DepartmentTable from "../components/department/department-table";
import { ALL_DEPARTMENTS, ADD_NEW_DEPARTMENT, EDIT_DEPARTMENT } from "../config/api-constants";

function DepartmentPage() {
    const [departmentData, setDepartmentData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [editingDept, setEditingDept] = useState(null);
    const [newDept, setNewDept] = useState({ code: "", name: "" });

    useEffect(() => {
        fetchDepartments();
    }, []);

    const fetchDepartments = async () => {
        try {
            setLoading(true);
            const response = await fetch(ALL_DEPARTMENTS);
            const data = await response.json();
            setDepartmentData(data);
        } catch (error) {
            toast.error("Failed to fetch departments");
        } finally {
            setLoading(false);
        }
    };

    const handleAddDepartment = async (e) => {
        e.preventDefault();
        if (!newDept.code || !newDept.name) return toast.error("Both fields are required!");

        try {
            const response = await fetch(ADD_NEW_DEPARTMENT, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ code: parseInt(newDept.code), name: newDept.name }),
            });

            if (response.ok) {
                toast.success("Department added successfully!");
                setNewDept({ code: "", name: "" });
                setShowForm(false);
                fetchDepartments();
            } else {
                const errorText = await response.text();
                toast.error(errorText || "Failed to add department");
            }
        } catch (error) {
            console.error("Error adding department:", error);
            toast.error("Error adding department");
        }
    };

    const handleEditDepartment = async (e) => {
        e.preventDefault();
        if (!newDept.code || !newDept.name) return toast.error("Both fields are required!");

        try {
            const response = await fetch(`${EDIT_DEPARTMENT}/${editingDept.code}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ code: parseInt(newDept.code), name: newDept.name }),
            });

            if (response.ok) {
                toast.success("Department updated successfully!");
                setNewDept({ code: "", name: "" });
                setShowForm(false);
                setEditingDept(null);
                fetchDepartments();
            } else {
                const errorText = await response.text();
                toast.error(errorText || "Failed to update department");
            }
        } catch (error) {
            console.error("Error updating department:", error);
            toast.error("Error updating department");
        }
    };

    const startEdit = (dept) => {
        setEditingDept(dept);
        setNewDept({ code: dept.code.toString(), name: dept.name });
        setShowForm(true);
    };

    const cancelForm = () => {
        setShowForm(false);
        setEditingDept(null);
        setNewDept({ code: "", name: "" });
    };

    if (loading) return <div className="p-4">Loading...</div>;

    return (
        <div className="p-4">
            <div className="p-6 pb-4 flex justify-between items-center">
                <h2 className="text-lg font-semibold">DEPARTMENT MANAGEMENT</h2>
                <Button
                    label={showForm ? "Cancel" : "Add New Department"}
                    onClick={() => (showForm ? cancelForm() : setShowForm(true))}
                    className="bg-teal-600 text-white"
                />
            </div>

            {showForm && (
                <form
                    onSubmit={editingDept ? handleEditDepartment : handleAddDepartment}
                    className="mb-6 flex gap-2 items-center bg-gray-50 p-4 rounded"
                >
                    <span className="font-semibold text-md">
                        {editingDept ? "Edit Department:" : "Add New Department:"}
                    </span>
                    <input
                        type="number"
                        placeholder="Code"
                        value={newDept.code}
                        onChange={(e) => setNewDept({ ...newDept, code: e.target.value })}
                        className="border px-2 py-1 rounded w-24"
                        required
                        disabled={!!editingDept}
                    />
                    <input
                        type="text"
                        placeholder="Name"
                        value={newDept.name}
                        onChange={(e) => setNewDept({ ...newDept, name: e.target.value })}
                        className="border px-2 py-1 rounded"
                        required
                    />
                    <button type="submit" className="bg-teal-600 text-white px-4 py-1 rounded">
                        {editingDept ? "Update" : "Add"}
                    </button>
                    {editingDept && (
                        <button 
                            type="button" 
                            onClick={cancelForm}
                            className="bg-gray-500 text-white px-4 py-1 rounded"
                        >
                            Cancel Edit
                        </button>
                    )}
                </form>
            )}

            <DepartmentTable 
                data={departmentData} 
                onRefresh={fetchDepartments}
                onEdit={startEdit}
            />
        </div>
    );
}

export default DepartmentPage;