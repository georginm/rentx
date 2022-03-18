import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

import { IDataProvider } from '../IDateProvider';

dayjs.extend(utc);

class DayjsDataProvider implements IDataProvider {
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
}

export { DayjsDataProvider };
