import DepartmentRepository from "../../repositories/department.repository";
import DepartmentService from "../../service/department.service";
import Department from "../../entities/department.entity";
import { mock, MockProxy } from "jest-mock-extended";
import { when } from "jest-when";

describe("DepartmentService", () => {
  let departmentRepository: MockProxy<DepartmentRepository>;
  let departmentService: DepartmentService;

  beforeEach(() => {
    departmentRepository = mock<DepartmentRepository>();
    departmentService = new DepartmentService(departmentRepository);
  });

  describe("getDepartmentById", () => {
    it("should return the department when found", async () => {
      const mockDepartment = { id: 1, name: "Design" } as Department;

      when(departmentRepository.findById)
        .calledWith(1)
        .mockResolvedValue(mockDepartment);

      const result = await departmentService.getDepartmentById(1);

      expect(result).toEqual(mockDepartment);
      expect(result).toStrictEqual(mockDepartment);
      expect(departmentRepository.findById).toHaveBeenCalledWith(1);
    });

    it("should return null if department is not found", async () => {
      when(departmentRepository.findById).calledWith(2).mockResolvedValue(null);

      expect( departmentService.getDepartmentById(2)).rejects.toThrow("Department not found");

      expect(departmentRepository.findById).toHaveBeenCalledWith(2);
    });
  });

  describe("createDepartment", () => {
    it("should create and return the department", async () => {
      const mockDepartment = { id: 1, name: "Design" } as Department;

      when(departmentRepository.create).mockResolvedValue(mockDepartment);

      const result = await departmentService.createDepartment("Design");

      expect(result).toEqual(mockDepartment);
      expect(departmentRepository.create).toHaveBeenCalled();
    });

    it("should throw an error if department creation returns null", async () => {
      when(departmentRepository.create).mockResolvedValue(null);

      await expect(departmentService.createDepartment("hr")).rejects.toThrow(
        "Department creation failed"
      );
      expect(departmentRepository.create).toHaveBeenCalled();
    });
  });

  describe("getAllEmployeesByDepartmentId", () => {
    it("should return department with employees for valid department id", async () => {
      const mockDepartment = {
        id: 1,
        name: "Engineering",
        employees: [
          { id: 1, name: "Alice" },
          { id: 2, name: "Bob" },
        ],
      } as Department;

      when(departmentRepository.findEmployeesByDeptId)
        .calledWith(1)
        .mockResolvedValue(mockDepartment);

      const result = await departmentService.getAllEmployeesByDepartmentId(1);

      expect(result).toEqual(mockDepartment);
      expect(departmentRepository.findEmployeesByDeptId).toHaveBeenCalledWith(
        1
      );
    });

    it("should throw error when department not found", async () => {
      when(departmentRepository.findEmployeesByDeptId)
        .calledWith(11)
        .mockResolvedValue(null);

      expect(
        departmentService.getAllEmployeesByDepartmentId(11)
      ).rejects.toThrow("Department not found");

      expect(departmentRepository.findEmployeesByDeptId).toHaveBeenCalledWith(
        11
      );
    });
  });

  describe("updateDepartment", () => {
    it("should update department when department exists", async () => {
      const existingDept = { id: 1, name: "Old Name" } as Department;
      when(departmentRepository.findById)
        .calledWith(1)
        .mockResolvedValue(existingDept);
      when(departmentRepository.update)
        .calledWith(1, { name: "Sales" })
        .mockResolvedValue(undefined);

      await departmentService.updateDepartment(1, "New Name");

      expect(departmentRepository.findById).toHaveBeenCalledWith(1);
      expect(departmentRepository.update).toHaveBeenCalledWith(1, {
        name: "New Name",
      });
    });

    it("should not update when department does not exist", async () => {
      when(departmentRepository.findById)
        .calledWith(11, { name: "Sales" })
        .mockResolvedValue(null);

      expect(departmentService.updateDepartment(11, "New Name")).rejects.toThrow("Department not found");

      expect(departmentRepository.findById).toHaveBeenCalledWith(11);
      expect(departmentRepository.update).not.toHaveBeenCalled();
    });
  });


describe("deleteDepartment", () => {
  it("should delete department when it exists", async () => {
    const existingDept = { id: 1, name: "HR" } as Department;
    when(departmentRepository.findById).calledWith(1).mockResolvedValue(existingDept);
    when(departmentRepository.delete).calledWith(1).mockResolvedValue(undefined);

    await departmentService.deleteDepartment(1);

    expect(departmentRepository.findById).toHaveBeenCalledWith(1);
    expect(departmentRepository.delete).toHaveBeenCalledWith(1);
  });

  it("should not delete when department does not exist", async () => {
    when(departmentRepository.findById).calledWith(11).mockResolvedValue(null);

    expect(departmentService.deleteDepartment(11)).rejects.toThrow("Department not found");

    expect(departmentRepository.findById).toHaveBeenCalledWith(11);
    expect(departmentRepository.delete).not.toHaveBeenCalled();
  });
});



});
