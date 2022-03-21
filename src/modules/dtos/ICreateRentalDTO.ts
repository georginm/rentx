interface ICreateRentalDTO {
  userId: string;
  carId: string;
  expectedReturnDate: Date;
  id?: string;
  endDate?: Date;
  total?: number;
}

export { ICreateRentalDTO };
