import EmployeeRepository from "../../repositories/employee.repository";
import { calledWithFn, mock, MockProxy } from "jest-mock-extended";
import { when } from "jest-when";
import EmployeeService from "../../service/employee.service";
import Employee from "../../entities/employee.entity";
import DepartmentService from "../../service/department.service";
import DepartmentRepository from "../../repositories/department.repository";
import Department from "../../entities/department.entity";
import { EmployeeRole,EmployeeStatus } from "../../entities/employee.entity";
import { CreateAddressDto } from "../../dto/create-address.dto";
import httpException from "../../exception/httpException";

describe("EmployeeService", () => {
  let employeeRepository: MockProxy<EmployeeRepository>;
  let departmentRepository:MockProxy<DepartmentRepository>;
  let employeeService: EmployeeService;
  let departmentService:DepartmentService
  beforeEach(() => {
    employeeRepository = mock<EmployeeRepository>();
    departmentRepository=mock<DepartmentRepository>();
    employeeService = new EmployeeService(employeeRepository);
    departmentService=new DepartmentService(departmentRepository)
  });


  describe("getEmployeeById", () => {
    it("when employee is found", async () => {
      const mockEmployee = { id: 11, name: "nameee" } as Employee;
      when(employeeRepository.findById)
        .calledWith(11)
        .mockReturnValue(mockEmployee);
      const result = await employeeService.getEmployeeById(11);
      expect(result).toEqual(mockEmployee);
      expect(result).toStrictEqual(mockEmployee);
    });

    it("throw error when id do not exist", async () => {
      when(employeeRepository.findById).calledWith(1).mockReturnValue(null);
     await expect(employeeService.getEmployeeById(1)).rejects.toThrow(
        "Employee not found"
      );
      expect(employeeRepository.findById).toHaveBeenCalledWith(1);
    });
  });



  describe("getEmployeeByEmail", () => {
    it("should return employee by email", async () => {
      const mockEmployee = { id: 1, email: "emp@gmail.com" } as Employee;
      when(employeeRepository.findByEmail).calledWith("emp@gmail.com").mockReturnValue(mockEmployee);

      const result = await employeeService.getEmployeeByEmail("emp@gmail.com");

      expect(result).toEqual(mockEmployee);
      expect(result).toStrictEqual(mockEmployee);
    });

    it("should return null and log error if employee not found", async () => {
      when(employeeRepository.findByEmail).calledWith("sample@gmail.com").mockReturnValue(null);
     await expect(employeeService.getEmployeeByEmail("sample@gmail.com")).rejects.toThrow("Employee not found")
      expect(employeeRepository.findByEmail).toHaveBeenCalledWith("sample@gmail.com");
     
    });
  });


  describe("getAllEmployees", () => {
  it("should return a list of employees", async () => {
    const mockEmployees = [
      { id:1, name: "Smith" },
      { id:2, name: "Andy" },
    ] as Employee[];

    when(employeeRepository.findAll).mockResolvedValue(mockEmployees);

    const result = await employeeService.getAllEmployees();

    expect(result).toEqual(mockEmployees);
    expect(employeeRepository.findAll).toHaveBeenCalled();
  });

  it("should return an empty array when no employees found", async () => {
    when(employeeRepository.findAll).mockResolvedValue([]);

    const result = await employeeService.getAllEmployees();

    expect(result).toEqual([]);
    expect(employeeRepository.findAll).toHaveBeenCalled();
  });
});


describe("deleteEmployee", () => {
  it("should delete employee when found", async () => {
    const mockEmployee = { id: 1, name: "John" } as Employee;

    when(employeeRepository.findById).calledWith(1).mockResolvedValue(mockEmployee);

    await employeeService.deleteEmployee(1);

    expect(employeeRepository.findById).toHaveBeenCalledWith(1);
    expect(employeeRepository.remove).toHaveBeenCalledWith(mockEmployee);
  });

  it("should not delete employee when not found", async () => {
    when(employeeRepository.findById).calledWith(2).mockResolvedValue(null);

    await employeeService.deleteEmployee(2);

    expect(employeeRepository.findById).toHaveBeenCalledWith(2);
    expect(employeeRepository.remove).not.toHaveBeenCalled();
  });
});





});