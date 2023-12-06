import { SelectQueryBuilder } from 'typeorm';

export const conditionUtils = <T>(
  queryBuild: SelectQueryBuilder<T>,
  obj: Record<string, unknown>,
) => {
  Object.keys(obj).forEach((key) => {
    if (obj[key]) {
      queryBuild.andWhere(`${key}=:${key}`, { [key]: obj[key] });
    }
  });
  return queryBuild;
};
