import Texty from 'rc-texty';
import 'rc-texty/assets/index.css';
import TweenOne from 'rc-tween-one';
import Button from 'antd/lib/button';

class Demo extends React.Component {
    state = {
        show: true,
    }
    geInterval = (e) => {
        switch (e.index) {
            case 0:
                return 0;
            case 1:
                return 150;
            case 2:
            case 3:
            case 4:
            case 5:
            case 6:
                return 150 + 450 + (e.index - 2) * 10;
            default:
                return 150 + 450 + (e.index - 6) * 150;
        }
    }
    getEnter = (e) => {
        const t = {
            opacity: 0,
            scale: 0.8,
            y: '-100%',
        };
        if (e.index >= 2 && e.index <= 6) {
            return { ...t, y: '-30%', duration: 150 };
        }
        return t;
    }

    getSplit = (e) => {
        const t = e.split(' ');
        const c = [];
        t.forEach((str, i) => {
            c.push((
                <span key={`${str}-${i}`}>
                    {str}
                </span>
            ));
            if (i < t.length - 1) {
                c.push(<span key={` -${i}`}> </span>);
            }
        });
        return c;
    }

    onClick = () => {
        this.setState({
            show: false,
        }, () => {
            this.setState({
                show: true
            });
        });
    }
    render() {
        return (
            <div className="combined-wrapper">
                <div className="combined-reload">
                    <Button shape="circle" icon="reload" onClick={this.onClick} />
                </div>
                {this.state.show && (
                    <div className="combined">
                        <div className="combined-shape">
                            <div className="shape-left">
                                <TweenOne
                                    animation={[
                                        { x: 158, type: 'from', ease: 'easeInOutQuint', duration: 600 },
                                        { x: -158, ease: 'easeInOutQuart', duration: 450, delay: -150 },
                                    ]}
                                />
                            </div>
                            <div className="shape-right">
                                <TweenOne
                                    animation={[
                                        { x: -158, type: 'from', ease: 'easeInOutQuint', duration: 600 },
                                        { x: 158, ease: 'easeInOutQuart', duration: 450, delay: -150 },
                                    ]}
                                />
                            </div>
                        </div>
                        <Texty
                            className="title"
                            type="mask-top"
                            delay={400}
                            enter={this.getEnter}
                            interval={this.geInterval}
                            component={TweenOne}
                            componentProps={{
                                animation: [
                                    { x: 130, type: 'set' },
                                    { x: 100, delay: 500, duration: 450 },
                                    {
                                        ease: 'easeOutQuart',
                                        duration: 300,
                                        x: 0,
                                    },
                                    {
                                        letterSpacing: 0,
                                        delay: -300,
                                        scale: 0.9,
                                        ease: 'easeInOutQuint',
                                        duration: 1000,
                                    },
                                    { scale: 1, width: '100%', delay: -300, duration: 1000, ease: 'easeInOutQuint' },
                                ],
                            }}
                        >
                            Ant Motion
            </Texty>
                        <TweenOne
                            className="combined-bar"
                            animation={{ delay: 2000, width: 0, x: 158, type: 'from', ease: 'easeInOutExpo' }}
                        />
                        <Texty
                            className="content"
                            type="bottom"
                            split={this.getSplit}
                            delay={2200}
                            interval={30}
                        >
                            Animation specification and components of Ant Design.
            </Texty>
                    </div>
                )}
            </div>
        );
    }
}
ReactDOM.render(<Demo />, mountNode);












import QueueAnim from 'rc-queue-anim';
import TweenOne from 'rc-tween-one';
import PropTypes from 'prop-types';

class ListDemo extends React.Component {
    static propTypes = {
        className: PropTypes.string,
    };

    static defaultProps = {
        className: 'queue-demo',
    };

    constructor(props) {
        super(props);
        this.openIndex = null;
        this.position = {};
        this.state = {
            dataArray: [
                {
                    img: 'https://zos.alipayobjects.com/rmsportal/riaksOILvYdFRfa.png',
                    text: 'Senior Product Designer',
                    key: 0,
                },
                {
                    img: 'https://zos.alipayobjects.com/rmsportal/EMQSSlFQtGYEnWx.png',
                    text: 'Senior Product Designer',
                    key: 1,
                },
                {
                    img: 'https://zos.alipayobjects.com/rmsportal/OCuGZXfRioLyhKF.png',
                    text: 'Senior Product Designer',
                    key: 2,
                },
                {
                    img: 'https://zos.alipayobjects.com/rmsportal/agzYYwzggpOjqge.png',
                    text: 'Senior Product Designer',
                    key: 3,
                },
            ],
            animation: [],
            style: [],
        };
    }

    componentDidMount() {
        if (window.addEventListener) {
            window.addEventListener('touchend', this.onTouchEnd);
            window.addEventListener('mouseup', this.onTouchEnd);
        } else {
            window.attachEvent('ontouchend', this.onTouchEnd);
            window.attachEvent('onmouseup', this.onTouchEnd);
        }
    }

    componentWillUnmount() {
        if (window.addEventListener) {
            window.removeEventListener('touchend', this.onTouchEnd);
            window.removeEventListener('mouseup', this.onTouchEnd);
        } else {
            window.detachEvent('onresize', this.onTouchEnd);
            window.detachEvent('onmouseup', this.onTouchEnd);
        }
    }

    onDelete = () => {
        const dataArray = this.state.dataArray;
        const deleteData = dataArray.filter(item => item.key === this.openIndex)[0];
        const i = dataArray.indexOf(deleteData);
        dataArray.splice(i, 1);
        delete this.state.style[this.openIndex];
        this.openIndex = null;
        this.setState({ dataArray });
    };

    onTouchStart = (e, i) => {
        if (this.openIndex || this.openIndex === 0) {
            const animation = this.state.animation;
            animation[this.openIndex] = { x: 0, ease: 'easeOutBack' };
            this.setState({ animation }, () => {
                delete this.state.style[this.openIndex];
            });
            this.openIndex = null;
            return;
        }
        this.index = i;
        this.mouseXY = {
            startX: e.touches === undefined ? e.clientX : e.touches[0].clientX,
        };
    };

    onTouchEnd = () => {
        if (!this.mouseXY) {
            return;
        }
        const animation = this.state.animation;
        if (this.position[this.index] <= -60) {
            this.openIndex = this.index;
            animation[this.index] = { x: -60, ease: 'easeOutBack' };
        } else {
            animation[this.index] = { x: 0, ease: 'easeOutBack' };
        }

        delete this.mouseXY;
        delete this.position[this.index];
        this.index = null;
        this.setState({ animation });
    };

    onTouchMove = (e) => {
        if (!this.mouseXY) {
            return;
        }
        const currentX = e.touches === undefined ? e.clientX : e.touches[0].clientX;
        let x = currentX - this.mouseXY.startX;
        x = x > 10 ? 10 + (x - 10) * 0.2 : x;
        x = x < -60 ? -60 + (x + 60) * 0.2 : x;
        this.position[this.index] = x;
        const style = this.state.style;
        style[this.index] = { transform: `translateX(${x}px)` };
        const animation = [];
        this.setState({ style, animation });
    };

    render() {
        const liChildren = this.state.dataArray.map((item) => {
            const { img, text, key } = item;
            return (<li
                key={key}
                onMouseMove={this.onTouchMove}
                onTouchMove={this.onTouchMove}
            >
                <div className={`${this.props.className}-delete`}>
                    <a onClick={(e) => { this.onDelete(e); }}>删除</a>
                </div>
                <TweenOne
                    className={`${this.props.className}-content`}
                    onTouchStart={e => this.onTouchStart(e, key)}
                    onMouseDown={e => this.onTouchStart(e, key)}
                    onTouchEnd={this.onTouchEnd}
                    onMouseUp={this.onTouchEnd}
                    animation={this.state.animation[key]}
                    style={this.state.style[key]}
                >
                    <div className={`${this.props.className}-img`}>
                        <img src={img} width="44" height="44" onDragStart={e => e.preventDefault()} />
                    </div>
                    <p>{text}</p>
                </TweenOne>
            </li>);
        });
        return (<div>
            <div className={`${this.props.className}-wrapper`}>
                <div className={this.props.className}>
                    <div className={`${this.props.className}-header`}>
                        <i />
                        <span>Ant Motion</span>
                    </div>
                    <QueueAnim
                        component="ul"
                        animConfig={[
                            { opacity: [1, 0], translateY: [0, 30] },
                            { height: 0 },
                        ]}
                        ease={['easeOutQuart', 'easeInOutQuart']}
                        duration={[550, 450]}
                        interval={150}
                    >
                        {liChildren}
                    </QueueAnim>
                </div>
            </div>
        </div>);
    }
}
ReactDOM.render(
    <ListDemo />
    , mountNode);