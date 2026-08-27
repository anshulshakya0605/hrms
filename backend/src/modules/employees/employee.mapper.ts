import type { IEmployee } from "./employee.model.js";


export const mapEmployeeResponse = (employee: IEmployee) =>{
    return {
        id: employee._id.toString(),
        userId: employee.userId.toString(),
        employeeCode: employee.employeeCode,
        designation: employee.designation,
        teamId: employee.teamId?.toString() ?? null,
        joiningDate: employee.joiningDate,
        status: employee.status,
        createdAt: employee.createdAt,
        updatedAt: employee.updatedAt
    }
}