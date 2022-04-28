import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

import { IDateProvider } from '../IDateProvider';

dayjs.extend(utc);

class DayjsDateProvider implements IDateProvider {
  compareIfBefore(startDate: Date, endDate: Date): boolean {
    return dayjs(startDate).isBefore(endDate);
  }

  addHours(hours: number): Date {
    return dayjs().add(hours, 'hour').toDate();
  }

  compareInHours(startDate: Date, endDate: Date): number {
    const endDateUTC = this.convertToUTC(endDate);
    const startDateUTC = this.convertToUTC(startDate);

    return dayjs(endDateUTC).diff(startDateUTC, 'hours');
  }

  convertToUTC(date: Date): string {
    return dayjs(date).utc().local().format();
  }

  dateNow(): Date {
    return dayjs().toDate();
  }

  compareInDays(startDate: Date, endDate: Date): number {
    const endDateUTC = this.convertToUTC(endDate);
    const startDateUTC = this.convertToUTC(startDate);

    return dayjs(endDateUTC).diff(startDateUTC, 'days');
  }

  addDays(days: number): Date {
    return dayjs().add(days, 'days').toDate();
  }
}

export { DayjsDateProvider };
