import type { Request, Response } from "express";

import { EmployeeService } from "./employee.service.js";
import type { CreateEmployeeInput, EmployeeQuery, UpdateEmployeeInput } from "./employee.types.js";
import { HTTP_STATUS } from "../../shared/constant/http-status.constants.js";
import { EMPLOYEE_MESSAGE } from "../../shared/constant/employee.constants.js";


export class EmployeeController {
    private readonly employeeService: EmployeeService;

    constructor() {
        this.employeeService = new EmployeeService();
    }

    create = async (request: Request, response: Response): Promise<void> => {

        const employee = await this.employeeService.createEmployee(request.body as CreateEmployeeInput);

        response.status(HTTP_STATUS.CREATE).json({
            success: true,
            message: EMPLOYEE_MESSAGE.CREATED,
            data: employee
        })
    }

    getAll = async (request: Request, response: Response): Promise<void> => {
        const result = await this.employeeService.getEmployees(request.query as unknown as EmployeeQuery)

        response.status(HTTP_STATUS.OK).json({
            success: true,
            message: EMPLOYEE_MESSAGE.LIST_FETCHED,
            data: result
        })
    }

    getById = async (request: Request, response: Response): Promise<void> => {

        const employee = await this.employeeService.getEmployeeId(request.params.id as string)

        response.status(HTTP_STATUS.OK).json({
            success: true,
            message: EMPLOYEE_MESSAGE.FETCHED,
            data: employee
        })
    }

    update = async (request: Request, response: Response): Promise<void> => {
        const employee = await this.employeeService.updateEmployee(
            request.params.id as string,
            request.body as UpdateEmployeeInput
        );

        response.status(HTTP_STATUS.OK).json({
            success: true,
            message: EMPLOYEE_MESSAGE.UPDATED,
            data: employee
        })
    }


    delete = async (request: Request, response: Response): Promise<void> => {
        await this.employeeService.deleteEmployee(request.params.id as string);
        response.status(HTTP_STATUS.OK).json({
            success: true,
            message: EMPLOYEE_MESSAGE.DELETED,
            data: null
        })
    }

}

export const employeeController = new EmployeeController();