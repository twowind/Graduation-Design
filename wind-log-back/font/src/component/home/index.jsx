import React, { useState, useEffect } from 'react';
import { Line, Rose, Liquid } from '@ant-design/charts';
import { Row, Col } from 'antd';

import CardPanel from './card-panel';

const Index = () => {

    const [data, setData] = useState([]);
    const [webData, setWebData] = useState([]);

    useEffect(() => {
        asyncFetch();
        getWebData()
    }, []);

    const asyncFetch = () => {
        fetch('https://gw.alipayobjects.com/os/bmw-prod/e00d52f4-2fa6-47ee-a0d7-105dd95bde20.json')
            .then((response) => response.json())
            .then((json) => setData(json))
            .catch((error) => {
                console.log('fetch data failed', error);
            });
    };

    const getWebData = async () => {
        let response = await fetch('http://localhost:8090/get_web_data', {
            headers: {
                "Content-type": "application/json; charset=utf-8",
                'token': window.localStorage.getItem('token')
            }
        })

        let result = await response.json()

        console.log(result);
        if (result.success === true) {
            setWebData(result.data)
        }
    }

    let config = {
        data: data,
        xField: 'year',
        yField: 'gdp',
        seriesField: 'name',
        yAxis: {
            label: {
                formatter: function formatter(v) {
                    return ''.concat((v / 1000000000).toFixed(1), ' B');
                },
            },
        },
        legend: { position: 'top' },
        smooth: true,
        animation: {
            appear: {
                animation: 'path-in',
                duration: 5000,
            },
        },
    };

    const roseData = [
        {
            type: 'Java',
            value: 27,
        },
        {
            type: 'JavaScript',
            value: 25,
        },
        {
            type: 'C/C++',
            value: 18,
        },
        {
            type: 'React',
            value: 15,
        },
        {
            type: 'Vue',
            value: 10,
        },
        {
            type: '其他',
            value: 5,
        },
    ];
    const roseConfig = {
        data: roseData,
        xField: 'type',
        yField: 'value',
        seriesField: 'type',
        radius: 0.9,
        state: {
            active: {
                style: {
                    lineWidth: 0,
                    fillOpacity: 0.65,
                },
            },
        },
        legend: { position: 'bottom' },
        interactions: [{ type: 'element-active' }],
    };

    const liquidConfig = {
        percent: 0.25,
        outline: {
            border: 4,
            distance: 8,
        },
        wave: { length: 128 },
    };

    return (
        <div>
            <CardPanel webData={webData} />
            <Row>
                <Col span={12}><Rose {...roseConfig} style={{ height: 300 }} /></Col>
                <Col span={12}><Liquid {...liquidConfig} style={{ height: 300 }} /></Col>
            </Row>
            <Line {...config} />
        </div>
    )
}

export default Index