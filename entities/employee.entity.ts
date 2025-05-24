import {Column, Entity, ManyToOne,OneToOne,JoinColumn} from 'typeorm';
import AbstractEntity from './abstract.entity';
import Address from './address.entity';
import Department from './department.entity';

export enum EmployeeRole{
  UI='UI',
  UX='UX',
  DEVELOPER='DEVELOPER',
  HR ='HR'
}

export enum EmployeeStatus{
  ACTIVE='ACTIVE',
  INACTIVE='INACTIVE',
  PROBATION='PROBATION'
}

@Entity()
class Employee extends AbstractEntity{

    @Column({unique:true})
    email: string;

    @Column()
    name: string;

    @Column()
    age:number;

     @Column()
    password:string;

    @Column()
    emp_id:string;

    @Column()
    joiningDate:Date;

    @Column()
    experience:number;

    @Column({
      type:'enum',
      enum:EmployeeStatus,
      default:EmployeeStatus.INACTIVE
    })
    status:EmployeeStatus


    @ManyToOne(() => Department, (department) => department.employees)
    department:Department;

    @OneToOne(() => Address,(address)=>address.employee,{
      cascade:true
    })
    address: Address;

    @Column({
      type:'enum',
      enum:EmployeeRole,
      default:EmployeeRole.DEVELOPER
    })
    role:EmployeeRole
  }
  
  
  export default Employee;
  