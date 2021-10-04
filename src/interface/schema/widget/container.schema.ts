import WidgetSchema from '@/interface/schema/widget/widget.schema';

export default interface ContainerSchema extends WidgetSchema {
  children: WidgetSchema[];
}
