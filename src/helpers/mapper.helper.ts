export class MapperHelper {
  public static map(Type, value: any) {
    if (typeof value === 'object' && Array.isArray(value)) {
      const result = value.map((obj) => {
        return new Type(obj);
      });
      return result;
    } else {
      return new Type(value);
    }
  }
}
