import { EntityManager } from '@mikro-orm/postgresql';

/**
 * @description Decorator to wrap a method in a transaction for all EntityManager properties.
 * @returns Decorator function.
 */
export function Transactional() {
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
            const result = await (property[key] as EntityManager).transactional(
              async (em) => {
                this[key] = em;
                return await originalMethod.apply(this, args);
              },
            );

            return result;
          }
        }
      }

      return originalMethod.apply(this, args);
    };

    return descriptor;
  };
}
