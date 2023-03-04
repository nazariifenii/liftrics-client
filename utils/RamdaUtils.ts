import R from "ramda";

export default { toggleItem };

function toggleItem(item: any, array: Array): Array {
  const index = R.indexOf(item, array);
  if (index > -1) {
    return R.remove(index, 1, array);
  }
  return R.prepend(item, array);
}
