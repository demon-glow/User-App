import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import Button from "../components/button";
import UserTable from "../components/user/user-table";
import { ALL_USERS, ADD_NEW_USER, DELETE_USER } from "../config/api-constants";

function UserPage() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [newUser, setNewUser] = useState({
        firstName: "",
        lastName: "",
        email: "",
        dob: "",
        salary: "",
        department: "",
    });

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            setLoading(true);
            const response = await fetch(ALL_USERS);
            const data = await response.json();
            setUsers(data);
        } catch (error) {
            console.error("Error fetching users:", error);
            toast.error("Failed to fetch users");
        } finally {
            setLoading(false);
        }
    };

    const handleAddUser = async (e) => {
        e.preventDefault();
        const { firstName, lastName, email, dob, salary, department } = newUser;
        if (!firstName || !lastName || !email || !dob || !salary || !department) {
            return toast.error("All fields are required!");
        }

        try {
            const response = await fetch(ADD_NEW_USER, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    ...newUser,
                    salary: parseFloat(newUser.salary),
                }),
            });

            if (response.ok) {
                toast.success("User added successfully!");
                setNewUser({ firstName: "", lastName: "", email: "", dob: "", salary: "", department: "" });
                setShowForm(false);
                fetchUsers();
            } else {
                toast.error("Failed to add user");
            }
        } catch (error) {
            console.error("Error adding user:", error);
            toast.error("Error adding user");
        }
    };

    const handleDeleteUser = async (id) => {
        if (!window.confirm("Are you sure you want to delete this user?")) return;
        try {
            const response = await fetch(`${DELETE_USER}/${id}`, { method: "DELETE" });
            if (response.ok) {
                toast.success("User deleted successfully!");
                fetchUsers();
            } else {
                toast.error("Failed to delete user");
            }
        } catch (error) {
            console.error("Error deleting user:", error);
            toast.error("Error deleting user");
        }
    };

    if (loading) return <div className="p-4">Loading...</div>;

    return (
        <div className="p-4">
            <div className="p-6 pb-4 flex justify-between items-center">
                <h2 className="text-lg font-semibold">USER MANAGEMENT</h2>
                <Button
                    label={showForm ? "Cancel" : "Add New User"}
                    onClick={() => setShowForm(!showForm)}
                    className="bg-teal-600 text-white"
                />
            </div>

            {showForm && (
                <form onSubmit={handleAddUser} className="mb-6 flex flex-wrap gap-2 items-center">
                    <input
                        type="text"
                        placeholder="First Name"
                        value={newUser.firstName}
                        onChange={(e) => setNewUser({ ...newUser, firstName: e.target.value })}
                        className="border px-2 py-1 rounded"
                        required
                    />
                    <input
                        type="text"
                        placeholder="Last Name"
                        value={newUser.lastName}
                        onChange={(e) => setNewUser({ ...newUser, lastName: e.target.value })}
                        className="border px-2 py-1 rounded"
                        required
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        value={newUser.email}
                        onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                        className="border px-2 py-1 rounded"
                        required
                    />
                    <input
                        type="date"
                        placeholder="Date of Birth"
                        value={newUser.dob}
                        onChange={(e) => setNewUser({ ...newUser, dob: e.target.value })}
                        className="border px-2 py-1 rounded"
                        required
                    />
                    <input
                        type="number"
                        placeholder="Salary"
                        value={newUser.salary}
                        onChange={(e) => setNewUser({ ...newUser, salary: e.target.value })}
                        className="border px-2 py-1 rounded"
                        required
                    />
                    <input
                        type="text"
                        placeholder="Department"
                        value={newUser.department}
                        onChange={(e) => setNewUser({ ...newUser, department: e.target.value })}
                        className="border px-2 py-1 rounded"
                        required
                    />
                    <button type="submit" className="bg-teal-600 text-white px-4 py-1 rounded">
                        Add
                    </button>
                </form>
            )}

            <UserTable data={users.map(u => ({ ...u, actions: () => handleDeleteUser(u.userId) }))} />
        </div>
    );
}

export default UserPage;