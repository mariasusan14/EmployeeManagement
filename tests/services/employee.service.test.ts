import EmployeeRepository from "../../repositories/employee.repository"
import{mock,MockProxy} from "jest-mock-extended"
import { when } from "jest-when";
import EmployeeService from "../../service/employee.service"
import Employee from "../../entities/employee.entity";

describe('EmployeeService',()=>{
     let employeeRepository: MockProxy<EmployeeRepository>;
     let employeeService: EmployeeService;
    beforeEach(()=>{
       employeeRepository=mock<EmployeeRepository>();
       employeeService=new EmployeeService(employeeRepository)
    })
    describe('getEmployeeById',()=>{
        
        it("when employee is found",async()=>{
            const mockEmployee={id:11,name:"nameee"} as Employee
              when(employeeRepository.findById).calledWith(11).mockReturnValue(mockEmployee)
              const result=await employeeService.getEmployeeById(11)
              expect(result).toEqual(mockEmployee)
              expect(result).toStrictEqual(mockEmployee);
        })

        it("throw error when id do not exist",async()=>{
            
            when(employeeRepository.findById).calledWith(1).mockReturnValue(null);
            expect(employeeService.getEmployeeById(2)).rejects.toThrow("Employee not found")
            expect(employeeRepository.findById).toHaveBeenCalledWith(2);
        })
    })
})