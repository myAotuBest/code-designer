enum WidgetType {
  page = 'page-widget',
  container = 'container-widget',
  text = 'txt-widget',
  link = 'link-widget',
  image = 'image-widget',
  input = 'input-widget',
  radio = 'radio-widget',
  checkbox = 'checkbox-widget',
  form = 'form-widget',
  list = 'list-widget',
  table = 'table-widget',
  tree = 'tree-widget',
  // 自定义类型——第三方组件，或者用户自己重构出来的组件，带源代码或者不带源代码
  custom = 'custom-widget',
}

export default WidgetType;
