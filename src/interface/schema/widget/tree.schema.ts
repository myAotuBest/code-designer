import WidgetSchema from '@/interface/schema/widget/widget.schema';

export default interface TreeSchema {
  node: WidgetSchema;
  children: TreeSchema[];
}
