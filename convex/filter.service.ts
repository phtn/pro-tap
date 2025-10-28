import type {Doc, TableNames} from './_generated/dataModel'

/**
 * Creates a generic equality filter for a Convex index query.
 *
 * This function is designed to be passed directly as the callback to `withIndex`.
 * It provides type checking to ensure the fieldName and fieldValue are compatible
 * with the table's document type.
 *
 * @template Table - The name of the table, inferred from TableNames.
 * @template FieldName - The name of the field to filter on, must be a key in the table's document.
 *
 * @param {object} params - The parameters for the filter.
 * @param {Table} params.tableName - The name of the Convex table.
 * @param {FieldName} params.fieldName - The name of the field to filter by.
 * @param {Doc<Table>[FieldName]} params.fieldValue - The value to match for the fieldName.
 *
 * @returns A function that takes a FilterBuilder and returns the result of `q.eq(...)`.
 *   This is the format expected by `withIndex`.
 */
export function eqFilterForIndex<
  Table extends TableNames,
  FieldName extends keyof Doc<Table> & string,
>(params: {
  tableName: Table
  fieldName: FieldName
  fieldValue: Doc<Table>[FieldName]
}) {
  const {fieldName, fieldValue} = params

  return (q: any) => {
    return q.eq(fieldName, fieldValue)
  }
}
