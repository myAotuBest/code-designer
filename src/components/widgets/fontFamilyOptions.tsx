import React, { ReactNode } from 'react';

const fontFamilyArr = [
  { text: '宋体', value: '"SimSun","STSong"' },
  { text: '黑体', value: '"SimHei","STHeiti"' },
  { text: '楷体', value: '"KaiTi","STKaiti"' },
  { text: '仿宋', value: '"FangSong","STFangsong"' },
];
const fontFamilyOptions = fontFamilyArr.map((font) => {
  return {
    value: font.value,
    text: <span style={{ fontFamily: font.value }}>{font.text}</span>,
  };
});
export default fontFamilyOptions;
