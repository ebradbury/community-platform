import { faker } from '@faker-js/faker'
import { IModerationStatus, ProfileTypeList } from 'oa-shared'

import type { IMapPin } from 'oa-shared'

export const FactoryMapPin = (
  userOverloads: Partial<IMapPin> = {},
): IMapPin => ({
  _id: faker.string.uuid(),
  _deleted: faker.datatype.boolean(),
  type: faker.helpers.arrayElement(Object.values(ProfileTypeList)),
  verified: faker.datatype.boolean(),
  moderation: faker.helpers.arrayElement([
    IModerationStatus.DRAFT,
    IModerationStatus.AWAITING_MODERATION,
    IModerationStatus.REJECTED,
    IModerationStatus.ACCEPTED,
  ]),
  location: {
    lng: faker.location.longitude(),
    lat: faker.location.latitude(),
  },
  ...userOverloads,
})
