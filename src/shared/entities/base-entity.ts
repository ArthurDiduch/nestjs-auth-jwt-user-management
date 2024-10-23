import { generateId } from 'src/shared/utils/generate-id';
import {
  BeforeInsert,
  PrimaryColumn,
  BaseEntity as TypeOrmBaseEntity,
} from 'typeorm';

export abstract class BaseEntity extends TypeOrmBaseEntity {
  @PrimaryColumn('bigint')
  id: string;

  @BeforeInsert()
  generateId() {
    this.id = generateId();
  }
}
