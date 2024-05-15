import { Column, DeleteDateColumn, Entity,  } from 'typeorm';

@Entity()
export class Container {
    
    @Column({primary: true, generated: true})
    id: number;

    @Column() 
    level: number;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    timestamp: Date;

    @Column() 
    status: string;

    @DeleteDateColumn()
    deletedAt: Date;

}
