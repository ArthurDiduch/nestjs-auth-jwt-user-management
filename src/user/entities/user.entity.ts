import { TimestampedEntity } from 'src/shared/entities/timestamped-entity';
import { hashPassword } from 'src/shared/utils/hash-password';
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

  @Column({ nullable: true, type: 'timestamptz' })
  confirmationExpires: Date;

  @Column({ nullable: true })
  resetPasswordToken: string;

  @Column({ nullable: true, type: 'timestamptz' })
  resetPasswordExpires: Date;

  @BeforeInsert()
  async hashPassword() {
    this.password = await hashPassword(this.password);
  }
}
