import { Tooltip } from 'antd';
import React from 'react';
/*------- 设置表格的列内容 ---------*/
const generatorColumns = ()=>{
	return (
		[{
			title: '通知内容',
			dataIndex: 'notifyContent',
			key: 'notifyContent',
			width: '80%',
			render: (text)=>{
				return (
					<Tooltip placement="bottomLeft" title={text}>
						<span className="info-center-body">{text}</span>;
					</Tooltip>
				);
			},
		},{
			title: '通知时间',
			dataIndex: 'indexDay',
			key: 'indexDay',
			width: '20%',
			render: (text)=>{
				return text.toString().slice(0,4)+'-'+text.toString().slice(4,6)+'-'+text.toString().slice(6,8);
			},
		}]
	);
};

export default generatorColumns;