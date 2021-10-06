import React, { Fragment, useEffect, useState } from "react"
import { Row, Col, Input } from 'antd'
import TemplateList from './components/templateList';
import { fetchTemplates } from "@/api"
const { Search } = Input;

import HTML5 from '../../assets/html5.png';
import Build from '../../assets/build.png';
import Bulb from '../../assets/bulb.png';
import style from './index.less';

interface Welcome {
    image: string;
    title: string;
    subtitle: string;
}

const welcomeList: Welcome[] = [
    {
        image: HTML5,
        title: '专注H5 始终如一',
        subtitle: '三年保持行业领先',
    },
    {
        image: Build,
        title: '海量 H5 模版',
        subtitle: '一键生成，一分钟轻松制作',
    },
    {
        image: Bulb,
        title: '极致体验',
        subtitle: '用户的一致选择',
    },
];

export default function () {
    let [templates, setList] = useState([])

    useEffect(() => {
        getTemplateList()
    }, [])

    const getTemplateList = async () => {
        const { data } = await fetchTemplates({ pageIndex: 0, pageSize: 8 })
        setList(data.list)
    }

    const onSearch = (value: string) => {
        console.log(value);
    };

    return (
        <Fragment>
            <div className={style.header}>
                <div className={style.text}>
                    <h2 className={style.headline}>海量精彩设计 一键生成</h2>
                    <div className={style.search}>
                        <Search
                            placeholder="搜索一下，快速找模版"
                            onSearch={onSearch}
                            enterButton
                        />
                    </div>
                </div>
            </div>
            <Row className={style.welcome}>
                {welcomeList.map((item: Welcome, index: number) => {
                    return (
                        <Col key={index} span={8} className={style.item}>
                            <img src={item.image} />
                            <h3>{item.title}</h3>
                            <p>{item.subtitle}</p>
                        </Col>
                    );
                })}
            </Row>
            <div className={style.templateList}>
                <div className={style.hotTitle}>
                    <h2>热门海报</h2>
                    <p>只需替换文字和图片，一键自动生成H5</p>
                </div>
                <TemplateList templateList={templates} />
            </div>
        </Fragment>
    )
}