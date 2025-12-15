import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import Button from "../components/button";
import UserTable from "../components/user/user-table";
import { ALL_USERS, ADD_NEW_USER, DELETE_USER, EDIT_USER } from "../config/api-constants";

function UserPage() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [editingUser, setEditingUser] = useState(null);
    const [newUser, setNewUser] = useState({
        firstName: "",
        lastName: "",
        email: "",
        dob: "",
        age: "",
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
        const { firstName, lastName, email, dob, age, salary, department } = newUser;
        if (!firstName || !lastName || !email || !dob || !salary || !department) {
            return toast.error("All fields are required!");
        }

        try {
            const response = await fetch(ADD_NEW_USER, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    firstName: newUser.firstName,
                    lastName: newUser.lastName,
                    email: newUser.email,
                    dob: newUser.dob,
                    age: newUser.age ? parseInt(newUser.age) : null,
                    salary: parseInt(newUser.salary),
                    department: parseInt(newUser.department),
                }),
            });

            if (response.ok) {
                toast.success("User added successfully!");
                setNewUser({ firstName: "", lastName: "", email: "", dob: "", age: "", salary: "", department: "" });
                setShowForm(false);
                fetchUsers();
            } else {
                const errorText = await response.text();
                toast.error(errorText || "Failed to add user");
            }
        } catch (error) {
            console.error("Error adding user:", error);
            toast.error("Error adding user");
        }
    };

    const handleEditUser = async (e) => {
        e.preventDefault();
        const { firstName, lastName, email, dob, age, salary, department } = newUser;
        if (!firstName || !lastName || !email || !dob || !salary || !department) {
            return toast.error("All fields are required!");
        }

        try {
            const response = await fetch(`${EDIT_USER}/${editingUser.userId}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    firstName: newUser.firstName,
                    lastName: newUser.lastName,
                    email: newUser.email,
                    dob: newUser.dob,
                    age: newUser.age ? parseInt(newUser.age) : null,
                    salary: parseInt(newUser.salary),
                    department: parseInt(newUser.department),
                }),
            });

            if (response.ok) {
                toast.success("User updated successfully!");
                setNewUser({ firstName: "", lastName: "", email: "", dob: "", age: "", salary: "", department: "" });
                setShowForm(false);
                setEditingUser(null);
                fetchUsers();
            } else {
                const errorText = await response.text();
                toast.error(errorText || "Failed to update user");
            }
        } catch (error) {
            console.error("Error updating user:", error);
            toast.error("Error updating user");
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

    const startEdit = (user) => {
        setEditingUser(user);
        setNewUser({
            firstName: user.firstName || "",
            lastName: user.lastName || "",
            email: user.email || "",
            dob: user.dob || "",
            age: user.age?.toString() || "",
            salary: user.salary?.toString() || "",
            department: user.department?.toString() || "",
        });
        setShowForm(true);
    };

    const cancelForm = () => {
        setShowForm(false);
        setEditingUser(null);
        setNewUser({ firstName: "", lastName: "", email: "", dob: "", age: "", salary: "", department: "" });
    };

    if (loading) return <div className="p-4">Loading...</div>;

    return (
        <div className="p-4">
            <div className="p-6 pb-4 flex justify-between items-center">
                <h2 className="text-lg font-semibold">USER MANAGEMENT</h2>
                <Button
                    label={showForm ? "Cancel" : "Add New User"}
                    onClick={() => (showForm ? cancelForm() : setShowForm(true))}
                    className="bg-teal-600 text-white"
                />
            </div>

            {showForm && (
                <form 
                    onSubmit={editingUser ? handleEditUser : handleAddUser} 
                    className="mb-6 flex flex-wrap gap-2 items-center bg-gray-50 p-4 rounded"
                >
                    <span className="w-full font-semibold text-md mb-2">
                        {editingUser ? "Edit User:" : "Add New User:"}
                    </span>
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
                        placeholder="Age"
                        value={newUser.age}
                        onChange={(e) => setNewUser({ ...newUser, age: e.target.value })}
                        className="border px-2 py-1 rounded w-20"
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
                        type="number"
                        placeholder="Department Code"
                        value={newUser.department}
                        onChange={(e) => setNewUser({ ...newUser, department: e.target.value })}
                        className="border px-2 py-1 rounded w-32"
                        required
                    />
                    <button type="submit" className="bg-teal-600 text-white px-4 py-1 rounded">
                        {editingUser ? "Update" : "Add"}
                    </button>
                    {editingUser && (
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

            <UserTable 
                data={users}
                onDelete={handleDeleteUser}
                onEdit={startEdit}
            />
        </div>
    );
}

export default UserPage;