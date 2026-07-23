import { faker } from "@faker-js/faker";
import type { Employee } from "../types/employee";
import {
    DEPARTMENTS,
    DESIGNATIONS,
    JOINING_DATE,
    QUANTITY_RANGE,
    SALARY_RANGE,
    STATUSES
} from "../constants";
import { getRandomItem } from "./array"
import { getRandomNumber } from './number'
import { getRandomDateBetween } from './date'

export const generateEmployees = (
    count: number
): Employee[] => {
    const employees: Employee[] = [];

    for (let i = 1; i <= count; i++) {
        const firstName = faker.person.firstName();
        const lastName = faker.person.lastName();
        const department = getRandomItem(DEPARTMENTS);
        const designation = getRandomItem(DESIGNATIONS);
        const status = getRandomItem(STATUSES);
        const email = faker.internet.email({
            firstName,
            lastName,
        })
        const salary = getRandomNumber(SALARY_RANGE.MIN, SALARY_RANGE.MAX);
        const quantity = getRandomNumber(QUANTITY_RANGE.MIN, QUANTITY_RANGE.MAX);
        const joiningDate = getRandomDateBetween(
            JOINING_DATE.FROM,
            JOINING_DATE.TO
        ).toISOString();

        const employee: Employee = {
            id: i,
            employeeId: `EMP-${String(i).padStart(4, "0")}`,

            firstName,
            lastName,
            email,

            department,
            designation,

            salary,
            quantity,

            joiningDate,

            status,
        };

        employees.push(employee);


    }

    return employees;
};