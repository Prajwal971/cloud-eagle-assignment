import { generateEmployees } from "../utils/generateEmployees";

const Home = () => {
    const employees = generateEmployees(10000);

    console.log(employees);

    return (
        <>
            <h1>User Management</h1>
            <p> Total Employess : {employees.length}</p>
        </>
    );

};

export default Home;