import React, { Component } from 'react';
import { List } from 'antd';
import InfiniteScroll from 'react-infinite-scroller';
import ListItem from './list-item';

export default class index extends Component {
    render() {

        return (
            <div style={{ float: 'left', width: '100%', borderRadius: 15, height: '800px', overflow: 'auto' }}>
                <InfiniteScroll
                    initialLoad={true}
                    pageStart={0}
                    loadMore={(e) => { console.log(e) }}
                    hasMore={false}
                    useWindow={false}>
                    <List
                        dataSource={this.props.blogdata}
                        renderItem={item => (
                            <ListItem key={this.props.blogdata.artcileId} {...item} />
                        )}
                    />
                </InfiniteScroll>
            </div>
        )
    }
}
