import Button from "../components/button";
import UserTable from "../components/user/user-table";

function UserPage() {
    const AddNewUser = async () => {

    }

    const users = [
        {
            firstName: "Alice",
            lastName: "Smith",
            email: "alice@example.com",
            dob: "1995-05-12",
            age: 28,
            salary: 50000,
            department: "Computer Science",
        },
        {
            firstName: "Bob",
            lastName: "Johnson",
            email: "bob@example.com",
            dob: "1990-10-01",
            age: 33,
            salary: 60000,
            department: "Electrical Engineering",
        },
    ];

    return(
        <div className="p-4">
            <div className="p-6 pb-10">
                <h2 className="text-lg font-semibold">USER MANAGEMENT</h2>
            </div>
            <div className="flex justify-end pb-10">
                <Button 
                    label="Add New User"
                    onClick={AddNewUser}
                    className="bg-teal-600 text-white"
                />
            </div>
            <div>
                <UserTable data={users} />
            </div>
        </div>
    );
}

export default UserPage;