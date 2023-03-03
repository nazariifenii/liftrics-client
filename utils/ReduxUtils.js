export default { normalizeArrayOfEntities };

function normalizeArrayOfEntities(
  array: Object[],
  { idField = "id" }: { idField: string } = {}
): { ids: string[], entityById: { [string]: Object } } {
  const ids: string[] = [];
  const entityById: { [string]: Object } = {};
  for (let i = 0; i < array.length; i += 1) {
    const entity = array[i];
    if (checkReportEntityId(entity, idField, array)) {
      ids.push(entity[idField]);
      entityById[entity[idField]] = entity;
    }
  }
  return { ids, entityById };
}

function checkReportEntityId(entity: Object, idField: string, array: Object[]) {
  if (!entity[idField]) {
    console.warn(
      `Entity ${JSON.stringify(
        entity
      )} doesn't have an a field '${idField}'. All entities: ${JSON.stringify(
        array
      )}`
    );
    return false;
  }
  return true;
}
