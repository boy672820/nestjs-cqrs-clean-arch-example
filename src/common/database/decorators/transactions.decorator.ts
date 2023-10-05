import { EntityManager } from '@mikro-orm/postgresql';

/**
 * @description Decorator to wrap a method in a transaction for all EntityManager properties.
 * @returns Decorator function.
 */
export function Transactions() {
  return function (
    _target: any,
    _propertyKey: string,
    descriptor: PropertyDescriptor,
  ) {
    const originalMethod = descriptor.value;

    descriptor.value = async function (...args: any[]) {
      for (const name of Object.getOwnPropertyNames(this)) {
        const property = this[name];

        for (const key in property) {
          if (property[key] instanceof EntityManager) {
            property[key] = property[key].fork();

            const em = property[key];
            em.begin();

            try {
              const result = await originalMethod.apply(this, args);

              await em.commit();
              return result;
            } catch (e) {
              await em.rollback();
              throw e;
            }
          }
        }
      }

      return originalMethod.apply(this, args);
    };

    return descriptor;
  };
}
