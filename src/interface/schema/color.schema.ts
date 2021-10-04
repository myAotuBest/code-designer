import ValueType from '../../enum/value-type';

export default interface ColorSchema {
  type: ValueType.string;
  label: string;
  desc: string;
  defaultValue: string;
}
