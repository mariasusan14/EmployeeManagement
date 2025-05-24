import { Column, Entity, PrimaryGeneratedColumn ,OneToMany} from "typeorm";
import AbstractEntity from "./abstract.entity";
import Employee from "./employee.entity";

@Entity()
class Department extends AbstractEntity{
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    name:string;
    
    @OneToMany(() => Employee, (employee) => employee.department)
    employees: Employee[]

}

export default Department