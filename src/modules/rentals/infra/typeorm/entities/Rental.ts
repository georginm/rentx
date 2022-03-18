import { Column, Entity, PrimaryColumn } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

@Entity('rentals')
class Rental {
  @PrimaryColumn()
  id: string;

  @Column({ name: 'car_id' })
  carId: string;

  @Column({ name: 'user_id' })
  userId: string;

  @Column({ name: 'start_date' })
  startDate: Date;

  @Column({ name: 'end_date' })
  endDate: Date;

  @Column({ name: 'expected_return_date' })
  expectedReturnDate: Date;

  total: number;

  @Column({ name: 'created_at' })
  createdAt: Date;

  @Column({ name: 'updated_at' })
  updatedAt: Date;

  constructor() {
    if (!this.id) {
      this.id = uuidv4();
    }
  }
}

export { Rental };
