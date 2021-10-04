import WidgetSchema from '@/interface/schema/widget/widget.schema';
import React from 'react';
import PageWidget from '@/views/design/components/widgets/page/page';

import style from './index.less';

export interface EditorAreaProps {
  // TODO type issue
  schema: WidgetSchema | null;
}

export default class EditorArea extends React.Component<EditorAreaProps, {}> {
  constructor(props: EditorAreaProps) {
    super(props);
  }

  render() {
    const { schema } = this.props;
    return (
      <div className={style.main}>
        <PageWidget schema={schema} />
      </div>
    );
  }
}
