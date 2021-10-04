import WidgetSchema from '@/interface/schema/widget/widget.schema';

export default interface ListSchema extends WidgetSchema {
  children: WidgetSchema[];
}
