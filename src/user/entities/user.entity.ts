import { TimestampedEntity } from 'src/common/entities/timestamped-entity';
import { hashPassword } from 'src/common/utils/hash-password';
import { BeforeInsert, Column, Entity } from 'typeorm';

@Entity()
export class User extends TimestampedEntity {
  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  fullname: string;

  @Column({ default: true })
  isActive: boolean;

  @Column({ nullable: true })
  phone: string;

  @Column({ default: false })
  isEmailConfirmed: boolean;

  @Column({ nullable: true })
  confirmationToken: string;

  @BeforeInsert()
  async hashPassword() {
    this.password = await hashPassword(this.password);
  }
}
