import { CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { BaseEntity } from './base-entity';

export abstract class TimestampedEntity extends BaseEntity {
  @CreateDateColumn({
    type: 'timestamp with time zone',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp with time zone',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;
}
