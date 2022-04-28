import { container } from 'tsyringe';

import { EtherealMailProvider } from './implementations/EtherealMailProvider';

container.registerInstance<IMailProvider>(
  'EtherealMailProvider',
  new EtherealMailProvider()
);
