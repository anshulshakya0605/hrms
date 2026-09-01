import { EMPLOYEE_ERROR_CODES, EMPLOYEE_MESSAGE, ERROR_CODES, HTTP_STATUS } from "../../shared/constant/index.js";
import { AppError } from "../../shared/errors/AppError.js";
import { buildPaginationMeta } from "../../shared/pagination/pagination.js";
import { mapEmployeeResponse } from "./employee.mapper.js";
import { EmployeeRepository } from "./employee.repository.js";
import type { CreateEmployeeInput, EmployeeQuery, UpdateEmployeeInput } from "./employee.types.js";


export class EmployeeService {
    private readonly employeeRepository: EmployeeRepository;

    constructor() {
        this.employeeRepository = new EmployeeRepository();
    }

    async createEmployee(input: CreateEmployeeInput) {

        const existingEmployee = await this.employeeRepository.findByUserId(input.userId);

        if (existingEmployee) {
            throw new AppError(
                EMPLOYEE_MESSAGE.ALREADY_EXISTS,
                HTTP_STATUS.CONFLICT,
                EMPLOYEE_ERROR_CODES.ALREADY_EXISTS
            )
        }

        const existingByCode = await this.employeeRepository.findByEmployeeCode(input.employeeCode)

        if (existingByCode) {
            throw new AppError(
                EMPLOYEE_MESSAGE.CODE_ALREADY_EXISTS,
                HTTP_STATUS.CONFLICT,
                EMPLOYEE_ERROR_CODES.CODE_ALREADY_EXISTS
            )
        }

        const employee = await this.employeeRepository.create({
            userId: input.userId,
            employeeCode: input.employeeCode,
            designation: input.designation,
            teamId: input.teamId,
            joiningDate: new Date(input.joiningDate)
        })

        return mapEmployeeResponse(employee);
    }

    async getEmployeeId(id: string) {
        const employee = await this.employeeRepository.findById(id);

        if (!employee) {
            throw new AppError(
                EMPLOYEE_MESSAGE.NOT_FOUND,
                HTTP_STATUS.NOT_FOUND,
                EMPLOYEE_ERROR_CODES.NOT_FOUND
            )
        }

        return mapEmployeeResponse(employee);

    }

    async getEmployees (query: EmployeeQuery) {
        const {page = 1, limit = 10 } = query;

        const {items, totalItems} = await this.employeeRepository.findMany(query);

        return {
            items: items.map(mapEmployeeResponse),

            pagination: buildPaginationMeta(page, limit, totalItems)
        }
    }

    async updateEmployee (id: string, input: UpdateEmployeeInput) {
        const existing = await this.employeeRepository.findById(id);

        if (!existing) {
            throw new AppError(
                EMPLOYEE_MESSAGE.NOT_FOUND,
                HTTP_STATUS.NOT_FOUND,
                EMPLOYEE_ERROR_CODES.NOT_FOUND
            )
        }

        if (input.employeeCode) {
            const duplicate = await this.employeeRepository.findByEmployeeCode(input.employeeCode);

            if (duplicate && duplicate._id.toString() !== id) {
                throw new AppError(
                    EMPLOYEE_MESSAGE.CODE_ALREADY_EXISTS,
                    HTTP_STATUS.CONFLICT,
                    EMPLOYEE_ERROR_CODES.CODE_ALREADY_EXISTS
                )
            }
        }

        const updateData: Record<string, unknown> = {
            ...input,
        }
        if (input.joiningDate) {
            updateData.joiningDate = new Date(input.joiningDate)
        }

        const updated = await this.employeeRepository.update(id, updateData);

        if (!updated) {
            throw new AppError(
                EMPLOYEE_MESSAGE.NOT_FOUND,
                HTTP_STATUS.NOT_FOUND,
                EMPLOYEE_ERROR_CODES.NOT_FOUND
            )
        }

        return mapEmployeeResponse(updated);
    }

    async deleteEmployee (id: string) {
        const employee = await this.employeeRepository.findById(id);

        if (!employee) {
            throw new AppError(
                EMPLOYEE_MESSAGE.NOT_FOUND,
                HTTP_STATUS.NOT_FOUND,
                EMPLOYEE_ERROR_CODES.NOT_FOUND
            )
        }

        await this.employeeRepository.delete(id);
    }

}