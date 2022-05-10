import { Expose } from 'class-transformer';
import { Column, CreateDateColumn, Entity, PrimaryColumn } from 'typeorm';
import { v4 as uuidV4 } from 'uuid';

@Entity('users')
class User {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  password: string;

  @Column()
  email: string;

  @Column({ name: 'driver_license' })
  driverLicense: string;

  @Column({ name: 'avatar_url' })
  avatarUrl?: string;

  @Column()
  isAdmin: boolean;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @Expose({ name: 'avatar' })
  getAvatarUrl(): string {
    switch (process.env.DISK) {
      case 'local':
        return `${process.env.APP_API_URL}/avatar/${this.avatarUrl}`;
      case 's3':
        return `${process.env.AWS_BUCKET_URL}/avatar/${this.avatarUrl}`;
      default:
        return '';
    }
  }

  constructor() {
    if (!this.id) this.id = uuidV4();
  }
}

export { User };
