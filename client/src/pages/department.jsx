import Button from "../components/button";
import DepartmentTable from "../components/department/department-table";

function DepartmentPage() {
    const AddNewDepartment = async () => {

    }
    
    const departmentData = [
        { code: "CS", name: "Computer Science" },
        { code: "EE", name: "Electrical Engineering" },
        { code: "ME", name: "Mechanical Engineering" },
        { code: "CE", name: "Civil Engineering" },
        { code: "BA", name: "Business Administration" },
    ];

    return(
        <div className="p-4">
            <div className="p-6 pb-10">
                <h2 className="text-lg font-semibold">DEPARTMENT MANAGEMENT</h2>
            </div>
            <div className="flex justify-end pb-10">
                <Button 
                    label="Add New Department"
                    onClick={AddNewDepartment}
                    className="bg-teal-600 text-white"
                />
            </div>
            <div>
                <DepartmentTable data={departmentData} />
            </div>
        </div>
    );
}

export default DepartmentPage;